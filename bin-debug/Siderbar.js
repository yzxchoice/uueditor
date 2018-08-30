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
var Siderbar = (function (_super) {
    __extends(Siderbar, _super);
    function Siderbar() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/SiderbarSkin.exml";
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStageInit, _this);
        return _this;
    }
    Siderbar.prototype.dispose = function () {
    };
    Siderbar.prototype.draw = function (container) {
        this.container = container;
        this.editGroup = this.container.editGroup;
        this.tool = this.editGroup.tool;
        this.container.addChild(this);
    };
    Siderbar.getInstance = function () {
        if (Siderbar._instance == null) {
            Siderbar._instance = new Siderbar();
        }
        ;
        return Siderbar._instance;
    };
    Siderbar.prototype.selectTarget = function () {
        this.component_style.setTarget();
        this.component_event.getTargetItemId();
        var editGroup = this.editGroup;
        this.component_event.triggerGroup = editGroup.pages[editGroup.pageIndex].properties.triggerGroup;
    };
    Siderbar.prototype.moveTarget = function () {
        this.component_style.updateTarget();
    };
    Siderbar.prototype.upTarget = function () {
        this.component_style.updateTarget();
    };
    Siderbar.prototype.renderOneDisplay = function () {
        this.editGroup.renderOneDisplay();
    };
    Siderbar.prototype.updateDisplay = function (display) {
        this.editGroup.updateDisplay(display);
    };
    Siderbar.prototype.onAddToStageInit = function (event) {
        this.init();
    };
    Siderbar.prototype.init = function () {
        this.listenEvent();
        this.component_style.draw(this);
        this.component_animation.draw(this);
        this.component_event.draw(this);
        this.component_layer.draw(this);
        this.currentState = 'style';
    };
    Siderbar.prototype.listenEvent = function () {
        this.gp_tabs.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTabsClick, this);
    };
    Siderbar.prototype.touchTabsClick = function (evt) {
        this.scl_eventContainer.viewport.scrollV = 0;
        this.currentState = evt.target.parent.name;
    };
    Siderbar._instance = null;
    return Siderbar;
}(eui.Component));
__reflect(Siderbar.prototype, "Siderbar", ["IUUContainer"]);
