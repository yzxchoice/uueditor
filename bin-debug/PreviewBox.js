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
var PreviewBox = (function (_super) {
    __extends(PreviewBox, _super);
    function PreviewBox() {
        return _super.call(this) || this;
    }
    PreviewBox.prototype.dispose = function () {
    };
    PreviewBox.prototype.draw = function (container) {
        this.container = container;
        this.container.addChild(this);
        this.width = 1920;
        this.height = 1080;
        var bg = new egret.Shape;
        bg.graphics.beginFill(0xcccccc, 1);
        bg.graphics.drawRect(0, 0, 1920, 1080);
        bg.graphics.endFill();
        this.addChild(bg);
        var p = new Preview();
        p.width = 1200;
        p.height = 900;
        p.horizontalCenter = 0;
        this.addChild(p);
        var button3 = new eui.Button();
        button3.y = 0;
        button3.right = 0;
        button3.width = 100;
        button3.height = 40;
        button3.label = "关闭";
        button3.addEventListener(Mouse.START, this.close, this);
        this.addChild(button3);
    };
    PreviewBox.prototype.close = function (event) {
        this.parent.removeChild(this);
    };
    return PreviewBox;
}(eui.Group));
__reflect(PreviewBox.prototype, "PreviewBox", ["IUUContainer"]);
//# sourceMappingURL=PreviewBox.js.map