/**
 * 该组件包含的功能
 * 1、支持四种布局：上/下、下/上、左/右、右/上、左
 * 2、拖拽功能
 * 3、图片复位功能：未入框则恢复到初始的位置
 * 4、一框一图功能：一个框不能放置多张图片
 * 5、调整拖拽图片的层级：被拖拽的图片层级永远最高
 */
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
    private topImage;
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
    private checkoutImage(imageId);
    private swapImageIndex(target);
}
