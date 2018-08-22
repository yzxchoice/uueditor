class TabStyle extends eui.Component implements IUUContainer{
	container: SiderbarSkinBy;
	editGroup: EditGroup;
	private kb:KeyBoard;
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
		rotate: <any>10,
	}
	private inputType: string;
	private preData: any;
	public tool: TransformTool;
	private gp_diff: eui.Group;
	private gp_inputContainer:eui.Group;
	private btn_update: eui.Button;
	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
	}
	private onAddedToStage(){
		this.kb = new KeyBoard();		
		this.initEvent()
	}
	private initEvent(){
		for(let i = 0, len = this.gp_inputContainer.numChildren; i < len; i++){
			let groupInpput = <eui.Group>this.gp_inputContainer.getChildAt(i);
			let input = groupInpput.getChildAt(1);
			input.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onFocusOut, this);		
			input.addEventListener(egret.FocusEvent.FOCUS_IN, this.onFocusIn, this);							
		};
		var type:string = GestureType.DOUBLE_TAP;
        var event:string = GestureState.RECOGNIZED;
        var config = {};
        config[type] = {};
        config[type][event] = this.onDoubleClick;
        GestureManager.add(this.btn_update, config, false);
	}
	private onDoubleClick(){
		console.log("double_click");
	}
	private createStyleType(data){
		this.gp_diff.removeChildren();				
		let type = data.type;
		let props = data.props;
		let styleType: StyleType = new StyleType(type, props);
		styleType.draw(this.gp_diff);
		styleType.setDataContainer(this);		
	}
	public setTarget(){
		this.tool = this.editGroup.tool;
		console.log(this.tool);
		let data = this.tool.target.owner.image.data;		
		this.createStyleType(data);
	}
	public updateTarget(){
        let item = this.tool.target.owner.image;
        let {width, height, scaleX, scaleY, rotation} = item;
        let newData = {
            x: Math.floor(this.tool.regX),
            y: Math.floor(this.tool.regY),
            width: Math.floor(width * scaleX),
            height: Math.floor(height * scaleY),
            rotate: Math.floor(rotation) || '0'
        };
		this.preData = JSON.parse(JSON.stringify(newData));		
		this.data = newData;
	}
	private onFocusIn(evt: egret.FocusEvent){
		console.log('onFocusIn...');
		console.log('add keyboard...');	
		let textInput:eui.TextInput = evt.target.parent;
		let name:string = textInput.name;
		let propertyName:string = name.split('_')[1];
		this.inputType = propertyName;
		console.log(propertyName);
		this.kb.addEventListener(KeyBoard.onkeydown,this.onkeydown,this);
	}
	private onFocusOut(evt:egret.FocusEvent){
		console.log('onFocusOut...');
		console.log('remove keyboard...');
		if(!this.preData) return;					
		this.kb.removeEventListener(KeyBoard.onkeydown,this.onkeydown,this);
		let addValue = Number(evt.target.text) - this.preData[this.inputType];
		if(!addValue) return;
		this.adjuctMatrix(addValue);
	}
	private onkeydown(evt){
		console.log('onkeydown...');
		evt.stopPropagation(); 
		evt.preventDefault();
		evt.stopImmediatePropagation();
		if(this.kb.isContain(evt.data,KeyBoard.DownArrow)){
            console.log(evt.data);
			this.adjuctMatrix(-1);
        }
		if(this.kb.isContain(evt.data,KeyBoard.UpArrow)){
            console.log(evt.data);
			this.adjuctMatrix(1);			
		}
	}
	private adjuctMatrix(value: number){
		let addValue = value;
		let tool: TransformTool = this.tool;	
		if(!(tool && tool.target)) return;			
		console.log(addValue);
		switch(this.inputType){
			case 'width':
				console.log('width');
				this.data.width += addValue;
				tool.scale(this.data.width / this.preData.width);	
				this.preData.width = this.data.width;
				break;
			case 'height':
				console.log('height');
				this.data.height += addValue;
				tool.scale(this.data.height / this.preData.height);	
				this.preData.height = this.data.height;
				break;
			case 'x':
				console.log('x');
				this.data.x += addValue;
				tool.translate(addValue, 0);	
				this.preData.x = this.data.x;
				break;
			case 'y':
				console.log('y');
				this.data.y += addValue;
				tool.translate(0, addValue);	
				this.preData.y = this.data.y;
				break;
			case 'rotate':
				console.log('rotate');
				this.data.rotate = Number(this.data.rotate) + addValue;
				tool.rotate(addValue * Math.PI / 180);	
				this.preData.rotate = this.data.rotate;
				break;
		}
		this.tool.startMatrix.copyFrom(this.tool.endMatrix);
		this.editGroup.renderOneDisplay();
	}
}