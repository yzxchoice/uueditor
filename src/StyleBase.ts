class StyleBase extends eui.Component{
	protected siderbar: Siderbar = Siderbar.getInstance();
	protected image: any = this.siderbar.tool.target.owner.image;

	private stateObj: any;
	private config: any;
	protected props: any;
	protected inputType: string;
	public constructor(config, props) {
		super();
		this.config = config;
		this.props = props;
		this.inputType = config.type;
		this.stateObj = {
			title: config.title,
			content: this.image.getProps()[this.inputType]
		}
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}
	private onAddToStage(){
		this.initEvent();
	}
	protected initEvent(){

	}
	protected updateValue(value: number | string){
		this.stateObj.content = value;		
		this.props[this.inputType] = value;
		let props = this.image.getProps();
		props[this.inputType] = value;
		this.image.setProps(props);
		this.image.redraw();
	}
}