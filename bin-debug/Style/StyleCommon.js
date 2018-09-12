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
var StyleCommon = (function (_super) {
    __extends(StyleCommon, _super);
    function StyleCommon(config, props) {
        var _this = _super.call(this, config, props) || this;
        var styleType = config.styleType;
        _this.styleType = styleType;
        _this.styleTypeConfig = StyleTypeConfig[styleType];
        _this.skinName = _this.styleTypeConfig.skinName;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    StyleCommon.prototype.onAddToStage = function () {
        this.initEvent();
    };
    StyleCommon.prototype.initEvent = function () {
        this.form_component.addEventListener(this.styleTypeConfig.eventName, this.event, this);
    };
    StyleCommon.prototype.event = function (evt) {
        var value;
        switch (this.styleType) {
            case LabelStyleType.StyleInput:
                value = evt.target.text;
                break;
            case LabelStyleType.StyleToggleSwitch:
                value = evt.target.selected;
                break;
            case LabelStyleType.StyleHSlider:
                value = evt.target.value;
                break;
        }
        ;
        console.log('value = ' + value);
        this.updateValue(value);
    };
    return StyleCommon;
}(StyleBase));
__reflect(StyleCommon.prototype, "StyleCommon");
