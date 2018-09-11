declare class StyleRadio extends StyleBase {
    private radioData;
    private gp_radioGroup;
    constructor(config: any, props: any);
    private onAddToStage();
    private initEvent();
    private createRadioGroup();
    private createRadio(label, value, isSelected?);
    private radioChangeHandler(evt);
}
