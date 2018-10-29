// TypeScript file
/**
 * 转盘组件
 */
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
var CircleSector = (function (_super) {
    __extends(CircleSector, _super);
    function CircleSector(props) {
        var _this = _super.call(this) || this;
        _this.layerName = '转盘';
        // props 
        _this.awards = [];
        _this.skinUrl = 'resource/assets/Pic/components/circleSector/turnplate.png';
        _this.arrowUrl = 'preload_json#preload_r2_c15';
        // other
        _this.main = new eui.Group();
        _this.isAnimating = false;
        _this.itemIndex = 4; // 箭头指向的item 索引
        _this.width = 400;
        _this.height = 400;
        _this.forEachProps(props, _this);
        _this.init();
        _this.drawSector();
        _this.touchEnabled = false;
        return _this;
    }
    CircleSector.prototype.forEachProps = function (props, target) {
        for (var key in props) {
            if ((typeof props[key] == 'object') && !(props[key] instanceof Array)) {
                this.forEachProps(props[key], target[key]);
            }
            target[key] = props[key];
        }
    };
    CircleSector.prototype.init = function () {
        // 核心区域
        this.main = this.createMianBox();
        var skin = this.createSkin();
        skin.width = this.main.width;
        skin.height = this.main.height;
        this.main.addChild(skin);
        this.main.touchEnabled = false;
        // 箭头
        var arrow = this.createArrow();
        this.addChild(this.main);
        this.addChild(arrow);
    };
    CircleSector.prototype.createMianBox = function () {
        var group = UIFactory.createGroup(this.width, this.height);
        group.anchorOffsetX = this.width / 2;
        group.anchorOffsetY = this.height / 2;
        group.x = this.width / 2;
        group.y = this.height / 2;
        return group;
    };
    CircleSector.prototype.createSkin = function () {
        return new eui.Image(this.skinUrl);
    };
    CircleSector.prototype.drawSector = function () {
        return __awaiter(this, void 0, void 0, function () {
            var shape, arc, lastAngle, r, i, g, label, smallImg, bigImg;
            return __generator(this, function (_a) {
                shape = new egret.Shape();
                shape.touchEnabled = true;
                this.main.addChild(shape);
                arc = 360 / this.awards.length;
                lastAngle = 0;
                r = this.width / 2;
                for (i = 0; i < this.awards.length; i++) {
                    lastAngle = i * arc;
                    g = new eui.Group();
                    g.width = 2 * r * Math.sin(arc * 2 * Math.PI / 360 / 2);
                    g.height = r;
                    g.x = 200 + Math.cos(lastAngle * Math.PI / 180 + arc * Math.PI / 180 / 2) * 200;
                    g.y = 200 + Math.sin(lastAngle * Math.PI / 180 + arc * Math.PI / 180 / 2) * 200;
                    g.touchEnabled = false;
                    g.rotation = (lastAngle * Math.PI / 180 + arc * Math.PI / 180 / 2 + Math.PI / 2) * 180 / Math.PI;
                    label = new eui.Label(i.toString());
                    label.textColor = 0xE5302F;
                    label.size = 30;
                    g.addChild(label);
                    smallImg = new eui.Image(this.awards[i].url);
                    smallImg.width = 80;
                    smallImg.height = 80;
                    smallImg.x = -smallImg.width / 2;
                    smallImg.y = smallImg.height / 2;
                    g.addChild(smallImg);
                    bigImg = new eui.Image(this.awards[i].url);
                    bigImg.width = 160;
                    bigImg.height = 160;
                    bigImg.x = -bigImg.width / 2;
                    bigImg.visible = false;
                    g.addChild(bigImg);
                    this.main.addChild(g);
                }
                return [2 /*return*/];
            });
        });
    };
    CircleSector.prototype.createArrow = function () {
        var txtr = RES.getRes(this.arrowUrl);
        var img = new egret.Bitmap(txtr);
        img.width = 68;
        img.height = 118;
        img.touchEnabled = true;
        img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.down, this);
        var group = UIFactory.createGroup(img.width, img.height);
        group.addChild(img);
        group.horizontalCenter = 0;
        group.verticalCenter = -20;
        return group;
    };
    CircleSector.prototype.down = function (event) {
        if (this.isAnimating)
            return;
        this.isAnimating = true;
        var random = this.rnd();
        this.rotateFn(random);
    };
    CircleSector.prototype.rnd = function () {
        return this.awards.length * 4 + Math.floor(Math.random() * this.awards.length);
    };
    CircleSector.prototype.rotateFn = function (random) {
        var _this = this;
        console.log('addNun = ' + (random % this.awards.length));
        var a = this.itemIndex - (random % this.awards.length);
        this.itemIndex = a >= 0 ? a : (this.awards.length + a);
        console.log('itemIndex = ' + this.itemIndex);
        var angles = random * (360 / this.awards.length) + (this.main.rotation % 360);
        console.log('angles = ' + angles);
        egret.Tween.pauseTweens(this.main);
        var t = egret.Tween.get(this.main);
        t
            .to({ rotation: angles }, 8000, egret.Ease.sineOut)
            .call(function () {
            console.log('stop...');
            _this.isAnimating = false;
            var item = _this.main.getChildAt(_this.itemIndex + 2);
            console.log(item);
            console.log(_this.main.getChildIndex(item));
            item.getChildAt(item.numChildren - 1).visible = true;
        });
    };
    CircleSector.uuType = UUType.CIRCLE_SECTOR;
    return CircleSector;
}(eui.Group));
__reflect(CircleSector.prototype, "CircleSector", ["IUUBase"]);
