declare class LayerItem extends eui.Group implements IUUContainer {
    layerIndex: number;
    container: LayerBox;
    selected: boolean;
    displayObj: Picture;
    bg: egret.Shape;
    dispose(): void;
    draw(container: any): void;
    undraw(container: any): void;
    constructor(layerIndex: number, displayObj: any);
    private onAddedToStage();
    private init();
    private initEvent();
    select(event: egret.TouchEvent): void;
    redraw(): void;
}
