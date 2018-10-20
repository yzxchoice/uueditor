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
    private drawTarget;
    private distanceX;
    private distanceY;
    private borderBox;
    private imageBox;
    constructor(props: any);
    private init();
    private createBorderBox();
    private createImageBox();
    down(evt: egret.TouchEvent): void;
    move(evt: egret.TouchEvent): void;
    up(evt: egret.TouchEvent): void;
}
