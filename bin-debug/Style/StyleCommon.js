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
        this.initComponent();
    };
    StyleCommon.prototype.initEvent = function () {
        if (!this.styleTypeConfig.eventName)
            return;
        this.form_component.addEventListener(this.styleTypeConfig.eventName, this.event, this);
    };
    StyleCommon.prototype.initComponent = function () {
        switch (this.styleType) {
            case LabelStyleType.StyleSelect:
                this.initSelect();
                break;
        }
        ;
    };
    StyleCommon.prototype.event = function (evt) {
        var _this = this;
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
            case LabelStyleType.StyleImage:
                var g = this.siderbar.parent;
                g.openImagePanel(function (url) {
                    _this.updateValue(url);
                }, true);
                return;
            case LabelStyleType.StyleColor:
                this.StyleColorEvent();
                return;
        }
        ;
        console.log('value = ' + value);
        this.updateValue(value);
    };
    StyleCommon.prototype.StyleColorEvent = function () {
        if (!this.colorSelectBox || !this.colorSelectBox.isShow) {
            var colorSelectBox = new ColorSelectBox();
            colorSelectBox.draw(this.parent);
            colorSelectBox.x = 280;
            colorSelectBox.y = 100;
            this.colorSelectBox = colorSelectBox;
            this.colorSelectBox.listenColorChange(this.updateValue.bind(this));
        }
        else {
            this.colorSelectBox.undraw();
        }
    };
    StyleCommon.prototype.initSelect = function () {
        var select = new Select(this.config.selectData);
        this.form_component.addChild(select);
        select.setDataContainer(this);
        select.setDefaultItem(this.props[this.inputType]);
        select.listenSelectChange(this.updateValue.bind(this));
    };
    return StyleCommon;
}(StyleBase));
__reflect(StyleCommon.prototype, "StyleCommon");
