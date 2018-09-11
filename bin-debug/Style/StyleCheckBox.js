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
var StyleCheckBox = (function (_super) {
    __extends(StyleCheckBox, _super);
    function StyleCheckBox(config, props) {
        var _this = _super.call(this, config, props) || this;
        _this.checkBoxData = config.checkBoxData;
        _this.skinName = 'resource/skins/StyleRadioSkin.exml';
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    StyleCheckBox.prototype.onAddToStage = function () {
        this.initEvent();
    };
    StyleCheckBox.prototype.initEvent = function () {
        this.createRadioGroup();
    };
    StyleCheckBox.prototype.createRadioGroup = function () {
        for (var _i = 0, _a = this.checkBoxData; _i < _a.length; _i++) {
            var item = _a[_i];
            var label = item.label, isSelected = item.isSelected;
            var checkBox = this.createCheckBox(label, isSelected);
            this.gp_radioGroup.addChild(checkBox);
        }
    };
    StyleCheckBox.prototype.createCheckBox = function (label, isSelected) {
        if (isSelected === void 0) { isSelected = false; }
        var cbx = new eui.CheckBox();
        cbx.label = label;
        cbx.selected = isSelected;
        cbx.addEventListener(eui.UIEvent.CHANGE, this.checkBoxChangeHandler, this);
        return cbx;
    };
    StyleCheckBox.prototype.checkBoxChangeHandler = function (evt) {
        var target = evt.target;
        var label = target.label;
        var selected = target.selected;
        var item = this.checkBoxData.filter(function (item) { return item.label === label; })[0];
        item.isSelected = selected;
        console.log(this.checkBoxData);
        this.updateValue(this.checkBoxData);
    };
    return StyleCheckBox;
}(StyleBase));
__reflect(StyleCheckBox.prototype, "StyleCheckBox");
