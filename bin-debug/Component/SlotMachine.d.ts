/**
 * 老虎机组件
 * 1、通常只需要改变awards、bdUrl
 * 2、当需要修改皮肤时，需要改变所有选项
 * 3、只支持3列
 */
interface ISlotMachine {
    awards: IResource[];
    bdUrl: string;
    skinUrl: string;
    skinSize: ISize;
    startBtnUrl: string;
    startBtnMessage: IBaseMessage;
    coreAraeMessage: IBaseMessage;
}
declare class SlotMachine extends eui.Group implements IUUBase, ISlotMachine {
    static uuType: UUType;
    layerName: string;
    bdUrl: string;
    skinUrl: string;
    skinSize: ISize;
    startBtnUrl: string;
    startBtnMessage: IBaseMessage;
    coreAraeMessage: IBaseMessage;
    private gap;
    private itemWidth;
    private itemHeight;
    private imgPercentWidth;
    private imgPercentHeight;
    private itemGroup;
    private btn_start;
    private tweenFlag;
    private isAnimating;
    private awardsTotal;
    private _awards;
    awards: IResource[];
    constructor(props: any);
    private forEachProps(props, target?);
    private init();
    private getItemSize();
    private createGroupBox();
    private createSkin();
    private createMainBox();
    private createItemBox();
    private createItem(url);
    private createBd(url);
    private createImg(url);
    private createStartBtn();
    private onClick(evt);
    private tween(item, step, duration?);
    private addClickState();
    private removeClickState();
}
