declare class DragBorderBox extends eui.Group {
    static uuType: UUType;
    private bgWidth;
    private bgHeight;
    private toAward;
    private layoutType;
    private gap;
    private columnCount;
    constructor(props: any);
    private init();
    private createBorderBox();
}
