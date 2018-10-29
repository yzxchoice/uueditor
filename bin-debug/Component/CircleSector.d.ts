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
    private createArrow();
    private down(event);
    private rnd();
    rotateFn(random: number): void;
}
