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
var Slideshow = (function (_super) {
    __extends(Slideshow, _super);
    function Slideshow(props) {
        var _this = _super.call(this) || this;
        _this.layerName = '轮播图';
        _this.fontStyle = {
            textColor: 0x000000,
            size: 50,
        };
        _this.leftArrowUrl = 'preload_json#preload_r11_c8';
        _this.rightArrowUrl = 'preload_json#preload_r11_c5';
        // other
        _this.width = 1100;
        _this.height = 900;
        _this.itemWidth = 800; // item的宽度
        _this.itemHeight = 560;
        _this.imgPercentWidth = 80; // 框内图片的百分比宽度
        _this.imgPercentHeight = 80;
        _this.arrowWidth = 60;
        _this.arrowHeight = 70;
        _this.duration = 500;
        _this.delayed = 100;
        _this.isAnimating = false;
        _this._activeIndex = 0;
        _this.forEachProps(props, _this);
        _this.createUI();
        _this.touchEnabled = false;
        _this.arrow_left.visible = false;
        return _this;
    }
    Object.defineProperty(Slideshow.prototype, "activeIndex", {
        get: function () {
            return this._activeIndex;
        },
        set: function (v) {
            this._activeIndex = v;
            this.arrow_left.visible = true;
            this.arrow_right.visible = true;
            if (v == 0) {
                this.arrow_left.visible = false;
            }
            if (v == this.awards.length - 1) {
                this.arrow_right.visible = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Slideshow.prototype.forEachProps = function (props, target) {
        for (var key in props) {
            if ((typeof props[key] == 'object') && !(props[key] instanceof Array)) {
                this.forEachProps(props[key], target[key]);
            }
            target[key] = props[key];
        }
    };
    Slideshow.prototype.createUI = function () {
        this.addChild(this.createMianBox());
        this.addChild(this.createLeftArrow());
        this.addChild(this.createRightArrow());
    };
    // 创建核心容器
    Slideshow.prototype.createMianBox = function () {
        var group = UIFactory.createGroup(this.itemWidth, this.itemHeight);
        for (var i = 0, len = this.awards.length; i < len; i++) {
            var resource = this.awards[i];
            var item = this.createitem(resource);
            group.addChild(item);
        }
        group.verticalCenter = 0;
        group.horizontalCenter = 0;
        this.imgBox = group;
        return group;
    };
    // 创建项Item(框、图、文字)
    Slideshow.prototype.createitem = function (resource) {
        var group = UIFactory.createGroup(this.itemWidth, this.itemHeight);
        // 框
        var bd = new eui.Image(this.bdUrl);
        bd.width = group.width;
        bd.height = group.height;
        group.addChild(bd);
        // 图
        var img = new eui.Image(resource.url);
        img.percentWidth = this.imgPercentWidth;
        img.percentHeight = this.imgPercentHeight;
        img.verticalCenter = 0;
        img.horizontalCenter = 0;
        group.addChild(img);
        // 文字
        var label = new UULabel(this.fontStyle);
        label.text = resource.text;
        label.bottom = 50;
        label.horizontalCenter = 0;
        group.addChild(label);
        return group;
    };
    // 创建左边箭头
    Slideshow.prototype.createLeftArrow = function () {
        var arrow_left = UIFactory.createGroup(this.arrowWidth, this.arrowHeight);
        arrow_left.touchEnabled = true;
        arrow_left.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickLeft, this);
        var txtr = RES.getRes(this.leftArrowUrl);
        var img = new egret.Bitmap(txtr);
        img.width = arrow_left.width;
        img.height = arrow_left.height;
        arrow_left.addChild(img);
        arrow_left.verticalCenter = 0;
        arrow_left.left = 0;
        this.arrow_left = img;
        return arrow_left;
    };
    // 创建右边箭头
    Slideshow.prototype.createRightArrow = function () {
        var arrow_right = UIFactory.createGroup(this.arrowWidth, this.arrowHeight);
        arrow_right.touchEnabled = true;
        arrow_right.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickRight, this);
        var txtr = RES.getRes(this.rightArrowUrl);
        var img = new egret.Bitmap(txtr);
        img.width = arrow_right.width;
        img.height = arrow_right.height;
        arrow_right.addChild(img);
        arrow_right.verticalCenter = 0;
        arrow_right.right = 0;
        this.arrow_right = img;
        return arrow_right;
    };
    // 点击左箭头
    Slideshow.prototype.onclickLeft = function () {
        var _this = this;
        if (this.activeIndex <= 0)
            return;
        if (this.isAnimating)
            return;
        this.isAnimating = true;
        var image = this.imgBox.getChildAt(0);
        var tw = egret.Tween.get(image);
        this.activeIndex -= 1;
        tw.to({ x: image.width }, this.duration)
            .call(function () {
            _this.imgBox.setChildIndex(image, _this.imgBox.numChildren - 1);
            tw.to({ x: 0 }, _this.duration)
                .call(function () {
                setTimeout(function () {
                    _this.isAnimating = false;
                }, 10);
            });
        })
            .wait(this.delayed);
    };
    // 点击右箭头
    Slideshow.prototype.onclickRight = function () {
        var _this = this;
        if (this.activeIndex >= this.awards.length - 1)
            return;
        if (this.isAnimating)
            return;
        this.isAnimating = true;
        var image = this.imgBox.getChildAt(this.imgBox.numChildren - 1);
        var tw = egret.Tween.get(image);
        this.activeIndex += 1;
        tw.to({ x: image.width }, this.duration)
            .call(function () {
            _this.imgBox.setChildIndex(image, 0);
            tw.to({ x: 0 }, _this.duration)
                .call(function () {
                setTimeout(function () {
                    _this.isAnimating = false;
                }, 10);
            });
        })
            .wait(this.delayed);
    };
    Slideshow.uuType = UUType.SLIDESHOW;
    return Slideshow;
}(eui.Group));
__reflect(Slideshow.prototype, "Slideshow", ["IUUBase", "ISlideshow"]);
