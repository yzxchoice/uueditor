declare class StyleCommon extends StyleBase {
    private form_component;
    private styleType;
    private styleTypeConfig;
    constructor(config: ConfigItem, props: any);
    private onAddToStage();
    private initEvent();
    private event(evt);
}
