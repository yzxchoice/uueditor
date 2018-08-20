declare class StyleType1 extends eui.Component implements IUUContainer {
    container: any;
    dispose(): void;
    draw(container: any): void;
    private stateObj;
    private _data;
    data: any;
    private inputType;
    private gp_styleContainer;
    private lb_selectColor;
    private gp_style_fontFamily;
    private gp_style_fontFamily_select;
    private dataContainer;
    private item;
    private colorSelectBox;
    constructor();
    private onAddToStage();
    private initEvent();
    private initSelect();
    private onClick();
    setDataContainer(dataContainer: TabStyle): void;
    changeColor(color: any): void;
    private onFocusIn(evt);
    private onFocusOut(evt);
    private refresh();
}
