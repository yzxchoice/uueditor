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
var StyleInput = (function (_super) {
    __extends(StyleInput, _super);
    function StyleInput(config, props) {
        var _this = _super.call(this, config, props) || this;
        _this.skinName = 'resource/skins/StyleInputSkin.exml';
        return _this;
    }
    StyleInput.prototype.initEvent = function () {
        this.textInput_input.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onFocusOut, this);
    };
    StyleInput.prototype.onFocusOut = function (evt) {
        var value = evt.target.text;
        this.updateValue(value);
    };
    return StyleInput;
}(StyleBase));
__reflect(StyleInput.prototype, "StyleInput");
//# sourceMappingURL=StyleInput.js.map