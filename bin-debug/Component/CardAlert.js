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
var CardAlert = (function (_super) {
    __extends(CardAlert, _super);
    function CardAlert(props) {
        var _this = _super.call(this) || this;
        _this.width = 600;
        _this.height = 400;
        _this.bdUrl = '/assets/pic/draw_card_bg.png';
        _this.btn_close = '/assets/pic/btn_close.png';
        console.log('CardAlert Instance...');
        console.log('hello');
        _this.title = props.title;
        _this.content = props.content;
        _this.touchEnabled = false;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
        return _this;
    }
    CardAlert.prototype.onAddToStage = function (event) {
        this.init();
    };
    CardAlert.prototype.onRemoveFromStage = function (event) {
    };
    CardAlert.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var bg, btn, title, contentGroup, contentBorder, content;
            return __generator(this, function (_a) {
                bg = UIFactory.createImage("resource/" + this.bdUrl, this.width, this.height);
                btn = UIFactory.createImage("resource/" + this.btn_close, 50, 50);
                btn.right = 10;
                btn.top = 10;
                btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
                title = UIFactory.createLabel(this.title, 0x000000, 30);
                title.horizontalCenter = 0;
                title.top = 40;
                contentGroup = UIFactory.createGroup(400, 260);
                contentGroup.horizontalCenter = 0;
                contentGroup.bottom = 30;
                contentBorder = this.createContentBorder();
                content = this.createContent();
                contentGroup.addChild(contentBorder);
                contentGroup.addChild(content);
                this.addChild(bg);
                this.addChild(btn);
                this.addChild(title);
                this.addChild(contentGroup);
                return [2 /*return*/];
            });
        });
    };
    CardAlert.prototype.createContentBorder = function () {
        var shp = new egret.Shape();
        shp.graphics.lineStyle(2, 0x00ff00);
        shp.graphics.beginFill(0xff0000, 0);
        shp.graphics.drawRect(0, 0, 400, 260);
        shp.graphics.endFill();
        return shp;
    };
    CardAlert.prototype.createContent = function () {
        var group = new eui.Group();
        group.percentWidth = 100;
        group.percentHeight = 100;
        var type = this.content.type;
        if (type === 'text') {
            var label = UIFactory.createLabel(this.content.message, 0x000000, 40);
            label.horizontalCenter = 0;
            label.verticalCenter = 0;
            group.addChild(label);
        }
        else {
            var image = UIFactory.createImage("resource/" + this.content.message, 200, 200);
            image.horizontalCenter = 0;
            image.verticalCenter = 0;
            group.addChild(image);
        }
        return group;
    };
    CardAlert.prototype.closePanel = function () {
        this.parent.removeChild(this);
    };
    CardAlert.uuType = UUType.CARDALERT;
    return CardAlert;
}(eui.Group));
__reflect(CardAlert.prototype, "CardAlert");
