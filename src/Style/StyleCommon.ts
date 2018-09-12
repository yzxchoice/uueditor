class StyleCommon extends StyleBase {
	private form_component: any;
	private styleType: number;
	private styleTypeConfig: StyleTypeConfigItem;

	private colorSelectBox: ColorSelectBox;

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
		this.initComponent();
	}

	private initEvent(){ 
		if(!this.styleTypeConfig.eventName) return;
		this.form_component.addEventListener(this.styleTypeConfig.eventName, this.event, this);		
	}

	private initComponent(){
		switch(this.styleType){
			case LabelStyleType.StyleSelect:
				this.initSelect();
				break;
		};
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
			case LabelStyleType.StyleImage:
				let g = <Game>this.siderbar.parent;		
				g.openImagePanel((url) => {
					this.updateValue(url);
				}, true);
				return;
			case LabelStyleType.StyleColor:
				this.StyleColorEvent();
				return;
		};
		console.log('value = ' + value);
		this.updateValue(value);
	}

	private StyleColorEvent(){
		if(!this.colorSelectBox || !this.colorSelectBox.isShow){
			let colorSelectBox: ColorSelectBox = new ColorSelectBox();
			colorSelectBox.draw(this.parent);
			colorSelectBox.x = 280;
			colorSelectBox.y = 100;
			this.colorSelectBox = colorSelectBox;
			this.colorSelectBox.listenColorChange(this.updateValue.bind(this));
		}else {
			this.colorSelectBox.undraw();
		}
	}

	private initSelect(){
		let select = new Select(this.config.selectData);
		
		this.form_component.addChild(select);	
		select.setDataContainer(this);	
		select.setDefaultItem(this.props[this.inputType]);
		select.listenSelectChange(this.updateValue.bind(this));
	}
}