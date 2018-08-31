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
var TabLayer = (function (_super) {
    __extends(TabLayer, _super);
    function TabLayer() {
        var _this = _super.call(this) || this;
        _this.layers = [];
        _this.elements = [];
        _this.pageIndex = 0;
        _this.layerIndex = 0;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddedToStage, _this);
        return _this;
    }
    TabLayer.prototype.dispose = function () {
    };
    TabLayer.prototype.draw = function (container) {
        this.container = container;
        this.editGroup = this.container.editGroup;
    };
    TabLayer.prototype.onAddedToStage = function () {
        this.getPages();
        this.init();
        this.removeChildren();
        this.render();
    };
    TabLayer.prototype.init = function () {
        var vLayout = new eui.VerticalLayout();
        vLayout.paddingTop = 0;
        vLayout.gap = 0;
        this.layout = vLayout;
        this.stage.addEventListener(PageEvent.LAYER_ADD, this.layerAdd, this);
        this.stage.addEventListener(PageEvent.PAGE_CHANGE, this.pageChange, this);
        this.stage.addEventListener(PageEvent.LAYER_CHANGE, this.layerChange, this);
    };
    TabLayer.prototype.delete = function (event) {
        this.editGroup.displayList[this.layerIndex].undraw(this.editGroup.displayGroup);
        this.editGroup.displayList.splice(this.layerIndex, 1);
        this.elements.splice(this.layerIndex, 1);
        this.removeChildren();
        this.render();
        this.editGroup.tool.setTarget(null);
        requestAnimationFrame(this.editGroup.render);
    };
    TabLayer.prototype.pageChange = function (event) {
        this.getPages();
        this.removeChildren();
        this.render();
    };
    TabLayer.prototype.getPages = function () {
        this.elements = RES.getRes("data_json").list[this.editGroup.pageIndex].elements;
    };
    TabLayer.prototype.render = function (layerIndex) {
        if (layerIndex === void 0) { layerIndex = 0; }
        var h = new eui.Group();
        h.width = 500;
        h.height = 80;
        this.addChild(h);
        var btnDel = new eui.Button();
        btnDel.width = 100;
        btnDel.height = 40;
        btnDel.label = "删除";
        btnDel.verticalCenter = 0;
        btnDel.horizontalCenter = 0;
        btnDel.addEventListener(Mouse.START, this.delete, this);
        h.addChild(btnDel);
        this.layers = [];
        var i = 0;
        var elements = this.elements;
        var n = elements.length;
        for (i = 0; i < n; i++) {
            var g = new LayerItem(i);
            g.width = 500;
            g.height = 100;
            if (i == layerIndex) {
                g.selected = true;
            }
            else {
                g.selected = false;
            }
            this.layers.push(g);
            g.draw(this);
        }
    };
    TabLayer.prototype.redraw = function (layerIndex) {
        if (layerIndex === void 0) { layerIndex = 0; }
        this.layerIndex = layerIndex;
        var i = 0;
        var n = this.layers.length;
        for (i = 0; i < n; i++) {
            if (i == layerIndex) {
                this.layers[i].selected = true;
            }
            else {
                this.layers[i].selected = false;
            }
            this.layers[i].redraw(this);
        }
    };
    TabLayer.prototype.layerAdd = function (event) {
        // var g: Game = this.parent as Game;
        // this.displayList = g.editGroup.displayList;
        var elements = this.elements;
        var item = new LayerItem(elements.length - 1);
        item.width = 500;
        item.height = 100;
        this.layers.push(item);
        item.draw(this);
        this.redraw(elements.length - 1);
        item.select(null);
    };
    TabLayer.prototype.layerChange = function (event) {
        this.redraw(event.data.layerIndex);
    };
    return TabLayer;
}(eui.Group));
__reflect(TabLayer.prototype, "TabLayer", ["IUUContainer"]);
//# sourceMappingURL=TabLayer.js.map