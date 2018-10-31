var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 全局状态管理
 */
var GlobalState = (function () {
    function GlobalState() {
        this.showState = 2; // 显示状态 编辑：1/预览： 2
    }
    GlobalState.getInstance = function () {
        if (!this.instance) {
            this.instance = new this();
        }
        return this.instance;
    };
    GlobalState.prototype.getShowState = function () {
        return this.showState;
    };
    GlobalState.prototype.changeShowStateToEdit = function () {
        this.showState = 1;
    };
    GlobalState.prototype.changeShowStateToPreview = function () {
        this.showState = 2;
    };
    GlobalState.instance = null;
    return GlobalState;
}());
__reflect(GlobalState.prototype, "GlobalState");
