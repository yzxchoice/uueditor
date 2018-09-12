declare class StyleEditBae extends eui.Component {
    private siderbar;
    private image;
    private stateObj;
    private config;
    private props;
    private lb_edit;
    private table;
    private initdata;
    private data;
    protected headData: string[];
    protected propsKey: string;
    protected componenntTypeConfig: Object;
    constructor(config: any, props: any);
    private onAddToStage();
    private initEvent();
    private onClick();
    protected exchangeInitdata(initdata: any): any[];
    private exchangeData();
}
