class StyleType1 extends eui.Component implements IUUContainer{
	container: any;
	dispose (): void {

	}
	draw (container: any): void{
		this.container = container;
		this.container.addChild(this);
	}
	private stateObj: any;
	private _data: any;
	public get data(): any {
		return this._data;
	}
	public set data(v: any){
		this._data = v;
		this.stateObj = JSON.parse(JSON.stringify(v));
	}
	private inputType: string;
	private gp_styleContainer: eui.Group;
	private dataContainer: TabStyle;
	private item: any;
	public constructor() {
		super();
		this.skinName = 'resource/skins/StyleType1Skin.exml';
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}

	private onAddToStage(){
		this.initEvent();
	}

	private initEvent(){
		for(let i = 0, len = this.gp_styleContainer.numChildren; i < len; i++){
			let groupInpput = <eui.Group>this.gp_styleContainer.getChildAt(i);
			let input = groupInpput.getChildAt(1);
			input.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onFocusOut, this);		
			input.addEventListener(egret.FocusEvent.FOCUS_IN, this.onFocusIn, this);							
		};
	}
	setDataContainer(dataContainer: TabStyle){
		this.dataContainer = dataContainer;
		this.item = dataContainer.tool.target.owner.image;
		this.data = this.item.data;
	}
	private onFocusIn(evt: egret.FocusEvent){
		console.log('onFocusIn...');
		let textInput:eui.TextInput = evt.target.parent;
		let name:string = textInput.name;
		this.inputType = name;
	}
	private onFocusOut(evt:egret.FocusEvent){
		console.log('onFocusOut...');
		let value = evt.target.text;
		console.log('item...');
		console.log(this.item);
		console.log('tool...');
		console.log(this.dataContainer.tool);
		if(this.inputType == 'text'){
			this.data.content = value;
		}else {
			this.data.property[this.inputType] = value;
		}
		let target: Transformable = this.dataContainer.tool.target;
		let preWidth = this.item.width;
		console.log('this.item.width = ' + this.item.width);
		console.log('this.item.height = ' + this.item.height);		
		setTimeout(() => {
			let nowWidth = this.item.width;
			this.dataContainer.tool.scale(nowWidth / preWidth);	
			this.dataContainer.tool.startMatrix.copyFrom(this.dataContainer.tool.endMatrix);
			console.log('render...');			
			this.dataContainer.editGroup.render();
			console.log('this.item.width = ' + this.item.width);
			console.log('this.item.height = ' + this.item.height);
			// target.width = this.item.width;
			// target.height = this.item.height;	
		}, 0);

		console.log('render...');
		// this.dataContainer.editGroup.render();

		// this.dataContainer.editGroup.render();
		// console.log('refresh...');;
		// this.dataContainer.editGroup.refresh();
	}

}