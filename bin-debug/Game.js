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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
        return __awaiter(this, void 0, void 0, function () {
            var editContaier, bg, hLayout, bottomGroup, button, button2;
            return __generator(this, function (_a) {
                editContaier = new eui.Group();
                editContaier.x = 0;
                editContaier.y = 110;
                this.addChild(editContaier);
                bg = new egret.Shape;
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
                hLayout = new eui.HorizontalLayout();
                hLayout.gap = 30;
                hLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
                hLayout.verticalAlign = egret.VerticalAlign.MIDDLE;
                hLayout.paddingRight = 30;
                bottomGroup = new eui.Group();
                bottomGroup.width = 1200;
                bottomGroup.height = 100;
                bottomGroup.x = 0;
                bottomGroup.layout = hLayout;
                bottomGroup.bottom = 0;
                this.addChild(bottomGroup);
                button = new eui.Button();
                button.width = 100;
                button.height = 40;
                button.label = "上一页";
                button.x = 0;
                button.addEventListener(Mouse.START, this.editGroup.pre, this.editGroup);
                bottomGroup.addChild(button);
                mouse.setButtonMode(button, true);
                button2 = new eui.Button();
                button2.y = 50;
                button2.width = 100;
                button2.height = 40;
                button2.label = "下一页";
                button2.addEventListener(Mouse.START, this.editGroup.next, this.editGroup);
                bottomGroup.addChild(button2);
                return [2 /*return*/];
            });
        });
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
    Game.prototype.openImagePanel = function (cb, isForComponent) {
        if (isForComponent === void 0) { isForComponent = false; }
        this.imgBox.open(this, cb, isForComponent);
        this.imgBox.getResources(getImages, { tag: 1 }, UUType.IMAGE);
    };
    Game.prototype.openBgPanel = function () {
        this.imgBox.open(this);
        this.imgBox.getResources(getImages, { tag: 2 }, UUType.BACKGROUND);
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
