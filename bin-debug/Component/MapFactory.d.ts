declare enum LayoutType {
    HLayout = 1,
    VLayout = 2,
    TLayout = 3,
}
declare enum GapType {
    Small = 1,
    Middle = 2,
    Big = 3,
}
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
interface ILayout {
    layoutType: LayoutType;
    gap: GapType;
    columnCount?: number;
}
interface IMapEle {
    award: IResource[];
    resourceType: ResourceType;
    bgWidth: number;
    bgHeight: number;
    imgWidth: number;
    imgHeight: number;
    fontStyle: {
        textColor: string;
        size: number;
    };
    layoutSet: ILayout;
    imagePosition: ImagePosition;
    placeholder: boolean;
    hasBorder: boolean;
    isRestore: boolean;
    clickMode?: ClickMode;
}
interface MapElmBox extends IMapEle {
    dragBorderBox: DragBorderBox[];
    imageBox: eui.Group;
    drawTarget: UUImage | UULabel;
    imageDefaultPosition: [number, number][];
    mapArr: {
        borderId: string;
        imageId: string;
    }[];
    topImage: eui.Group;
    timer?: any;
    selectedImage?: UUImage | null;
    isTweening?: boolean;
}
declare abstract class MapEleBoxFactory extends eui.Group implements MapElmBox {
    award: IResource[];
    resourceType: ResourceType;
    bgWidth: number;
    bgHeight: number;
    imgWidth: number;
    imgHeight: number;
    fontStyle: {
        textColor: string;
        size: number;
    };
    layoutSet: ILayout;
    imagePosition: ImagePosition;
    placeholder: boolean;
    hasBorder: boolean;
    isRestore: boolean;
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
    private layoutType;
    private gap;
    private columnCount;
    constructor(props: any);
    protected renderUI(): void;
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
}
