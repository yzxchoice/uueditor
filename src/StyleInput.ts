class StyleInput extends eui.Component{
	private stateObj: any;
	private config: any;
	private props: any;
	private inputType: string;
	private textInput_input: eui.TextInput;
	public constructor(config, props) {
		super();
		this.config = config;
		this.props = props;
		this.inputType = config.type;
		this.stateObj = {
			title: config.title,
			content: props[this.inputType]
		}
		this.skinName = 'resource/skins/StyleInputSkin.exml';
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}
	private onAddToStage(){
		this.initEvent();
	}
	private initEvent(){
		this.textInput_input.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onFocusOut, this);		
		this.textInput_input.addEventListener(egret.FocusEvent.FOCUS_IN, this.onFocusIn, this);
	}
	private onFocusIn(evt: egret.FocusEvent){
		console.log('onFocusIn...');
	}
	private onFocusOut(evt:egret.FocusEvent){
		console.log('onFocusOut...');
		let value = evt.target.text;
		console.log('value = ' + value);
		this.props[this.inputType] = value;
	}
}