class StyleColor extends StyleBase {
	private lb_selectColor: eui.Label;
	private colorSelectBox: ColorSelectBox;

	public constructor(config, props) {
		super(config, props);
		this.skinName = 'resource/skins/StyleTextColorSkin.exml';
	}

	protected initEvent(){
		this.lb_selectColor.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
	}

	private onClick(){
		if(!this.colorSelectBox || !this.colorSelectBox.isShow){
			let colorSelectBox: ColorSelectBox = new ColorSelectBox();
			colorSelectBox.draw(this.parent);
			colorSelectBox.x = 280;
			colorSelectBox.y = 100;
			this.colorSelectBox = colorSelectBox;
			this.colorSelectBox.listenColorChange(this.changeColor.bind(this));
		}else {
			this.colorSelectBox.undraw();
		}
	}
	public changeColor(color){
		this.updateValue(color);
	}
}