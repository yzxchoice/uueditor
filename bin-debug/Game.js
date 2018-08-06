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
        _this.imgBox = new ImageBox();
        _this.bgBox = new BgBox();
        _this.soundBox = new SoundBox();
        _this.comBox = new ComponentBox();
        _this.siderbarSkinBy = new SiderbarSkinBy();
        _this.skinName = "resource/skins/GameSkin.exml";
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStageInit, _this);
        return _this;
    }
    Game.prototype.onAddToStageInit = function (event) {
        this.initEui();
    };
    Game.prototype.initEui = function () {
        var editContaier = new eui.Group();
        editContaier.horizontalCenter = 0;
        editContaier.verticalCenter = 0;
        this.addChild(editContaier);
        var img = new eui.Image("resource/assets/phone16.png");
        img.width = 393 * 1.5;
        img.height = 796 * 1.5;
        editContaier.addChild(img);
        // var img = new eui.Image("resource/assets/phonewhite.svg");
        // img.width = 328*1.5;
        // img.height = 560*1.5;
        // this.editGroup.horizontalCenter = 0;
        // this.editGroup.verticalCenter = 0;
        this.editGroup.width = 340 * 1.5;
        this.editGroup.height = 506 * 1.5;
        this.editGroup.horizontalCenter = 0;
        this.editGroup.y = 190 * 1.5;
        this.editGroup.scrollEnabled = true;
        // this.drawBg(this.editGroup);
        // this.editGroup.addChild(img);
        editContaier.addChild(this.editGroup);
        this.header.x = 0;
        this.header.y = 0;
        this.header.width = 1920;
        this.header.height = 100;
        this.drawBg(this.header);
        this.addChild(this.header);
        // this.addChild(this.imgBox);
        this.siderbarSkinBy = new SiderbarSkinBy();
        this.siderbarSkinBy.x = 1920 - 500;
        this.siderbarSkinBy.y = this.header.height + 10;
        this.addChild(this.siderbarSkinBy);
        console.log(this.siderbarSkinBy.data);
        var hLayout = new eui.HorizontalLayout();
        hLayout.gap = 30;
        hLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
        hLayout.verticalAlign = egret.VerticalAlign.MIDDLE;
        hLayout.paddingRight = 30;
        var bottomGroup = new eui.Group();
        bottomGroup.width = 750;
        bottomGroup.height = 100;
        bottomGroup.horizontalCenter = 0;
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
        var button2 = new eui.Button();
        button2.y = 50;
        button2.width = 100;
        button2.height = 40;
        button2.label = "下一页";
        button2.addEventListener(Mouse.START, this.editGroup.next, this.editGroup);
        bottomGroup.addChild(button2);
    };
    Game.prototype.openComponentPanel = function () {
        this.comBox.open(this);
    };
    Game.prototype.openSoundePanel = function () {
        this.soundBox.open(this);
    };
    Game.prototype.openImagePanel = function () {
        this.imgBox.open(this);
    };
    Game.prototype.openBgPanel = function () {
        this.bgBox.open(this);
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
