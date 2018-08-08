class CheckItem extends eui.Group{
	private _isOver:boolean;
	public get isOver():boolean {
		return this._isOver;
	}
	public set isOver(v: boolean){
		this._isOver = v;
		this.shape.visible = v;
	}
	private _isSelected:boolean;
	public get isSelected():boolean {
		return this._isSelected;
	}
	public set isSelected(v: boolean){
		this._isSelected = v;
		this.checkBox.selected = v;
	}
	private labelText:string;
	private shape:egret.Shape;
	public checkBox:eui.CheckBox;
	public constructor(labelText:string) {
		super();
		this.labelText = labelText;
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}
	private onAddToStage(){
		this.width = this.parent.width;
		this.height = 30;
		this.shape = new egret.Shape();
		this.shape.graphics.beginFill(0x198ae7);
		this.shape.graphics.drawRect(0,0,this.width,this.height);
		this.shape.graphics.endFill();
		this.isOver = false;
		this.addChild(this.shape);
		this.checkBox = new eui.CheckBox();
		this.checkBox.label = this.labelText;
		this.checkBox.width = this.width;
		this.checkBox.height = this.height;
		this.addChild(this.checkBox);
	}
}