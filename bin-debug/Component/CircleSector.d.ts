/**
 * 转盘组件
 */
interface ICircleSector2 {
    skinUrl: string;
    awards: IResource[];
}
declare class CircleSector extends eui.Group implements IUUBase {
    static uuType: UUType;
    layerName: string;
    awards: Array<IResource>;
    skinUrl: string;
    private main;
    private isAnimating;
    private itemIndex;
    width: number;
    height: number;
    constructor(props: any);
    private forEachProps(props, target?);
    private init();
    private createMianBox();
    private createSkin();
    drawSector(): Promise<void>;
    private down(event);
    private rnd();
    rotateFn(random: number): void;
    /**
     * 画弧形方法
     */
    drawArc(mc: egret.Shape, x?: number, y?: number, r?: number, angle?: number, startFrom?: number, color?: number): void;
}
