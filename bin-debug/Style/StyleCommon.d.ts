declare class StyleCommon extends StyleBase {
    private form_component;
    private styleType;
    private styleTypeConfig;
    private colorSelectBox;
    constructor(config: ConfigItem, props: any);
    private onAddToStage();
    private initEvent();
    private initComponent();
    private event(evt);
    private StyleColorEvent();
    private initSelect();
}
