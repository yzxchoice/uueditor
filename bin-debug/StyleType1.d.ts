declare class StyleType1 extends eui.Component implements IUUContainer {
    container: any;
    dispose(): void;
    draw(container: any): void;
    private stateObj;
    private _data;
    data: any;
    private inputType;
    private gp_styleContainer;
    private dataContainer;
    private item;
    constructor();
    private onAddToStage();
    private initEvent();
    setDataContainer(dataContainer: TabStyle): void;
    private onFocusIn(evt);
    private onFocusOut(evt);
}
