class StyleSelect extends StyleBase {

	private selectData: {content: string}[];
	private gp_style_fontFamily_select: eui.Group;	
	public constructor(config, props) {
		super(config, props);
		this.selectData = config.selectData;
		this.skinName = 'resource/skins/StyleSelect.exml';
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}
	private onAddToStage(){
		this.initEvent();
	}
	private initEvent(){
		let select = new Select(this.selectData);
		
		this.gp_style_fontFamily_select.addChild(select);	
		select.setDataContainer(this);	
		select.setDefaultItem(this.props[this.inputType]);
		select.listenSelectChange(this.getFontFamily.bind(this));
	}
	public getFontFamily(v){
		this.updateValue(v);
	}
}