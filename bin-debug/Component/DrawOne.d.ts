declare enum DrawOneLayoutType {
    topToBottom = 1,
    BottomTo = 2,
    LeftToRight = 3,
    RightToLeft = 4,
}
declare class DrawOne extends eui.Group {
    static uuType: UUType;
    private award;
    private toAward;
    private layoutType;
    constructor(props: any);
    private init();
    private createBorderBox();
    private createImageBox();
}
