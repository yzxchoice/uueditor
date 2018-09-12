declare class StyleTextSelect extends eui.Component {
    private stateObj;
    private config;
    private props;
    private selectData;
    private inputType;
    private textInput_input;
    private gp_style_fontFamily_select;
    constructor(config: any, props: any);
    private onAddToStage();
    private initSelect();
    getFontFamily(v: any): void;
}
