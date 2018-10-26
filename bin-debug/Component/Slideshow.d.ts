/**
 * 轮播图组件
 */
interface ISlideshow {
    awards: IResource[];
    bdUrl: string;
    fontStyle: ILabel;
    leftArrowUrl: string;
    rightArrowUrl: string;
}
declare class Slideshow extends eui.Group implements IUUBase, ISlideshow {
    static uuType: UUType;
    layerName: string;
    awards: IResource[];
    bdUrl: string;
    fontStyle: ILabel;
    leftArrowUrl: string;
    rightArrowUrl: string;
    width: number;
    height: number;
    private imgBox;
    private itemWidth;
    private itemHeight;
    private imgPercentWidth;
    private imgPercentHeight;
    private arrow_left;
    private arrow_right;
    private arrowWidth;
    private arrowHeight;
    private duration;
    private delayed;
    private isAnimating;
    private _activeIndex;
    activeIndex: number;
    constructor(props: any);
    private forEachProps(props, target?);
    private createUI();
    private createMianBox();
    private createitem(resource);
    private createLeftArrow();
    private createRightArrow();
    private onclickLeft();
    private onclickRight();
}
