declare class StyleCheckBox extends StyleBase {
    private checkBoxData;
    private gp_radioGroup;
    constructor(config: any, props: any);
    private onAddToStage();
    private initEvent();
    private createRadioGroup();
    private createCheckBox(label, isSelected?);
    private checkBoxChangeHandler(evt);
}
