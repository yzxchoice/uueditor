class EventSetDome extends eui.Component {
	private label_title:eui.Label;
	public input_time:eui.TextInput;
	private btn_show:eui.Button;
	private btn_hidden:eui.Button;
	private label_close:eui.Label;

	private siderbarSkin:SiderbarSkinBy = SiderbarSkinBy.getInstance();
	
	private _isShow:boolean = true;
	public get isShow():boolean {
		return this._isShow;
	}
	public set isShow(v:boolean){
		this._isShow = v;
		this.currentState = v ? 'show' : 'hidden';
		this.updateMessage();
	}
	private _delayed:number;
	public get delayed():number{
		return this._delayed;
	}
	public set delayed(v:number){
		this._delayed = v;
		this.input_time.text = v.toString();
		this.updateMessage();
	}
	private _id:number;
	public get id():number{
		return this._id;
	}
	public set id(v:number){
		this._id = v;
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
		this.input_time.addEventListener(egret.FocusEvent.FOCUS_OUT, (evt:egret.FocusEvent) => {
			this.delayed = Number(evt.target.text); 
		}, this);
		this.label_close.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.siderbarSkin.removeEventSet({id: this.id});
		}, this);
    }
	private updateMessage(){
		let relevanceItem = this.siderbarSkin.relevanceItemIdObj[this.id];
		relevanceItem.isShow = this.isShow;
		relevanceItem.delayed = this.delayed;
		this.siderbarSkin.relevanceItemIdObj = this.siderbarSkin.relevanceItemIdObj;
	}
}