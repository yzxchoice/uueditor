class UUBorderContainer extends eui.Group implements IUUContainer{
    container: any;
	dispose(){

	};
	draw(container: any){

	};
	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
	}
	private onAddedToStage(){
		
	}
}