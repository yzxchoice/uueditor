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
        return _this;
    }
    StyleBase.prototype.updateValue = function (value) {
        this.stateObj.content = value;
        this.props[this.inputType] = value;
        var props = this.image.getProps();
        props[this.inputType] = value;
        this.image.setProps(props);
        this.image.redraw();
    };
    return StyleBase;
}(eui.Component));
__reflect(StyleBase.prototype, "StyleBase");
