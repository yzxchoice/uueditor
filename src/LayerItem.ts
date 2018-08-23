// TypeScript file
class LayerItem extends eui.Group implements IUUContainer {

    layerIndex: number = 0;
    container: TabLayer;
    selected: boolean = false;
	displayObj: Picture;
    bg: egret.Shape = new egret.Shape;
    
    dispose(): void{
    }
    
    draw(container: any): void{
        this.container = container;
        this.container.addChild(this);
    }

    undraw (container: any): void {
        this.container.removeChild(this);
    }

    constructor (layerIndex: number, displayObj: any) {
        super();
        this.layerIndex = layerIndex;
		this.displayObj = displayObj;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
    }

    private onAddedToStage(){
        this.init();
        this.initEvent();
        
	}

    private init () {
        let hLayout:eui.HorizontalLayout = new eui.HorizontalLayout();
        hLayout.paddingLeft = 30;	
        hLayout.verticalAlign = "middle";	
        hLayout.gap = 30;		
        this.layout = hLayout;

        // var bg:egret.Shape = new egret.Shape;
        this.bg.graphics.lineStyle(1,0x999999);
        this.bg.graphics.beginFill(0xffffff,1);
        if(this.selected){
            this.bg.graphics.beginFill(0xf2f2f2,1);
        }
        this.bg.graphics.drawRect(0, 0, this.width, this.height);
        this.bg.graphics.endFill();
        this.addChild(this.bg);

        var gc: eui.Group = new eui.Group();
        gc.width = 50;
        gc.height = 50;
        gc.verticalCenter = 0;
        this.addChild(gc);

        // var circle:egret.Shape = new egret.Shape;
        // // circle.graphics.lineStyle(1,0x999999);
        // circle.graphics.beginFill(0x1593ff,1);
        // circle.graphics.drawCircle(25, 25, 25);
        // // circle.graphics.drawRect(0, 0, 50, 50);
        // circle.graphics.endFill();
        // gc.addChild(circle);

        // var label: eui.Label = new eui.Label();
        // label.text = String(this.layerIndex+1);
        // label.textColor = 0xffffff;
        // label.size = 28;
        // label.lineSpacing = 12;
        // label.textAlign = egret.HorizontalAlign.JUSTIFY;
        // label.horizontalCenter = 0;
        // label.verticalCenter = 0 ;
        // gc.addChild(label);

        var label1: eui.Label = new eui.Label();
        label1.text = `图层${(this.layerIndex+1)} ${this.displayObj.image.layerName}`;
        label1.textColor = 0x000000;
        label1.size = 28;
        label1.lineSpacing = 12;
        label1.textAlign = egret.HorizontalAlign.JUSTIFY;
        this.addChild(label1);
    }

    private initEvent () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.select, this);
    }

    public select (event: egret.TouchEvent) {
        if(!this.displayObj.b) return;
        var e: PageEvent = new PageEvent(PageEvent.LAYER_SELECT, true);
        e.data = {
            t: this.displayObj
        }
        this.dispatchEvent(e);
        this.container.redraw(this.layerIndex);
    }

    redraw () {
        this.bg.graphics.clear();
        this.bg.graphics.lineStyle(1,0x999999);
        this.bg.graphics.beginFill(0xffffff,1);
        if(this.selected){
            this.bg.graphics.beginFill(0xf2f2f2,1);
        }
        this.bg.graphics.drawRect(0, 0, this.width, this.height);
        this.bg.graphics.endFill();
    }
}