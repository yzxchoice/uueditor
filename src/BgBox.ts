// TypeScript file
class BgBox extends eui.Panel {
    private imgList = [
        {
            id: "9203",
            name: "bg3_jpg",
            url: "bg3.jpg"
        },
        {
            id: "9207",
            name: "scene_1_jpg",
             url: "scene_1.jpg"
        },
        {
            id: "9208",
            name: "scene_4_jpg",
             url: "scene_4.jpg"
        },
        {
            id: "9209",
            name: "scene_2_jpg",
             url: "scene_2.jpg"
        },
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
            var image = new UUImage();
            image.source = "resource/assets/Background/" + this.imgList[i].url;
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
        console.log('addIamge...');
        console.log(event);
        console.log(event.currentTarget);
        var g: Game = this.parent as Game;
        // g.imgBox.close();
        // g.editGroup.addSinglePicture(event.currentTarget.source);

        // g.closeImagePanel();
        g.editGroup.changeBg(event.currentTarget.data);
    }

    open (container: eui.Component) {
        container.addChild(this);
    }
}