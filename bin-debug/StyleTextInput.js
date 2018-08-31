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
var StyleTextInput = (function (_super) {
    __extends(StyleTextInput, _super);
    function StyleTextInput(config, props) {
        var _this = _super.call(this) || this;
        _this.config = config;
        _this.props = props;
        _this.inputType = config.type;
        _this.stateObj = {
            title: config.title,
            content: props[_this.inputType]
        };
        _this.skinName = 'resource/skins/StyleInputSkin.exml';
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    StyleTextInput.prototype.onAddToStage = function () {
        this.initEvent();
    };
    StyleTextInput.prototype.initEvent = function () {
        this.textInput_input.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onFocusOut, this);
        this.textInput_input.addEventListener(egret.FocusEvent.FOCUS_IN, this.onFocusIn, this);
    };
    StyleTextInput.prototype.onFocusIn = function (evt) {
        console.log('onFocusIn...');
    };
    StyleTextInput.prototype.onFocusOut = function (evt) {
        console.log('onFocusOut...');
        var value = evt.target.text;
        console.log('value = ' + value);
        this.props[this.inputType] = value;
    };
    return StyleTextInput;
}(eui.Component));
__reflect(StyleTextInput.prototype, "StyleTextInput");
//# sourceMappingURL=StyleTextInput.js.map