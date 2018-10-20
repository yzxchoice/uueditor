var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LayoutBaseFactory = (function () {
    function LayoutBaseFactory() {
    }
    LayoutBaseFactory.main = function (group, itemArr, layoutType, gapType, columnCount) {
        switch (layoutType) {
            case LayoutType.HLayout:
                this.createHLayout(group, itemArr, gapType);
        }
    };
    LayoutBaseFactory.createHLayout = function (group, itemArr, gapType) {
        var gap = this.getGap(gapType);
        for (var i = 0, len = itemArr.length; i < len; i++) {
            var item = itemArr[i];
            item.x = this.padding + (item.width + gap) * i;
            item.y = this.padding;
            group.addChild(item);
        }
    };
    LayoutBaseFactory.createVLayout = function (group, itemArr, gapType) {
        var gap = this.getGap(gapType);
        for (var i = 0, len = itemArr.length; i < len; i++) {
            var item = itemArr[i];
            item.x = this.padding;
            item.y = 10;
            group.addChild(item);
        }
    };
    LayoutBaseFactory.createTLayout = function (group, gapType, columnCount) {
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
    LayoutBaseFactory.getGap = function (gap) {
        switch (gap) {
            case GapType.Small:
                return 10;
            case GapType.Middle:
                return 20;
            case GapType.Big:
                return 30;
        }
    };
    LayoutBaseFactory.setGroupSize = function (itemNum, itemWidth, itemHeight, layoutType, gap, columnCount) {
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
    LayoutBaseFactory.padding = 10;
    return LayoutBaseFactory;
}());
__reflect(LayoutBaseFactory.prototype, "LayoutBaseFactory");
