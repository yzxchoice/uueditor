// TypeScript file
class Header extends eui.Group implements IUUContainer {

    container: Game;

    dispose (): void {

    }

    draw (container: any): void {
        this.container = container;
        this.container.addChild(this);
    }

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

        var btnAddPage = new eui.Button();
        btnAddPage.width = 100;
        btnAddPage.height = 40;
        btnAddPage.label = "加页";
        btnAddPage.addEventListener(Mouse.START, this.onAddPage, this);
        this.addChild(btnAddPage);
        var btnAddComponent = new eui.Button();
        btnAddComponent.width = 100;
        btnAddComponent.height = 40;
        btnAddComponent.label = "组件";
        btnAddComponent.addEventListener(Mouse.START, this.openComponentPanel, this);
        this.addChild(btnAddComponent);
        var btnAddFrame = new eui.Button();
        btnAddFrame.width = 100;
        btnAddFrame.height = 40;
        btnAddFrame.label = "边框";
        btnAddFrame.addEventListener(Mouse.START, this.openFramePanel, this);
        this.addChild(btnAddFrame);
        var btnAddSound = new eui.Button();
        btnAddSound.width = 100;
        btnAddSound.height = 40;
        btnAddSound.label = "声音";
        btnAddSound.addEventListener(Mouse.START, this.openSoundPanel, this);
        this.addChild(btnAddSound);
        var btnAddImage = new eui.Button();
        btnAddImage.width = 100;
        btnAddImage.height = 40;
        btnAddImage.label = "图片";
        btnAddImage.addEventListener(Mouse.START, this.openImagePanel, this);
        this.addChild(btnAddImage);
        var btnAddBg = new eui.Button();
        btnAddBg.width = 100;
        btnAddBg.height = 40;
        btnAddBg.label = "背景";
        btnAddBg.addEventListener(Mouse.START, this.openBgPanel, this);
        this.addChild(btnAddBg);
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
        var btnSave = new eui.Button();
        btnSave.width = 100;
        btnSave.height = 40;
        btnSave.label = "保存";
        btnSave.addEventListener(Mouse.START, this.save, this);
        this.addChild(btnSave);
    }

    private save (event: egret.TouchEvent) {
        var g: Game = this.parent as Game;
        console.log(g.editGroup.pages[0]);
        console.log(JSON.stringify(g.editGroup.pages[0]));                
        var obj = {
            code: 200,
            msg: "success",
            list: g.editGroup.pages
        }
        var params = "id=1&template="+JSON.stringify(obj);
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.open("http://10.63.5.71:8002/template/updateTemplate",egret.HttpMethod.POST);
        request.send(params);
        request.addEventListener(egret.Event.COMPLETE,this.onPostComplete,this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onPostIOError,this);
        request.addEventListener(egret.ProgressEvent.PROGRESS,this.onPostProgress,this);
    }

    private onPostComplete(event:egret.Event):void {
        var request = <egret.HttpRequest>event.currentTarget;
        egret.log("post data : ",request.response);
        
    }

    private onPostIOError(event:egret.IOErrorEvent):void {
        egret.log("post error : " + event);
    }

    private onPostProgress(event:egret.ProgressEvent):void {
        egret.log("post progress : " + Math.floor(100*event.bytesLoaded/event.bytesTotal) + "%");
    }

    onAddPage (event: egret.TouchEvent) {
        var g: Game = this.parent as Game;
        g.editGroup.addPage();
        this.dispatchEvent(new PageEvent(PageEvent.PAGE_ADD, true));
    }
    
    preview (event: egret.TouchEvent) {
        // callJsFunc("ts call js");
        var g: Game = this.parent as Game;
        var pb: PreviewBox = new PreviewBox();
        pb.draw(g);
    }

    openComponentPanel (event: egret.TouchEvent) {
        var g: Game = this.parent as Game;
        g.openComponentPanel();
    }

    openFramePanel (event: egret.TouchEvent) {
        var g: Game = this.parent as Game;
        g.openFramePanel();
    }

    openSoundPanel (event: egret.TouchEvent) {
        var g: Game = this.parent as Game;
        g.openSoundePanel();
    }

    openImagePanel (event: egret.TouchEvent) {
        var g: Game = this.parent as Game;
        g.openImagePanel();
    }

    openBgPanel (event: egret.TouchEvent) {
        var g: Game = this.parent as Game;
        g.openBgPanel();
    }
}