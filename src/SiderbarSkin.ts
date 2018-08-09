class SiderbarSkinBy extends eui.Component implements IUUContainer {
	container: Game;
	dispose (): void {

	}

	draw (container: any) {
		this.container = container;
		this.container.addChild(this);
	}
	private gp_tabs:eui.Group;
	// private gp_tab_style:eui.Group;
	// private gp_tab_animation:eui.Group;
	// private gp_tab_event:eui.Group;
	private gp_eventContainers:eui.Group;
	// private gp_eventContainer_style:eui.Group;
	// private gp_eventContainer_animation:eui.Group;
	// private gp_eventContainer_event:eui.Group;
	private gp_container_addEvent:eui.Group;
	private btn_add_event:eui.Button;
	private gp_add_click_event:eui.Group;
	private gp_eventContainer_event_click:eui.Group;
	private gp_selection_rect:eui.Label;
	private gp_selection_box:eui.Group;
	private gp_selection:eui.Group;
	private gp_eventSetContainer:eui.Group;

	private gp_inputContainer:eui.Group;
	private input_width:eui.TextInput;
	private btn_update:eui.Button;
	private scroller_eventSet:eui.Scroller;

	private color_AEEEEE:number = 0xAEEEEE;
	private color_000000:number = 0x000000;	

	private _selectionVisible:boolean = false;
	public get selectionVisible():boolean {
		return this._selectionVisible;
	}
	public set selectionVisible(v:boolean) {
		this._selectionVisible = v;
		this.gp_selection_box.visible = v;
	}
	// TODO: 
	// 获取选中目标的id
	// 转化 properties/triggerGroup 中由选中目标与触发的对象目标元素的数据结构 形成一个数组 用于判断初始化CheckItem时的selected状态以及渲染对应的eventSet组件
	// 假数据 测试用：
	private _targetItemId:number = 8401;
	public get targetItemId():number {
		return this._targetItemId;
	}
	public set targetItemId(v:number) {
		this._targetItemId = v;
	}
	private _triggerGroup:Array<any>;
	public get triggerGroup():Array<any> {
		return this._triggerGroup;
	}
	public set triggerGroup(v:Array<any>) {
		this._triggerGroup = v;
		let triggerGroupFilter = v.filter(item => item.targetId == this.targetItemId);
		this.relevanceItemIdList = triggerGroupFilter.map(item => item.sourceId);
		let obj = {};
		for(let i = 0,len = triggerGroupFilter.length; i < len; i++){
			let item = triggerGroupFilter[i];
			obj[item.sourceId] = item;
			obj[item.sourceId].id = item.sourceId;
			obj[item.sourceId].title = item.sourceId;	
			obj[item.sourceId].isShow = true;			
			obj[item.sourceId].delayed = item.delay;								
		};
		this.relevanceItemIdObj = obj;
		console.log('this.relevanceItemIdObj...');
		console.log(obj);
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
	// public relevanceItemIdObj = {
	// 	8401: {
	// 		id: 8401,
	// 		title: '8401',
	// 		isShow: true,
	// 		delayed: 100,
	// 	},
	// };

	public data:Object = {
		width: 30,
		height: 30,
		x: 30,
		y: 30,
		rotate: 10,
	}

	private static _instance:SiderbarSkinBy = null;
	public static getInstance(){
		if(SiderbarSkinBy._instance == null){
			SiderbarSkinBy._instance = new SiderbarSkinBy();
		};
		return SiderbarSkinBy._instance;
	}
	
	private _tabIndex:number;
	public get tabIndex():number {
		return this._tabIndex;
	}
	public set tabIndex(v:number){
		this._tabIndex = v;
		this.changeTabIndex(v);
		this.gp_container_addEvent.visible = false;
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
		this.listenEvent();
		this.tabIndex = 2;
	}
	private listenEvent(){
		// 启用舞台的鼠标支持
		// 开启监听鼠标的移动事件
		mouse.enable(this.stage);
		mouse.setMouseMoveEnabled(true);
		// 监听tabs click事件
		this.gp_tabs.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTabsClick, this);
		this.btn_add_event.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchAddEvent, this);
		this.gp_add_click_event.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addClickEventItem, this);
		this.gp_selection_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchSelection, this);

		for(let i = 0, len = this.gp_inputContainer.numChildren; i < len; i++){
			let groupInpput = <eui.Group>this.gp_inputContainer.getChildAt(i);
			let input = groupInpput.getChildAt(1);
			input.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onFocusOut, this);			
		}
	}
	private touchTabsClick(evt:egret.TouchEvent){
		var point = new egret.Point(evt.stageX - this.x - 0,evt.stageY - this.y - 60);
		for(let i = 0, len = this.gp_tabs.numChildren; i < len; i++){
			let tab = <eui.Group>this.gp_tabs.getChildAt(i);
			let rect = new egret.Rectangle(tab.x,tab.y,tab.width,tab.height);
			if(rect.containsPoint(point)){
				console.log(tab);
				console.log(i);
				this.tabIndex = i;
				break;
			}
		}
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
	private touchSelection(){
		this.selectionVisible = !this.selectionVisible;
		if(this.selectionVisible){
			this.gp_selection.removeChildren();
			let g: Game = this.parent as Game;
			let disPlayList = g.editGroup.displayList;
			for(let j = 0, num = disPlayList.length; j < num; j++){
				let displayItemData = disPlayList[j].image.data;
				let relevanceItemId = displayItemData.id;
				let checkBoxGroup:CheckItem = new CheckItem(relevanceItemId);
				checkBoxGroup.y = 30 * j;
				checkBoxGroup.addEventListener(egret.Event.ADDED_TO_STAGE, () => {
					let isSelected = this.relevanceItemIdList.indexOf(relevanceItemId) == -1 ? false : true;
					checkBoxGroup.isSelected = isSelected;
				}, this);
				checkBoxGroup.addEventListener(mouse.MouseEvent.MOUSE_OVER, (evt:egret.TouchEvent) => {
					checkBoxGroup.isOver = true;
				}, this);
				checkBoxGroup.addEventListener(mouse.MouseEvent.MOUSE_OUT, (evt:egret.TouchEvent) => {
					checkBoxGroup.isOver = false;
				}, this);
				checkBoxGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, (evt:egret.TouchEvent) => {
					let checkItem = checkBoxGroup.checkBox;
					console.log(checkItem);
					console.log('selected = ' + checkItem.selected);
					let selected = checkItem.selected;
					let eventSetMessage = this.relevanceItemIdObj[relevanceItemId];
					if(!eventSetMessage){
						this.relevanceItemIdObj[relevanceItemId] = {
							id: relevanceItemId,
							title: relevanceItemId.toString(),
							isShow: true,
							delayed: 100
						};
						this.relevanceItemIdObj = this.relevanceItemIdObj;
						eventSetMessage = this.relevanceItemIdObj[relevanceItemId];
					}
					if(selected){
						this.pushEventSet(eventSetMessage);
						this.relevanceItemIdList.push(relevanceItemId);
					}else {
						this.removeEventSet(eventSetMessage);
					}
				}, this);
				this.gp_selection.addChild(checkBoxGroup);
			}
		};
	}
	private pushEventSet(eventSetMessage){
		console.log('eventSetMessage...');
		console.log(eventSetMessage);
		let {id,title,isShow,delayed} = eventSetMessage;
		let eventSet:EventSetDome = new EventSetDome(title);
		this.gp_eventSetContainer.addChild(eventSet);
		eventSet.id = id;		
		eventSet.name = id;
		eventSet.delayed = delayed;
		eventSet.isShow = isShow;
		eventSet.y = (this.gp_eventSetContainer.numChildren - 1) * eventSet.height;
		this.setupEventSetContainer();
	}
	public removeEventSet(eventSetMessage){
		let relevanceItemId = eventSetMessage.id;
		console.log('relevanceItemId = ' + relevanceItemId);
		let eventSet = this.gp_eventSetContainer.getChildByName(relevanceItemId);
		console.log(eventSet);
		this.gp_eventSetContainer.removeChild(eventSet);
		for(let i = 0, len = this.gp_eventSetContainer.numChildren; i < len; i++){
			let eventSet = this.gp_eventSetContainer.getChildAt(i);
			eventSet.y = eventSet.height * i;
		};
		this.setupEventSetContainer();
		this.relevanceItemIdList.splice(this.relevanceItemIdList.indexOf(relevanceItemId), 1);
		delete this.relevanceItemIdObj[relevanceItemId];
		this.relevanceItemIdObj = this.relevanceItemIdObj;
	}
	private setupEventSetContainer(){
		let numChildren;
		this.gp_eventSetContainer.height = (numChildren = this.gp_eventSetContainer.numChildren) 
		? numChildren * this.gp_eventSetContainer.getChildAt(0).height
		: 0;
		let scrollerContainerHeight = this.scroller_eventSet.height;
		setTimeout(() => {
			// 是否自动隐藏，取决于属性visible
			this.scroller_eventSet.verticalScrollBar.autoVisibility = false;
			this.scroller_eventSet.verticalScrollBar.visible = this.gp_eventSetContainer.height > scrollerContainerHeight;	
		}, 0);
	}
	private initShowEventSetList(){
		this.gp_eventSetContainer.removeChildren();
		let g: Game = this.parent as Game;
		let disPlayList = g.editGroup.displayList;
		for(let j = 0, num = disPlayList.length; j < num; j++){
			let displayItemData = disPlayList[j].image.data;
			let relevanceItemId = displayItemData.id;
			let isSelected = this.relevanceItemIdList.indexOf(relevanceItemId) == -1 ? false : true;
			if(isSelected){
				let eventSetMessage = this.relevanceItemIdObj[relevanceItemId];
				this.pushEventSet(eventSetMessage);
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


		console.log(tool.endMatrix.getRotationX(),tool.endMatrix.getRotationY());
		console.log(tool.regX, tool.regY);
		this.container.editGroup.render();
		// console.log(tool.regEndU, tool.regEndV);
		// console.log(tool.regStartU, tool.regStartV);
	}
	private activetedTab(tab:eui.Group){
		let label = <eui.Label>tab.getChildByName('label');
		let rect_default = <eui.Rect>tab.getChildByName('rect_default');
		let rect_activeted = <eui.Rect>tab.getChildByName('rect_activeted');	
		rect_default.visible = false;
		rect_activeted.visible = true;			
		label.textColor = this.color_AEEEEE;
	}
	private unActivetedTab(tab:eui.Group){
		let label = <eui.Label>tab.getChildByName('label');
		let rect_default = <eui.Rect>tab.getChildByName('rect_default');
		let rect_activeted = <eui.Rect>tab.getChildByName('rect_activeted');	
		rect_default.visible = true;
		rect_activeted.visible = false;			
		label.textColor = this.color_000000;
	}
	private cleanTab(){
		for(let i = 0, len = this.gp_tabs.numChildren; i < len; i++){
			let tab = <eui.Group>this.gp_tabs.getChildAt(i);
			this.unActivetedTab(tab);
		}
	}
	private cleanContainer(){
		for(let i = 0, len = this.gp_eventContainers.numChildren; i < len; i++){
			let eventContainer = <eui.Group>this.gp_eventContainers.getChildAt(i);
			eventContainer.visible = false;
		}
	}
	private changeTabIndex(index: number){
		let tab = <eui.Group>this.gp_tabs.getChildAt(index);
		let eventContainer = <eui.Group>this.gp_eventContainers.getChildAt(index);
		this.cleanTab();
		this.activetedTab(tab);		
		this.cleanContainer();
		eventContainer.visible = true;
	}
}