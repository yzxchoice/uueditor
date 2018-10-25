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
 * 轮播图组件
 */
var SlotMachine = (function (_super) {
    __extends(SlotMachine, _super);
    function SlotMachine(props) {
        var _this = _super.call(this) || this;
        _this.layerName = '老虎机';
        _this.isAnimating = false;
        _this.itemWidth = 250;
        _this.itemHeight = 250;
        _this.gap = 10;
        _this.tweenFlag = 3; // 动画标记
        // 组件宽、高固定
        _this.width = 856;
        _this.height = 388;
        // props中用到的参数
        _this.bdUrl = 'resource/assets/pic/draw_card_bg.png';
        _this.awardsTotal = [];
        _this._awards = [];
        _this.awards = props.award;
        // this.bdUrl = props.bdUrl;
        _this.touchEnabled = false;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
        return _this;
    }
    Object.defineProperty(SlotMachine.prototype, "awards", {
        get: function () {
            return this._awards;
        },
        set: function (v) {
            this._awards = v;
            var firstItem = v.slice(0, 1);
            this.awardsTotal = v.concat(firstItem);
        },
        enumerable: true,
        configurable: true
    });
    SlotMachine.prototype.onAddToStage = function (event) {
        this.init();
    };
    SlotMachine.prototype.onRemoveFromStage = function (event) {
    };
    SlotMachine.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var mainBox;
            return __generator(this, function (_a) {
                mainBox = this.createGroupBox();
                this.addChild(mainBox);
                return [2 /*return*/];
            });
        });
    };
    SlotMachine.prototype.createGroupBox = function () {
        var groupWidth = 856;
        var groupHeight = 388;
        var group = UIFactory.createGroup(groupWidth, groupHeight);
        var img = new eui.Image();
        img.source = 'resource/assets/Pic/components/slots_bg.png';
        img.width = groupWidth;
        img.height = groupHeight;
        group.addChild(img);
        var mainBox = this.createMainBox();
        mainBox.x = 30;
        mainBox.y = 34;
        group.addChild(mainBox);
        var btn = this.createStartBtn();
        btn.horizontalCenter = 0;
        btn.bottom = 10;
        console.log('btn....');
        console.log(btn);
        group.addChild(btn);
        return group;
    };
    SlotMachine.prototype.createMainBox = function () {
        var group = new eui.Group();
        group.width = this.width;
        group.height = this.itemHeight + 2 * this.gap;
        // 主容器
        var itemGroup = new eui.Group();
        itemGroup.width = this.width;
        itemGroup.height = group.height;
        this.itemGroup = itemGroup;
        itemGroup.mask = new egret.Rectangle(0, 0, itemGroup.width, itemGroup.height);
        // 生成3项竖向轮播图容器
        for (var i = 0, len = 3; i < len; i++) {
            var itemBox = this.createItemBox();
            itemBox.x = (12 + this.itemWidth) * i + 12;
            itemBox.y = this.gap;
            itemGroup.addChild(itemBox);
        }
        ;
        group.addChild(itemGroup);
        return group;
    };
    // 竖向轮播图容器
    SlotMachine.prototype.createItemBox = function () {
        var group = new eui.Group();
        group.width = this.itemWidth;
        group.height = (this.itemWidth + this.gap) * this.awardsTotal.length - this.gap;
        var vLayout = new eui.VerticalLayout();
        vLayout.gap = this.gap;
        vLayout.paddingTop = 0;
        group.layout = vLayout;
        var promiseArr = [];
        for (var i = 0, len = this.awardsTotal.length; i < len; i++) {
            var item = this.createItem(this.awardsTotal[i].url);
            group.addChild(item);
        }
        ;
        return group;
    };
    SlotMachine.prototype.createItem = function (url) {
        var group = new eui.Group();
        group.width = this.itemWidth;
        group.height = this.itemHeight;
        var bg = this.createImg(this.bdUrl);
        var img = this.createImg(url);
        group.addChild(bg);
        group.addChild(img);
        return group;
    };
    SlotMachine.prototype.createImg = function (url) {
        var img = new eui.Image(url);
        img.width = this.itemWidth;
        img.height = this.itemHeight;
        return img;
    };
    SlotMachine.prototype.createStartBtn = function () {
        var txtr = RES.getRes('preload_json#preload_r2_c12');
        var img = new egret.Bitmap(txtr);
        img.width = 120;
        img.height = 56;
        img.touchEnabled = true;
        img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        var group = UIFactory.createGroup(120, 56);
        this.btn_start = group;
        group.addChild(img);
        this.addClickState();
        return group;
    };
    SlotMachine.prototype.onClick = function (evt) {
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        if (this.tweenFlag !== 3)
            return;
        if (this.isAnimating)
            return;
        this.removeClickState();
        this.tweenFlag = 0;
        var stepRandomMax = this.awardsTotal.length - 1;
        var stepRandomMIn = 4;
        var step1 = Math.floor(Math.random() * stepRandomMax) + stepRandomMIn;
        var step2 = Math.floor(Math.random() * stepRandomMax) + stepRandomMIn;
        var step3 = Math.floor(Math.random() * stepRandomMax) + stepRandomMIn;
        var timeRandomMax = (this.awardsTotal.length - 1) * 200;
        var timeRandomMIn = 1000;
        var time1 = Math.floor(Math.random() * timeRandomMax) + timeRandomMIn;
        var time2 = Math.floor(Math.random() * timeRandomMax) + timeRandomMIn;
        var time3 = Math.floor(Math.random() * timeRandomMax) + timeRandomMIn;
        var firstBox = this.itemGroup.getChildAt(0);
        var secondBox = this.itemGroup.getChildAt(1);
        var thirdBox = this.itemGroup.getChildAt(2);
        this.tween(firstBox, step1, time1);
        this.tween(secondBox, step2, time2);
        this.tween(thirdBox, step3, time3);
    };
    SlotMachine.prototype.tween = function (item, step, duration) {
        var _this = this;
        if (duration === void 0) { duration = 500; }
        var initY = item.y;
        var addY = -(this.itemHeight + this.gap) * step;
        var totalY = initY + addY;
        var maxY = -(this.itemHeight + this.gap) * (this.awardsTotal.length - 1) + this.gap;
        if (totalY < maxY) {
            var oneStepTime = duration / step;
            var step1 = (maxY - initY) / -(this.itemHeight + this.gap);
            var step2_1 = step - step1;
            var time1 = step1 * oneStepTime;
            var time2_1 = duration - time1;
            var t = egret.Tween.get(item);
            t.to({ y: maxY }, time1)
                .call(function () {
                item.y = 10;
                _this.tween(item, step2_1, time2_1);
            });
        }
        else if (totalY > maxY) {
            egret.Tween.get(item)
                .to({ y: totalY }, duration)
                .call(function () {
                _this.tweenFlag += 1;
                if (_this.tweenFlag === 3) {
                    setTimeout(function () { _this.addClickState(); }, 500);
                }
            });
        }
        else if (totalY == maxY) {
            egret.Tween.get(item)
                .to({ y: totalY }, duration)
                .call(function () {
                item.y = 10;
                _this.tweenFlag += 1;
                if (_this.tweenFlag === 3) {
                    setTimeout(function () { _this.addClickState(); }, 500);
                }
            });
        }
    };
    SlotMachine.prototype.addClickState = function () {
        this.btn_start.filters = [FilterFactory.createGlodFilter()];
        this.isAnimating = false;
    };
    SlotMachine.prototype.removeClickState = function () {
        this.btn_start.filters = [FilterFactory.createShadowFilter()];
        this.isAnimating = true;
    };
    SlotMachine.uuType = UUType.SLOT_MACHINE;
    return SlotMachine;
}(eui.Group));
__reflect(SlotMachine.prototype, "SlotMachine", ["IUUBase"]);
