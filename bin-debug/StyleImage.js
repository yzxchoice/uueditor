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
var StyleImage = (function (_super) {
    __extends(StyleImage, _super);
    function StyleImage(config, props) {
        var _this = _super.call(this, config, props) || this;
        _this.skinName = 'resource/skins/StyleImageSkin.exml';
        return _this;
    }
    StyleImage.prototype.initEvent = function () {
        this.btn_image.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    StyleImage.prototype.onClick = function () {
        var _this = this;
        var g = this.siderbar.parent;
        g.openImagePanel(function (url) {
            _this.updateValue(url);
        }, true);
    };
    return StyleImage;
}(StyleBase));
__reflect(StyleImage.prototype, "StyleImage");
