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
var PageBox = (function (_super) {
    __extends(PageBox, _super);
    function PageBox() {
        var _this = _super.call(this) || this;
        _this.pages = [];
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddedToStage, _this);
        return _this;
    }
    PageBox.prototype.dispose = function () {
    };
    PageBox.prototype.draw = function (container) {
        this.container = container;
        this.container.addChild(this);
    };
    PageBox.prototype.onAddedToStage = function () {
        this.getPages();
        this.init();
        this.render(0);
    };
    PageBox.prototype.init = function () {
        var vLayout = new eui.VerticalLayout();
        vLayout.paddingTop = 0;
        vLayout.gap = 0;
        this.layout = vLayout;
        this.stage.addEventListener(PageEvent.PAGE_ADD, this.pageAdd, this);
    };
    PageBox.prototype.getPages = function () {
        // console.log(RES.getRes("data_json"));
        this.pages = RES.getRes("data_json").list;
    };
    PageBox.prototype.render = function (index) {
        var i = 0;
        var elements = this.pages;
        var n = elements.length;
        for (i = 0; i < n; i++) {
            var g = new PageItem(i);
            g.width = 500;
            g.height = 100;
            if (i == index) {
                g.selected = true;
            }
            else {
                g.selected = false;
            }
            g.draw(this);
        }
    };
    PageBox.prototype.redraw = function (index) {
        this.removeChildren();
        if (typeof (index) == 'undefined') {
            index = this.pages.length - 1;
            var e = new PageEvent(PageEvent.PAGE_CHANGE, true);
            e.data = {
                pageIndex: index
            };
            this.dispatchEvent(e);
        }
        this.render(index);
    };
    PageBox.prototype.pageAdd = function (event) {
        this.redraw();
    };
    return PageBox;
}(eui.Group));
__reflect(PageBox.prototype, "PageBox", ["IUUContainer"]);
//# sourceMappingURL=PageBox.js.map