var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Drag = (function () {
    function Drag(target, stage) {
        var _this = this;
        this.onTouchBegin = function (evt) {
            _this.distanceX = evt.stageX - _this.target.x;
            _this.distanceY = evt.stageY - _this.target.y;
            _this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, _this.onTouchMove, _this);
        };
        this.onTouchEnd = function (evt) {
            _this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, _this.onTouchMove, _this);
        };
        this.onTouchMove = function (evt) {
            _this.target.x = evt.stageX - _this.distanceX;
            _this.target.y = evt.stageY - _this.distanceY;
        };
        this.target = target;
        this.stage = stage;
    }
    Drag.prototype.on = function () {
        this.target.touchEnabled = true;
        this.target.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.target.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    };
    Drag.prototype.off = function () {
        this.target.touchEnabled = false;
        this.target.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.target.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    };
    return Drag;
}());
__reflect(Drag.prototype, "Drag");
