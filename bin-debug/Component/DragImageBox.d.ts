declare enum ImagePosition {
    TOP = 1,
    MIDDLE = 2,
    BOTTOM = 3,
}
/**
 * 该组件包含的功能
 * 1、支持四种布局：上/下、下/上、左/右、右/上、左
 * 2、拖拽功能
 * 3、图片复位功能：未入框则恢复到初始的位置
 * 4、一框一图功能：一个框不能放置多张图片
 * 5、调整拖拽图片的层级：被拖拽的图片层级永远最高
 */
declare class DragImageBox extends eui.Group {
    static uuType: UUType;
    private award;
    private dragBorderBoxId;
    private layoutType;
    private gap;
    private columnCount;
    private imagePosition;
    private placeholder;
    private isRestore;
    private dragBorderBox;
    private placeholderImageBox;
    private imageBox;
    private drawTarget;
    private distanceX;
    private distanceY;
    private imageDefaultPosition;
    private mapArr;
    private timer;
    private topImage;
    constructor(props: any);
    private init();
    private getDragBorderBox();
    private createImageBox();
    private createPlaceholderImageBox();
    private getImageDefaultPosition();
    private down(evt);
    private move(evt);
    private up(evt);
    private up2(evt);
    private checkoutImage(imageId);
    private swapImageIndex(target);
}
