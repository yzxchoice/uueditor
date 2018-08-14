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
    };
    return TabAnimation;
}(eui.Component));
__reflect(TabAnimation.prototype, "TabAnimation", ["IUUContainer"]);
//# sourceMappingURL=TabAnimation.js.map