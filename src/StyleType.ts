class StyleType extends eui.Component implements IUUContainer{
	container: any;
	dispose (): void {

	}
	draw (container: any): void{
		this.container = container;
		this.container.addChild(this);
	}
	private item: any;
	private data : any;
	private styleType: number;
	private props: any;
	private _props: any;
	private gp_styleContainer: eui.Group;
	private dataContainer: TabStyle;
	public constructor(styleType, props) {
		super();
		this.styleType = styleType;
		this.props = props;
		this._props =  JSON.parse(JSON.stringify(props));
		this.observer(this.props);
		this.skinName = 'resource/skins/StyleTypeSkin.exml';
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeFromStage, this);
	}

	private onAddToStage(){
		this.initPanel();
	}
	private removeFromStage(){
		this.clearPanel();
	}
	private clearPanel(){
		this.gp_styleContainer.removeChildren();
	}
	private initPanel(){
		let configList = UUPanelConfig[this.styleType];
		for(let i = 0, len = configList.length; i < len; i++){
			let config = configList[i];
			let com = this.createComponent(config, this.props);
			com.y = 70 * i;
			this.gp_styleContainer.addChild(com);
			this.gp_styleContainer.setChildIndex( com, 1 );					
		}
	}
	private createComponent(config, props){
		let componentType = config.componentType;
		let styleComponent = eval(componentType);
		return new styleComponent(config, props);
	}
	setDataContainer(dataContainer: TabStyle){
		this.dataContainer = dataContainer;
		this.item = dataContainer.tool.target.owner.image;
		this.data = this.item.data;
	}
	// 对props进行双向数据绑定
	private observer(data) {
		Object.keys(data).forEach(key => this.defineActive(data, key, data[key]));
	};
	private defineActive(data, key, value) {
		Object.defineProperty(data, key, {
			enumerable: true,
			configurable: true,
			get: () => {
				return this._props[key];
			},
			set: (newValue) => {
				if(newValue === this._props[key]) return;
				if(!this.isTargetSelected()) return;				
				this._props[key] = newValue;
				console.log('props key is change');
				this.refresh();
			}
		})
	};
	private refresh(){
		let target: Transformable = this.dataContainer.tool.target;	
		let picture:Picture = target.owner;
		
		this.dataContainer.tool.setTarget(null);  
		this.dataContainer.editGroup.clear();
		this.dataContainer.editGroup.updateDisplay(picture);		

		target.width = this.item.width;
		target.height = this.item.height;
		this.dataContainer.tool.setTarget(target);	
		this.dataContainer.tool.draw();		
		this.dataContainer.updateTarget();
	}
	private isTargetSelected(){
		let tool = this.dataContainer.tool;
		let target: Transformable = tool.target;
		if(!(tool && target)) return false;	
		return true;
	}
}