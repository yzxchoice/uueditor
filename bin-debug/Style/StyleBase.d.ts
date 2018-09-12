declare class StyleBase extends eui.Component {
    protected siderbar: Siderbar;
    protected image: any;
    private stateObj;
    protected config: ConfigItem;
    protected props: any;
    protected inputType: string;
    constructor(config: any, props: any);
    protected updateValue(value: any): void;
}
