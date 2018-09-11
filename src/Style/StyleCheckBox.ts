class StyleCheckBox extends StyleBase {
	private checkBoxData: Array<RadioData>;
	private gp_radioGroup: eui.Group;
	public constructor(config, props) {
		super(config, props);
		this.checkBoxData = config.checkBoxData;
		this.skinName = 'resource/skins/StyleRadioSkin.exml';
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}
	private onAddToStage(){
		this.initEvent();
	}
	private initEvent(){
		this.createRadioGroup();
	}
	private createRadioGroup(): void{
		for(let item of this.checkBoxData){
			let { label, isSelected } = item;
			let checkBox = this.createCheckBox(label, isSelected);
			this.gp_radioGroup.addChild(checkBox);
		}
	}
	private createCheckBox(label: string, isSelected: boolean = false): eui.CheckBox {
		let cbx = new eui.CheckBox();
		cbx.label = label;
		cbx.selected = isSelected;
		cbx.addEventListener(eui.UIEvent.CHANGE, this.checkBoxChangeHandler, this);
		return cbx;
	}
	private checkBoxChangeHandler(evt:eui.UIEvent):void {
		var target: eui.CheckBox = evt.target;
		let label = target.label;
		let selected = target.selected;
		let item = this.checkBoxData.filter(item => item.label === label)[0];
		item.isSelected = selected;
		console.log(this.checkBoxData);		
		this.updateValue(this.checkBoxData);
	}

}