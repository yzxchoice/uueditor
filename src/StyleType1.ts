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
	private lb_selectColor: eui.Label;
	private gp_style_fontFamily: eui.Group;
	private gp_style_fontFamily_select: eui.Group;	
	private dataContainer: TabStyle;
	private item: any;
	private colorSelectBox: ColorSelectBox;
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
			try {
				let input = groupInpput.getChildAt(1);
				input.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onFocusOut, this);		
				input.addEventListener(egret.FocusEvent.FOCUS_IN, this.onFocusIn, this);	
			}catch(e) {
				console.log('input...');
			}						
		};
		this.lb_selectColor.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
	}
	private initSelect(){
		let data = [
			{
				content: 'Arial'
			},
			{
				content: 'DFKai-SB'
			},
			{
				content: 'FangSong'
			},
			{
				content: 'Georgia'
			},
			{
				content: 'Helvetica'
			},
			{
				content: 'KaiTi'
			},
			{
				content: 'Lucida Family'
			},
		];
		let select = new Select(data);
		
		this.gp_style_fontFamily_select.addChild(select);		
		this.gp_styleContainer.setChildIndex( this.gp_style_fontFamily, 5 );
		select.setDataContainer(this);	
		console.log(this.data);	
		select.setDefaultItem(this.data.props.fontFamily);
	}
	public getFontFamily(v){
		if(!this.isTargetSelected()) return;			
		this.data.props.fontFamily = v;
		this.refresh();
	}
	private onClick(){
		if(!this.colorSelectBox || !this.colorSelectBox.isShow){
			let colorSelectBox: ColorSelectBox = new ColorSelectBox();
			colorSelectBox.draw(this);
			colorSelectBox.x = 280;
			colorSelectBox.y = 100;
			this.colorSelectBox = colorSelectBox;
			this.colorSelectBox.listenColorChange(this.changeColor.bind(this));
		}else {
			this.colorSelectBox.undraw();
		}

	}
	setDataContainer(dataContainer: TabStyle){
		this.dataContainer = dataContainer;
		this.item = dataContainer.tool.target.owner.image;
		this.data = this.item.data;
		this.initSelect();
	}
	public changeColor(color){
		console.log('color = ' + color);
		if(!this.isTargetSelected()) return;	
		this.data.props.textColor = color;
		this.data = this.item.data;		
		this.refresh();
	}
	private onFocusIn(evt: egret.FocusEvent){
		console.log('onFocusIn...');
		let textInput:eui.TextInput = evt.target.parent;
		let name:string = textInput.name;
		this.inputType = name;
	}
	private onFocusOut(evt:egret.FocusEvent){
		console.log('onFocusOut...');
		if(!this.isTargetSelected()) return;
		let value = evt.target.text;
		this.data.props[this.inputType] = value;
		this.refresh();
	}
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