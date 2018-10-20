declare enum LayoutType {
    HLayout = 1,
    VLayout = 2,
    TLayout = 3,
}
declare enum GapType {
    Small = 1,
    Middle = 2,
    Big = 3,
}
declare class LayoutFactory {
    private static padding;
    static main(layoutType: LayoutType, gapType: GapType, columnCount?: number): eui.BasicLayout;
    private static createHLayout(gapType);
    private static createVLayout(gapType);
    private static createTLayout(gapType, columnCount);
    static getGap(gap: GapType): number;
    static setGroupSize(itemNum: number, itemWidth: number, itemHeight: number, layoutType: LayoutType, gap: GapType, columnCount?: number): {
        width: number;
        height: number;
    };
}