// TypeScript file
class Header extends eui.Group {

    public constructor () {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage (event:egret.Event) {
        this.init();
    }

    private init () {
        var hLayout:eui.HorizontalLayout = new eui.HorizontalLayout();
        hLayout.gap = 30;
        // hLayout.paddingTop = 30;
        hLayout.horizontalAlign = egret.HorizontalAlign.RIGHT;
        hLayout.verticalAlign = egret.VerticalAlign.MIDDLE;
        hLayout.paddingRight = 30;
        this.layout = hLayout;

        var btnAddImage = new eui.Button();
        btnAddImage.width = 100;
        btnAddImage.height = 40;
        btnAddImage.label = "图片";
        btnAddImage.addEventListener(Mouse.START, this.openImagePanel, this);
        this.addChild(btnAddImage);
        var btnPreview = new eui.Button();
        btnPreview.width = 100;
        btnPreview.height = 40;
        btnPreview.label = "预览";
        btnPreview.addEventListener(Mouse.START, this.preview, this);
        this.addChild(btnPreview);
        var btnRelease = new eui.Button();
        btnRelease.width = 100;
        btnRelease.height = 40;
        btnRelease.label = "发布";
        // btnRelease.addEventListener(Mouse.START, this.preview, this);
        this.addChild(btnRelease);
    }

    
    preview (event: egret.TouchEvent) {
        this.parent.addChild(new Preview());
    }

    openImagePanel (vent: egret.TouchEvent) {
        var g: Game = this.parent as Game;
        g.openImagePanel();
    }
}