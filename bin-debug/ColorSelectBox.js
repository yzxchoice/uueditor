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
var ColorSelectBox = (function (_super) {
    __extends(ColorSelectBox, _super);
    function ColorSelectBox() {
        var _this = _super.call(this) || this;
        _this.isShow = false;
        _this.colorPool = ["#000000", "#993300", "#333300", "#003300", "#003366", "#000080", "#333399", "#333333", "#800000", "#FF6600", "#808000", "#008000", "#008080", "#0000FF", "#666699", "#808080", "#FF0000", "#FF9900", "#99CC00", "#339966", "#33CCCC", "#3366FF", "#800080", "#999999", "#FF00FF", "#FFCC00", "#FFFF00", "#00FF00", "#00FFFF", "#00CCFF", "#993366", "#CCCCCC", "#FF99CC", "#FFCC99", "#FFFF99", "#CCFFCC", "#CCFFFF", "#99CCFF", "#CC99FF", "#FFFFFF"];
        _this.skinName = 'resource/skins/ColorSelectBoxSkin.exml';
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddedToStage, _this);
        return _this;
    }
    ColorSelectBox.prototype.onAddedToStage = function () {
        this.init();
    };
    ColorSelectBox.prototype.init = function () {
        this.gp_box.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        for (var i = 0, len = this.colorPool.length; i < len; i++) {
            var color = this.exchangeColor(this.colorPool[i]);
            var shape = this.createShape(color);
            var yu = i % 8;
            shape.x = 5 + (20 + 6) * yu;
            shape.y = 5 + (20 + 6) * Math.floor(i / 8);
            shape.touchEnabled = true;
            this.gp_box.addChild(shape);
        }
        ;
    };
    ColorSelectBox.prototype.onClick = function (evt) {
        var name = evt.target.name;
        if (!name)
            return;
        var exchange = Number(name).toString(16);
        var pre = '0x';
        var len = exchange.length;
        if (len == 2) {
            pre += '0000';
        }
        else if (len == 4) {
            pre += '00';
        }
        var newColor = pre + exchange;
        this.undraw();
        this.container.changeColor(newColor);
    };
    ColorSelectBox.prototype.createShape = function (color) {
        var shape = new egret.Shape();
        shape.graphics.beginFill(color);
        shape.graphics.drawRect(0, 0, 20, 20);
        shape.graphics.endFill();
        shape.name = color;
        return shape;
    };
    ColorSelectBox.prototype.exchangeColor = function (color) {
        return parseInt(color.replace('#', ''), 16);
    };
    ColorSelectBox.prototype.draw = function (container) {
        this.container = container;
        this.container.addChild(this);
        this.isShow = true;
    };
    ColorSelectBox.prototype.undraw = function () {
        this.container.removeChild(this);
        this.isShow = false;
    };
    return ColorSelectBox;
}(eui.Component));
__reflect(ColorSelectBox.prototype, "ColorSelectBox");
