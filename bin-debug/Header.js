var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
// TypeScript file
var Header = (function (_super) {
    __extends(Header, _super);
    function Header() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Header.prototype.dispose = function () {
    };
    Header.prototype.draw = function (container) {
        this.container = container;
        this.container.addChild(this);
    };
    Header.prototype.onAddToStage = function (event) {
        this.init();
    };
    Header.prototype.init = function () {
        var hLayout = new eui.HorizontalLayout();
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
    };
    Header.prototype.save = function (event) {
        var g = this.parent;
        console.log(g.editGroup.pages[0]);
        console.log(JSON.stringify(g.editGroup.pages[0]));
        var obj = {
            code: 200,
            msg: "success",
            list: g.editGroup.pages
        };
        var params = "id=1&template=" + JSON.stringify(obj);
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.open("http://10.63.5.71:8002/template/updateTemplate", egret.HttpMethod.POST);
        request.send(params);
        request.addEventListener(egret.Event.COMPLETE, this.onPostComplete, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onPostIOError, this);
        request.addEventListener(egret.ProgressEvent.PROGRESS, this.onPostProgress, this);
    };
    Header.prototype.onPostComplete = function (event) {
        var request = event.currentTarget;
        egret.log("post data : ", request.response);
    };
    Header.prototype.onPostIOError = function (event) {
        egret.log("post error : " + event);
    };
    Header.prototype.onPostProgress = function (event) {
        egret.log("post progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
    };
    Header.prototype.onAddPage = function (event) {
        var g = this.parent;
        g.editGroup.addPage();
        this.dispatchEvent(new PageEvent(PageEvent.PAGE_ADD, true));
    };
    Header.prototype.preview = function (event) {
        // callJsFunc("ts call js");
        var g = this.parent;
        var pb = new PreviewBox();
        pb.draw(g);
    };
    Header.prototype.openComponentPanel = function (event) {
        var g = this.parent;
        g.openComponentPanel();
    };
    Header.prototype.openFramePanel = function (event) {
        var g = this.parent;
        g.openFramePanel();
    };
    Header.prototype.openSoundPanel = function (event) {
        var g = this.parent;
        g.openSoundePanel();
    };
    Header.prototype.openImagePanel = function (event) {
        var g = this.parent;
        g.openImagePanel();
    };
    Header.prototype.openBgPanel = function (event) {
        var g = this.parent;
        g.openBgPanel();
    };
    return Header;
}(eui.Group));
__reflect(Header.prototype, "Header", ["IUUContainer"]);
//# sourceMappingURL=Header.js.map