// TypeScript file
/**
 * 转盘组件
 */

// todo:
// 1、根据数量调整初始 角度
// 2、根据数量调整初始 itemIndex
interface ICircleSector2 {
    skinUrl: string, // 皮肤url
    awards: IResource[], // 列表
    arrowUrl: string, // 箭头url
}

class CircleSector extends eui.Group implements IUUBase {
    static uuType = UUType.CIRCLE_SECTOR;
    
    layerName:string = '转盘'
    // props 
    awards: Array<IResource> = [];
    skinUrl: string = 'resource/assets/Pic/components/circleSector/turnplate.png';
    arrowUrl: string = 'preload_json#preload_r2_c15';

    // other
    private main: eui.Group = new eui.Group(); // 核心区域 用于旋转 包含皮肤和mainItemGroup
    private mainItemGroup: eui.Group; // 包含item的容器
    private isAnimating: boolean = false; // 动画是否正在进行
    private itemIndex = 4; // 箭头指向的item 索引
    width:number = 600;
    height:number = 600;

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
    
    private init () {
        // 核心区域
        this.main = this.createMianBox();
        this.main.touchEnabled = false;
        // 皮肤
        let skin = this.createSkin();
        skin.width = this.width;
        skin.height = this.height;
        // mainitemGroup
        let mainItemGroup = this.createMainItemGroup();
        // this.main.addChild(skin);
        this.main.addChild(mainItemGroup);
        this.main.rotation = 45;
        // 箭头
        let arrow: eui.Group = this.createArrow();
        this.addChild(this.main);
        this.addChild(arrow);
    }

    private adjuctInitRotate(mian: eui.Group): void {
        let itemLength: number = this.awards.length;
        let rotation = 0;
        switch(itemLength) {
            case 3:
                rotation = 0;
                break;
            case 4: 
                rotation = 45;
                break;
            case 5: 
                rotation = 0;
                break;
            case 6: 
                rotation = 0;
                break;
        }
    }

    private createMianBox(): eui.Group {
        let group = UIFactory.createGroup(this.width, this.height);
        group.anchorOffsetX = this.width / 2;
        group.anchorOffsetY = this.height / 2;
        group.x = this.width / 2;
        group.y = this.height / 2;
        return group;
    }

    private createSkin(): eui.Image {
        return new eui.Image(this.skinUrl);
    }

    private createMainItemGroup(): eui.Group {
        let mainItemGroup: eui.Group = UIFactory.createGroup(this.width, this.height);
        var shape:egret.Shape = new egret.Shape();
        shape.touchEnabled = true;
        this.main.addChild(shape);
        
        var arc = 360 / this.awards.length;
        var lastAngle = 0;
        var r = this.width / 2;

        for (var i = 0; i< this.awards.length; i++){
            lastAngle = i * arc;

            this.drawArc(shape,r,r,r,arc,lastAngle);
            var g: eui.Group = new eui.Group();
            g.width = 2 * r * Math.sin(arc * 2 * Math.PI/ 360/2);
            g.height = r;
            g.x = r + Math.cos(lastAngle * Math.PI / 180 + arc* Math.PI / 180 / 2) * r;
            g.y = r + Math.sin(lastAngle * Math.PI / 180 + arc* Math.PI / 180 / 2) * r;
            g.touchEnabled = false;
            g.rotation = (lastAngle * Math.PI / 180 + arc * Math.PI / 180 / 2 + Math.PI /2 ) * 180 / Math.PI;
            // 文字
            var label: eui.Label = new eui.Label(i.toString());
            label.textColor = 0xE5302F;
            label.size = 30;
            g.addChild(label);
            // 小图片
            let smallImg = new eui.Image(this.awards[i].url);
            smallImg.width = 120;
            smallImg.height = 120;
            smallImg.x = - smallImg.width / 2;
            smallImg.y = smallImg.height / 2;
            g.addChild(smallImg);
            // 大图片
            let bigImg = new eui.Image(this.awards[i].url);
            bigImg.width = 240;
            bigImg.height = 240;
            bigImg.x = - bigImg.width / 2;
            bigImg.verticalCenter = 0;           
            bigImg.visible = false;
            g.addChild(bigImg);

            mainItemGroup.addChild(g);
        }

        this.mainItemGroup = mainItemGroup;
        return mainItemGroup;
    }

    private createArrow(): eui.Group {
        let txtr:egret.Texture = RES.getRes( this.arrowUrl );
		let img:egret.Bitmap = new egret.Bitmap( txtr );
		img.width = 68;
		img.height = 118;
		img.touchEnabled = true;
		img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.down, this);
		let group = UIFactory.createGroup(img.width, img.height);
		group.addChild(img);
        group.horizontalCenter = 0;
        group.verticalCenter = -20;
		return group;
    }

    private down (event: egret.TouchEvent) {
        if(this.isAnimating) return;
        this.isAnimating = true;
        this.reset();
        let random: number = this.rnd();
        this.rotateFn(random);
    }

    // 生成随机数
    private rnd(): number {
        return this.awards.length * 3 + Math.floor(Math.random() * this.awards.length);
    }

    // 旋转的动画效果
    private rotateFn (random: number) {
        let a = this.itemIndex - (random % this.awards.length);
        this.itemIndex = a >= 0 ? a : (this.awards.length + a);
        let angles = random * (360 / this.awards.length) + (this.main.rotation % 360);
        egret.Tween.pauseTweens(this.main);
		var t = egret.Tween.get( this.main );
        t
        .to( { rotation: angles }, 8000, egret.Ease.sineOut )
        .call(() => { 
            this.isAnimating = false;
            let item = <eui.Group>this.mainItemGroup.getChildAt(this.itemIndex);
            item.getChildAt(item.numChildren - 1).visible = true;
            item.getChildAt(item.numChildren - 2).visible = false;
        });
    }

    // 还原：每次点击都需要隐藏大图片，显示小图片
    private reset(): void {
        for(let i = 0, len = this.mainItemGroup.numChildren; i < len; i++) {
            let item = <eui.Group>this.mainItemGroup.getChildAt(i);
            item.getChildAt(item.numChildren - 1).visible = false;
            item.getChildAt(item.numChildren - 2).visible = true;
        }
    }

    /**
     * 画弧形方法
     */
    drawArc(mc:egret.Shape, x:number=200, y:number=200, r:number=100, angle:number=27, startFrom:number=270, color:number=0xff0000):void {
        mc.graphics.beginFill(color,0);
        mc.graphics.lineStyle(1,color);   
        mc.graphics.moveTo(x,y);
        angle=(Math.abs(angle)>360)?360:angle;
        var n:number=Math.ceil(Math.abs(angle)/45);
        var angleA:number=angle/n;
        angleA=angleA*Math.PI/180;
        startFrom=startFrom*Math.PI/180;
        mc.graphics.lineTo(x+r*Math.cos(startFrom),y+r*Math.sin(startFrom));
        for (var i=1; i<=n; i++) {
            startFrom+=angleA;
            var angleMid=startFrom-angleA/2;
            var bx=x+r/Math.cos(angleA/2)*Math.cos(angleMid);
            var by=y+r/Math.cos(angleA/2)*Math.sin(angleMid);
            var cx=x+r*Math.cos(startFrom);
            var cy=y+r*Math.sin(startFrom);
            mc.graphics.curveTo(bx,by,cx,cy);
        }
        if (angle!=360) {
            mc.graphics.lineTo(x,y);
        }
        mc.graphics.endFill();
    }

}