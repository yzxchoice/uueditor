class UUTween extends egret.DisplayObjectContainer {

    /**
     * 图像容器
     */
	private _shape: egret.Shape;
    /**
     * 开始点
     */
    private _startShape:egret.Shape;
    /**
     * 中间点
     */
    private _control:egret.Shape;
    /**
     * 结束点
     */
    private _anchor:egret.Shape;
    /**
     * x轴偏移
     */
    private offsetX: number;
    /**
     * y轴偏移
     */
    private offsetY: number;

    public tool: TransformTool;
    /**
     * 实际显示对象
     */
    public target:any;
    /**
     * 容器
     */
    protected container:any; 
    /**
     * 图层数据对象
     */
    public data: UUData<null>;
    /**
     * 动画数据接口
     */
    private tweener: ITween;
    /**
     * 动画类
     */
    private tweenBox: TweenControl;
	public constructor(container:any) {
		super();
        this.container = container;
        
        // this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}

	private onAddToStage(event: egret.Event) {
        
    }

    setTool (tool: TransformTool, tweenBox: TweenControl) {
        this.reset();
        
        this._shape = new egret.Shape();
        this.addChild(this._shape);

        this.tool = tool;
        if(!this.tool.target)  return;
        this.target = this.tool.target.owner.image;
        this.data = this.tool.target.owner.image.data as UUData<null>;
        this.tweenBox = tweenBox;

        if(this.data.hasOwnProperty('properties') && this.data.properties.hasOwnProperty('anims')){
            this.tweener = this.data.properties.anims[0];
            this.init();
            this.initGraphics();
        }
        
    }

    reset () {
        this.removeChildren();
        this._shape = null;
        this.tool = null;
    }

	//初始化赋值
    private initGraphics(): void {
        
        var shape: egret.Shape = this._shape;

        /*** 关键代码段开始 ***/
        shape.graphics.clear();
        shape.graphics.lineStyle(3, 0xff0ff0);
        switch ( this.tweener.type ) {
            case animType.circle:
                shape.graphics.drawCircle(this._startShape.x, this._startShape.y + 100, 100);
                break;
            case animType.curve:
                shape.graphics.moveTo(this._startShape.x, this._startShape.y);
                shape.graphics.curveTo(this._control.x, this._control.y, this._anchor.x, this._anchor.y);
                break;
        }
        /*** 关键代码段结束 ***/
        
    }

    /**
     * 初始化动画类的数值
     */
	private init():void {
        this.offsetX = this.tool.regX - this.target.x;
        this.offsetY = this.tool.regY - this.target.y;

        this._startShape = this.tweener.start ? this.initShape(this.tweener.start.x+this.offsetX, this.tweener.start.y+this.offsetY, 0xffff00)
                                              : this.initShape(this.tool.regX, this.tool.regY, 0xffff00);
        this._control = this.tweener.control ? this.initShape(this.tweener.control.x+this.offsetX, this.tweener.control.y+this.offsetY, 0xff0000)
                                             : this.initShape(this.tool.regX + 100, this.tool.regY - 100, 0xff0000);
        this._anchor = this.tweener.end ? this.initShape(this.tweener.end.x+this.offsetX, this.tweener.end.y+this.offsetY, 0x000ff0)
                                        : this.initShape(this.tool.regX + 200, this.tool.regY + 10, 0x000ff0);

        let start, control, anchor;

        switch ( this.tweener.type ) {
            case animType.circle:
                start = new egret.Point(this._startShape.x - this.offsetX, this._startShape.y-this.offsetY + 100);
                this.tweenBox.setValue(start);

                this.tweener.start = start;
                break;
            case animType.curve:
                start = this.tweener.start || new egret.Point(this._startShape.x - this.offsetX, this._startShape.y-this.offsetY);
                control = this.tweener.control || new egret.Point(this._control.x - this.offsetX, this._control.y-this.offsetY);
                anchor = this.tweener.end || new egret.Point(this._anchor.x - this.offsetX, this._anchor.y-this.offsetY);
                this.tweenBox.setValue(start, control, anchor);

                this.tweener.start = start;
                this.tweener.control = control;
                this.tweener.end = anchor;
                break;
        }
        
    }

    /**
     * 初始化控制点
     */
	private initShape(x:number, y:number, color:number):egret.Shape {
        var shape:egret.Shape = new egret.Shape();
        shape.graphics.beginFill(color);
        shape.graphics.drawCircle(0, 0, 10);
        shape.graphics.endFill();
        this.addChild(shape);
        shape.x = x;
        shape.y = y;
        shape.touchEnabled = true;
        shape.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginHandler, this);
        return shape;
    }

	private drapShape:egret.Shape;
    private onBeginHandler(e:egret.TouchEvent):void {
        e.stopImmediatePropagation();
        if(!this.tool.target) return ;
        
        this.drapShape = <egret.Shape>e.currentTarget;
        this.drapShape.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginHandler, this);
        
        this.drapShape.touchEnabled = false;
        
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMoveHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onEndHandler, this);
    }    
    
    private onMoveHandler(e:egret.TouchEvent):void {
        this.drapShape.x = e.stageX;
        this.drapShape.y = e.stageY;
        
        this.initGraphics();
    }
    
    private onEndHandler(e:egret.TouchEvent):void {
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMoveHandler, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onEndHandler, this);
        
        this.drapShape.touchEnabled = true;;
        
        this.drapShape.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginHandler, this);

        let start = new egret.Point(this._startShape.x - this.offsetX, this._startShape.y-this.offsetY);
        let control = new egret.Point(this._control.x - this.offsetX, this._control.y-this.offsetY);
        let anchor = new egret.Point(this._anchor.x - this.offsetX, this._anchor.y-this.offsetY);
        this.tweenBox.setValue(start, control, anchor);

        this.tweener.start = start;
        this.tweener.control = control;
        this.tweener.end = anchor;
    }
}