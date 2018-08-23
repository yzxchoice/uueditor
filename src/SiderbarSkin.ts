class SiderbarSkinBy extends eui.Component implements IUUContainer {
	container: Game;
	editGroup: EditGroup;
	dispose (): void {

	}

	draw (container: any) {
		this.container = container;
		this.editGroup = this.container.editGroup;
		this.container.addChild(this);
		let x: ILabel;
		// y's inferred type is { name: string; location: string; }
		let y = { data: '',text: '1', textColor: 0x000000, size: 16, lineSpacing: 2, textAlign: 'center', by: 'by' };
		x = y;
		console.log('x....');
		console.log(x);
	}
	private static _instance:SiderbarSkinBy = null;
	public static getInstance(){
		if(SiderbarSkinBy._instance == null){
			SiderbarSkinBy._instance = new SiderbarSkinBy();
		};
		return SiderbarSkinBy._instance;
	}
	public component_style: TabStyle;
	public component_animation: TabAnimation;
	public component_event: TabEvent;	
	public component_layer: LayerBox;
	private gp_tabs:eui.Group;
	private scl_eventContainer: eui.Scroller;

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