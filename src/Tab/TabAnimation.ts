class TabAnimation extends eui.Component implements IUUContainer{
	container: Siderbar;
	editGroup: EditGroup;
	private _grpLayout: eui.Group;
	dispose (): void {

	}

	draw (container: any): void{
		this.container = container;
		this.editGroup = container.editGroup;
	}
	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
	}
	private onAddedToStage(){
		this.init()
	}
	private init(){
		/// 创建容器，在其中进行布局
        this._grpLayout = new eui.Group();
        this._grpLayout.horizontalCenter = 0;
        this._grpLayout.verticalCenter = 0;
        
        this.addChild( this._grpLayout );
        this._grpLayout.width = this.width;
        this._grpLayout.height = this.height;

		var tLayout:eui.TileLayout = new eui.TileLayout();
        tLayout.paddingTop = 30;
        tLayout.paddingLeft = 30;
        tLayout.paddingRight = 30;
        tLayout.paddingBottom = 30;
        this._grpLayout.layout = tLayout;    


		var btnAddCircle = new eui.Button();
        btnAddCircle.width = 100;
        btnAddCircle.height = 40;
        btnAddCircle.label = "圆形";
        btnAddCircle.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddCircle, this);     
        this._grpLayout.addChild(btnAddCircle);    

		var btnAddCurve = new eui.Button();
        btnAddCurve.width = 100;
        btnAddCurve.height = 40;
        btnAddCurve.label = "曲线";
        btnAddCurve.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddCurve, this);     
        this._grpLayout.addChild(btnAddCurve);    
	}

	private onAddCircle () {
		this.editGroup.addAnimate(animType.circle);

		this.editGroup.uutween.setTool(this.editGroup.tool, this.editGroup.tweenControl);
		this.editGroup.tweenControl.setTarget(this.editGroup.tool.target.owner.image);
	}

	private onAddCurve () {
		this.editGroup.addAnimate(animType.curve);

		this.editGroup.uutween.setTool(this.editGroup.tool, this.editGroup.tweenControl);
		this.editGroup.tweenControl.setTarget(this.editGroup.tool.target.owner.image);
	}
}