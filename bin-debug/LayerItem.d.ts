declare class LayerItem extends eui.Group implements IUUContainer {
    layerIndex: number;
    container: TabLayer;
    selected: boolean;
    bg: egret.Shape;
    dispose(): void;
    draw(container: any): void;
    undraw(container: any): void;
    constructor(layerIndex: number);
    private onAddedToStage();
    private init();
    private initEvent();
    select(event: egret.TouchEvent): void;
    redraw(): void;
}
