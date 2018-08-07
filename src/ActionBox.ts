// TypeScript file
class ActionBox extends eui.Panel implements IUUContainer {
    container: Game;

    dispose (): void {

    }

    draw (container: any): void {
        this.container = container;
        this.container.addChild(this);
    }
    private imgList = [
        {
            id: "10003",
            name: "timg.jpg"
        }
    ];
    static instance: ImageBox;
    public constructor () {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        
    }

    static getInstance(name) {
        if(!this.instance) {
            this.instance = new ImageBox();
        }
        return this.instance;
    }

    private onAddToStage(event:egret.Event) {
        this.init(); 
    }

    private init () {
        this.horizontalCenter = 0;
        this.verticalCenter = 0;
        this.width = 1200;
        this.height = 800;

        for(var i = 0; i<this.imgList.length;i++){
            var image = new UUImage();
            image.source = "resource/assets/" + this.imgList[i].name;
            // image.scale9Grid = new egret.Rectangle(10,10,80,80);
            image.y = 50;
            image.x = 120 * i;
            image.width = 100;
            image.height = 100;
            image.name = this.imgList[i].id;
            image.data = this.imgList[i];
            image.addEventListener(Mouse.START, this.addImage, this);
            this.addChild(image);
        }
    }

    private addImage (event: egret.TouchEvent) {
        this.container.editGroup.addComponent(event.currentTarget.data);
    }

    open (container: eui.Component) {
        container.addChild(this);
    }
}