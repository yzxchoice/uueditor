declare class LayoutBaseFactory {
    private static padding;
    static main(group: eui.Group, itemArr: UUImage[], layoutType: LayoutType, gapType: GapType, columnCount?: number): void;
    private static createHLayout(group, itemArr, gapType);
    private static createVLayout(group, itemArr, gapType);
    private static createTLayout(group, gapType, columnCount);
    static getGap(gap: GapType): number;
    static setGroupSize(itemNum: number, itemWidth: number, itemHeight: number, layoutType: LayoutType, gap: GapType, columnCount?: number): {
        width: number;
        height: number;
    };
}
