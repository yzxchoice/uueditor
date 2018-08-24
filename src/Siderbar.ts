class Siderbar extends eui.Component implements IUUContainer {
	container: Game;
	editGroup: EditGroup;
	tool: TransformTool;
	dispose (): void {

	}

	draw (container: any) {
		this.container = container;
		this.editGroup = this.container.editGroup;
		this.tool = this.editGroup.tool;
		this.container.addChild(this);
	}
	private static _instance:Siderbar = null;
	public static getInstance(){
		if(Siderbar._instance == null){
			Siderbar._instance = new Siderbar();
		};
		return Siderbar._instance;
	}
	public component_style: TabStyle;
	public component_animation: TabAnimation;
	public component_event: TabEvent;	
	public component_layer: TabLayer;
	private gp_tabs:eui.Group;
	private scl_eventContainer: eui.Scroller;

	public constructor() {
		super();
		this.skinName = "resource/skins/SiderbarSkin.exml";
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStageInit, this);
	}
	public selectTarget(){
		this.component_style.setTarget();
		this.component_event.getTargetItemId();  
		let editGroup = this.editGroup;          
		this.component_event.triggerGroup = editGroup.pages[editGroup.pageIndex].properties.triggerGroup;
	}
	public moveTarget(){
		this.component_style.updateTarget();
	}
	public upTarget(){
		this.component_style.updateTarget();		
	}
	public renderOneDisplay(){
		this.editGroup.renderOneDisplay();
	}
	public updateDisplay(display: Picture){
		this.editGroup.updateDisplay(display);		
	}
	private onAddToStageInit(event:egret.Event) {
        this.init();
    }
	private init(){
		this.listenEvent();
		this.component_style.draw(this);
		this.component_animation.draw(this);				
		this.component_event.draw(this);
		this.component_layer.draw(this)	;
		this.currentState = 'style';
	}
	private listenEvent(){
		this.gp_tabs.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTabsClick, this);
	}

	private touchTabsClick(evt:egret.TouchEvent){
		this.scl_eventContainer.viewport.scrollV = 0;
		this.currentState = evt.target.parent.name;
	}
}