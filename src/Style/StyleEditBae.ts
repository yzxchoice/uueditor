class StyleEditBae extends eui.Component {
	private siderbar: Siderbar = Siderbar.getInstance();
	private image: IUUComponent = this.siderbar.tool.target.owner.image;

	private stateObj: {title: string,content: string};
	private config: ConfigItem;
	private props: any;
	private lb_edit: eui.Label;
	private table: Table;
	private initdata: any[];
	private data: {
		value: string,
		componentType: any,
		selectData?: {content: string}[]
	}[];

	protected headData: string[];
	protected propsKey: string;
	protected componenntTypeConfig: {
        [key: string]: string;
    };

	public constructor(config: ConfigItem, props) {
		super();
		this.config = config;
		this.props = props;
		this.stateObj = {
			title: config.title,
			content: props[config.type]
		}
		this.skinName = 'resource/skins/StyleCircleSectorSkin.exml';
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}
	private onAddToStage(){
		this.initEvent();
		this.initConfig();
		this.initdata = this.image.getProps()[this.propsKey];
		this.data = this.exchangeInitdata(this.initdata);
	}

	private initConfig(){
		let { headData, propsKey, componenntTypeConfig } = this.config.editConfig;
		this.headData = headData;
		this.propsKey = propsKey;
		this.componenntTypeConfig = componenntTypeConfig;
	}

	private initEvent(){
		this.lb_edit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
	}

	private onClick(){
		if(!this.table || !this.table.isShow){
			let table: Table = new Table(this.headData, this.data);
			table.listenChange(this.exchangeData.bind(this));
			table.draw(this);
			table.x = 0;
			table.y = 60;
			this.table = table;
		}else {
			this.table.undraw();
		}
	}
	// 将data.json数据转换成Tabel需要的数据
	protected exchangeInitdata(initdata){
		let componenntTypeConfig = this.componenntTypeConfig;
		let arr = [];
		for(let i = 0, len = initdata.length; i < len; i++){
			let newObj = {};
			let obj = initdata[i];
			Object.keys(obj).forEach(key => {
				newObj[key] = {
					value: obj[key],
					componentType: componenntTypeConfig[key]
				}
			});
			arr.push(newObj);
		};
		return arr;
	}
	// 将Tabel需要的数据转换成data.json数据
	private exchangeData(){
		let arr = [];
		for(let i = 0, len = this.data.length; i < len; i++){
			let newObj = {};
			let obj = this.data[i];
			Object.keys(obj).forEach(key => {
				newObj[key] = obj[key].value;
			});
			arr.push(newObj);
		};
		// 改变initdata的同时改变data.json中props中的对应属性
		this.initdata = this.props[this.propsKey] = arr;
		let props = this.image.getProps();
		props[this.propsKey] = arr;
		this.image.setProps(props);
		this.image.redraw();
	}

}
