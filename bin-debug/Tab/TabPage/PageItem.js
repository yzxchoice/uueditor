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
var PageItem = (function (_super) {
    __extends(PageItem, _super);
    function PageItem(pageIndex) {
        var _this = _super.call(this) || this;
        _this.pageIndex = 0;
        _this.selected = false;
        _this.pageIndex = pageIndex;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddedToStage, _this);
        return _this;
    }
    PageItem.prototype.dispose = function () {
    };
    PageItem.prototype.draw = function (container) {
        this.container = container;
        this.container.addChild(this);
    };
    PageItem.prototype.undraw = function (container) {
        this.container.removeChild(this);
    };
    PageItem.prototype.onAddedToStage = function () {
        this.init();
        this.initEvent();
    };
    PageItem.prototype.init = function () {
        var hLayout = new eui.HorizontalLayout();
        hLayout.paddingLeft = 30;
        hLayout.verticalAlign = "middle";
        hLayout.gap = 30;
        this.layout = hLayout;
        var bg = new egret.Shape;
        bg.graphics.lineStyle(1, 0x999999);
        bg.graphics.beginFill(0xffffff, 1);
        if (this.selected) {
            bg.graphics.beginFill(0xf2f2f2, 1);
        }
        bg.graphics.drawRect(0, 0, this.width, this.height);
        bg.graphics.endFill();
        this.addChild(bg);
        var gc = new eui.Group();
        gc.width = 50;
        gc.height = 50;
        gc.verticalCenter = 0;
        this.addChild(gc);
        var circle = new egret.Shape;
        // circle.graphics.lineStyle(1,0x999999);
        circle.graphics.beginFill(0x1593ff, 1);
        circle.graphics.drawCircle(25, 25, 25);
        // circle.graphics.drawRect(0, 0, 50, 50);
        circle.graphics.endFill();
        gc.addChild(circle);
        var label = new eui.Label();
        label.text = String(this.pageIndex + 1);
        label.textColor = 0xffffff;
        label.size = 28;
        label.lineSpacing = 12;
        label.textAlign = egret.HorizontalAlign.JUSTIFY;
        label.horizontalCenter = 0;
        label.verticalCenter = 0;
        gc.addChild(label);
        var label1 = new eui.Label();
        label1.text = "\u7B2C" + (this.pageIndex + 1) + "\u9875";
        label1.textColor = 0x000000;
        label1.size = 28;
        label1.lineSpacing = 12;
        label1.textAlign = egret.HorizontalAlign.JUSTIFY;
        this.addChild(label1);
    };
    PageItem.prototype.initEvent = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changePage, this);
    };
    PageItem.prototype.changePage = function (event) {
        var e = new PageEvent(PageEvent.PAGE_CHANGE, true);
        e.data = {
            pageIndex: this.pageIndex
        };
        this.dispatchEvent(e);
        this.container.redraw(this.pageIndex);
    };
    return PageItem;
}(eui.Group));
__reflect(PageItem.prototype, "PageItem", ["IUUContainer"]);
