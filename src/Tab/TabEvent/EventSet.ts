
class EventSetDome extends eui.Component implements IUUContainer {

	container;
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
		};
	}

	draw (container: any) {
		this.container = container;
		this.container.addChild(this);
	}

	stateObj: ITrigger;
	_data: ITrigger;
	public get data(): ITrigger{
		return this._data;
	}
	public set data(v: ITrigger){
		this._data = v;
		// 需要拷贝一份数据用于skin，直接赋值会污染本身的data
		this.stateObj = JSON.parse(JSON.stringify(v));
	}

	public input_time:eui.TextInput;
	private btn_show:eui.Button;
	private btn_hidden:eui.Button;
	private label_close:eui.Label;

	private dataContainer: TabEvent;
	private triggerGroup: any[];
	
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
			this.removeData();
		}, this);
    }

	public getDataContainer(dataContainer){
		this.dataContainer = dataContainer;
		this.triggerGroup = this.dataContainer.triggerGroup;
	}

	public initData(data: ITrigger){
		this.data = data;
		this.name = <string>data.targetId;		
		this.isShow = data.targetState == 1 ? true : false;
	}

	public pushData(){
		this.triggerGroup.push(this.data);
	}

	public removeData(){
		let relevanceItemId = this.data.targetId;
		this.container.removeChild(this);
		this.dispose();
		this.dataContainer.relevanceItemIdList.splice(this.dataContainer.relevanceItemIdList.indexOf(relevanceItemId),1);
	}
}