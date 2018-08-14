// TypeScript file
class PageItem extends eui.Group implements IUUContainer {

    pageIndex: number = 0;
    container: PageBox;
    selected: boolean = false;
    
    dispose(): void{
    }
    
    draw(container: any): void{
        this.container = container;
        this.container.addChild(this);
    }

    undraw (container: any): void {
        this.container.removeChild(this);
    }

    constructor (pageIndex: number) {
        super();
        this.pageIndex = pageIndex;
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

        var bg:egret.Shape = new egret.Shape;
        bg.graphics.lineStyle(1,0x999999);
        bg.graphics.beginFill(0xffffff,1);
        if(this.selected){
            bg.graphics.beginFill(0xf2f2f2,1);
        }
        bg.graphics.drawRect(0, 0, this.width, this.height);
        bg.graphics.endFill();
        this.addChild(bg);

        var gc: eui.Group = new eui.Group();
        gc.width = 50;
        gc.height = 50;
        gc.verticalCenter = 0;
        this.addChild(gc);

        var circle:egret.Shape = new egret.Shape;
        // circle.graphics.lineStyle(1,0x999999);
        circle.graphics.beginFill(0x1593ff,1);
        circle.graphics.drawCircle(25, 25, 25);
        // circle.graphics.drawRect(0, 0, 50, 50);
        circle.graphics.endFill();
        gc.addChild(circle);

        var label: eui.Label = new eui.Label();
        label.text = String(this.pageIndex+1);
        label.textColor = 0xffffff;
        label.size = 28;
        label.lineSpacing = 12;
        label.textAlign = egret.HorizontalAlign.JUSTIFY;
        label.horizontalCenter = 0;
        label.verticalCenter = 0 ;
        gc.addChild(label);

        var label1: eui.Label = new eui.Label();
        label1.text = `第${(this.pageIndex+1)}页`;
        label1.textColor = 0x000000;
        label1.size = 28;
        label1.lineSpacing = 12;
        label1.textAlign = egret.HorizontalAlign.JUSTIFY;
        this.addChild(label1);
    }

    private initEvent () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changePage, this);
        
    }

    private changePage (event: egret.TouchEvent) {
        var e: PageEvent = new PageEvent(PageEvent.PAGE_CHANGE, true);
        e.data = {
            pageIndex: this.pageIndex
        }
        this.dispatchEvent(e);
        this.container.redraw(this.pageIndex);
    }
}