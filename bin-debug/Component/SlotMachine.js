// TypeScript file
/**
 * 老虎机组件
 * 1、通常只需要改变awards、bdUrl
 * 2、当需要修改皮肤时，需要改变所有选项
 * 3、只支持3列
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
var SlotMachine = (function (_super) {
    __extends(SlotMachine, _super);
    function SlotMachine(props) {
        var _this = _super.call(this) || this;
        _this.layerName = '老虎机';
        // props中用到的参数
        _this.bdUrl = 'resource/assets/pic/draw_card_bg.png';
        _this.skinUrl = 'resource/assets/Pic/components/slots_bg.png';
        _this.skinSize = {
            width: 856,
            height: 388,
        };
        _this.startBtnUrl = 'preload_json#preload_r2_c12';
        _this.startBtnMessage = {
            x: 0,
            y: 0,
            width: 120,
            height: 56,
        };
        _this.coreAraeMessage = {
            x: 368,
            y: 322,
            width: 790,
            height: 270,
        };
        // 每项Item的间隔
        _this.gap = 10;
        // 每项Item的位置、尺寸信息
        _this.itemWidth = 250;
        _this.itemHeight = 250;
        // 图片的尺寸
        _this.imgPercentWidth = 80;
        _this.imgPercentHeight = 80;
        _this.tweenFlag = 3; // 动画标记	
        _this.isAnimating = false;
        _this.awardsTotal = [];
        _this._awards = [];
        _this.forEachProps(props, _this);
        _this.init();
        _this.touchEnabled = false;
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
    SlotMachine.prototype.forEachProps = function (props, target) {
        for (var key in props) {
            if ((typeof props[key] == 'object') && !(props[key] instanceof Array)) {
                this.forEachProps(props[key], target[key]);
            }
            target[key] = props[key];
        }
    };
    SlotMachine.prototype.init = function () {
        this.getItemSize();
        var mainBox = this.createGroupBox();
        this.width = mainBox.width;
        this.height = mainBox.height;
        this.addChild(mainBox);
    };
    // 获取每项Item的尺寸
    SlotMachine.prototype.getItemSize = function () {
        this.itemWidth = (this.coreAraeMessage.width - 4 * this.gap) / 3;
        this.itemHeight = this.coreAraeMessage.height - 2 * this.gap;
    };
    // 创建UI
    SlotMachine.prototype.createGroupBox = function () {
        // 组件容器
        var group = UIFactory.createGroup(this.skinSize.width, this.skinSize.height);
        // 皮肤
        var skin = this.createSkin();
        group.addChild(skin);
        // 核心容器
        var mainBox = this.createMainBox();
        group.addChild(mainBox);
        // start 按钮
        var btn = this.createStartBtn();
        group.addChild(btn);
        return group;
    };
    // 创建皮肤
    SlotMachine.prototype.createSkin = function () {
        var img = new eui.Image();
        img.source = this.skinUrl;
        img.width = this.skinSize.width;
        img.height = this.skinSize.height;
        return img;
    };
    // 创建核心容器
    SlotMachine.prototype.createMainBox = function () {
        var itemGroup = new eui.Group();
        itemGroup.width = this.coreAraeMessage.width;
        itemGroup.height = this.coreAraeMessage.height;
        this.itemGroup = itemGroup;
        itemGroup.mask = new egret.Rectangle(0, 0, this.coreAraeMessage.width, this.coreAraeMessage.height);
        // 生成3项竖向轮播图容器
        for (var i = 0, len = 3; i < len; i++) {
            var itemBox = this.createItemBox();
            itemBox.x = (this.gap + this.itemWidth) * i + this.gap;
            itemBox.y = this.gap;
            itemGroup.addChild(itemBox);
        }
        ;
        itemGroup.x = this.coreAraeMessage.x;
        itemGroup.y = this.coreAraeMessage.y;
        return itemGroup;
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
    // 创建每一项（图片框 + 图片）
    SlotMachine.prototype.createItem = function (url) {
        var group = new eui.Group();
        group.width = this.itemWidth;
        group.height = this.itemHeight;
        var bg = this.createBd(this.bdUrl);
        var img = this.createImg(url);
        group.addChild(bg);
        group.addChild(img);
        return group;
    };
    // 创建框
    SlotMachine.prototype.createBd = function (url) {
        var img = new eui.Image(url);
        img.percentWidth = 100;
        img.percentHeight = 100;
        return img;
    };
    // 创建图片
    SlotMachine.prototype.createImg = function (url) {
        var img = new eui.Image(url);
        img.percentWidth = this.imgPercentWidth;
        img.percentHeight = this.imgPercentHeight;
        img.verticalCenter = 0;
        img.horizontalCenter = 0;
        return img;
    };
    // 创建start按钮
    SlotMachine.prototype.createStartBtn = function () {
        var txtr = RES.getRes('preload_json#preload_r2_c12');
        var img = new egret.Bitmap(txtr);
        img.width = this.startBtnMessage.width;
        img.height = this.startBtnMessage.height;
        img.touchEnabled = true;
        img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        var group = UIFactory.createGroup(img.width, img.height);
        this.btn_start = group;
        group.addChild(img);
        group.x = this.startBtnMessage.x;
        group.y = this.startBtnMessage.y;
        this.addClickState();
        return group;
    };
    // 点击start的处理程序
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
    // 动画效果
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
    // 为start按钮添加可点击状态
    SlotMachine.prototype.addClickState = function () {
        this.btn_start.filters = [FilterFactory.createGlodFilter()];
        this.isAnimating = false;
    };
    // 移除start按钮可点击状态
    SlotMachine.prototype.removeClickState = function () {
        this.btn_start.filters = [FilterFactory.createShadowFilter()];
        this.isAnimating = true;
    };
    SlotMachine.uuType = UUType.SLOT_MACHINE;
    return SlotMachine;
}(eui.Group));
__reflect(SlotMachine.prototype, "SlotMachine", ["IUUBase", "ISlotMachine"]);
