declare class StyleColor extends StyleBase {
    private lb_selectColor;
    private colorSelectBox;
    constructor(config: any, props: any);
    private onAddToStage();
    private initEvent();
    private onClick();
    changeColor(color: any): void;
}
