// TypeScript file
class BgBox extends eui.Panel {
    private imgList = [
        {
            id: "9003",
            name: "bg.jpg"
        },
        {
            id: "9004",
            name: "bg1.jpg"
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

        // var hLayout:eui.HorizontalLayout = new eui.HorizontalLayout();
        // hLayout.gap = 30;
        // hLayout.horizontalAlign = egret.HorizontalAlign.LEFT;
        // // hLayout.verticalAlign = egret.VerticalAlign.MIDDLE;
        // hLayout.paddingRight = 30;
        // hLayout.paddingLeft = 30;
        // hLayout.paddingTop = 30;
        // this.layout = hLayout;

        for(var i = 0; i<this.imgList.length;i++){
            var image = new eui.Image();
            image.source = "resource/assets/" + this.imgList[i].name;
            // image.scale9Grid = new egret.Rectangle(10,10,80,80);
            image.y = 50;
            image.x = 120 * i;
            image.width = 100;
            image.height = 100;
            // image.horizontalCenter = 0;
            image.name = this.imgList[i].id;
            // image.id = this.imgList[i].id;
            image.addEventListener(Mouse.START, this.addImage, this);
            this.addChild(image);
        }
    }

    private addImage (event: egret.TouchEvent) {
        var g: Game = this.parent as Game;
        // g.imgBox.close();
        // g.editGroup.addSinglePicture(event.currentTarget.source);

        // g.closeImagePanel();
        g.editGroup.changeBg(event.currentTarget.source);
    }

    open (container: eui.Component) {
        container.addChild(this);
    }
}