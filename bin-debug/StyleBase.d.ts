declare class StyleBase extends eui.Component {
    protected siderbar: Siderbar;
    protected image: any;
    private stateObj;
    private config;
    protected props: any;
    protected inputType: string;
    constructor(config: any, props: any);
    private onAddToStage();
    protected initEvent(): void;
    protected updateValue(value: number | string): void;
}
