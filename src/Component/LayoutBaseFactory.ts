
class LayoutBaseFactory {
    private static padding: number = 10;

    static main(group: eui.Group, itemArr: UUImage[] | eui.Group[], layoutType: LayoutType, gapType: GapType, columnCount?: number): void {
        switch(layoutType) {
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
    }

    private static createHLayout(group: eui.Group, itemArr: UUImage[] | eui.Group[], gapType: GapType): void {
        let gap = this.getGap(gapType);
        for(let i = 0, len = itemArr.length; i < len; i++) {
             let item = itemArr[i];
             item.x = this.padding + (item.width + gap) * i;
             item.y = this.padding;
             group.addChild(item);                                       
         }
    }

    private static createVLayout(group: eui.Group, itemArr: UUImage[] | eui.Group[], gapType: GapType): void {
        let gap = this.getGap(gapType);
        for(let i = 0, len = itemArr.length; i < len; i++) {
             let item = itemArr[i];
             item.x = this.padding
             item.y = this.padding + (item.height + gap) * i;
             group.addChild(item);             
         }
    }

    private static createTLayout(group: eui.Group, itemArr: UUImage[] | eui.Group[], gapType: GapType, columnCount: number): void {
        let gap = this.getGap(gapType);
        for(let i = 0, len = itemArr.length; i < len; i++) {
             let item = itemArr[i];
             item.x = this.padding + (i % columnCount) * (item.width + gap);
             item.y = this.padding + Math.floor(i / columnCount) * (item.width + gap);
             group.addChild(item);             
         }
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

}