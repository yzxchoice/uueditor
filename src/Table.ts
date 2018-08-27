interface Item {
	value: string,
	componentType: any,
	selectData?: {content: string}[],
}

class Table extends eui.Group {
	private gp_box: eui.Group;
	private headData: string[];
	private container: any;
	isShow: boolean = false;
	private columnNum: number;
	private rowNum: number;
	private lineHeight = 40;
	private boxWidth: number = 500;
	private btn_add: eui.Button;
	private btn_del: eui.Button;
	private btn_sure: eui.Button;

	private activeRow: eui.Group;
	private activeIndex: number;
	
	private data: any;
	private _data : any;

	private cb: Function;

	
	public constructor(headDate, data) {
		super();
		this.headData = headDate;
		this.data = data;
		this._data =  JSON.parse(JSON.stringify(this.data));
		this.observer(this.data);
		this.columnNum = this.headData.length;
		this.rowNum = this.data.length + 1;
		// this.skinName = 'resource/skins/TableSkin.exml';
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}
	private onAddToStage(){
		this.init();
		this.initEvent();
	}
	private init(){
		this.removeChildren();
		this.gp_box = new eui.Group();
		var tLayout:eui.TileLayout = new eui.TileLayout();
		this.gp_box.layout = this.createTileLayout(1);
		this.reload();
		let vLayout = new eui.VerticalLayout();
		this.layout = vLayout;	
		this.addChild(this.gp_box);
		this.addChild(this.createBtnBox());		
	}
	private reload(){
		this.gp_box.removeChildren();
		this.gp_box.addChild(this.createHead());
		for(let i = 0, len = this.data.length; i < len; i++){
			let obj = this.data[i];
			this.gp_box.addChild(this.createRow(obj, i));
		}
	}
	private initEvent(){
		this.btn_add.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_add_click, this);
		this.btn_del.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_del_click, this);
		this.btn_sure.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_sure_click, this);		
	}
	private btn_add_click(){
		console.log('add...');
		let item = this.data[this.data.length - 1];
		this.data.push(JSON.parse(JSON.stringify(item)));
		this._data =  JSON.parse(JSON.stringify(this.data));
		this.observer(this.data);
		this.reload();
	}
	private btn_del_click(evt: egret.TouchEvent){
		console.log('del...');
		try {
			this.gp_box.removeChild(this.activeRow);
			this.data.splice(this.activeIndex, 1);
		}catch(e){
			console.log(e);
		}
	}
	private btn_sure_click(){
		console.log('sure...');
		console.log(this.data);
	}
	private createHead(): eui.Group {
		let group = new eui.Group;
		group.layout = this.createTileLayout(this.columnNum);
		for(let value of this.headData){
			group.addChild(this.createTh(value));
		}
		return group;
	} 
	private createRow(obj: Object, index: number): eui.Group{
		console.log('index = ' + index);
		let group = new eui.Group;
		group.name = index.toString();
		group.layout = this.createTileLayout(this.columnNum);
		for(let key in obj){
			let td = this.createTd(key, obj[key]);
			group.addChild(td);
		};
		return group;
	}
	private createTh(value: string){
		let group = new eui.Group();
		let input: eui.EditableText | eui.Label;
		input = new eui.Label();
		input.textAlign = 'center';
		input.textColor = 0x00000;
		input.size = 26;
		input.text = value;
		input.verticalAlign = 'middle';		
		group.addChild(input);
		input.width = this.boxWidth / this.columnNum;	
		input.height = this.lineHeight;	
		return group;
	}
	private createTd(key: string, value: Item): eui.Group {
		let group = new eui.Group();
		let com = value.componentType ? eval(value.componentType) : eui.EditableText;
		let input;
		switch(com){
			case eui.EditableText:
				input = new com();
				input.name = key;
				input.background = true;
				input.backgroundColor = 0xffffff;
				input.addEventListener(egret.FocusEvent.FOCUS_IN, this.onFocusIn, this);			
				input.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onFocusOut, this);

				input.textColor = 0x00000;
				input.size = 26;
				input.text = value.value;
				input.verticalAlign = 'middle';		
				break;
			case Select:
				let itemWidth: number = this.boxWidth / this.columnNum;
				input = new com(value.selectData, itemWidth);
				input.setDefaultItem(value.value);
				let callback = function(selectedVal: string){
					value.value = selectedVal;
				}
				input.listenSelectChange(callback);
				break;
			case eui.Button:
				input = new com();
				input.label = value.value;
				break;
		}
		group.addChild(input);
		input.width = this.boxWidth / this.columnNum;	
		input.height = this.lineHeight;	
		return group;
	}
	draw(container){
		this.container = container;
		this.container.addChild(this);
		this.isShow = true;				
	}
	undraw(){
		this.container.removeChild(this);		
		this.isShow = false;		
	}
	listenChange(cb){
		this.cb = cb;
	}
	private createTileLayout(columnCount: number): eui.TileLayout{
		var tLayout:eui.TileLayout = new eui.TileLayout();
		tLayout.horizontalGap = 10;
		tLayout.verticalGap = 10;
		tLayout.columnAlign = eui.ColumnAlign.JUSTIFY_USING_WIDTH;
		tLayout.rowAlign = eui.RowAlign.JUSTIFY_USING_HEIGHT;
		tLayout.requestedColumnCount = columnCount;  /// 设置两列显示
		return tLayout
	}
	private createBtnBox(): eui.Group{
		let group = new eui.Group();
		group.width = this.boxWidth;
		let hlayout = new eui.HorizontalLayout();
		hlayout.verticalAlign = 'middle';
		hlayout.horizontalAlign = 'center';
		hlayout.gap = 40;
		group.layout = hlayout;
		this.btn_add = this.createBtn('添加');
		this.btn_del = this.createBtn('删除');
		this.btn_sure = this.createBtn('确定');
		group.addChild(this.btn_add);
		group.addChild(this.btn_del);
		group.addChild(this.btn_sure);		
		return group;
	}
	private createBtn(content: string): eui.Button{
		let btn = new eui.Button();
		btn.height = 40;
		btn.width = 80;
		btn.label = content;
		return btn;
	}
	private onFocusIn(evt:egret.FocusEvent){
		console.log('onFocusIn...');
		let target = evt.target;
		let row = target.parent.parent;
		this.activeRow = row;
		this.activeIndex = Number(row.name);
		console.log(target);
		console.log(row);
	}	
	private onFocusOut(evt:egret.FocusEvent){
		console.log('onFocusOut...');
		let target = evt.target;
		let key = target.name;
		let text = target.text;
		console.log(target);
		console.log(name);
		this.data[this.activeIndex][key].value = text;
	}
	// 对props进行双向数据绑定
	private observer(data) {
		data.forEach((outObj, index) => Object.keys(outObj).forEach(key => {
			let innerObj = outObj[key];
			Object.keys(innerObj).forEach(innerKey => {
				if(innerKey == 'value'){
					Object.defineProperty(innerObj, innerKey, {
						enumerable: true,
						configurable: true,
						get: () => {
							return this._data[index][key].value;
						},
						set: (newValue) => {
							if(newValue === this._data[index][key].value) return;
							this._data[index][key].value = newValue;
							console.log('props key is change');
							this.cb && this.cb();
							// TODO: 通知外部组件数据已经变化
						}
					})
				}
			})
		}));
	};
}