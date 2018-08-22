class LayerBox extends eui.Group implements IUUContainer {
	container: any;

    public layers = [];
    public displayList = []
    private pageIndex: number = 0;
    private layerIndex: number = 0;
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
        this.render();
	}

    private init() {
        let vLayout:eui.VerticalLayout = new eui.VerticalLayout();
		vLayout.paddingTop = 0;	
        vLayout.gap = 0;			
		this.layout = vLayout;
        
        this.stage.addEventListener(PageEvent.LAYER_ADD, this.layerAdd, this);
    }

    private getPages () {
        var g: Game = this.parent as Game;
        this.displayList = g.editGroup.displayList;
    }

    private render (layerIndex: number = 0) {
        var i = 0;
        var elements = this.displayList;
        var n = elements.length;
        for (i=0; i<n; i++){
            var g: LayerItem = new LayerItem(i, elements[i]);
            g.width = 500;
            g.height = 100;
            if(i == layerIndex){ 
                g.selected = true;
            }else {
                g.selected = false;
            }
            this.layers.push(g);
            g.draw(this);
        }
    }

    public redraw (layerIndex: number = 0) {
        var i = 0;
        var n = this.layers.length;
        for (i=0; i<n; i++){
            
            if(i == layerIndex){
                this.layers[i].selected = true;
            }else {
                this.layers[i].selected = false;
            }
            this.layers[i].redraw(this);
        }
    }

    private layerAdd(event: PageEvent): void {
        // var g: Game = this.parent as Game;
        // this.displayList = g.editGroup.displayList;
        var elements = this.displayList;
        var item: LayerItem = new LayerItem(elements.length-1, elements[elements.length - 1]);
        item.width = 500;
        item.height = 100;
        this.layers.push(item);
        item.draw(this);
        this.redraw(elements.length-1);
        item.select(null);
    }
}