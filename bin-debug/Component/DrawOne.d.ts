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
    private isRestore;
    private drawTarget;
    private distanceX;
    private distanceY;
    private borderBox;
    private imageBox;
    private boxLayoutType;
    private imageDefaultPosition;
    private mapArr;
    private timer;
    constructor(props: any);
    private init();
    private getBoxLayoutType();
    private createLayout();
    private createSize();
    private createBorderBox();
    private createImageBox();
    private getImageDefaultPosition();
    private down(evt);
    private move(evt);
    private up(evt);
    private up2(evt);
    private checkoutImage(imgaeIndex);
}
