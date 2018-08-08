class EventSetDome extends eui.Component {
	private label_title:eui.Label;
	public input_time:eui.TextInput;
	private btn_show:eui.Button;
	private btn_hidden:eui.Button;
	private label_close:eui.Label;

	private _isShow:boolean = true;
	public get isShow():boolean {
		return this._isShow;
	}
	public set isShow(v:boolean){
		this._isShow = v;
		this.currentState = v ? 'show' : 'hidden';
	}

	public constructor(labelText:string = '') {
		super();
		this.skinName = "resource/skins/EventSet.exml";
		this.label_title.text = labelText;
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStageInit, this);
	}
	private onAddToStageInit(event:egret.Event) {
		this.btn_show.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.isShow = true;
		}, this);
		this.btn_hidden.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.isShow = false;
		}, this);
		this.label_close.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.parent.removeChild(this);
		}, this);
    }
}