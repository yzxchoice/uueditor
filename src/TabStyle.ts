class TabStyle extends eui.Component implements IUUContainer{
	container: SiderbarSkinBy;
	editGroup: EditGroup;
	dispose (): void {

	}

	draw (container: any): void{
		this.container = container;
		this.editGroup = container.editGroup;
	}
	private data:Object = {
		width: 30,
		height: 30,
		x: 30,
		y: 30,
		rotate: 10,
	}
	private tool: TransformTool;
	private gp_inputContainer:eui.Group;
	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
	}
	private onAddedToStage(){
		this.initEvent()
	}
	private initEvent(){
		for(let i = 0, len = this.gp_inputContainer.numChildren; i < len; i++){
			let groupInpput = <eui.Group>this.gp_inputContainer.getChildAt(i);
			let input = groupInpput.getChildAt(1);
			input.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onFocusOut, this);			
		}
	}
	public setTarget(){
		this.tool = this.editGroup.tool;
	}
	public updateTarget(){
		let matrix:Matrix = this.tool.target.matrix;
        let item = this.tool.target.owner.image;
        let {width, height} = this.tool.target;
        let {scaleX, scaleY, rotation} = item;
        let newData = {
            x: Math.floor(this.tool.regX),
            y: Math.floor(this.tool.regY),
            width: Math.floor(width * scaleX),
            height: Math.floor(height * scaleY),
            rotate: Math.floor(rotation)
        };
		this.data = newData;
	}
	private onFocusOut(evt:egret.FocusEvent){
		console.log(evt.target.id);
		let textInput:eui.TextInput = evt.target.parent;
		let name:string = textInput.name;
		let propertyName:string = name.split('_')[1];
		this.data[propertyName] = Number(evt.target.text); 
		// TODO: 去修改对应的视图元素的信息
		let game = <Game>this.parent;
		let tool: TransformTool = this.tool;
		let target = tool.target;
		let element = tool.target.owner.image;
		if(name == "input_width"){
			tool.scale(this.data['width'] / Math.round(target.width * tool.endMatrix.a));
			// tool.scale((this.data['width'] - target.width) / target.width);
		}
		if(name == "input_x" || name == "input_y"){
			tool.translate(this.data['x']-tool.regX, this.data['y']-tool.regY);
		}
		if(name == "input_rotate"){
			tool.rotate((this.data['rotate']) * Math.PI / 180 - tool.endMatrix.getRotationX());
		}	


		// console.log(tool.endMatrix.getRotationX(),tool.endMatrix.getRotationY());
		// console.log(tool.regX, tool.regY);
		this.editGroup.render();
		// console.log(tool.regEndU, tool.regEndV);
		// console.log(tool.regStartU, tool.regStartV);
	}
}