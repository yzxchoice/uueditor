class TabAnimation extends eui.Component implements IUUContainer{
	container: Siderbar;
	editGroup: EditGroup;
	dispose (): void {

	}

	draw (container: any): void{
		this.container = container;
		this.editGroup = container.editGroup;
	}
	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
	}
	private onAddedToStage(){
		this.init()
	}
	private init(){
		
	}
}