declare class TabStyle extends eui.Component implements IUUContainer {
    container: Siderbar;
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
    private gp_container;
    private soundPanel;
    constructor();
    private onAddedToStage();
    private initEvent();
    private createStyleType(data);
    setTarget(): void;
    updateTarget(): void;
    private onFocusIn(evt);
    private onFocusOut(evt);
    private onkeydown(evt);
    private adjuctMatrix(value);
}
