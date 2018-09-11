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
var StyleHSlider = (function (_super) {
    __extends(StyleHSlider, _super);
    function StyleHSlider(config, props) {
        var _this = _super.call(this, config, props) || this;
        _this.skinName = 'resource/skins/StyleHSliderSkin.exml';
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    StyleHSlider.prototype.onAddToStage = function () {
        this.initEvent();
    };
    StyleHSlider.prototype.initEvent = function () {
        this.sd_hSlider.addEventListener(eui.UIEvent.CHANGE, this.changeHandler, this);
    };
    StyleHSlider.prototype.changeHandler = function (evt) {
        var value = evt.target.value;
        console.log('value = ' + value);
        this.updateValue(value);
    };
    return StyleHSlider;
}(StyleBase));
__reflect(StyleHSlider.prototype, "StyleHSlider");
