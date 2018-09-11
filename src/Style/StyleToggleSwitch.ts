class StyleToggleSwitch extends StyleBase {
	private btn_toggleSwitch: eui.ToggleSwitch;
	public constructor(config, props) {
		super(config, props);
		this.skinName = 'resource/skins/StyleToggleSwitchSkin.exml';
	}
	protected initEvent(){
		this.btn_toggleSwitch.addEventListener(eui.UIEvent.CHANGE, this.changeHandler, this);		
	}

	private changeHandler(evt:eui.UIEvent){
		let selected = evt.target.selected;
		console.log('selected = ' + selected);
		this.updateValue(selected);
	}
}