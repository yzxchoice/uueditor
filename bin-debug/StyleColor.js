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
var StyleColor = (function (_super) {
    __extends(StyleColor, _super);
    function StyleColor(config, props) {
        var _this = _super.call(this, config, props) || this;
        _this.skinName = 'resource/skins/StyleTextColorSkin.exml';
        return _this;
    }
    StyleColor.prototype.initEvent = function () {
        this.lb_selectColor.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    StyleColor.prototype.onClick = function () {
        if (!this.colorSelectBox || !this.colorSelectBox.isShow) {
            var colorSelectBox = new ColorSelectBox();
            colorSelectBox.draw(this.parent);
            colorSelectBox.x = 280;
            colorSelectBox.y = 100;
            this.colorSelectBox = colorSelectBox;
            this.colorSelectBox.listenColorChange(this.changeColor.bind(this));
        }
        else {
            this.colorSelectBox.undraw();
        }
    };
    StyleColor.prototype.changeColor = function (color) {
        this.updateValue(color);
    };
    return StyleColor;
}(StyleBase));
__reflect(StyleColor.prototype, "StyleColor");
//# sourceMappingURL=StyleColor.js.map