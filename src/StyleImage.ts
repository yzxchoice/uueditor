class StyleImage extends eui.Component{
	private siderbar: Siderbar = Siderbar.getInstance();
	private image: any = this.siderbar.tool.target.owner.image;

	private stateObj: any;
	private config: any;
	private props: any;
	private inputType: string;
	private btn_image: eui.Button;
	public constructor(config, props) {
		super();
		this.config = config;
		this.props = props;
		this.inputType = config.type;
		this.stateObj = {
			title: config.title,
			content: this.image.getProps()[this.inputType]
		}
		this.skinName = 'resource/skins/StyleImageSkin.exml';
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}
	private onAddToStage(){
		this.initEvent();
	}
	private initEvent(){
		this.btn_image.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
	}
	private onClick(){
		let g = <Game>this.siderbar.parent;		
		g.openImagePanel((url) => {
			console.log(url);
			let props = this.image.getProps();
			props[this.inputType] = url;
			this.image.setProps(props);
			this.image.redraw();
		}, true);
	}
}