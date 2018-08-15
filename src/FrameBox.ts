// TypeScript file
class FrameBox extends eui.Panel {
    private imgList = [
        {
            id: "9901",
            name: "post_item_34_png",
            url: "post_item_34.png"
        }
    ];
    static instance: ImageBox;
    private _grpLayout:eui.Group;
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

        /// 创建容器，在其中进行布局
        this._grpLayout = new eui.Group();
        this._grpLayout.horizontalCenter = 0;
        this._grpLayout.verticalCenter = 0;
        
        this.addChild( this._grpLayout );
        this._grpLayout.width = this.width;
        this._grpLayout.height = this.height - 50;

        var tLayout:eui.TileLayout = new eui.TileLayout();
        tLayout.paddingTop = 30;
        tLayout.paddingLeft = 30;
        tLayout.paddingRight = 30;
        tLayout.paddingBottom = 30;
        this._grpLayout.layout = tLayout;

        for(var i = 0; i<this.imgList.length;i++){
            var borderGroup: eui.Group = new eui.Group();
            borderGroup.width = 100;
            borderGroup.height = 100;
            this._grpLayout.addChild(borderGroup);

            var bg:egret.Shape = new egret.Shape;
            bg.graphics.lineStyle(1,0x999999);
            bg.graphics.beginFill(0xffffff,1);
            bg.graphics.drawRect(0, 0, borderGroup.width, borderGroup.height);
            bg.graphics.endFill();
            borderGroup.addChild(bg);

            var image = new UUImage();
            image.source = "resource/assets/Pic/" + this.imgList[i].url;
            image.width = 100;
            image.height = 100;
            image.name = this.imgList[i].id;
            image.data = this.imgList[i];
            image.addEventListener(Mouse.START, this.addImage, this);
            borderGroup.addChild(image);
            
        }
    }

    private addImage (event: egret.TouchEvent) {
        var g: Game = this.parent as Game;
        // g.imgBox.close();
        g.editGroup.addFrame(event.currentTarget.data);

        // g.closeImagePanel();
        // g.editGroup.changeBg(event.currentTarget.source);
    }

    open (container: eui.Component) {
        container.addChild(this);
    }
}