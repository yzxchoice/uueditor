/**
 * 轮播图组件
 */
declare class SlotMachine extends eui.Group implements IUUBase {
    data: any;
    layerName: string;
    container: any;
    static uuType: UUType;
    private btn_start;
    private isAnimating;
    private itemWidth;
    private itemHeight;
    private gap;
    private tweenFlag;
    width: number;
    height: number;
    bdUrl: string;
    private awardsTotal;
    private _awards;
    awards: Array<SlideshowItem>;
    private itemGroup;
    constructor(props: any);
    private onAddToStage(event);
    private onRemoveFromStage(event);
    private init();
    private createGroupBox();
    private createMainBox();
    private createItemBox();
    private createItem(url);
    private createImg(url);
    private createStartBtn();
    private onClick(evt);
    private tween(item, step, duration?);
    private addClickState();
    private removeClickState();
}
