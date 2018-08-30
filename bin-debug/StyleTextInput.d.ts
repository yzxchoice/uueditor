declare class StyleTextInput extends eui.Component {
    private stateObj;
    private config;
    private props;
    private inputType;
    private textInput_input;
    constructor(config: any, props: any);
    private onAddToStage();
    private initEvent();
    private onFocusIn(evt);
    private onFocusOut(evt);
}
