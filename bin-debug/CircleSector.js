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
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    CircleSector.prototype.onAddToStage = function (event) {
        this.drawSector();
    };
    CircleSector.prototype.drawSector = function () {
        var shape = new egret.Shape();
        this.addChild(shape);
        var awards = [
            '大保健', '话费10元', '话费20元', '话费30元', '保时捷911', '土豪金项链', 'iphone 20', '火星7日游'
        ];
        var arc = 360 / awards.length;
        var lastAngle = 0;
        var r = 200;
        var fillStyle = 0xffffff;
        var strokeStyle = 0x007eff;
        var lineWidth = 2;
        for (var i = 0; i < awards.length; i++) {
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
            // g.rotation = 30 * i;//lastAngle * 2 * Math.PI / 360 + arc * 2 * Math.PI / 360 + Math.PI / 2;
            g.rotation = (lastAngle * Math.PI / 180 + arc * Math.PI / 180 / 2 + Math.PI / 2) * 180 / Math.PI;
            var s = new egret.Shape();
            s.graphics.beginFill(0x000000, 0);
            s.graphics.lineStyle(1, 0xf2f2f2);
            s.graphics.drawRect(0, 0, g.width, g.height);
            s.graphics.endFill();
            g.addChild(s);
            var label = new eui.Label(awards[i]);
            label.textColor = 0xE5302F;
            label.size = 18;
            // label.horizontalCenter = 0;
            // label.top = 5;
            // label.width = g.width - 30;
            label.x = -label.width / 2;
            label.y = 10;
            g.addChild(label);
            // var img: egret.Bitmap = new egret.Bitmap();
            // var texture:egret.Texture = RES.getRes(Math.round(5)*);
            // img.texture = texture;
            this.addChild(g);
        }
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
//# sourceMappingURL=CircleSector.js.map