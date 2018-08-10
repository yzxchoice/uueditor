declare class EventSetDome extends eui.Component implements IUUContainer, BaseUI {
    container: Game;
    dispose(): void;
    draw(container: any): void;
    data: any;
    private label_title;
    input_time: eui.TextInput;
    private btn_show;
    private btn_hidden;
    private label_close;
    private siderbarSkin;
    private triggerGroup;
    private _isShow;
    isShow: boolean;
    private _delayed;
    delayed: number;
    constructor(labelText?: string);
    private onAddToStageInit(event);
    pushData(): void;
}
