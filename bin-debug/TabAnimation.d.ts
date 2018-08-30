declare class TabAnimation extends eui.Component implements IUUContainer {
    container: Siderbar;
    editGroup: EditGroup;
    dispose(): void;
    draw(container: any): void;
    constructor();
    private onAddedToStage();
    private init();
}
