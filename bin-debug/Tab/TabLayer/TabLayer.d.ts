declare class TabLayer extends eui.Group implements IUUContainer {
    container: any;
    editGroup: EditGroup;
    layers: any[];
    elements: any[];
    private pageIndex;
    private layerIndex;
    constructor();
    dispose(): void;
    draw(container: any): void;
    private onAddedToStage();
    private init();
    private delete(event);
    private pageChange(event);
    private getPages();
    private render(layerIndex?);
    redraw(layerIndex?: number): void;
    private layerAdd(event);
    private layerChange(event);
}
