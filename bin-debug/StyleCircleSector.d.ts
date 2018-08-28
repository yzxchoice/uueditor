declare class StyleCircleSector extends eui.Component {
    private siderbar;
    private stateObj;
    private config;
    private props;
    private inputType;
    private textInput_input;
    private lb_edit;
    private table;
    private headData;
    private initdata;
    private data;
    constructor(config: any, props: any);
    private onAddToStage();
    private initEvent();
    private onClick();
    private exchangeInitdata(initdata);
    private exchangeData();
}
