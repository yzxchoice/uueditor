class StyleSelect extends eui.Component{
	private stateObj: any;
	private config: any;
	private props: any;
	private selectData: {content: string}[];
	private inputType: string;
	private textInput_input: eui.TextInput;
	private gp_style_fontFamily_select: eui.Group;	
	public constructor(config, props) {
		super();
		this.config = config;
		this.props = props;
		this.selectData = config.selectData;
		this.inputType = config.type;
		this.stateObj = {
			title: config.title,
			content: props[this.inputType]
		}
		this.skinName = 'resource/skins/StyleSelect.exml';
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}
	private onAddToStage(){
		this.initSelect();
	}
	private initSelect(){
		let select = new Select(this.selectData);
		
		this.gp_style_fontFamily_select.addChild(select);	
		select.setDataContainer(this);	
		select.setDefaultItem(this.props[this.inputType]);
		select.listenSelectChange(this.getFontFamily.bind(this));
	}
	public getFontFamily(v){
		console.log('fontFamily = ' + v);
		this.props[this.inputType] = v;
	}
}