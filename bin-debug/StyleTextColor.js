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
var StyleTextColor = (function (_super) {
    __extends(StyleTextColor, _super);
    function StyleTextColor(config, props) {
        var _this = _super.call(this) || this;
        _this.siderbar = Siderbar.getInstance();
        _this.image = _this.siderbar.tool.target.owner.image;
        _this.config = config;
        _this.props = props;
        _this.inputType = config.type;
        _this.stateObj = {
            title: config.title,
            // content: props[this.inputType],
            content: _this.image.getProps()[_this.inputType],
        };
        _this.skinName = 'resource/skins/StyleTextColorSkin.exml';
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    StyleTextColor.prototype.onAddToStage = function () {
        this.initEvent();
    };
    StyleTextColor.prototype.initEvent = function () {
        this.lb_selectColor.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    StyleTextColor.prototype.onClick = function () {
        if (!this.colorSelectBox || !this.colorSelectBox.isShow) {
            var colorSelectBox = new ColorSelectBox();
            colorSelectBox.draw(this.parent);
            colorSelectBox.x = 280;
            colorSelectBox.y = 100;
            this.colorSelectBox = colorSelectBox;
            this.colorSelectBox.listenColorChange(this.changeColor.bind(this));
        }
        else {
            this.colorSelectBox.undraw();
        }
    };
    StyleTextColor.prototype.changeColor = function (color) {
        console.log('color = ' + color);
        this.stateObj.content = color;
        this.props[this.inputType] = color;
        var props = this.image.getProps();
        props[this.inputType] = color;
        this.image.setProps(props);
        this.image.redraw();
    };
    return StyleTextColor;
}(eui.Component));
__reflect(StyleTextColor.prototype, "StyleTextColor");
