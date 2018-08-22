class ColorSelectBox extends eui.Component{
	private container: any;
	private gp_box: eui.Group;
	public isShow: boolean = false;
	private cb: Function;
	private colorPool: Array<string> = ["#000000","#993300","#333300","#003300","#003366","#000080","#333399","#333333","#800000","#FF6600","#808000","#008000","#008080","#0000FF","#666699","#808080","#FF0000","#FF9900","#99CC00","#339966","#33CCCC","#3366FF","#800080","#999999","#FF00FF","#FFCC00","#FFFF00","#00FF00","#00FFFF","#00CCFF","#993366","#CCCCCC","#FF99CC","#FFCC99","#FFFF99","#CCFFCC","#CCFFFF","#99CCFF","#CC99FF","#FFFFFF"];
	public constructor() {
		super();
		this.skinName = 'resource/skins/ColorSelectBoxSkin.exml';
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
	}
	private onAddedToStage(){
		this.init();
	}
	private init(){
		this.gp_box.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);		
		for(let i = 0, len = this.colorPool.length; i < len; i++){
			let color = this.exchangeColor(this.colorPool[i]);
			let shape = this.createShape(color);
			let yu = i % 8;
			shape.x = 5 + (20 + 6) * yu;
			shape.y = 5 + (20 + 6) * Math.floor(i / 8);
			shape.touchEnabled = true;
			this.gp_box.addChild(shape);
		};
	}
	private onClick(evt: egret.TouchEvent){
		let name = evt.target.name;
		if(!name) return;
		let exchange = Number(name).toString(16);
		let pre = '0x';
		let len = exchange.length;
		if(len == 2){
			pre += '0000';
		}else if(len == 4){
			pre += '00';
		}
		let newColor = pre + exchange;
		this.undraw();	
		this.cb && this.cb(newColor);
	}
	private createShape(color){
		let shape = new egret.Shape();
		shape.graphics.beginFill(color);
		shape.graphics.drawRect(0,0,20,20);
		shape.graphics.endFill();
		shape.name = color;
		return shape;
	}
	private exchangeColor(color){
		return parseInt(color.replace('#', ''), 16);				
	}
	public listenColorChange(cb: Function){
		this.cb = cb;
	}
	public draw(container: any){
		this.container = container;
		this.container.addChild(this);
		this.isShow = true;				
	}
	public undraw(){
		this.container.removeChild(this);
		this.isShow = false;		
	}
}