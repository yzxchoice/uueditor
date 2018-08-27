class TabLayer extends eui.Group implements IUUContainer {
	container: any;
	editGroup: EditGroup;

    public layers = [];
    public elements = []
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
        this.editGroup = this.container.editGroup;
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
        this.stage.addEventListener(PageEvent.PAGE_CHANGE, this.pageChange, this);
        this.stage.addEventListener(PageEvent.LAYER_CHANGE, this.layerChange, this);
    }

    private delete (event: egret.Event) {
        this.editGroup.displayList[this.layerIndex].undraw(this.editGroup.displayGroup);
        this.editGroup.displayList.splice(this.layerIndex,1);
        this.elements.splice(this.layerIndex,1);
        this.removeChildren();
        this.render();
        this.editGroup.tool.setTarget(null);
        requestAnimationFrame(this.editGroup.render);
    }

    private pageChange (event: PageEvent) {
        this.getPages();
        this.removeChildren();
        this.render();
    }

    private getPages () {
        this.elements = RES.getRes("data_json").list[this.editGroup.pageIndex].elements;
    }

    private render (layerIndex: number = 0) {
        let h: eui.Group = new eui.Group()
        h.width = 500;
        h.height = 80;
        this.addChild(h);

        var btnDel = new eui.Button();
        btnDel.width = 100;
        btnDel.height = 40;
        btnDel.label = "删除";
        btnDel.verticalCenter = 0;
        btnDel.horizontalCenter = 0;
        btnDel.addEventListener(Mouse.START, this.delete, this);
        h.addChild(btnDel);

        this.layers = []
        var i = 0;
        var elements = this.elements;
        var n = elements.length;
        for (i=0; i<n; i++){
            var g: LayerItem = new LayerItem(i);
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
        this.layerIndex = layerIndex;
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
        var elements = this.elements;
        var item: LayerItem = new LayerItem(elements.length-1);
        item.width = 500;
        item.height = 100;
        this.layers.push(item);
        item.draw(this);
        this.redraw(elements.length-1);
        item.select(null);
    }

    private layerChange (event: PageEvent) {
        this.redraw(event.data.layerIndex);
    }
}