declare enum ImagePosition {
    TOP = 1,
    MIDDLE = 2,
    BOTTOM = 3,
}
declare enum ClickMode {
    MuchToMuch = 1,
    MuchToOne = 2,
}
declare enum ResourceType {
    Text = 1,
    Image = 2,
}
/**
 * 匹配元素类的基类
 * 1、处理UI层
 * 2、处理功能列表：reset、answer、start
 * 3、具体的交互方式由子类实现
 */
interface IMapEle {
    award: IResource[];
    layoutSet: ILayout;
    resourceType: ResourceType;
    imgWidth: number;
    imgHeight: number;
    imagePosition: ImagePosition;
    placeholder: boolean;
    functions: FunctionType[];
    hasBorder: boolean;
    bgWidth?: number;
    bgHeight?: number;
    clickMode?: ClickMode;
    answerJudgePosition?: AnswerJudgePosition;
    fontStyle?: ILabel;
}
declare abstract class MapEleBoxFactory extends eui.Group implements IMapEle, ILayout, FunctionForReset, FunctionForAnswer {
    award: IResource[];
    layoutSet: ILayout;
    resourceType: ResourceType;
    imgWidth: number;
    imgHeight: number;
    imagePosition: ImagePosition;
    placeholder: boolean;
    functions: FunctionType[];
    hasBorder: boolean;
    bgWidth: number;
    bgHeight: number;
    answerJudgePosition: AnswerJudgePosition;
    fontStyle: ILabel;
    dragBorderBox: DragBorderBox[];
    dragBorderBoxIndex: number;
    imageBox: eui.Group;
    drawTarget: any;
    imageDefaultPosition: [number, number][];
    mapArr: {
        borderId: string;
        imageId: string;
    }[];
    topImage: eui.Group;
    observer: Observer;
    hasAnswer: boolean;
    layoutType: LayoutType;
    gap: GapType;
    columnCount: number;
    constructor(props: any);
    protected renderUI(): void;
    protected openFunctions(): void;
    protected getDragBorderBox(): void;
    protected createTotalGroupBox(): eui.Group;
    protected createPlaceholderImage(url: string): UUImage;
    protected createImage(item: IResource): UUImage;
    protected createText(item: IResource): UULabel;
    protected getImageDefaultPosition(): void;
    protected mapBorder(): void;
    protected getBorderItem(borderIndex: number): any;
    protected getDrawTargetPointToparent(borderItem: any): egret.Point;
    protected judgeBorderisFull(): boolean;
    protected removeAllEleClickState(): void;
    protected removeMapState(target: UUImage | UULabel): void;
    protected addMapState(target: UUImage | UULabel): void;
    protected recoverPosition(target: UUImage | UULabel): void;
    protected swapImageIndex(target: UUImage): void;
    reset(): void;
    answer(): void;
}
