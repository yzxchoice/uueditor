class Select extends eui.Component{
	private selectData: any[];
	private stateObj = {
		selectionVisible: false,
		selectedItem: 'default',
	}
	private isFirstSelect: boolean = true;	
	public itemWidth: number = 190;
	private itemHeight: number = 30;
	private gp_selection_rect: eui.Label;
	private gp_selection_box: eui.Group;
	private gp_selection: eui.Group;
	
	public constructor(data) {
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
		label.width = this.itemWidth;
		label.height = this.itemHeight;
		group.addChild(label);
		return group;
	}
	private touchSelection2(evt: egret.TouchEvent){
		evt.stopPropagation();
		this.stateObj.selectionVisible = !this.stateObj.selectionVisible;
		this.gp_selection_box.visible = this.stateObj.selectionVisible;
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
		this.getChildByName
	}
	private onMouseover_Selection(evt:egret.TouchEvent){
		let target = evt.target;
		console.log('mouse...');		
		console.log(target);
		if(target instanceof eui.Group) return;
		let shape = <egret.Shape>target.parent.getChildByName('shape');
		shape.visible = true;
		console.log(shape);
	}
	private removeOverState(){
		for(let i = 0, len = this.gp_selection.numChildren; i < len; i++){
			let item = <eui.Group>this.gp_selection.getChildAt(i);
			let shape = item.getChildByName('shape');
		}
	}
	private onClick_Selection(evt:egret.TouchEvent){
		console.log('click...');		
	}
}