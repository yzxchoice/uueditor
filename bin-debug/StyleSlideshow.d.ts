declare class StyleSlideshow extends eui.Component {
    private siderbar;
    private image;
    private stateObj;
    private config;
    private props;
    private inputType;
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
