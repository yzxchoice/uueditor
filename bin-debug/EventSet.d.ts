declare class EventSetDome extends eui.Component implements IUUContainer {
    container: any;
    dispose(): void;
    draw(container: any): void;
    stateObj: any;
    _data: any;
    data: any;
    input_time: eui.TextInput;
    private btn_show;
    private btn_hidden;
    private label_close;
    private siderbarSkin;
    private triggerGroup;
    private _isShow;
    isShow: boolean;
    constructor();
    private onAddToStageInit(event);
    initData(data: any): void;
    pushData(): void;
    removeData(): void;
}