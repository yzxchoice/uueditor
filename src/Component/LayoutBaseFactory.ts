
class LayoutBaseFactory {
    private static padding: number = 10;

    static main(group: eui.Group, itemArr: UUImage[], layoutType: LayoutType, gapType: GapType, columnCount?: number): void {
        switch(layoutType) {
            case LayoutType.HLayout:
                this.createHLayout(group, itemArr, gapType);
            // case LayoutType.VLayout:
            //     this.createVLayout(group, itemArr, gapType);
            // case LayoutType.TLayout:
                // return this.createTLayout(group, gapType, columnCount);
        }
    }

    private static createHLayout(group: eui.Group, itemArr: UUImage[], gapType: GapType): void {
        let gap = this.getGap(gapType);
        for(let i = 0, len = itemArr.length; i < len; i++) {
             let item = itemArr[i];
             item.x = this.padding + (item.width + gap) * i;
             item.y = this.padding;
             group.addChild(item);                                       
         }
    }

    private static createVLayout(group: eui.Group, itemArr: UUImage[], gapType: GapType): void {
        let gap = this.getGap(gapType);
        for(let i = 0, len = itemArr.length; i < len; i++) {
             let item = itemArr[i];
             item.x = this.padding
             item.y = 10;
             group.addChild(item);             
         }
    }

    private static createTLayout(group: eui.Group, gapType: GapType, columnCount: number): eui.TileLayout {
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