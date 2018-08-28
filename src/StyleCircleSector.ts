class StyleCircleSector extends eui.Component {
	private siderbar: Siderbar = Siderbar.getInstance();

	private stateObj: {title: string,content: string};
	private config: any;
	private props: any;
	private inputType: string;
	private textInput_input: eui.TextInput;
	private lb_edit: eui.Label;
	private table: Table;
	private headData: string[];
	private initdata: { 
		text: string,
		url: string,
	}[];
	private data: {
		value: string,
		componentType: any,
		selectData?: {content: string}[]
	}[];
	public constructor(config, props) {
		super();
		this.config = config;
		this.props = props;
		this.inputType = config.type;
		this.stateObj = {
			title: config.title,
			content: props[this.inputType]
		}
		let image = <CircleSector>this.siderbar.tool.target.owner.image;		
		this.initdata = image.getProps().awards;
		// this.initdata = props.list;		
		// 表头字段
		this.headData = ['文本','图片'];
		this.data = this.exchangeInitdata(this.initdata);
		this.skinName = 'resource/skins/StyleCircleSectorSkin.exml';
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}
	private onAddToStage(){
		this.initEvent();
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
	private exchangeInitdata(initdata){
		let arr = [];
		for(let i = 0, len = initdata.length; i < len; i++){
			let newObj = {};
			let obj = initdata[i];
			Object.keys(obj).forEach(key => {
				if(key == 'text'){
					newObj[key] = {
						value: obj[key],
						componentType: ''
					}
				}else if(key == 'url'){
					newObj[key] = {
						value: obj[key],
						componentType: 'eui.Button',
					}
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
		this.initdata = this.props.list = arr;
		let image = <CircleSector>this.siderbar.tool.target.owner.image;
		console.log('改变后的圆盘数据...');
		console.log(this.initdata);
		image.setProps(this.initdata);
		image.redraw();
	}

}
