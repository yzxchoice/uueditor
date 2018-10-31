var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 布局工厂，使用绝对定位方式
 */
var LayoutBaseFactory = (function () {
    function LayoutBaseFactory() {
    }
    LayoutBaseFactory.main = function (group, itemArr, layoutType, gapType, columnCount) {
        switch (layoutType) {
            case LayoutType.HLayout:
                this.createHLayout(group, itemArr, gapType);
                break;
            case LayoutType.VLayout:
                this.createVLayout(group, itemArr, gapType);
                break;
            case LayoutType.TLayout:
                this.createTLayout(group, itemArr, gapType, columnCount);
                break;
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
            item.y = this.padding + (item.height + gap) * i;
            group.addChild(item);
        }
    };
    LayoutBaseFactory.createTLayout = function (group, itemArr, gapType, columnCount) {
        var gap = this.getGap(gapType);
        for (var i = 0, len = itemArr.length; i < len; i++) {
            var item = itemArr[i];
            item.x = this.padding + (i % columnCount) * (item.width + gap);
            item.y = this.padding + Math.floor(i / columnCount) * (item.width + gap);
            group.addChild(item);
        }
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
    LayoutBaseFactory.padding = 10;
    return LayoutBaseFactory;
}());
__reflect(LayoutBaseFactory.prototype, "LayoutBaseFactory");
