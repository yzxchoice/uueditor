var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LayoutType;
(function (LayoutType) {
    LayoutType[LayoutType["HLayout"] = 1] = "HLayout";
    LayoutType[LayoutType["VLayout"] = 2] = "VLayout";
    LayoutType[LayoutType["TLayout"] = 3] = "TLayout";
})(LayoutType || (LayoutType = {}));
var GapType;
(function (GapType) {
    GapType[GapType["Small"] = 1] = "Small";
    GapType[GapType["Middle"] = 2] = "Middle";
    GapType[GapType["Big"] = 3] = "Big";
})(GapType || (GapType = {}));
var LayoutFactory = (function () {
    function LayoutFactory() {
    }
    LayoutFactory.main = function (layoutType, gapType, columnCount) {
        switch (layoutType) {
            case LayoutType.HLayout:
                return this.createHLayout(gapType);
            case LayoutType.VLayout:
                return this.createVLayout(gapType);
            case LayoutType.TLayout:
                return this.createTLayout(gapType, columnCount);
            default:
                return this.createHLayout(gapType);
        }
    };
    LayoutFactory.createHLayout = function (gapType) {
        var hLayout = new eui.HorizontalLayout();
        hLayout.gap = this.getGap(gapType);
        hLayout.paddingTop = this.padding;
        hLayout.paddingRight = this.padding;
        hLayout.paddingBottom = this.padding;
        hLayout.paddingLeft = this.padding;
        return hLayout;
    };
    LayoutFactory.createVLayout = function (gapType) {
        var vLayout = new eui.VerticalLayout();
        vLayout.gap = this.getGap(gapType);
        vLayout.paddingTop = this.padding;
        vLayout.paddingRight = this.padding;
        vLayout.paddingBottom = this.padding;
        vLayout.paddingLeft = this.padding;
        return vLayout;
    };
    LayoutFactory.createTLayout = function (gapType, columnCount) {
        var tLayout = new eui.TileLayout();
        tLayout.horizontalGap = this.getGap(gapType);
        tLayout.verticalGap = this.getGap(gapType);
        tLayout.requestedColumnCount = columnCount;
        tLayout.paddingTop = this.padding;
        tLayout.paddingRight = this.padding;
        tLayout.paddingBottom = this.padding;
        tLayout.paddingLeft = this.padding;
        return tLayout;
    };
    LayoutFactory.getGap = function (gap) {
        switch (gap) {
            case GapType.Small:
                return 10;
            case GapType.Middle:
                return 20;
            case GapType.Big:
                return 30;
        }
    };
    LayoutFactory.setGroupSize = function (itemNum, itemWidth, itemHeight, layoutType, gap, columnCount) {
        var width;
        var height;
        gap = this.getGap(gap);
        switch (layoutType) {
            case LayoutType.HLayout:
                width = this.padding * 2 + itemNum * itemWidth + (itemNum - 1) * gap;
                height = this.padding * 2 + itemHeight;
                break;
            case LayoutType.VLayout:
                width = this.padding * 2 + itemWidth;
                height = this.padding * 2 + itemNum * itemHeight + (itemNum - 1) * gap;
                break;
            case LayoutType.TLayout:
                width = this.padding * 2 + columnCount * itemWidth + (columnCount - 1) * gap;
                height = this.padding * 2 + Math.ceil(itemNum / columnCount) * itemHeight + Math.ceil(itemNum / columnCount - 1) * gap;
                break;
        }
        return {
            width: width,
            height: height,
        };
    };
    LayoutFactory.padding = 10;
    return LayoutFactory;
}());
__reflect(LayoutFactory.prototype, "LayoutFactory");
