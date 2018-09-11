declare class TabAnimation extends eui.Component implements IUUContainer {
    container: Siderbar;
    editGroup: EditGroup;
    private _grpLayout;
    dispose(): void;
    draw(container: any): void;
    constructor();
    private onAddedToStage();
    private init();
    private onAddCircle();
    private onAddCurve();
}
