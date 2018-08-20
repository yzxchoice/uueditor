class LayerBox extends eui.Group implements IUUContainer {
	container: any;

    public layers = [];
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
		
        // this.getPages();
        // this.init();
        this.removeChildren();
        // this.render(this.currentIndex);
	}
}