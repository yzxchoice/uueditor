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

	private gp_inputContainer:eui.Group;
	private input_width:eui.TextInput;
	private btn_update:eui.Button;

	private color_AEEEEE:number = 0xAEEEEE;
	private color_000000:number = 0x000000;	

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
		this.tabIndex = 0;
	}
	private listenEvent(){
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
		// this.btn_update.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFocusOut, this)
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
	private touchSelection(evt: egret.TouchEvent){
		let isShow = this.gp_selection_box.visible = !this.gp_selection_box.visible;
		if(isShow){
			this.gp_selection.removeChildren();
			let g: Game = this.parent as Game;
			let disPlayList = g.editGroup.displayList;
			for(let j = 0, num = disPlayList.length; j < num; j++){
				let checkBox:eui.CheckBox = new eui.CheckBox();
				checkBox.y = 30 * j;
				checkBox.label = `元素${j + 1}`;
				let displayItemData = disPlayList[j].image.data;
				checkBox.selected = false;
				checkBox.addEventListener(egret.Event.CHANGE, (displayItemData => {
					return () => {
						console.log(displayItemData);
					}
				})(displayItemData), this);
				this.gp_selection.addChild(checkBox);
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