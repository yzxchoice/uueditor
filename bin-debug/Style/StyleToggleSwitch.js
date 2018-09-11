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
var StyleToggleSwitch = (function (_super) {
    __extends(StyleToggleSwitch, _super);
    function StyleToggleSwitch(config, props) {
        var _this = _super.call(this, config, props) || this;
        _this.skinName = 'resource/skins/StyleToggleSwitchSkin.exml';
        return _this;
    }
    StyleToggleSwitch.prototype.initEvent = function () {
        this.btn_toggleSwitch.addEventListener(eui.UIEvent.CHANGE, this.changeHandler, this);
    };
    StyleToggleSwitch.prototype.changeHandler = function (evt) {
        var selected = evt.target.selected;
        console.log('selected = ' + selected);
        this.updateValue(selected);
    };
    return StyleToggleSwitch;
}(StyleBase));
__reflect(StyleToggleSwitch.prototype, "StyleToggleSwitch");
