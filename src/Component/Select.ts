interface SelectItem {
	content: string;
	[propName: string]: any;
}

class Select extends eui.Component implements IUUContainer{
	container: any;
	dispose (): void {

	}

	draw (container: any) {
		
	}
	private cb: Function;
	private selectData: SelectItem[];
	private dataContainer: any;
	private stateObj = {
		selectionVisible: false,
		selectedItem: 'default',
	}
	private isFirstSelect: boolean = true;	
	public itemWidth: number;
	private itemHeight: number = 30;
	private gp_selection_rect: eui.Label;
	private gp_selection_box: eui.Group;
	private gp_selection: eui.Group;
	
	public constructor(data: SelectItem[], width: number = 190) {
		super();
		this.selectData = data;	
		this.skinName = 'resource/skins/SelectSkin.exml'
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
	}
	private onAddedToStage(){
		this.init();
	}
	private init(){
		this.listenEvent();
	}
	public setDefaultItem(item){
		this.stateObj.selectedItem = item;
	}
	public setDataContainer(dataContainer){
		this.dataContainer = dataContainer;
	}
	public hide(){
		this.stateObj.selectionVisible = false;
	}
	private output(){
		this.cb && this.cb(this.stateObj.selectedItem);
	}
	public listenSelectChange(cb: Function){
		this.cb = cb;
	}
	private listenEvent(){
		this.gp_selection_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchSelection2, this);
	}
	public setData(data){
		this.selectData = data;
	}
	private createItem(obj){
		let group = new eui.Group();
		group.width = this.itemWidth;
		group.height = this.itemHeight;		
		let shape = new egret.Shape();
		shape.graphics.beginFill(0x1593ff);
		shape.graphics.drawRect(0,0,this.itemWidth,this.itemHeight);
		shape.graphics.endFill();
		shape.visible = false;
		shape.name = 'shape';
		group.addChild(shape);
		let label = new eui.Label();
		label.text = obj.content;
		label.textColor = 0x000000;
		label.size = 24;
		label.width = this.itemWidth;
		label.height = this.itemHeight;
		group.addChild(label);
		return group;
	}
	private touchSelection2(evt: egret.TouchEvent){
		evt.stopPropagation();
		this.stateObj.selectionVisible = !this.stateObj.selectionVisible;
		if(this.stateObj.selectionVisible){
			this.gp_selection.removeChildren();
			for(let j = 0, num = this.selectData.length; j < num; j++){
				let itemGroup = this.createItem(this.selectData[j]);
				this.gp_selection.addChild(itemGroup);						
			}
			if(!this.isFirstSelect) return;
			this.isFirstSelect = false;			
			this.gp_selection.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.onMouseover_Selection, this);
			this.gp_selection.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_Selection, this);
		};
	}
	private onMouseover_Selection(evt:egret.TouchEvent){
		let target = evt.target;
		if(target instanceof eui.Group) return;
		this.removeOverState();
		let shape = <egret.Shape>target.parent.getChildByName('shape');
		shape.visible = true;
	}
	private removeOverState(){
		for(let i = 0, len = this.gp_selection.numChildren; i < len; i++){
			let item = <eui.Group>this.gp_selection.getChildAt(i);
			let shape = item.getChildByName('shape');
			shape.visible = false;
		}
	}
	private onClick_Selection(evt:egret.TouchEvent){
		let target = evt.target;
		if(target instanceof eui.Group) return;
		let text = target.text;
		this.stateObj.selectedItem = text;
		this.stateObj.selectionVisible = false;
		this.output();
	}
}