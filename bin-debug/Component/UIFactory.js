var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * UI工厂类
 */
var UIFactory = (function () {
    function UIFactory() {
    }
    UIFactory.createGroup = function (width, height) {
        var group = new eui.Group;
        if (width) {
            group.width = width;
        }
        if (height) {
            group.height = height;
        }
        return group;
    };
    UIFactory.createLabel = function (text, textColor, size) {
        if (textColor === void 0) { textColor = 0x000000; }
        var label = new eui.Label();
        label.text = text;
        label.textColor = textColor;
        if (size) {
            label.size = size;
        }
        return label;
    };
    UIFactory.createImage = function (url, width, height) {
        var image = new eui.Image();
        image.source = url;
        if (width) {
            image.width = width;
        }
        if (height) {
            image.height = height;
        }
        return image;
    };
    UIFactory.createHLayout = function (gap, horizontalAlign, verticalAlign) {
        if (gap === void 0) { gap = 10; }
        if (horizontalAlign === void 0) { horizontalAlign = egret.HorizontalAlign.LEFT; }
        if (verticalAlign === void 0) { verticalAlign = egret.VerticalAlign.TOP; }
        var hLayout = new eui.HorizontalLayout();
        hLayout.gap = gap;
        hLayout.horizontalAlign = horizontalAlign;
        hLayout.verticalAlign = verticalAlign;
        return hLayout;
    };
    UIFactory.createVLayout = function (gap, horizontalAlign, verticalAlign) {
        if (gap === void 0) { gap = 10; }
        if (horizontalAlign === void 0) { horizontalAlign = egret.HorizontalAlign.LEFT; }
        if (verticalAlign === void 0) { verticalAlign = egret.VerticalAlign.TOP; }
        var vLayout = new eui.VerticalLayout();
        vLayout.gap = gap;
        vLayout.horizontalAlign = horizontalAlign;
        vLayout.verticalAlign = verticalAlign;
        return vLayout;
    };
    UIFactory.createTLayout = function (CCount, hGap, vGap) {
        if (CCount === void 0) { CCount = 1; }
        if (hGap === void 0) { hGap = 10; }
        if (vGap === void 0) { vGap = 10; }
        var tLayout = new eui.TileLayout();
        tLayout.requestedColumnCount = CCount;
        tLayout.horizontalGap = hGap;
        tLayout.verticalGap = vGap;
        return tLayout;
    };
    UIFactory.createLayoutByNum = function (changeRowNum, realRowNum, defaultLayout) {
        if (defaultLayout === void 0) { defaultLayout = 'h'; }
        var layout;
        if (realRowNum <= changeRowNum) {
            if (defaultLayout === 'h') {
                layout = this.createHLayout();
            }
            else {
                layout = this.createVLayout();
            }
        }
        else {
            layout = this.createTLayout(changeRowNum);
        }
        return layout;
    };
    return UIFactory;
}());
__reflect(UIFactory.prototype, "UIFactory");
