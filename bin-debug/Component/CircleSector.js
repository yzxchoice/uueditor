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
        _this.main = new eui.Group(); // 核心区域 用于旋转 包含皮肤和mainItemGroup
        _this.isAnimating = false; // 动画是否正在进行
        _this.itemIndex = 4; // 箭头指向的item 索引
        _this.width = 600;
        _this.height = 600;
        _this.forEachProps(props, _this);
        _this.init();
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
        this.main.touchEnabled = false;
        // 皮肤
        var skin = this.createSkin();
        skin.width = this.width;
        skin.height = this.height;
        // mainitemGroup
        var mainItemGroup = this.createMainItemGroup();
        // this.main.addChild(skin);
        this.main.addChild(mainItemGroup);
        this.main.rotation = 45;
        // 箭头
        var arrow = this.createArrow();
        this.addChild(this.main);
        this.addChild(arrow);
    };
    CircleSector.prototype.adjuctInitRotate = function (mian) {
        var itemLength = this.awards.length;
        var rotation = 0;
        switch (itemLength) {
            case 3:
                rotation = 0;
                break;
            case 4:
                rotation = 45;
                break;
            case 5:
                rotation = 0;
                break;
            case 6:
                rotation = 0;
                break;
        }
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
    CircleSector.prototype.createMainItemGroup = function () {
        var mainItemGroup = UIFactory.createGroup(this.width, this.height);
        var shape = new egret.Shape();
        shape.touchEnabled = true;
        this.main.addChild(shape);
        var arc = 360 / this.awards.length;
        var lastAngle = 0;
        var r = this.width / 2;
        for (var i = 0; i < this.awards.length; i++) {
            lastAngle = i * arc;
            this.drawArc(shape, r, r, r, arc, lastAngle);
            var g = new eui.Group();
            g.width = 2 * r * Math.sin(arc * 2 * Math.PI / 360 / 2);
            g.height = r;
            g.x = r + Math.cos(lastAngle * Math.PI / 180 + arc * Math.PI / 180 / 2) * r;
            g.y = r + Math.sin(lastAngle * Math.PI / 180 + arc * Math.PI / 180 / 2) * r;
            g.touchEnabled = false;
            g.rotation = (lastAngle * Math.PI / 180 + arc * Math.PI / 180 / 2 + Math.PI / 2) * 180 / Math.PI;
            // 文字
            var label = new eui.Label(i.toString());
            label.textColor = 0xE5302F;
            label.size = 30;
            g.addChild(label);
            // 小图片
            var smallImg = new eui.Image(this.awards[i].url);
            smallImg.width = 120;
            smallImg.height = 120;
            smallImg.x = -smallImg.width / 2;
            smallImg.y = smallImg.height / 2;
            g.addChild(smallImg);
            // 大图片
            var bigImg = new eui.Image(this.awards[i].url);
            bigImg.width = 240;
            bigImg.height = 240;
            bigImg.x = -bigImg.width / 2;
            bigImg.verticalCenter = 0;
            bigImg.visible = false;
            g.addChild(bigImg);
            mainItemGroup.addChild(g);
        }
        this.mainItemGroup = mainItemGroup;
        return mainItemGroup;
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
        this.reset();
        var random = this.rnd();
        this.rotateFn(random);
    };
    // 生成随机数
    CircleSector.prototype.rnd = function () {
        return this.awards.length * 3 + Math.floor(Math.random() * this.awards.length);
    };
    // 旋转的动画效果
    CircleSector.prototype.rotateFn = function (random) {
        var _this = this;
        var a = this.itemIndex - (random % this.awards.length);
        this.itemIndex = a >= 0 ? a : (this.awards.length + a);
        var angles = random * (360 / this.awards.length) + (this.main.rotation % 360);
        egret.Tween.pauseTweens(this.main);
        var t = egret.Tween.get(this.main);
        t
            .to({ rotation: angles }, 8000, egret.Ease.sineOut)
            .call(function () {
            _this.isAnimating = false;
            var item = _this.mainItemGroup.getChildAt(_this.itemIndex);
            item.getChildAt(item.numChildren - 1).visible = true;
            item.getChildAt(item.numChildren - 2).visible = false;
        });
    };
    // 还原：每次点击都需要隐藏大图片，显示小图片
    CircleSector.prototype.reset = function () {
        for (var i = 0, len = this.mainItemGroup.numChildren; i < len; i++) {
            var item = this.mainItemGroup.getChildAt(i);
            item.getChildAt(item.numChildren - 1).visible = false;
            item.getChildAt(item.numChildren - 2).visible = true;
        }
    };
    /**
     * 画弧形方法
     */
    CircleSector.prototype.drawArc = function (mc, x, y, r, angle, startFrom, color) {
        if (x === void 0) { x = 200; }
        if (y === void 0) { y = 200; }
        if (r === void 0) { r = 100; }
        if (angle === void 0) { angle = 27; }
        if (startFrom === void 0) { startFrom = 270; }
        if (color === void 0) { color = 0xff0000; }
        mc.graphics.beginFill(color, 0);
        mc.graphics.lineStyle(1, color);
        mc.graphics.moveTo(x, y);
        angle = (Math.abs(angle) > 360) ? 360 : angle;
        var n = Math.ceil(Math.abs(angle) / 45);
        var angleA = angle / n;
        angleA = angleA * Math.PI / 180;
        startFrom = startFrom * Math.PI / 180;
        mc.graphics.lineTo(x + r * Math.cos(startFrom), y + r * Math.sin(startFrom));
        for (var i = 1; i <= n; i++) {
            startFrom += angleA;
            var angleMid = startFrom - angleA / 2;
            var bx = x + r / Math.cos(angleA / 2) * Math.cos(angleMid);
            var by = y + r / Math.cos(angleA / 2) * Math.sin(angleMid);
            var cx = x + r * Math.cos(startFrom);
            var cy = y + r * Math.sin(startFrom);
            mc.graphics.curveTo(bx, by, cx, cy);
        }
        if (angle != 360) {
            mc.graphics.lineTo(x, y);
        }
        mc.graphics.endFill();
    };
    CircleSector.uuType = UUType.CIRCLE_SECTOR;
    return CircleSector;
}(eui.Group));
__reflect(CircleSector.prototype, "CircleSector", ["IUUBase"]);
