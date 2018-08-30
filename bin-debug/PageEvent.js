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
// TypeScript file
var PageEvent = (function (_super) {
    __extends(PageEvent, _super);
    function PageEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        return _super.call(this, type, bubbles, cancelable) || this;
    }
    /**
     * 页面切换
     */
    PageEvent.PAGE_CHANGE = "pageChange";
    /**
     * 增加页面
     */
    PageEvent.PAGE_ADD = "pageAdd";
    /**
     * 增加图层
     */
    PageEvent.LAYER_ADD = "layerAdd";
    /**
     * 图层切换
     */
    PageEvent.LAYER_CHANGE = "layerChange";
    /**
     * 选择图层
     */
    PageEvent.LAYER_SELECT = "layerSelect";
    /**
     * 改变音效
     */
    PageEvent.SOUND_CHANGE = "soundChange";
    return PageEvent;
}(egret.Event));
__reflect(PageEvent.prototype, "PageEvent");
