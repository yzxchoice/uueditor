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
var StyleSelect = (function (_super) {
    __extends(StyleSelect, _super);
    function StyleSelect(config, props) {
        var _this = _super.call(this, config, props) || this;
        _this.selectData = config.selectData;
        _this.skinName = 'resource/skins/StyleSelect.exml';
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    StyleSelect.prototype.onAddToStage = function () {
        this.initEvent();
    };
    StyleSelect.prototype.initEvent = function () {
        var select = new Select(this.selectData);
        this.gp_style_fontFamily_select.addChild(select);
        select.setDataContainer(this);
        select.setDefaultItem(this.props[this.inputType]);
        select.listenSelectChange(this.getFontFamily.bind(this));
    };
    StyleSelect.prototype.getFontFamily = function (v) {
        this.updateValue(v);
    };
    return StyleSelect;
}(StyleBase));
__reflect(StyleSelect.prototype, "StyleSelect");
