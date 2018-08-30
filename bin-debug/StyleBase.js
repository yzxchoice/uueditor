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
var StyleBase = (function (_super) {
    __extends(StyleBase, _super);
    function StyleBase(config, props) {
        var _this = _super.call(this) || this;
        _this.siderbar = Siderbar.getInstance();
        _this.image = _this.siderbar.tool.target.owner.image;
        _this.config = config;
        _this.props = props;
        _this.inputType = config.type;
        _this.stateObj = {
            title: config.title,
            content: _this.image.getProps()[_this.inputType]
        };
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    StyleBase.prototype.onAddToStage = function () {
        this.initEvent();
    };
    StyleBase.prototype.initEvent = function () {
    };
    return StyleBase;
}(eui.Component));
__reflect(StyleBase.prototype, "StyleBase");
