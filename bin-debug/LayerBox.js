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
var LayerBox = (function (_super) {
    __extends(LayerBox, _super);
    function LayerBox() {
        var _this = _super.call(this) || this;
        _this.layers = [];
        _this.displayList = [];
        _this.pageIndex = 0;
        _this.layerIndex = 0;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddedToStage, _this);
        return _this;
    }
    LayerBox.prototype.dispose = function () {
    };
    LayerBox.prototype.draw = function (container) {
        this.container = container;
        this.container.addChild(this);
    };
    LayerBox.prototype.onAddedToStage = function () {
        this.getPages();
        this.init();
        this.removeChildren();
        this.render();
    };
    LayerBox.prototype.init = function () {
        var vLayout = new eui.VerticalLayout();
        vLayout.paddingTop = 0;
        vLayout.gap = 0;
        this.layout = vLayout;
        this.stage.addEventListener(PageEvent.LAYER_ADD, this.layerAdd, this);
        this.stage.addEventListener(PageEvent.PAGE_CHANGE, this.pageChange, this);
    };
    LayerBox.prototype.pageChange = function (event) {
        this.removeChildren();
        this.render();
    };
    LayerBox.prototype.getPages = function () {
        var g = this.parent;
        this.displayList = g.editGroup.displayList;
    };
    LayerBox.prototype.render = function (layerIndex) {
        if (layerIndex === void 0) { layerIndex = 0; }
        var i = 0;
        var elements = this.displayList;
        var n = elements.length;
        for (i = 0; i < n; i++) {
            var g = new LayerItem(i, elements[i]);
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
    LayerBox.prototype.redraw = function (layerIndex) {
        if (layerIndex === void 0) { layerIndex = 0; }
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
    LayerBox.prototype.layerAdd = function (event) {
        // var g: Game = this.parent as Game;
        // this.displayList = g.editGroup.displayList;
        var elements = this.displayList;
        var item = new LayerItem(elements.length - 1, elements[elements.length - 1]);
        item.width = 500;
        item.height = 100;
        this.layers.push(item);
        item.draw(this);
        this.redraw(elements.length - 1);
        item.select(null);
    };
    return LayerBox;
}(eui.Group));
__reflect(LayerBox.prototype, "LayerBox", ["IUUContainer"]);
//# sourceMappingURL=LayerBox.js.map