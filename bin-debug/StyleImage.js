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
var StyleImage = (function (_super) {
    __extends(StyleImage, _super);
    function StyleImage(config, props) {
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
        _this.skinName = 'resource/skins/StyleImageSkin.exml';
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    StyleImage.prototype.onAddToStage = function () {
        this.initEvent();
    };
    StyleImage.prototype.initEvent = function () {
        this.btn_image.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    StyleImage.prototype.onClick = function () {
        var _this = this;
        var g = this.siderbar.parent;
        g.openImagePanel(function (url) {
            console.log(url);
            var props = _this.image.getProps();
            props[_this.inputType] = url;
            _this.image.setProps(props);
            _this.image.redraw();
        }, true);
    };
    return StyleImage;
}(eui.Component));
__reflect(StyleImage.prototype, "StyleImage");
