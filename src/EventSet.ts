class EventSetDome extends eui.Component implements IUUContainer,BaseUI {

	container: Game;
	dispose (): void {
		let data = this.data;
		let index = null;
		for(let i = 0, len = this.triggerGroup.length; i < len; i++){
			let obj = this.triggerGroup[i];
			if(data.sourceId == obj.sourceId && data.targetId == obj.targetId){
				index = i;
				break;
			}
		};
		if(index !== null){
			this.triggerGroup.splice(index, 1);
			this.triggerGroup = this.triggerGroup;
		};
	}

	draw (container: any) {
		this.container = container;
		this.container.addChild(this);
	}

    data: any;

	public input_time:eui.TextInput;
	private btn_show:eui.Button;
	private btn_hidden:eui.Button;
	private label_close:eui.Label;

	private siderbarSkin:SiderbarSkinBy = SiderbarSkinBy.getInstance();
	private triggerGroup = this.siderbarSkin.triggerGroup
	
	private _isShow:boolean = true;
	public get isShow():boolean {
		return this._isShow;
	}
	public set isShow(v:boolean){
		console.log('isShow = ' + v);
		this._isShow = v;
		this.currentState = v ? 'show' : 'hidden';
		this.data.targetState = v ? 1 : 2;		
	}

	public constructor() {
		super();
		this.skinName = "resource/skins/EventSet.exml";
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStageInit, this);
		// this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedToStageInit, this);
	}
	private onAddToStageInit(event:egret.Event) {
		this.btn_show.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.isShow = true;
		}, this);
		this.btn_hidden.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.isShow = false;
		}, this);
		this.input_time.addEventListener(egret.FocusEvent.FOCUS_OUT, (evt:egret.FocusEvent) => {
			this.data.delay = Number(evt.target.text);
		}, this);
		this.label_close.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.siderbarSkin.removeEventSet(this.data);
			// this.parent.removeChild(this);
			// this.dispose();
		}, this);
    }

	public pushData(){
		this.triggerGroup.push(this.data);
	}
}