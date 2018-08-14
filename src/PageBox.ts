// TypeScript file
class PageBox extends eui.Group implements IUUContainer {
    container: any;

    public pages = [];
    currentIndex: number = 0;
    constructor () {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
    }
    
    dispose(): void{
    }
    
    draw(container: any): void{
        this.container = container;
        this.container.addChild(this);
    }

    private onAddedToStage(){
		
        this.getPages();
        this.init();
        this.removeChildren();
        this.render(this.currentIndex);
	}

    private init() {
        let vLayout:eui.VerticalLayout = new eui.VerticalLayout();
		vLayout.paddingTop = 0;	
        vLayout.gap = 0;			
		this.layout = vLayout;
        
        this.stage.addEventListener(PageEvent.PAGE_ADD, this.pageAdd, this);
    }

    private getPages () {
        // console.log(RES.getRes("data_json"));
        this.pages = RES.getRes("data_json").list;
    }

    private render (index?: number) {
        var i = 0;
        var elements = this.pages;
        var n = elements.length;
        for (i=0; i<n; i++){
            var g: PageItem = new PageItem(i);
            g.width = 500;
            g.height = 100;
            if(i == index){
                g.selected = true;
            }else {
                g.selected = false;
            }
            g.draw(this);
        }
    }

    public redraw (index?: number) {
        this.removeChildren();
        if(typeof(index) =='undefined'){
            index = this.pages.length-1;
            var e: PageEvent = new PageEvent(PageEvent.PAGE_CHANGE, true);
            e.data = {
                pageIndex: index
            }
            this.dispatchEvent(e);
        }
        this.currentIndex = index;
        this.render(this.currentIndex);
    }

    private pageAdd(event: PageEvent): void {
        this.redraw();
    }
}