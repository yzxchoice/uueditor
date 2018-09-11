declare class EventSetDome extends eui.Component implements IUUContainer {
    container: any;
    dispose(): void;
    draw(container: any): void;
    stateObj: ITrigger;
    _data: ITrigger;
    data: ITrigger;
    input_time: eui.TextInput;
    private btn_show;
    private btn_hidden;
    private label_close;
    private dataContainer;
    private triggerGroup;
    private _isShow;
    isShow: boolean;
    constructor();
    private onAddToStageInit(event);
    getDataContainer(dataContainer: any): void;
    initData(data: ITrigger): void;
    pushData(): void;
    removeData(): void;
}
