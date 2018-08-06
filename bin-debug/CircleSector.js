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
var CircleSector = (function (_super) {
    __extends(CircleSector, _super);
    function CircleSector() {
        var _this = _super.call(this) || this;
        _this.awards = [
            '大保健', '话费10元', '话费20元', '话费30元', '保时捷911', '土豪金项链'
        ];
        _this.container = new eui.Group();
        _this.touchEnabled = false;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
        return _this;
    }
    CircleSector.prototype.onAddToStage = function (event) {
        this.init();
        this.drawSector();
    };
    CircleSector.prototype.onRemoveFromStage = function (event) {
        this.dispose();
    };
    CircleSector.prototype.init = function () {
        this.container.anchorOffsetX = 200;
        this.container.anchorOffsetY = 200;
        this.container.x = 200;
        this.container.y = 200;
        var s = new egret.Shape();
        // s.graphics.beginFill(0x000000, 0.5);
        // s.graphics.lineStyle(1, 0xf2f2f2);
        // s.graphics.drawRect(0, 0, 456, 444);
        // s.graphics.endFill();
        this.container.touchEnabled = false;
        this.container.addChild(s);
        this.addChild(this.container);
    };
    CircleSector.prototype.drawSector = function () {
        var shape = new egret.Shape();
        shape.touchEnabled = true;
        this.container.addChild(shape);
        var arc = 360 / this.awards.length;
        var lastAngle = 0;
        var r = 200;
        var fillStyle = 0xffffff;
        var strokeStyle = 0x007eff;
        var lineWidth = 2;
        for (var i = 0; i < this.awards.length; i++) {
            if (i % 2 === 0)
                fillStyle = 0xFFFFFF;
            else
                fillStyle = 0xFD5757;
            lastAngle = i * arc;
            this.drawArc(shape, r, r, r, arc, lastAngle, fillStyle);
            var g = new eui.Group();
            g.width = 2 * r * Math.sin(arc * 2 * Math.PI / 360 / 2);
            g.height = r;
            g.x = 200 + Math.cos(lastAngle * Math.PI / 180 + arc * Math.PI / 180 / 2) * 200;
            g.y = 200 + Math.sin(lastAngle * Math.PI / 180 + arc * Math.PI / 180 / 2) * 200;
            g.touchEnabled = false;
            g.rotation = (lastAngle * Math.PI / 180 + arc * Math.PI / 180 / 2 + Math.PI / 2) * 180 / Math.PI;
            // var s: egret.Shape = new egret.Shape();
            // s.graphics.beginFill(0x000000, 0);
            // s.graphics.lineStyle(1, 0xf2f2f2);
            // s.graphics.drawRect(0, 0, g.width, g.height);
            // s.graphics.endFill();
            // g.addChild(s);
            var label = new eui.Label(this.awards[i]);
            label.textColor = 0xE5302F;
            label.size = 18;
            // label.horizontalCenter = 50;
            label.x = -label.width / 2;
            label.y = 10;
            g.addChild(label);
            var img = new egret.Bitmap();
            var texture = RES.getRes((i % 5 + 1) + "_png");
            img.texture = texture;
            img.x = -img.width / 2;
            img.y = label.height + 20;
            g.addChild(img);
            this.container.addChild(g);
        }
        var jt = new eui.Image();
        var texture = RES.getRes("jt2_png");
        jt.texture = texture;
        jt.horizontalCenter = 0;
        jt.verticalCenter = 0;
        jt.addEventListener(Mouse.START, this.down, this);
        this.addChild(jt);
    };
    CircleSector.prototype.down = function (event) {
        var item = this.rnd(1, this.awards.length);
        this.rotateFn(item, this.awards[item - 1]);
    };
    CircleSector.prototype.rnd = function (n, m) {
        var random = Math.floor(Math.random() * (m - n + 1) + n);
        return random;
    };
    CircleSector.prototype.rotateFn = function (item, txt) {
        var angles = item * (360 / this.awards.length) - (360 / (this.awards.length * 2));
        if (angles < 270) {
            angles = 270 - angles;
        }
        else {
            angles = 360 - angles + 270;
        }
        egret.Tween.pauseTweens(this.container);
        egret.Tween.get(this.container).to({ rotation: angles + 1800 }, 8000, egret.Ease.sineOut)
            .call(this.onComplete, this, [txt]); //设置回调函数及作用域，可用于侦听动画完成;
    };
    CircleSector.prototype.dispose = function () {
        egret.Tween.pauseTweens(this.container);
        // egret.Tween.removeTweens(this.container);
    };
    CircleSector.prototype.onComplete = function (param1) {
        alert(param1);
    };
    CircleSector.prototype.drawArc = function (mc, x, y, r, angle, startFrom, color) {
        if (x === void 0) { x = 200; }
        if (y === void 0) { y = 200; }
        if (r === void 0) { r = 100; }
        if (angle === void 0) { angle = 27; }
        if (startFrom === void 0) { startFrom = 270; }
        if (color === void 0) { color = 0xff0000; }
        mc.graphics.beginFill(color, 50);
        mc.graphics.lineStyle(0, color);
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
    return CircleSector;
}(eui.Group));
__reflect(CircleSector.prototype, "CircleSector");
