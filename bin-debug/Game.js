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
/**
 * Game
 */
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super.call(this) || this;
        _this.borderColor = 0xcccccc;
        _this.editGroup = new EditGroup();
        _this.header = new Header();
        _this.imgBox = ImageBox.getInstance();
        _this.Siderbar = Siderbar.getInstance();
        _this.skinName = "resource/skins/GameSkin.exml";
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStageInit, _this);
        return _this;
    }
    Game.prototype.onAddToStageInit = function (event) {
        this.initEui();
        mouse.enable(this.stage);
        mouse.setMouseMoveEnabled(true);
    };
    Game.prototype.initEui = function () {
        var editContaier = new eui.Group();
        editContaier.x = 0;
        editContaier.y = 110;
        this.addChild(editContaier);
        var bg = new egret.Shape;
        // bg.graphics.lineStyle(3,0x999999);
        bg.graphics.beginFill(0xffffff, 1);
        bg.graphics.drawRect(0, 0, 1200, 900);
        bg.graphics.endFill();
        editContaier.addChild(bg);
        this.editGroup.width = 1200;
        this.editGroup.height = 900;
        this.editGroup.x = 0;
        this.editGroup.y = 0;
        this.editGroup.scrollEnabled = true;
        editContaier.addChild(this.editGroup);
        this.header.x = 0;
        this.header.y = 0;
        this.header.width = 1920;
        this.header.height = 100;
        this.drawBg(this.header);
        this.header.draw(this);
        // this.addChild(this.imgBox);
        this.Siderbar.x = 1920 - 500;
        this.Siderbar.y = this.header.height + 10;
        this.Siderbar.draw(this);
        var hLayout = new eui.HorizontalLayout();
        hLayout.gap = 30;
        hLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
        hLayout.verticalAlign = egret.VerticalAlign.MIDDLE;
        hLayout.paddingRight = 30;
        var bottomGroup = new eui.Group();
        bottomGroup.width = 1200;
        bottomGroup.height = 100;
        bottomGroup.x = 0;
        bottomGroup.layout = hLayout;
        bottomGroup.bottom = 0;
        this.addChild(bottomGroup);
        var button = new eui.Button();
        button.width = 100;
        button.height = 40;
        button.label = "上一页";
        button.x = 0;
        button.addEventListener(Mouse.START, this.editGroup.pre, this.editGroup);
        bottomGroup.addChild(button);
        mouse.setButtonMode(button, true);
        var button2 = new eui.Button();
        button2.y = 50;
        button2.width = 100;
        button2.height = 40;
        button2.label = "下一页";
        button2.addEventListener(Mouse.START, this.editGroup.next, this.editGroup);
        bottomGroup.addChild(button2);
    };
    Game.prototype.openComponentPanel = function () {
        this.imgBox.open(this);
        this.imgBox.getResources(getImages, { tag: 101 }, UUType.CIRCLE_SECTOR);
    };
    Game.prototype.openFramePanel = function () {
        this.imgBox.open(this);
        this.imgBox.getResources(getImages, { tag: 102 }, UUType.FRAME);
    };
    Game.prototype.openSoundePanel = function (cb) {
        this.imgBox.open(this, cb);
        this.imgBox.getResources(getImages, { tag: 103 }, UUType.SOUND);
    };
    Game.prototype.openImagePanel = function () {
        this.imgBox.open(this);
        this.imgBox.getResources(getImages, { tag: 1 }, UUType.IMAGE);
    };
    Game.prototype.openBgPanel = function () {
        this.imgBox.open(this);
        this.imgBox.getResources(getImages, { tag: 2 }, UUType.BACKGROUND);
    };
    Game.prototype.openSoundPanel = function () {
        this.imgBox.open(this);
        this.imgBox.getResources(getImages, { tag: 103 }, UUType.SOUND);
    };
    Game.prototype.closeImagePanel = function () {
        this.imgBox.close();
    };
    Game.prototype.drawBg = function (container, isborder) {
        if (isborder === void 0) { isborder = 1; }
        var border = new egret.Shape;
        border.graphics.lineStyle(2, this.borderColor);
        border.graphics.beginFill(0xffffff, isborder);
        border.graphics.drawRect(0, 0, container.width, container.height);
        border.graphics.endFill();
        container.addChild(border);
    };
    return Game;
}(eui.Component));
__reflect(Game.prototype, "Game");
