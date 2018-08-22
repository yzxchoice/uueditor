declare class LayerBox extends eui.Group implements IUUContainer {
    container: any;
    editGroup: EditGroup;
    layers: any[];
    displayList: any[];
    private pageIndex;
    private layerIndex;
    constructor();
    dispose(): void;
    draw(container: any): void;
    private onAddedToStage();
    private init();
    private getPages();
    private render(layerIndex?);
    redraw(layerIndex?: number): void;
    private layerAdd(event);
}
