class StyleImage extends StyleBase{
	private btn_image: eui.Button;
	public constructor(config, props) {
		super(config, props);
		this.skinName = 'resource/skins/StyleImageSkin.exml';
	}
	protected initEvent(){
		this.btn_image.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
	}
	private onClick(){
		let g = <Game>this.siderbar.parent;		
		g.openImagePanel((url) => {
			this.updateValue(url);
		}, true);
	}
}