declare class StyleColor extends StyleBase {
    private lb_selectColor;
    private colorSelectBox;
    constructor(config: any, props: any);
    protected initEvent(): void;
    private onClick();
    changeColor(color: any): void;
}
