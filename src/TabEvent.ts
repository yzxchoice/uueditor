class TabEvent extends eui.Component implements IUUContainer{
	container: SiderbarSkinBy;
	editGroup: EditGroup;
	dispose (): void {

	}

	draw (container: SiderbarSkinBy): void{
		this.container = container;
		this.editGroup = container.editGroup;
	}
	private gp_selection_rect:eui.Label;
	private gp_selection:eui.Group;
	private gp_eventSetContainer:eui.Group;
	// state
	public stateObj = {
		selectionVisible: false,
	}
	private isFirstSelect:boolean = true;	

	private targetItemId:number;
	private _triggerGroup:Array<any>;
	public get triggerGroup():Array<any> {
		return this._triggerGroup;
	}
	public set triggerGroup(v:Array<any>) {
		this._triggerGroup = v;
		let triggerGroupFilter = v.filter(item => item.sourceId == this.targetItemId);
		this.relevanceItemIdList = triggerGroupFilter.map(item => item.targetId);
		let obj = {};
		for(let i = 0,len = triggerGroupFilter.length; i < len; i++){
			let item = triggerGroupFilter[i];
			obj[item.targetId] = item;								
		};
		this.relevanceItemIdObj = obj;
		this.initShowEventSetList();		
	}
	public relevanceItemIdList = [];
	private relevanceItemIdObj: any;

	private defaultRelevanceItem = {
		"delay": 100,
		"eventType": 1,
		"sourceId": 8405,
		"sourceType": "e",
		"targetId": 8405,
		"targetState": 1,
		"targetType": "e"
	}
	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
	}
	private onAddedToStage(){
		this.init()
	}
	private init(){
		// 启用舞台的鼠标支持
		// 开启监听鼠标的移动事件
		mouse.enable(this.stage);
		mouse.setMouseMoveEnabled(true);
		this.initLayout();
		this.listenEvent();
	}
	private initLayout(){
		let vLayout:eui.VerticalLayout = new eui.VerticalLayout();
		vLayout.paddingTop = 5;				
		this.gp_eventSetContainer.layout = vLayout;
		let vLayout2:eui.VerticalLayout = new eui.VerticalLayout();
		vLayout2.gap = 0;
		vLayout2.paddingTop = 5;		
		this.gp_selection.layout = vLayout2;
	}
	private listenEvent(){
		// 监听tabs click事件
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, (evt: egret.TouchEvent) => { 
			this.stateObj.selectionVisible = false; 
			let maskTool = this.editGroup.maskTool;		
			maskTool.removeMask();			
		}, this);
		this.gp_selection_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchSelection2, this);
	}
	public getTargetItemId(){
		this.targetItemId = this.editGroup.tool.target.owner.image.data.id;
	}
	private touchSelection2(evt: egret.TouchEvent){
		evt.stopPropagation();
		if(!this.targetItemId) return;
		this.stateObj.selectionVisible = !this.stateObj.selectionVisible;
		if(this.stateObj.selectionVisible){
			this.gp_selection.removeChildren();
			let disPlayList = this.editGroup.displayList;
			for(let j = 0, num = disPlayList.length; j < num; j++){
				let displayItemData = disPlayList[j].image.data;
				let relevanceItemId = displayItemData.id;
				let checkBoxGroup:CheckItem = new CheckItem(relevanceItemId);
				checkBoxGroup.addEventListener(egret.Event.ADDED_TO_STAGE, () => {
					let isSelected = this.relevanceItemIdList.indexOf(relevanceItemId) == -1 ? false : true;
					checkBoxGroup.isSelected = isSelected;
				}, this);		
				this.gp_selection.addChild(checkBoxGroup);						
			}
			if(!this.isFirstSelect) return;
			this.isFirstSelect = false;			
			this.gp_selection.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.onMouseover_Selection, this);
			this.gp_selection.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_Selection, this);
		};
	}
	private onMouseover_Selection(evt:egret.TouchEvent){
		for(let i = 0, len = this.gp_selection.numChildren; i < len; i++){
			let item = <CheckItem>this.gp_selection.getChildAt(i);
			item.isOver = false;
		};
		evt.target.parent.isOver = true;
		let id = evt.target.parent.labelText;
		console.log('id = ' + id);
		let displayList = this.editGroup.displayList;
		let transform: Transformable;
		for(let i = 0, len = displayList.length; i < len; i++){
			let item = <Picture>displayList[i];
			if(item.image.data.id == id){
				transform = item.transform;
				break;
			}
		};
		console.log('transform...');
		console.log(transform);
		let maskTool = this.editGroup.maskTool;		
		if(!transform){
			maskTool.removeMask();
			return;
		}
		maskTool.setPreTarget(transform);
		maskTool.addMask();
	}
	private onClick_Selection(evt:egret.TouchEvent){
		evt.stopPropagation();		
		let checkoutBox = evt.target;
		let checkItem = evt.target.parent;					
		let selected = checkoutBox.selected;
		if(selected === undefined) return;
		let relevanceItemId = checkItem.labelText;
		let eventSetMessage = this.relevanceItemIdObj[relevanceItemId];
		if(!eventSetMessage){
			this.relevanceItemIdObj[relevanceItemId] = JSON.parse(JSON.stringify(this.defaultRelevanceItem));
			this.relevanceItemIdObj[relevanceItemId].sourceId = this.targetItemId;
			this.relevanceItemIdObj[relevanceItemId].targetId = relevanceItemId;						
			eventSetMessage = this.relevanceItemIdObj[relevanceItemId];
		}
		if(selected){
			this.pushEventSet(eventSetMessage);			
			this.relevanceItemIdList.push(relevanceItemId);
		}else {
			this.removeEventSet(eventSetMessage);
		}
	}
	private drawEventSet(eventSetMessage){
		let eventSet:EventSetDome = new EventSetDome();	
		eventSet.initData(eventSetMessage);
		eventSet.getDataContainer(this);
		eventSet.draw(this.gp_eventSetContainer);
		return eventSet;
	}
	private pushEventSet(eventSetMessage){
		let eventSet:EventSetDome = this.drawEventSet(eventSetMessage);
		eventSet.pushData();
	}
	public removeEventSet(eventSetMessage){
		let relevanceItemId = eventSetMessage.targetId;
		let eventSet = <EventSetDome>this.gp_eventSetContainer.getChildByName(relevanceItemId);
		eventSet.removeData();
	}
	private initShowEventSetList(){
		this.gp_eventSetContainer.removeChildren();
		let disPlayList = this.editGroup.displayList;
		for(let j = 0, num = disPlayList.length; j < num; j++){
			let relevanceItemId = disPlayList[j].image.data.id;
			let isSelected = this.relevanceItemIdList.indexOf(relevanceItemId) == -1 ? false : true;
			if(isSelected){
				let eventSetMessage = this.relevanceItemIdObj[relevanceItemId];
				this.drawEventSet(eventSetMessage);
			}
		}
	}
}