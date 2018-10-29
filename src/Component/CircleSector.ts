// TypeScript file
/**
 * 转盘组件
 */

interface ICircleSector2 {
    skinUrl: string,
    awards: IResource[],
    arrowUrl: string,
}

class CircleSector extends eui.Group implements IUUBase {
    static uuType = UUType.CIRCLE_SECTOR;
    
    layerName:string = '转盘'
    // props 
    awards: Array<IResource> = [];
    skinUrl: string = 'resource/assets/Pic/components/circleSector/turnplate.png';
    arrowUrl: string = 'preload_json#preload_r2_c15';

    // other

    private main: eui.Group = new eui.Group();
    private isAnimating: boolean = false;
    private itemIndex = 4; // 箭头指向的item 索引
    width:number = 400;
    height:number = 400;

    
    constructor (props) {
        super();
        this.forEachProps(props, this);
        this.init();
        this.drawSector();
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
        let skin = this.createSkin();
        skin.width = this.main.width;
        skin.height = this.main.height;
        this.main.addChild(skin);
        this.main.touchEnabled = false;
        // 箭头
        let arrow: eui.Group = this.createArrow();
        this.addChild(this.main);
        this.addChild(arrow);
        
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

    async drawSector () {
        var shape:egret.Shape = new egret.Shape();
        shape.touchEnabled = true;
        this.main.addChild(shape);
        
        var arc = 360 / this.awards.length;
        var lastAngle = 0;
        var r = this.width / 2;

        for (var i = 0; i< this.awards.length; i++){
            lastAngle = i * arc;

            // this.drawArc(shape,r,r,r,arc,lastAngle);
            var g: eui.Group = new eui.Group();
            g.width = 2 * r * Math.sin(arc * 2 * Math.PI/ 360/2);
            g.height = r;
            g.x = 200 + Math.cos(lastAngle * Math.PI / 180 + arc* Math.PI / 180 / 2) * 200;
            g.y = 200 + Math.sin(lastAngle * Math.PI / 180 + arc* Math.PI / 180 / 2) * 200;
            g.touchEnabled = false;
            g.rotation = (lastAngle * Math.PI / 180 + arc * Math.PI / 180 / 2 + Math.PI /2 ) * 180 / Math.PI;
            // 文字
            var label: eui.Label = new eui.Label(i.toString());
            label.textColor = 0xE5302F;
            label.size = 30;
            g.addChild(label);
            // 小图片
            let smallImg = new eui.Image(this.awards[i].url);
            smallImg.width = 80;
            smallImg.height = 80;
            smallImg.x = - smallImg.width / 2;
            smallImg.y = smallImg.height / 2;
            g.addChild(smallImg);
            // 大图片
            let bigImg = new eui.Image(this.awards[i].url);
            bigImg.width = 160;
            bigImg.height = 160;
            bigImg.x = - bigImg.width / 2;
            bigImg.visible = false;
            g.addChild(bigImg);

            this.main.addChild(g);
        }

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
        let random: number = this.rnd();
        this.rotateFn(random);
    }

    private rnd(): number {
        return this.awards.length * 4 + Math.floor(Math.random() * this.awards.length);
    }

    rotateFn (random: number) {
        console.log('addNun = ' + (random % this.awards.length));
        let a = this.itemIndex - (random % this.awards.length);
        this.itemIndex = a >= 0 ? a : (this.awards.length + a);
        console.log('itemIndex = ' + this.itemIndex);                    
        let angles = random * (360 / this.awards.length) + (this.main.rotation % 360);
        console.log('angles = ' + angles);
        egret.Tween.pauseTweens(this.main);
		var t = egret.Tween.get( this.main );
        t
        .to( { rotation: angles }, 8000, egret.Ease.sineOut )
        .call(() => { 
            console.log('stop...');
            this.isAnimating = false;
            let item = <eui.Group>this.main.getChildAt(this.itemIndex + 2);
            console.log(item);
            console.log(this.main.getChildIndex(item));
            item.getChildAt(item.numChildren - 1).visible = true;
        });
    }

    /**
     * 画弧形方法
     */
    // drawArc(mc:egret.Shape, x:number=200, y:number=200, r:number=100, angle:number=27, startFrom:number=270, color:number=0xff0000):void {
    //     mc.graphics.beginFill(color,0);
    //     mc.graphics.lineStyle(0,color);   
    //     mc.graphics.moveTo(x,y);
    //     angle=(Math.abs(angle)>360)?360:angle;
    //     var n:number=Math.ceil(Math.abs(angle)/45);
    //     var angleA:number=angle/n;
    //     angleA=angleA*Math.PI/180;
    //     startFrom=startFrom*Math.PI/180;
    //     mc.graphics.lineTo(x+r*Math.cos(startFrom),y+r*Math.sin(startFrom));
    //     for (var i=1; i<=n; i++) {
    //         startFrom+=angleA;
    //         var angleMid=startFrom-angleA/2;
    //         var bx=x+r/Math.cos(angleA/2)*Math.cos(angleMid);
    //         var by=y+r/Math.cos(angleA/2)*Math.sin(angleMid);
    //         var cx=x+r*Math.cos(startFrom);
    //         var cy=y+r*Math.sin(startFrom);
    //         mc.graphics.curveTo(bx,by,cx,cy);
    //     }
    //     if (angle!=360) {
    //         mc.graphics.lineTo(x,y);
    //     }
    //     mc.graphics.endFill();
    // }

}