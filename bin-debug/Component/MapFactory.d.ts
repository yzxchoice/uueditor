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
    layoutSet: ILayout;
    imagePosition: ImagePosition;
    placeholder: boolean;
    hasBorder: boolean;
    isRestore: boolean;
    resourceType: ResourceType;
    clickMode?: ClickMode;
}
interface MapElmBox extends IMapEle {
    dragBorderBox: DragBorderBox;
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
    layoutSet: ILayout;
    imagePosition: ImagePosition;
    placeholder: boolean;
    hasBorder: boolean;
    isRestore: boolean;
    resourceType: ResourceType;
    dragBorderBox: DragBorderBox;
    imageBox: eui.Group;
    drawTarget: any;
    distanceX: number;
    distanceY: number;
    imageDefaultPosition: [number, number][];
    mapArr: {
        borderId: string;
        imageId: string;
    }[];
    timer: any;
    topImage: eui.Group;
    private layoutType;
    private gap;
    private columnCount;
    constructor(props: any);
    private renderUI();
    abstract listenEvent(): void;
    private getDragBorderBox();
    private createTotalGroupBox();
    private createPlaceholderImage(url);
    private createImage(item);
    private createText(item);
    private getImageDefaultPosition();
    private mapBorder();
    private getDrawTargetPointToparent(borderItem);
    private judgeBorderisFull();
    private removeAllEleClickState();
    private removeMapState(target);
    private addMapState(target);
    private recoverPosition(target);
    private swapImageIndex(target);
}
