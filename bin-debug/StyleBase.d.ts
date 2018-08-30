declare class StyleBase extends eui.Component {
    private siderbar;
    private image;
    private stateObj;
    private config;
    private props;
    private inputType;
    constructor(config: any, props: any);
    private onAddToStage();
    protected initEvent(): void;
}
