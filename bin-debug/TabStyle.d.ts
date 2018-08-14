declare class TabStyle extends eui.Component implements IUUContainer {
    container: SiderbarSkinBy;
    editGroup: EditGroup;
    dispose(): void;
    draw(container: any): void;
    private data;
    private tool;
    private gp_inputContainer;
    constructor();
    private onAddedToStage();
    private initEvent();
    setTarget(): void;
    updateTarget(): void;
    private onFocusOut(evt);
}
