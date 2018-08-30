/**
 * 轮播图组件
 */
declare class SlotMachine extends eui.Group implements IUUBase, IUUContainer, IUUComponent {
    data: any;
    layerName: string;
    container: any;
    static uuType: UUType;
    private btn_start;
    private isAnimating;
    draw(): void;
    dispose(): void;
    private itemWidth;
    private itemHeight;
    private gap;
    private tweenFlag;
    private defaultWidth;
    private defaultHeight;
    bgColor: string | number;
    bdUrl: string;
    private awardsTotal;
    private _awards;
    awards: Array<SlideshowItem>;
    private itemGroup;
    constructor();
    getProps(): {
        bgColor: string | number;
        bdUrl: string;
        awards: SlideshowItem[];
    };
    setProps(d: ISlotMachine): void;
    redraw(): void;
    private onAddToStage(event);
    private onRemoveFromStage(event);
    private init();
    private createMainBox();
    private createItemBox();
    private createItem(url);
    private createImg(url);
    private createStartBtn();
    private onClick(evt);
    private tween(item, step, duration?);
}
