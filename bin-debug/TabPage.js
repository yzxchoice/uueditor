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
var TabPage = (function (_super) {
    __extends(TabPage, _super);
    function TabPage() {
        var _this = _super.call(this) || this;
        _this.pages = [];
        _this.currentIndex = 0;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddedToStage, _this);
        return _this;
    }
    TabPage.prototype.dispose = function () {
    };
    TabPage.prototype.draw = function (container) {
        this.container = container;
        this.container.addChild(this);
    };
    TabPage.prototype.onAddedToStage = function () {
        this.getPages();
        this.init();
        this.removeChildren();
        this.render(this.currentIndex);
    };
    TabPage.prototype.init = function () {
        var vLayout = new eui.VerticalLayout();
        vLayout.paddingTop = 0;
        vLayout.gap = 0;
        this.layout = vLayout;
        this.stage.addEventListener(PageEvent.PAGE_ADD, this.pageAdd, this);
    };
    TabPage.prototype.getPages = function () {
        // console.log(RES.getRes("data_json"));
        this.pages = RES.getRes("data_json").list;
    };
    TabPage.prototype.render = function (index) {
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
    TabPage.prototype.redraw = function (index) {
        this.removeChildren();
        if (typeof (index) == 'undefined') {
            index = this.pages.length - 1;
            var e = new PageEvent(PageEvent.PAGE_CHANGE, true);
            e.data = {
                pageIndex: index
            };
            this.dispatchEvent(e);
        }
        this.currentIndex = index;
        this.render(this.currentIndex);
    };
    TabPage.prototype.pageAdd = function (event) {
        this.redraw();
    };
    return TabPage;
}(eui.Group));
__reflect(TabPage.prototype, "TabPage", ["IUUContainer"]);
//# sourceMappingURL=TabPage.js.map