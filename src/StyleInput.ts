class StyleInput extends StyleBase {
	private textInput_input: eui.TextInput;
	public constructor(config, props) {
		super(config, props);
		this.skinName = 'resource/skins/StyleInputSkin.exml';
	}
	protected initEvent(){
		this.textInput_input.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onFocusOut, this);		
	}

	private onFocusOut(evt:egret.FocusEvent){
		let value = evt.target.text;
		this.updateValue(value);
	}
}