declare class StyleRadio extends StyleBase {
    private radioData;
    private gp_radioGroup;
    constructor(config: any, props: any);
    protected initEvent(): void;
    private createRadioGroup();
    private createRadio(label, value, isSelected?);
    private radioChangeHandler(evt);
}
