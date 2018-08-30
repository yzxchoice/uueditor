class StyleBase extends eui.Component{
	private siderbar: Siderbar = Siderbar.getInstance();
	private image: any = this.siderbar.tool.target.owner.image;

	private stateObj: any;
	private config: any;
	private props: any;
	private inputType: string;
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
}