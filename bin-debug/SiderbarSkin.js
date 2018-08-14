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
var SiderbarSkinBy = (function (_super) {
    __extends(SiderbarSkinBy, _super);
    function SiderbarSkinBy() {
        var _this = _super.call(this) || this;
        _this.pagebox = new PageBox();
        _this.skinName = "resource/skins/SiderbarSkin.exml";
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStageInit, _this);
        return _this;
    }
    SiderbarSkinBy.prototype.dispose = function () {
    };
    SiderbarSkinBy.prototype.draw = function (container) {
        this.container = container;
        this.editGroup = this.container.editGroup;
        this.container.addChild(this);
    };
    SiderbarSkinBy.getInstance = function () {
        if (SiderbarSkinBy._instance == null) {
            SiderbarSkinBy._instance = new SiderbarSkinBy();
        }
        ;
        return SiderbarSkinBy._instance;
    };
    ;
    SiderbarSkinBy.prototype.onAddToStageInit = function (event) {
        this.init();
    };
    SiderbarSkinBy.prototype.init = function () {
        this.listenEvent();
        this.component_style.draw(this);
        this.component_animation.draw(this);
        this.component_event.draw(this);
        this.pagebox.draw(this);
        this.currentState = 'style';
    };
    SiderbarSkinBy.prototype.listenEvent = function () {
        this.gp_tabs.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTabsClick, this);
    };
    SiderbarSkinBy.prototype.touchTabsClick = function (evt) {
        this.currentState = evt.target.parent.name;
    };
    SiderbarSkinBy._instance = null;
    return SiderbarSkinBy;
}(eui.Component));
__reflect(SiderbarSkinBy.prototype, "SiderbarSkinBy", ["IUUContainer"]);
//# sourceMappingURL=SiderbarSkin.js.map