declare class UUBorderContainer extends eui.Group implements IUUContainer {
    container: any;
    dispose(): void;
    draw(container: any): void;
    constructor();
    private onAddedToStage();
}
