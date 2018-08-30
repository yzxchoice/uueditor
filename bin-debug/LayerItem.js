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
var LayerItem = (function (_super) {
    __extends(LayerItem, _super);
    function LayerItem(layerIndex) {
        var _this = _super.call(this) || this;
        _this.layerIndex = 0;
        _this.selected = false;
        _this.bg = new egret.Shape;
        _this.layerIndex = layerIndex;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddedToStage, _this);
        return _this;
    }
    LayerItem.prototype.dispose = function () {
    };
    LayerItem.prototype.draw = function (container) {
        this.container = container;
        this.container.addChild(this);
    };
    LayerItem.prototype.undraw = function (container) {
        this.container.removeChild(this);
    };
    LayerItem.prototype.onAddedToStage = function () {
        this.init();
        this.initEvent();
    };
    LayerItem.prototype.init = function () {
        var hLayout = new eui.HorizontalLayout();
        hLayout.paddingLeft = 30;
        hLayout.verticalAlign = "middle";
        hLayout.gap = 30;
        this.layout = hLayout;
        // var bg:egret.Shape = new egret.Shape;
        this.bg.graphics.lineStyle(1, 0x999999);
        this.bg.graphics.beginFill(0xffffff, 1);
        if (this.selected) {
            this.bg.graphics.beginFill(0xf2f2f2, 1);
        }
        this.bg.graphics.drawRect(0, 0, this.width, this.height);
        this.bg.graphics.endFill();
        this.addChild(this.bg);
        var gc = new eui.Group();
        gc.width = 50;
        gc.height = 50;
        gc.verticalCenter = 0;
        this.addChild(gc);
        // var circle:egret.Shape = new egret.Shape;
        // // circle.graphics.lineStyle(1,0x999999);
        // circle.graphics.beginFill(0x1593ff,1);
        // circle.graphics.drawCircle(25, 25, 25);
        // // circle.graphics.drawRect(0, 0, 50, 50);
        // circle.graphics.endFill();
        // gc.addChild(circle);
        // var label: eui.Label = new eui.Label();
        // label.text = String(this.layerIndex+1);
        // label.textColor = 0xffffff;
        // label.size = 28;
        // label.lineSpacing = 12;
        // label.textAlign = egret.HorizontalAlign.JUSTIFY;
        // label.horizontalCenter = 0;
        // label.verticalCenter = 0 ;
        // gc.addChild(label);
        var label1 = new eui.Label();
        label1.text = "\u56FE\u5C42" + (this.layerIndex + 1); // ${this.container.editGroup.displayList[this.layerIndex].image.layerName}`;
        label1.textColor = 0x000000;
        label1.size = 28;
        label1.lineSpacing = 12;
        label1.textAlign = egret.HorizontalAlign.JUSTIFY;
        this.addChild(label1);
    };
    LayerItem.prototype.initEvent = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.select, this);
    };
    LayerItem.prototype.select = function (event) {
        if (!this.container.editGroup.displayList[this.layerIndex].b)
            return;
        var e = new PageEvent(PageEvent.LAYER_SELECT, true);
        e.data = {
            t: this.container.editGroup.displayList[this.layerIndex]
        };
        this.dispatchEvent(e);
        this.container.redraw(this.layerIndex);
    };
    LayerItem.prototype.redraw = function () {
        this.bg.graphics.clear();
        this.bg.graphics.lineStyle(1, 0x999999);
        this.bg.graphics.beginFill(0xffffff, 1);
        if (this.selected) {
            this.bg.graphics.beginFill(0xf2f2f2, 1);
        }
        this.bg.graphics.drawRect(0, 0, this.width, this.height);
        this.bg.graphics.endFill();
    };
    return LayerItem;
}(eui.Group));
__reflect(LayerItem.prototype, "LayerItem", ["IUUContainer"]);
