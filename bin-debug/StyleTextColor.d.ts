declare class StyleTextColor extends eui.Component {
    private siderbar;
    private image;
    private stateObj;
    private config;
    private props;
    private inputType;
    private lb_selectColor;
    private colorSelectBox;
    constructor(config: any, props: any);
    private onAddToStage();
    private initEvent();
    private onClick();
    changeColor(color: any): void;
}
