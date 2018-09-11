class StyleHSlider extends StyleBase {
	private sd_hSlider: eui.HSlider;
	public constructor(config, props) {
		super(config, props);
		this.skinName = 'resource/skins/StyleHSliderSkin.exml';
	}
	protected initEvent(){
		this.sd_hSlider.addEventListener(eui.UIEvent.CHANGE, this.changeHandler, this);		
	}

	private changeHandler(evt:eui.UIEvent){
		let value = evt.target.value;
		console.log('value = ' + value);
		this.updateValue(value);
	}
}