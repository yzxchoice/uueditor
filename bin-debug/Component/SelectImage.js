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
var SelectImage = (function (_super) {
    __extends(SelectImage, _super);
    function SelectImage(props) {
        var _this = _super.call(this) || this;
        // props
        _this.award = [];
        _this.radioBorderColor = '0x000000';
        _this.radioCenterColor = '0x000000';
        _this.award = props.award;
        if (props.radioBorderColor) {
            _this.radioBorderColor = props.radioBorderColor;
        }
        if (props.radioCenterColor) {
            _this.radioCenterColor = props.radioCenterColor;
        }
        _this.touchEnabled = false;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
        return _this;
    }
    SelectImage.prototype.onAddToStage = function (event) {
        this.init();
    };
    SelectImage.prototype.onRemoveFromStage = function (event) {
    };
    SelectImage.prototype.init = function () {
        this.addChild(this.createMian());
    };
    SelectImage.prototype.createMian = function () {
        var group = UIFactory.createGroup(720, 360);
        group.layout = this.createLayout();
        for (var i = 0, len = this.award.length; i < len; i++) {
            group.addChild(this.createItem(this.award[i].url));
        }
        return group;
    };
    SelectImage.prototype.createItem = function (imgUrl) {
        var group = UIFactory.createGroup(150, 220);
        group.layout = UIFactory.createVLayout(10, egret.VerticalAlign.JUSTIFY);
        var img = UIFactory.createImage(imgUrl, 150, 150);
        group.addChild(img);
        group.addChild(this.createRadio());
        return group;
    };
    SelectImage.prototype.createRadio = function () {
        var group = UIFactory.createGroup(50, 50);
        var border = new egret.Shape();
        border.graphics.lineStyle(2, Number(this.radioBorderColor));
        border.graphics.beginFill(0xff0000, 0);
        border.graphics.drawCircle(0, 0, 50);
        border.graphics.endFill();
        var center = new egret.Shape();
        center.graphics.beginFill(Number(this.radioCenterColor));
        border.graphics.drawCircle(0, 0, 40);
        border.graphics.endFill();
        group.addChild(border);
        group.addChild(center);
        return group;
    };
    SelectImage.prototype.createLayout = function () {
        var layout;
        layout = UIFactory.createLayoutByNum(3, this.award.length);
        return layout;
    };
    SelectImage.uuType = UUType.SELECT_IMAGE;
    return SelectImage;
}(eui.Group));
__reflect(SelectImage.prototype, "SelectImage");
