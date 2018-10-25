// TypeScript file
/**
 * 轮播图组件
 */
class SlotMachine extends eui.Group implements IUUBase {
    data: any;
    layerName:string = '老虎机'
    container: any;
  
    static uuType = UUType.SLOT_MACHINE;
    
    private btn_start: eui.Group;
    private isAnimating: boolean = false;

	private itemWidth: number = 250;
	private itemHeight: number = 250;
	private gap: number = 10;
	private tweenFlag: number = 3; // 动画标记
	// 组件宽、高固定
	width: number = 856;
	height: number = 388;
	// props中用到的参数
	bdUrl: string = 'resource/assets/pic/draw_card_bg.png';
	
	private awardsTotal: Array<SlideshowItem> = [];
	private _awards : Array<SlideshowItem> = [];
	public get awards() : Array<SlideshowItem> {
		return this._awards;
	}
	public set awards(v : Array<SlideshowItem>) {
		this._awards = v;
		let firstItem = v.slice(0,1);
		this.awardsTotal = [...v,...firstItem];
	}
	
    private itemGroup: eui.Group;
    constructor (props) {
        super();
		this.awards = props.award;
		// this.bdUrl = props.bdUrl;
        this.touchEnabled = false;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
    }

    private onAddToStage (event:egret.Event) {
		this.init()
    }

    private onRemoveFromStage (event: egret.Event) {

    }

	private async init(){
        let mainBox = this.createGroupBox();
		this.addChild(mainBox);
	}

	private createGroupBox() {
		let groupWidth = 856;
		let groupHeight = 388;
		let group = UIFactory.createGroup(groupWidth, groupHeight);
		let img = new eui.Image();
		img.source = 'resource/assets/Pic/components/slots_bg.png';
		img.width = groupWidth;
		img.height = groupHeight;
		group.addChild(img);
		let mainBox = this.createMainBox();
		mainBox.x = 30;
		mainBox.y = 34;
		group.addChild(mainBox);

		let btn = this.createStartBtn();
		btn.horizontalCenter = 0;
		btn.bottom = 10;
		console.log('btn....');
		console.log(btn);
		group.addChild(btn);		
		return group;
	}

	private createMainBox(){
		let group = new eui.Group();
		group.width = this.width;
		group.height = this.itemHeight + 2 * this.gap;
		// 主容器
		let itemGroup = new eui.Group();
		itemGroup.width = this.width;
		itemGroup.height = group.height;
		this.itemGroup = itemGroup;
		itemGroup.mask = new egret.Rectangle(0,0,itemGroup.width,itemGroup.height);
		// 生成3项竖向轮播图容器
		for(let i = 0, len = 3; i < len; i++){
			let itemBox = this.createItemBox();
			itemBox.x = (12 + this.itemWidth) * i + 12;
			itemBox.y = this.gap;			
			itemGroup.addChild(itemBox);
		};
		group.addChild(itemGroup);
		return group;
	}
	// 竖向轮播图容器
	private createItemBox(){
		let group = new eui.Group();
		group.width = this.itemWidth;
		group.height = (this.itemWidth + this.gap) * this.awardsTotal.length - this.gap;
		let vLayout = new eui.VerticalLayout();
		vLayout.gap = this.gap;
		vLayout.paddingTop = 0;
		group.layout = vLayout;
		let promiseArr = [];
		for (let i = 0, len = this.awardsTotal.length; i< len; i++){
			let item = this.createItem(this.awardsTotal[i].url);
			group.addChild(item);
		};
		return group;
	}

	private createItem(url){
		let group = new eui.Group();
		group.width = this.itemWidth;
		group.height = this.itemHeight;
		let bg = this.createImg(this.bdUrl);
		let img = this.createImg(url);
		group.addChild(bg);
		group.addChild(img);
		return group;
	}

	private createImg(url){
		let img = new eui.Image(url);
		img.width = this.itemWidth
		img.height = this.itemHeight;            
		return img;
	}

	private createStartBtn(){
		var txtr:egret.Texture = RES.getRes( 'preload_json#preload_r2_c12' );
		var img:egret.Bitmap = new egret.Bitmap( txtr );
		img.width = 120;
		img.height = 56;
		img.touchEnabled = true;
		img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
		let group = UIFactory.createGroup(120, 56);
		this.btn_start = group;
		group.addChild(img);
		this.addClickState();
		return group;
	}

	private onClick(evt: TouchEvent){
		evt.stopPropagation();
		evt.stopImmediatePropagation();
		if(this.tweenFlag !== 3) return;
		if(this.isAnimating) return;
		this.removeClickState();
		this.tweenFlag = 0;
		let stepRandomMax = this.awardsTotal.length - 1;
		let stepRandomMIn = 4;
		let step1 = Math.floor(Math.random() * stepRandomMax) + stepRandomMIn;
		let step2 = Math.floor(Math.random() * stepRandomMax) + stepRandomMIn;
		let step3 = Math.floor(Math.random() * stepRandomMax) + stepRandomMIn;

		let timeRandomMax = (this.awardsTotal.length - 1) * 200;
		let timeRandomMIn = 1000;
		let time1 = Math.floor(Math.random() * timeRandomMax) + timeRandomMIn;
		let time2 = Math.floor(Math.random() * timeRandomMax) + timeRandomMIn;
		let time3 = Math.floor(Math.random() * timeRandomMax) + timeRandomMIn;		
				
		let firstBox = <eui.Group>this.itemGroup.getChildAt(0);
		let secondBox = <eui.Group>this.itemGroup.getChildAt(1);
		let thirdBox = <eui.Group>this.itemGroup.getChildAt(2);

		this.tween(firstBox, step1, time1);
		this.tween(secondBox, step2, time2);
		this.tween(thirdBox, step3, time3);
		
	}

	private tween(item:eui.Group, step: number, duration: number = 500){
		let initY = item.y;
		let addY = -(this.itemHeight + this.gap) * step;
		let totalY = initY + addY;
		let maxY = -(this.itemHeight + this.gap) * (this.awardsTotal.length - 1) + this.gap;
		
		if(totalY < maxY){
			let oneStepTime = duration / step;
			let step1 = (maxY - initY) / -(this.itemHeight + this.gap);
			let step2 = step - step1;
			let time1 = step1 * oneStepTime;
			let time2 = duration - time1;
			
			let t = egret.Tween.get(item);
			t.to({y: maxY }, time1)
				.call(() => {
					item.y = 10;
					this.tween(item, step2, time2);
				})
				
		}else if(totalY > maxY) {
			egret.Tween.get(item)
				.to({y: totalY }, duration)
				.call(() => {
					this.tweenFlag += 1;	
					if(this.tweenFlag === 3){
						setTimeout(() => { this.addClickState() }, 500);						
					}
				})
		}else if(totalY == maxY) {
			egret.Tween.get(item)
				.to({y: totalY }, duration)
				.call(() => {
					item.y = 10;
					this.tweenFlag += 1;
					if(this.tweenFlag === 3){
						setTimeout(() => { this.addClickState() }, 500);						
					}
				})
		}
	}

	private addClickState(): void {
		this.btn_start.filters = [ FilterFactory.createGlodFilter() ];
		this.isAnimating = false;
	}

	private removeClickState(): void {
		this.btn_start.filters = [ FilterFactory.createShadowFilter() ];
		this.isAnimating = true;
	}
}