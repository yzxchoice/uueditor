class TabStyle extends eui.Component implements IUUContainer{
	container: SiderbarSkinBy;
	editGroup: EditGroup;
	dispose (): void {

	}

	draw (container: any): void{
		this.container = container;
		this.editGroup = container.editGroup;
	}
	private data = {
		width: 30,
		height: 30,
		x: 30,
		y: 30,
		rotate: 10,
	}
	private preData: any;
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
        let item = this.tool.target.owner.image;
        let {width, height, scaleX, scaleY, rotation} = item;
        let newData = {
            x: Math.floor(this.tool.regX),
            y: Math.floor(this.tool.regY),
            width: Math.floor(width * scaleX),
            height: Math.floor(height * scaleY),
            rotate: Math.floor(rotation)
        };
		this.preData = JSON.parse(JSON.stringify(newData));		
		this.data = newData;
	}
	private onFocusOut(evt:egret.FocusEvent){
		console.log('onFocusOut...');
		let textInput:eui.TextInput = evt.target.parent;
		let name:string = textInput.name;
		let propertyName:string = name.split('_')[1];
		this.data[propertyName] = Number(evt.target.text); 
		// TODO: 去修改对应的视图元素的信息
		let game = <Game>this.parent;
		let tool: TransformTool = this.tool;
		console.log('tool...');
		console.log(tool);
		let target = tool.target;
		let element = tool.target.owner.image;

		if(name == "input_width"){
			tool.scale(this.data.width / this.preData.width);
		}
		if(name == "input_x" || name == "input_y"){
			tool.translate(this.data.x-this.preData.x, this.data['y']-this.preData.y);
		}
		if(name == "input_rotate"){
			tool.rotate((this.data.rotate - this.preData.rotate) * Math.PI / 180);
		}

		let newData = {
            x: this.data.x,
            y: this.data.y,
            width: this.data.width,
            height: this.data.height,
            rotate: this.data.rotate
        };
		this.preData = JSON.parse(JSON.stringify(newData));	
		this.tool.startMatrix.copyFrom(this.tool.endMatrix);

		this.editGroup.render();

	}
}