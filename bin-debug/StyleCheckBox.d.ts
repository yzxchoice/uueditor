declare class StyleCheckBox extends StyleBase {
    private checkBoxData;
    private gp_radioGroup;
    constructor(config: any, props: any);
    protected initEvent(): void;
    private createRadioGroup();
    private createCheckBox(label, isSelected?);
    private checkBoxChangeHandler(evt);
}
