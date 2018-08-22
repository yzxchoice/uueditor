class StyleTextColor extends eui.Component{
	private stateObj: any;
	private config: any;
	private props: any;
	private inputType: string;
	private textInput_input: eui.TextInput;
	private lb_selectColor: eui.Label;
	private colorSelectBox: ColorSelectBox;
	public constructor(config, props) {
		super();
		this.config = config;
		this.props = props;
		this.inputType = config.type;
		this.stateObj = {
			title: config.title,
			content: props[this.inputType]
		}
		this.skinName = 'resource/skins/StyleTextColorSkin.exml';
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}

	private onAddToStage(){
		this.initEvent();
	}

	private initEvent(){
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
		console.log('color = ' + color);
		this.stateObj.content = color;
		this.props[this.inputType] = color;
	}
}