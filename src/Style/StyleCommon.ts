class StyleCommon extends StyleBase {
	private form_component: any;
	private styleType: number;
	private styleTypeConfig: StyleTypeConfigItem;
	public constructor(config: ConfigItem, props) {
		super(config, props);
		let styleType: number = config.styleType;
		this.styleType = styleType;
		this.styleTypeConfig = StyleTypeConfig[styleType];
		this.skinName = this.styleTypeConfig.skinName;
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}

	private onAddToStage(){
		this.initEvent();
	}

	private initEvent(){
		this.form_component.addEventListener(this.styleTypeConfig.eventName, this.event, this);		
	}

	private event(evt:egret.Event){
		let value;
		switch(this.styleType){
			case LabelStyleType.StyleInput:
				value = evt.target.text;
				break;
			case LabelStyleType.StyleToggleSwitch:
				value = evt.target.selected;
				break;
			case LabelStyleType.StyleHSlider:
				value = evt.target.value;
				break;
		};
		console.log('value = ' + value);
		this.updateValue(value);
	}
}