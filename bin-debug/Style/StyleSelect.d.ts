declare class StyleSelect extends StyleBase {
    private selectData;
    private gp_style_fontFamily_select;
    constructor(config: any, props: any);
    private onAddToStage();
    private initEvent();
    getFontFamily(v: any): void;
}
