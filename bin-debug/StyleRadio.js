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
var StyleRadio = (function (_super) {
    __extends(StyleRadio, _super);
    function StyleRadio(config, props) {
        var _this = _super.call(this, config, props) || this;
        _this.skinName = 'resource/skins/StyleRadioSkin.exml';
        _this.radioData = config.radioData;
        return _this;
    }
    StyleRadio.prototype.initEvent = function () {
        this.createRadioGroup();
    };
    StyleRadio.prototype.createRadioGroup = function () {
        var radioGroup = new eui.RadioButtonGroup();
        radioGroup.addEventListener(eui.UIEvent.CHANGE, this.radioChangeHandler, this);
        for (var _i = 0, _a = this.radioData; _i < _a.length; _i++) {
            var item = _a[_i];
            var label = item.label, value = item.value, isSelected = item.isSelected;
            var radio = this.createRadio(label, value, isSelected);
            radio.group = radioGroup;
            this.gp_radioGroup.addChild(radio);
        }
        return radioGroup;
    };
    StyleRadio.prototype.createRadio = function (label, value, isSelected) {
        if (isSelected === void 0) { isSelected = false; }
        var rdb = new eui.RadioButton();
        rdb.label = label;
        rdb.value = value;
        rdb.selected = isSelected;
        return rdb;
    };
    StyleRadio.prototype.radioChangeHandler = function (evt) {
        var radioGroup = evt.target;
        console.log(radioGroup.selectedValue);
        var value = radioGroup.selectedValue;
        var label = this.radioData.filter(function (item) { return item.value === value; })[0].label;
        console.log('value = ' + value);
        console.log('label = ' + label);
        this.updateValue(value);
        // this.updateValue(label);
    };
    return StyleRadio;
}(StyleBase));
__reflect(StyleRadio.prototype, "StyleRadio");
