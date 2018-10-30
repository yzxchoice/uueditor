/**
 * 转盘组件
 */
interface ICircleSector2 {
    skinUrl: string;
    awards: IResource[];
    arrowUrl: string;
}
declare class CircleSector extends eui.Group implements IUUBase {
    static uuType: UUType;
    layerName: string;
    awards: Array<IResource>;
    skinUrl: string;
    arrowUrl: string;
    private main;
    private mainItemGroup;
    private isAnimating;
    private itemIndex;
    width: number;
    height: number;
    constructor(props: any);
    private forEachProps(props, target?);
    private init();
    private adjuctInitRotate(mian);
    private createMianBox();
    private createSkin();
    private createMainItemGroup();
    private createArrow();
    private down(event);
    private rnd();
    private rotateFn(random);
    private reset();
    /**
     * 画弧形方法
     */
    drawArc(mc: egret.Shape, x?: number, y?: number, r?: number, angle?: number, startFrom?: number, color?: number): void;
}
