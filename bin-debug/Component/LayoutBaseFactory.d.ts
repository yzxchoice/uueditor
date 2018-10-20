declare class LayoutBaseFactory {
    private static padding;
    static main(group: eui.Group, itemArr: UUImage[], layoutType: LayoutType, gapType: GapType, columnCount?: number): void;
    private static createHLayout(group, itemArr, gapType);
    private static createVLayout(group, itemArr, gapType);
    private static createTLayout(group, itemArr, gapType, columnCount);
    static getGap(gap: GapType): number;
}
