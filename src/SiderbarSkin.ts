class SiderbarSkinBy extends eui.Component implements IUUContainer {
	container: Game;
	editGroup: EditGroup;
	dispose (): void {

	}

	draw (container: any) {
		this.container = container;
		this.editGroup = this.container.editGroup;
		this.container.addChild(this);
	}
	private static _instance:SiderbarSkinBy = null;
	public static getInstance(){
		if(SiderbarSkinBy._instance == null){
			SiderbarSkinBy._instance = new SiderbarSkinBy();
		};
		return SiderbarSkinBy._instance;
	}
	private tool;
	private gp_tabs:eui.Group;
	private gp_container_addEvent:eui.Group;
	private btn_add_event:eui.Button;
	private gp_add_click_event:eui.Group;
	private gp_eventContainer_event_click:eui.Group;
	private gp_selection_rect:eui.Label;
	private gp_selection:eui.Group;
	private gp_eventSetContainer:eui.Group;
	private gp_inputContainer:eui.Group;
	// state
	public stateObj = {
		selectionVisible: false,
	}
	public selectionVisible:boolean = false;
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
	private relevanceItemIdList = [];
	private _relevanceItemIdObj:Object = {};
	public get relevanceItemIdObj():Object {
		return this._relevanceItemIdObj;
	}
	// 增/删/改 之后 relevanceItemIdObj = relevanceItemIdObj 从而触发set
	public set relevanceItemIdObj(v:Object) {
		this._relevanceItemIdObj = v;
		console.log('setter relevanceItemIdObj...');
		console.log(v);		
	}
	static defaultRelevanceItem = {
		"delay": 100,
		"eventType": 1,
		"sourceId": 8405,
		"sourceType": "e",
		"targetId": 8405,
		"targetState": 1,
		"targetType": "e"
	}
	public data:Object = {
		width: 30,
		height: 30,
		x: 30,
		y: 30,
		rotate: 10,
	}

	public constructor() {
		super();
		this.skinName = "resource/skins/SiderbarSkin.exml";
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStageInit, this);
	}
	private onAddToStageInit(event:egret.Event) {
        this.init();
    }
	private init(){
		// 启用舞台的鼠标支持
		// 开启监听鼠标的移动事件
		mouse.enable(this.stage);
		mouse.setMouseMoveEnabled(true);
		var vLayout:eui.VerticalLayout = new eui.VerticalLayout();
		vLayout.paddingTop = 5;				
		this.gp_eventSetContainer.layout = vLayout;
		var vLayout2:eui.VerticalLayout = new eui.VerticalLayout();
		vLayout2.gap = 0;
		vLayout2.paddingTop = 5;		
		this.gp_selection.layout = vLayout2;
		this.listenEvent();
		this.currentState = 'style';
	}
	private listenEvent(){
		// 监听tabs click事件
		this.gp_tabs.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTabsClick, this);
		this.btn_add_event.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchAddEvent, this);
		this.gp_add_click_event.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addClickEventItem, this);
		this.gp_selection_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchSelection2, this);

		for(let i = 0, len = this.gp_inputContainer.numChildren; i < len; i++){
			let groupInpput = <eui.Group>this.gp_inputContainer.getChildAt(i);
			let input = groupInpput.getChildAt(1);
			input.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onFocusOut, this);			
		}
	}
	public setTarget(tool){
		this.tool = tool;
	}
	public updateTarget(){
		let matrix:Matrix = this.tool.target.matrix;
        let item = this.tool.target.owner.image;
        let {width, height} = this.tool.target;
        let {scaleX, scaleY, rotation} = item;
        let newData = {
            x: Math.floor(this.tool.regX),
            y: Math.floor(this.tool.regY),
            width: Math.floor(width * scaleX),
            height: Math.floor(height * scaleY),
            rotate: Math.floor(rotation)
        };
		this.data = newData;

		this.targetItemId = this.tool.target.owner.image.data.id;
        this.triggerGroup = this.editGroup.pages[this.editGroup.pageIndex].properties.triggerGroup;
		console.log(this.triggerGroup);
	}
	private touchTabsClick(evt:egret.TouchEvent){
		this.currentState = evt.target.parent.name;
	}
	private touchAddEvent(evt:egret.TouchEvent){
		this.gp_container_addEvent.visible = true;
		this.gp_container_addEvent.anchorOffsetX = -this.width;
		egret.Tween.get(this.gp_container_addEvent)
		.to({"anchorOffsetX": 0}, 300);
	}
	private addClickEventItem(evt:egret.TouchEvent){
		this.gp_eventContainer_event_click.visible = true;				
		egret.Tween.get(this.gp_container_addEvent)
		.to({"anchorOffsetX": -this.width}, 300)
		.call(() => {
			this.gp_container_addEvent.visible = false;	
		});
	}
	// tab 触发 功能
	private touchSelection2(){
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
	}
	private onClick_Selection(evt:egret.TouchEvent){
		let checkoutBox = evt.target;
		let checkItem = evt.target.parent;					
		let selected = checkoutBox.selected;
		if(selected === undefined) return;
		let relevanceItemId = checkItem.labelText;
		let eventSetMessage = this.relevanceItemIdObj[relevanceItemId];
		if(!eventSetMessage){
			this.relevanceItemIdObj[relevanceItemId] = JSON.parse(JSON.stringify(SiderbarSkinBy.defaultRelevanceItem));
			this.relevanceItemIdObj[relevanceItemId].sourceId = this.targetItemId;
			this.relevanceItemIdObj[relevanceItemId].targetId = relevanceItemId;						
			// this.relevanceItemIdObj = this.relevanceItemIdObj;
			eventSetMessage = this.relevanceItemIdObj[relevanceItemId];
			console.log('------1------');
			console.log(eventSetMessage);
			// return;
		}
		if(selected){
			this.pushEventSet({});
			// this.pushEventSet(eventSetMessage);			
			this.relevanceItemIdList.push(relevanceItemId);
		}else {
			this.removeEventSet(eventSetMessage);
		}
	}
	private drawEventSet(eventSetMessage){
		let eventSet:EventSetDome = new EventSetDome();	
		eventSet.data = eventSetMessage;
		eventSet.name = eventSetMessage.targetId;		
		eventSet.isShow = eventSetMessage.targetState == 1 ? true : false;
		// eventSet.draw(this.gp_eventSetContainer);
		return eventSet;
	}
	private pushEventSet(eventSetMessage){
		let eventSet:EventSetDome = this.drawEventSet(eventSetMessage);
		console.log('---0000----');
		console.log(eventSetMessage);
		// eventSet.pushData();
	}
	public removeEventSet(eventSetMessage){
		let relevanceItemId = eventSetMessage.targetId;
		console.log('relevanceItemId = ' + relevanceItemId);
		let eventSet = <EventSetDome>this.gp_eventSetContainer.getChildByName(relevanceItemId);
		this.gp_eventSetContainer.removeChild(eventSet);
		eventSet.dispose();
		this.relevanceItemIdList.splice(this.relevanceItemIdList.indexOf(relevanceItemId),1);
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
	private onFocusOut(evt:egret.FocusEvent){
		console.log(evt.target.id);
		let textInput:eui.TextInput = evt.target.parent;
		let name:string = textInput.name;
		let propertyName:string = name.split('_')[1];
		this.data[propertyName] = Number(evt.target.text); 
		// TODO: 去修改对应的视图元素的信息
		let game = <Game>this.parent;
		let tool: TransformTool = game.editGroup.tool;
		let target = tool.target;
		let element = tool.target.owner.image;
		if(name == "input_width"){
			tool.scale(this.data['width'] / Math.round(target.width * tool.endMatrix.a));
		}
		if(name == "input_x" || name == "input_y"){
			tool.translate(this.data['x']-tool.regX, this.data['y']-tool.regY);
		}
		if(name == "input_rotate"){
			tool.rotate((this.data['rotate']) * Math.PI / 180 - tool.endMatrix.getRotationX());
		}	


		// console.log(tool.endMatrix.getRotationX(),tool.endMatrix.getRotationY());
		// console.log(tool.regX, tool.regY);
		this.container.editGroup.render();
		// console.log(tool.regEndU, tool.regEndV);
		// console.log(tool.regStartU, tool.regStartV);
	}
}