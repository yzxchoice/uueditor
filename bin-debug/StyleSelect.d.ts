declare class StyleSelect extends StyleBase {
    private selectData;
    private gp_style_fontFamily_select;
    constructor(config: any, props: any);
    protected initEvent(): void;
    getFontFamily(v: any): void;
}
