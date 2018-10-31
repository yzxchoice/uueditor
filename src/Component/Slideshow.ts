// TypeScript file
/**
 * 轮播图组件
 * 1、缺少皮肤props
 */
interface ISlideshow {
    awards: IResource[], // 图片、文字列表
    bdUrl: string, // 框的url
    fontStyle: ILabel, // 文字样式
    leftArrowUrl: string, // 左边箭头的url 有问题 不能用精灵图
    rightArrowUrl: string, // 右边箭头的url 有问题 不能用精灵图
}

class Slideshow extends eui.Group implements IUUBase, ISlideshow {
    static uuType = UUType.SLIDESHOW;
    
    layerName:string = '轮播图';
    
    // props 
    awards: IResource[];
    bdUrl: string;
    fontStyle: ILabel = {
        textColor: 0x000000,
        size: 50,
    }
    leftArrowUrl: string = 'preload_json#preload_r11_c8';
    rightArrowUrl: string = 'preload_json#preload_r11_c5';
    // other
    width:number = 1100;
    height:number = 900;
    private imgBox: eui.Group;    
    private itemWidth: number = 800; // item的宽度
    private itemHeight: number = 560;
    private imgPercentWidth: number = 80; // 框内图片的百分比宽度
    private imgPercentHeight: number = 80;
    private arrow_left: egret.Bitmap;
    private arrow_right: egret.Bitmap;
    private arrowWidth: number = 60;
    private arrowHeight: number = 70;
    private duration: number = 500;
    private delayed: number = 100; 
    private isAnimating: boolean = false;

    private _activeIndex : number = 0;
    public get activeIndex() : number {
        return this._activeIndex;
    }
    public set activeIndex(v : number) {
        this._activeIndex = v;
        this.arrow_left.visible = true;
        this.arrow_right.visible = true;
        if(v == 0){
            this.arrow_left.visible = false;
        }   
        if(v == this.awards.length - 1){
            this.arrow_right.visible = false;
        }
    }

    constructor (props) {
        super();
        this.forEachProps(props, this);
        this.createUI();
        this.touchEnabled = false;        
        this.arrow_left.visible = false;
    }

    private forEachProps(props, target?: Object): void {
		for(let key in props) {
			if((typeof props[key] == 'object') && !(props[key] instanceof Array)) {
				this.forEachProps(props[key], target[key]);
			}
			target[key] = props[key];
		}
	}

    private createUI(): void {
        this.addChild(this.createMianBox());
        this.addChild(this.createLeftArrow());
        this.addChild(this.createRightArrow());
    }

    // 创建核心容器
    private createMianBox(): eui.Group {
        let group = UIFactory.createGroup(this.itemWidth, this.itemHeight);
        for(let i = 0, len = this.awards.length; i < len; i++) {
            let resource = this.awards[i];
            let item = this.createitem(resource);
            group.addChild(item);
        }
        group.verticalCenter = 0;
        group.horizontalCenter = 0;
        this.imgBox = group;
        return group;
    }

    // 创建项Item(框、图、文字)
    private createitem(resource: IResource): eui.Group {
        let group = UIFactory.createGroup(this.itemWidth, this.itemHeight);
        // 框
        let bd = new eui.Image(this.bdUrl);
        bd.width = group.width;
        bd.height = group.height;
        group.addChild(bd);
        // 图
        let img = new eui.Image(resource.url);
        img.percentWidth = this.imgPercentWidth;
        img.percentHeight = this.imgPercentHeight;
        img.verticalCenter = 0;
        img.horizontalCenter = 0;
        group.addChild(img);
        // 文字
        let label = new UULabel(this.fontStyle);
        label.text = resource.text;
        label.bottom = 50;
        label.horizontalCenter = 0;
        group.addChild(label);
        return group;
    }

    // 创建左边箭头
    private createLeftArrow(): eui.Group {
        let arrow_left = UIFactory.createGroup(this.arrowWidth, this.arrowHeight);
        arrow_left.touchEnabled = true;       
        arrow_left.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickLeft, this);         
        var txtr: egret.Texture = RES.getRes( this.leftArrowUrl );
		var img: egret.Bitmap = new egret.Bitmap( txtr );
        img.width = arrow_left.width; 
        img.height = arrow_left.height; 
        arrow_left.addChild(img);
        arrow_left.verticalCenter = 0;
        arrow_left.left = 0;
        this.arrow_left = img;        
        return arrow_left;
    }

    // 创建右边箭头
    private createRightArrow(): eui.Group {
        let arrow_right = UIFactory.createGroup(this.arrowWidth, this.arrowHeight);
        arrow_right.touchEnabled = true;       
        arrow_right.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickRight, this);         
        var txtr: egret.Texture = RES.getRes( this.rightArrowUrl );
		var img: egret.Bitmap = new egret.Bitmap( txtr );
        img.width = arrow_right.width; 
        img.height = arrow_right.height; 
        arrow_right.addChild(img);
        arrow_right.verticalCenter = 0;
        arrow_right.right = 0;
        this.arrow_right = img;        
        return arrow_right;
    }

    // 点击左箭头
    private onclickLeft(){
        if(this.activeIndex <= 0) return;
        if(this.isAnimating) return;
        this.isAnimating = true;
        let image = this.imgBox.getChildAt(0);
        var tw = egret.Tween.get( image );
        this.activeIndex -= 1;       
        tw.to( { x:image.width }, this.duration )
            .call(() => { 
                this.imgBox.setChildIndex(image, this.imgBox.numChildren - 1);                        
                tw.to({ x: 0 }, this.duration)
                    .call(() => {
                        setTimeout(() => {
                            this.isAnimating = false;
                        }, 10);
                    })
            } )
            .wait( this.delayed );
    }

    // 点击右箭头
    private onclickRight(){
        if(this.activeIndex >= this.awards.length - 1) return;
        if(this.isAnimating) return;  
        this.isAnimating = true;              
        let image = this.imgBox.getChildAt(this.imgBox.numChildren - 1);
        var tw = egret.Tween.get( image );
        this.activeIndex += 1;        
        tw.to( { x:image.width }, this.duration )
            .call(() => { 
                this.imgBox.setChildIndex(image, 0);  
                tw.to({ x: 0 }, this.duration)
                    .call(() => {
                        setTimeout(() => {
                            this.isAnimating = false;                            
                        }, 10);
                    })
            } )
            .wait( this.delayed );
    }
}