// TypeScript file
class ImageBox extends eui.Panel {
    static instance: ImageBox;
    private imgList: any = [];
    private _grpLayout:eui.Group;
    private url: string;
    private params: any;
    private uutype: number;
    private container: eui.Component;
    public constructor () {
        super();
        
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    static getInstance() {
        if(!this.instance) {
            this.instance = new ImageBox();
        }
        return this.instance;
    }

    private onAddToStage(event:egret.Event) {
        this.init(); 
        
    }

    async getResources (url: string, params: any, uutype: number) {
        this.url = url;
        this.params = params;
        this.uutype = uutype;
        var res = await Fetch.start(this.url, this.params);
        this.imgList = res;
        this.render();
    }

    private reset () {
        this._grpLayout.removeChildren();
    }

    render () {
        this.reset();
        for(var i = 0; i<this.imgList.length;i++){
            this.imgList[i].id = this.imgList[i]._id;
            this.imgList[i].url = this.imgList[i].img_path;
            this.imgList[i].name = this.imgList[i].url.substring(this.imgList[i].url.lastIndexOf("/")+1).replace('.','_')
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
            image.source = "resource/" + this.imgList[i].img_path;
            image.width = 100;
            image.height = 100;
            image.name = this.imgList[i].id;
            image.data = this.imgList[i];
            image.addEventListener(Mouse.START, this.addImage, this);
            borderGroup.addChild(image);
            
        }
    }

    private init () {
        if(this._grpLayout) return;
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
    }

    private addImage (event: egret.TouchEvent) {
        var g: Game = this.parent as Game;
        // g.editGroup.addSinglePicture(event.currentTarget.data);
        g.editGroup.addResource(event.currentTarget.data, this.uutype);
        // this.close();
    }

    open (container: eui.Component) {
        this.container = container;
        this.container.addChild(this);
    }

    close () {
        this.container.removeChild(this);
    }
}