/**
 * 转盘组件
 * 1、皮肤、箭头图片可替换
 * 2、数量可调整
 * 3、item排列顺序，以X轴正向为起点，顺时针排列
 */
interface ICircleSector2 {
    skinUrl: string;
    awards: IResource[];
    arrowUrl: string;
    functions: FunctionType[];
}
declare class CircleSector extends eui.Group implements IUUBase, ICircleSector2, FunctionForStart {
    static uuType: UUType;
    layerName: string;
    awards: Array<IResource>;
    skinUrl: string;
    arrowUrl: string;
    functions: FunctionType[];
    private main;
    private mainItemGroup;
    private isAnimating;
    private itemIndex;
    width: number;
    height: number;
    observer: Observer;
    constructor(props: any);
    private forEachProps(props, target?);
    protected openFunctions(): void;
    private init();
    private adjuctInitRotate();
    private adjuctInitItemIndex();
    private createMianBox();
    private createSkin();
    private createMainItemGroup();
    private createArrow();
    private rnd();
    private rotateFn(random);
    private reset();
    start(): void;
}
