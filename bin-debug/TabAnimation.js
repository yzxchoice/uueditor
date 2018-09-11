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
var TabAnimation = (function (_super) {
    __extends(TabAnimation, _super);
    function TabAnimation() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddedToStage, _this);
        return _this;
    }
    TabAnimation.prototype.dispose = function () {
    };
    TabAnimation.prototype.draw = function (container) {
        this.container = container;
        this.editGroup = container.editGroup;
    };
    TabAnimation.prototype.onAddedToStage = function () {
        this.init();
    };
    TabAnimation.prototype.init = function () {
        /// 创建容器，在其中进行布局
        this._grpLayout = new eui.Group();
        this._grpLayout.horizontalCenter = 0;
        this._grpLayout.verticalCenter = 0;
        this.addChild(this._grpLayout);
        this._grpLayout.width = this.width;
        this._grpLayout.height = this.height;
        var tLayout = new eui.TileLayout();
        tLayout.paddingTop = 30;
        tLayout.paddingLeft = 30;
        tLayout.paddingRight = 30;
        tLayout.paddingBottom = 30;
        this._grpLayout.layout = tLayout;
        var btnAddCircle = new eui.Button();
        btnAddCircle.width = 100;
        btnAddCircle.height = 40;
        btnAddCircle.label = "圆形";
        btnAddCircle.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddCircle, this);
        this._grpLayout.addChild(btnAddCircle);
        var btnAddCurve = new eui.Button();
        btnAddCurve.width = 100;
        btnAddCurve.height = 40;
        btnAddCurve.label = "曲线";
        btnAddCurve.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddCurve, this);
        this._grpLayout.addChild(btnAddCurve);
    };
    TabAnimation.prototype.onAddCircle = function () {
        this.editGroup.addAnimate(animType.circle);
        this.editGroup.uutween.setTool(this.editGroup.tool, this.editGroup.tweenControl);
        this.editGroup.tweenControl.setTarget(this.editGroup.tool.target.owner.image);
    };
    TabAnimation.prototype.onAddCurve = function () {
        this.editGroup.addAnimate(animType.curve);
        this.editGroup.uutween.setTool(this.editGroup.tool, this.editGroup.tweenControl);
        this.editGroup.tweenControl.setTarget(this.editGroup.tool.target.owner.image);
    };
    return TabAnimation;
}(eui.Component));
__reflect(TabAnimation.prototype, "TabAnimation", ["IUUContainer"]);
//# sourceMappingURL=TabAnimation.js.map