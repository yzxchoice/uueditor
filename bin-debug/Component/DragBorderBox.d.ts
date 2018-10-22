declare class DragBorderBox extends eui.Group {
    static uuType: UUType;
    private toAward;
    private layoutType;
    private gap;
    private columnCount;
    constructor(props: any);
    private init();
    private createBorderBox();
}
