

class LayoutFactory {
    private static padding: number = 10;

    static main(layoutType: LayoutType, gapType: GapType, columnCount?: number): eui.BasicLayout {
        switch(layoutType) {
            case LayoutType.HLayout:
                return this.createHLayout(gapType);
            case LayoutType.VLayout:
                return this.createVLayout(gapType);
            case LayoutType.TLayout:
                return this.createTLayout(gapType, columnCount);
            default:
                return this.createHLayout(gapType);
        }
    }

    private static createHLayout(gapType: GapType): eui.HorizontalLayout {
        let hLayout = new eui.HorizontalLayout();
        hLayout.gap = this.getGap(gapType);
        hLayout.paddingTop = this.padding;
        hLayout.paddingRight = this.padding;
        hLayout.paddingBottom = this.padding;
        hLayout.paddingLeft = this.padding;
        return hLayout;
    }

    private static createVLayout(gapType: GapType): eui.VerticalLayout {
        let vLayout = new eui.VerticalLayout();
        vLayout.gap = this.getGap(gapType);
        vLayout.paddingTop = this.padding;
        vLayout.paddingRight = this.padding;
        vLayout.paddingBottom = this.padding;
        vLayout.paddingLeft = this.padding;
        return vLayout;
    }

    private static createTLayout(gapType: GapType, columnCount: number): eui.TileLayout {
        let tLayout = new eui.TileLayout();
        tLayout.horizontalGap = this.getGap(gapType);
        tLayout.verticalGap = this.getGap(gapType);
        tLayout.requestedColumnCount = columnCount;
        tLayout.paddingTop = this.padding;
        tLayout.paddingRight = this.padding;
        tLayout.paddingBottom = this.padding;
        tLayout.paddingLeft = this.padding;
        return tLayout;
    }

    static getGap(gap: GapType): number {
        switch(gap) {
            case GapType.Small:
                return 10;
            case GapType.Middle:
                return 20;
            case GapType.Big:
                return 30;
        }
    }

    static setGroupSize(itemNum: number, itemWidth: number, itemHeight: number, layoutType: LayoutType, gap: GapType, columnCount?: number) {
        let width: number;
        let height: number;
        gap = this.getGap(gap);
        switch(layoutType) {
            case LayoutType.HLayout:
                width = this.padding * 2 + itemNum * itemWidth + (itemNum - 1) * gap;
                height = this.padding *2 + itemHeight;
                break;
            case LayoutType.VLayout:
                width =  this.padding * 2 + itemWidth;
                height = this.padding * 2 + itemNum * itemHeight + (itemNum - 1) * gap;
                break;
            case LayoutType.TLayout:
                width = this.padding * 2 + columnCount * itemWidth + (columnCount - 1) * gap;
                height = this.padding * 2 + Math.ceil(itemNum / columnCount) * itemHeight + Math.ceil(itemNum / columnCount - 1) * gap;
                break;
        }
        return {
            width,
            height,
        }
    }
}