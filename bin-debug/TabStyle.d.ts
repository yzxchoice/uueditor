declare class TabStyle extends eui.Component implements IUUContainer {
    container: SiderbarSkinBy;
    editGroup: EditGroup;
    private kb;
    dispose(): void;
    draw(container: any): void;
    private data;
    private inputType;
    private preData;
    tool: TransformTool;
    private gp_diff;
    private gp_inputContainer;
    private btn_update;
    constructor();
    private onAddedToStage();
    private initEvent();
    private onDoubleClick();
    private exchangeDiffGroup(data);
    setTarget(): void;
    updateTarget(): void;
    private onFocusIn(evt);
    private onFocusOut(evt);
    private onkeydown(evt);
    private adjuctMatrix(value);
}
