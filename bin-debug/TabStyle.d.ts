declare class TabStyle extends eui.Component implements IUUContainer {
    container: SiderbarSkinBy;
    editGroup: EditGroup;
    private kb;
    dispose(): void;
    draw(container: any): void;
    private data;
    private inputType;
    private preData;
    private tool;
    private gp_inputContainer;
    constructor();
    private onAddedToStage();
    private initEvent();
    setTarget(): void;
    updateTarget(): void;
    private onFocusIn(evt);
    private onFocusOut(evt);
    private onkeydown(evt);
    private adjuctMatrix(value);
}
