class StyleRadio extends StyleBase {
	private radioData: Array<RadioData>;
	private gp_radioGroup: eui.Group;
	public constructor(config, props) {
		super(config, props);
		this.skinName = 'resource/skins/StyleRadioSkin.exml';
		this.radioData = config.radioData;
	}
	protected initEvent(){
		this.createRadioGroup();
	}
	private createRadioGroup(): eui.RadioButtonGroup{
		let radioGroup: eui.RadioButtonGroup = new eui.RadioButtonGroup();
    	radioGroup.addEventListener(eui.UIEvent.CHANGE, this.radioChangeHandler, this);
		for(let item of this.radioData){
			let { label, value, isSelected } = item;
			let radio = this.createRadio(label, value, isSelected);
			radio.group = radioGroup;
			this.gp_radioGroup.addChild(radio);
		}
		return radioGroup;
	}
	private createRadio(label: string, value, isSelected: boolean = false): eui.RadioButton {
		let rdb: eui.RadioButton = new eui.RadioButton();
		rdb.label = label;
    	rdb.value = value;
		rdb.selected = isSelected;
		return rdb;
	}
	private radioChangeHandler(evt:eui.UIEvent):void {
		var radioGroup: eui.RadioButtonGroup = evt.target;
		console.log(radioGroup.selectedValue);
		let value = radioGroup.selectedValue;
		let label = this.radioData.filter(item => item.value === value)[0].label;
		console.log('value = ' + value);
		console.log('label = ' + label);	
		this.updateValue(value);
		// this.updateValue(label);
	}

}