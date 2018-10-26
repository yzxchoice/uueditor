// TypeScript file
/**
 * 老虎机组件
 */

// 通常只需要改变awards、bdUrl，
// 当需要修改皮肤时，需要改变所有选项
// 只支持3项
interface ISlotMachine {
	awards: IResource[], // 图片列表
	bdUrl: string, // 图片框url	
	skinUrl: string, // 皮肤url
	skinSize: ISize, // 皮肤尺寸
	startBtnUrl: string, // 按钮皮肤url
	startBtnMessage: IBaseMessage, // 按钮的位置与尺寸
	coreAraeMessage: IBaseMessage, // 核心区域的位置与尺寸
}

class SlotMachine extends eui.Group implements IUUBase, ISlotMachine {
    static uuType = UUType.SLOT_MACHINE;
	
    layerName:string = '老虎机'

	// props中用到的参数
	bdUrl: string = 'resource/assets/pic/draw_card_bg.png';	
	skinUrl: string = 'resource/assets/Pic/components/slots_bg.png';
	skinSize: ISize = {
		width: 856,
		height: 388,
	}
	startBtnUrl: string = 'preload_json#preload_r2_c12';
	startBtnMessage: IBaseMessage = {
		x: 0,
		y: 0,
		width: 120,
		height: 56,
	};
	coreAraeMessage: IBaseMessage = {
		x: 368,
		y: 322,
		width: 790,
		height: 270,
	}

	// 每项Item的间隔
	private gap: number = 10;	
	// 每项Item的位置、尺寸信息
	private itemWidth: number = 250;
	private itemHeight: number = 250;
	// 图片的尺寸
	private imgPercentWidth: number = 80;
	private imgPercentHeight: number = 80;

	// other
    private itemGroup: eui.Group;	
    private btn_start: eui.Group;
	private tweenFlag: number = 3; // 动画标记	
    private isAnimating: boolean = false; 

	private awardsTotal: IResource[] = [];
	private _awards : IResource[] = [];
	public get awards() : IResource[] {
		return this._awards;
	}
	public set awards(v : IResource[]) {
		this._awards = v;
		let firstItem = v.slice(0,1);
		this.awardsTotal = [...v,...firstItem];
	}
	
    constructor (props) {
        super();
		this.forEachProps(props, this);
		this.init();
        this.touchEnabled = false;		
    }

	private forEachProps(props, target?: Object): void {
		for(let key in props) {
			if((typeof props[key] == 'object') && !(props[key] instanceof Array)) {
				this.forEachProps(props[key], target[key]);
			}
			target[key] = props[key];
		}
	}

	private async init(){
		this.getItemSize();
        let mainBox = this.createGroupBox();
		this.width = mainBox.width;
		this.height = mainBox.height;
		this.addChild(mainBox);
	}

	// 获取每项Item的尺寸
	private getItemSize(): void {
		this.itemWidth = (this.coreAraeMessage.width - 4 * this.gap) / 3;
		this.itemHeight = this.coreAraeMessage.height - 2 * this.gap
	}

	// 创建UI
	private createGroupBox() {
		// 组件容器
		let group = UIFactory.createGroup(this.skinSize.width, this.skinSize.height);
		// 皮肤
		let skin = this.createSkin();
		group.addChild(skin);
		// 核心容器
		let mainBox = this.createMainBox();
		group.addChild(mainBox);
		// start 按钮
		let btn = this.createStartBtn();
		group.addChild(btn);		
		return group;
	}

	// 创建皮肤
	private createSkin(): eui.Image {
		let img = new eui.Image();
		img.source = this.skinUrl;
		img.width = this.skinSize.width;
		img.height = this.skinSize.height;
		return img;
	}

	// 创建核心容器
	private createMainBox(){
		let itemGroup = new eui.Group();
		itemGroup.width = this.coreAraeMessage.width;
		itemGroup.height = this.coreAraeMessage.height;
		this.itemGroup = itemGroup;
		itemGroup.mask = new egret.Rectangle(0,0,this.coreAraeMessage.width,this.coreAraeMessage.height);
		// 生成3项竖向轮播图容器
		for(let i = 0, len = 3; i < len; i++){
			let itemBox = this.createItemBox();
			itemBox.x = (this.gap + this.itemWidth) * i + this.gap;
			itemBox.y = this.gap;			
			itemGroup.addChild(itemBox);
		};
		itemGroup.x = this.coreAraeMessage.x;
		itemGroup.y = this.coreAraeMessage.y;
		return itemGroup;
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
	// 创建每一项（图片框 + 图片）
	private createItem(url){
		let group = new eui.Group();
		group.width = this.itemWidth;
		group.height = this.itemHeight;
		let bg = this.createBd(this.bdUrl);
		let img = this.createImg(url);
		group.addChild(bg);
		group.addChild(img);
		return group;
	}
	// 创建框
	private createBd(url): eui.Image {
		let img = new eui.Image(url);
		img.percentWidth = 100;
		img.percentHeight = 100; 
		return img
	}
	// 创建图片
	private createImg(url){
		let img = new eui.Image(url);
		img.percentWidth = this.imgPercentWidth;
		img.percentHeight = this.imgPercentHeight; 
		img.verticalCenter = 0;
		img.horizontalCenter = 0;           
		return img;
	}
	// 创建start按钮
	private createStartBtn(){
		var txtr:egret.Texture = RES.getRes( 'preload_json#preload_r2_c12' );
		var img:egret.Bitmap = new egret.Bitmap( txtr );
		img.width = this.startBtnMessage.width;
		img.height = this.startBtnMessage.height;
		img.touchEnabled = true;
		img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
		let group = UIFactory.createGroup(img.width, img.height);
		this.btn_start = group;
		group.addChild(img);
		group.x = this.startBtnMessage.x;
		group.y = this.startBtnMessage.y;
		this.addClickState();
		return group;
	}
	// 点击start的处理程序
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
	// 动画效果
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
	// 为start按钮添加可点击状态
	private addClickState(): void {
		this.btn_start.filters = [ FilterFactory.createGlodFilter() ];
		this.isAnimating = false;
	}
	// 移除start按钮可点击状态
	private removeClickState(): void {
		this.btn_start.filters = [ FilterFactory.createShadowFilter() ];
		this.isAnimating = true;
	}
}