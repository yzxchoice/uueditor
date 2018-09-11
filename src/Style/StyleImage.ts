class StyleImage extends StyleBase{
	private btn_image: eui.Button;
	public constructor(config, props) {
		super(config, props);
		this.skinName = 'resource/skins/StyleImageSkin.exml';
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}

	private onAddToStage(){
		this.initEvent();
	}

	private initEvent(){
		this.btn_image.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
	}
	private onClick(){
		let g = <Game>this.siderbar.parent;		
		g.openImagePanel((url) => {
			this.updateValue(url);
		}, true);
	}
}