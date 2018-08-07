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
        var btnAddComponent = new eui.Button();
        btnAddComponent.width = 100;
        btnAddComponent.height = 40;
        btnAddComponent.label = "组件";
        btnAddComponent.addEventListener(Mouse.START, this.openComponentPanel, this);
        this.addChild(btnAddComponent);
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
    };
    Header.prototype.preview = function (event) {
        this.parent.addChild(new Preview());
    };
    Header.prototype.openComponentPanel = function (event) {
        var g = this.parent;
        g.openComponentPanel();
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