declare class EventSetDome extends eui.Component {
    private label_title;
    input_time: eui.TextInput;
    private btn_show;
    private btn_hidden;
    private label_close;
    private siderbarSkin;
    private _isShow;
    isShow: boolean;
    private _delayed;
    delayed: number;
    private _id;
    id: number;
    constructor(labelText?: string);
    private onAddToStageInit(event);
    private updateMessage();
}
