/**
 * 该组件包含的功能
 * 1、支持四种布局：上/下、下/上、左/右、右/上、左
 * 2、拖拽功能
 * 3、图片复位功能：未入框则恢复到初始的位置
 * 4、一框一图功能：一个框不能放置多张图片
 * 5、调整拖拽图片的层级：被拖拽的图片层级永远最高 
 */

// 四种布局方式
enum DrawOneLayoutType {
    topToBottom = 1,
    BottomTo = 2,
    LeftToRight = 3,
    RightToLeft = 4,
}

class DrawOne extends eui.Group {

    static uuType = UUType.DRAW_ONE;
    // props
    private award: IResource[] = []; // 图片列表
    private toAward: IResource[] = []; // 框图片列表
    private layoutType: DrawOneLayoutType = 1; // 布局方式
    private isRestore: boolean = true; // 是否开启图片复位功能

    // draw event 
    private drawTarget; // 被拖拽的图片
    private distanceX: number; // 拖拽时 鼠标位置到被拖拽图片的X距离
    private distanceY: number; // 拖拽时 鼠标位置到被拖拽图片的Y距离

    // other
    private borderBox: eui.Group; // 边框容器
    private imageBox: eui.Group; // 图片容器
    private boxLayoutType: LayoutType = LayoutType.HLayout; // 边框、图片容器的布局方式
    private imageDefaultPosition: [number, number][] = []; // 图片初始位置，用于图片复位功能
    private mapArr: {borderId: string, imageId: string}[] = []; // 记录框、图匹配关系 用于一框一图功能
    private timer; // 用于up事件节流
    private topImage: UUImage; // 指向层级最高的image 用于 调整拖拽图片的层级功能

     constructor(props) {
         super();
         if(props.layoutType) {
            this.layoutType = props.layoutType;
         }
         if(props.isRestore) {
            this.isRestore = props.isRestore;             
         }
         this.award = props.award;
         this.toAward = props.toAward;
         this.init();
         this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.down, this);
     }

     private init() {
         this.getBoxLayoutType();

         this.borderBox = this.createBorderBox();
         this.imageBox = this.createImageBox();

         this.createLayout();           
         this.createSize();
         if(this.isRestore) {
             this.getImageDefaultPosition();
         }
         this.topImage = <UUImage>this.imageBox.getChildAt(this.imageBox.numChildren - 1);
     }

     private getBoxLayoutType(): void {
        switch(this.layoutType) {
             case DrawOneLayoutType.topToBottom:
             case DrawOneLayoutType.BottomTo:
                this.boxLayoutType = LayoutType.HLayout;
                break;
            case DrawOneLayoutType.LeftToRight:
            case DrawOneLayoutType.RightToLeft:
                this.boxLayoutType = LayoutType.VLayout;                
                break;
         } 
     }

     private createLayout(): void {
         switch(this.layoutType) {
             case DrawOneLayoutType.topToBottom:
                LayoutBaseFactory.main(this, [this.borderBox, this.imageBox], LayoutType.VLayout, GapType.Big);            
                break;
             case DrawOneLayoutType.BottomTo:
                LayoutBaseFactory.main(this, [this.imageBox, this.borderBox], LayoutType.VLayout, GapType.Big);            
                this.swapChildren(this.borderBox, this.imageBox);
                break;
            case DrawOneLayoutType.LeftToRight:
                LayoutBaseFactory.main(this, [this.borderBox, this.imageBox], LayoutType.HLayout, GapType.Big);            
                break;
            case DrawOneLayoutType.RightToLeft:
                LayoutBaseFactory.main(this, [this.imageBox, this.borderBox], LayoutType.HLayout, GapType.Big);            
                this.swapChildren(this.borderBox, this.imageBox);                                                                
                break;
         }
     }

     private createSize(): void {
         switch(this.boxLayoutType) {
             case LayoutType.HLayout:
                this.width = this.borderBox.width > this.imageBox.width ? this.borderBox.width + 10 * 2: this.imageBox.width + 10 * 2; 
                this.height = this.borderBox.height + this.imageBox.height + 10 * 2 + 30;
                break;  
             case LayoutType.VLayout:
                this.width = this.borderBox.width + this.imageBox.width + 10 * 2 + 30; 
                this.height = this.borderBox.height > this.imageBox.height ? this.borderBox.height + 10 * 2: this.imageBox.height + 10 * 2;
                break; 
         }
     }

     private createBorderBox(): eui.Group {
         let group = new eui.Group();
         group.layout = LayoutFactory.main(this.boxLayoutType, GapType.Middle);
         for(let i = 0, len = this.toAward.length; i < len; i++) {
             let img = <eui.Image>UIFactory.createImage(this.toAward[i].url);
             img.width = 240;
             img.height = 240;
             let imgGroup = UIFactory.createGroup(img.width, img.height);
             imgGroup.name = this.toAward[i].id.toString();             
             imgGroup.addChild(img);
             group.addChild(imgGroup);
         }
         let sizeObj = LayoutFactory.setGroupSize(this.toAward.length, 240, 240, this.boxLayoutType, GapType.Big);
         group.width = sizeObj.width;
         group.height = sizeObj.height;
         return group;
     }

     private createImageBox(): eui.Group {

         let sizeObj = LayoutFactory.setGroupSize(this.award.length, 240, 240, this.boxLayoutType, GapType.Big);         
         let group = UIFactory.createGroup(sizeObj.width, sizeObj.height);

         let imgArr: UUImage[] = []
         for(let i = 0, len = this.award.length; i < len; i++) {
             let img = new UUImage();
             img.isDraw = true;
             img.source = this.award[i].url;
             img.name = this.award[i].id.toString();
             img.width = 240;
             img.height = 240;
            
             imgArr.push(img);
         }
         LayoutBaseFactory.main( group, imgArr, this.boxLayoutType, GapType.Middle );
         return group;
     }

     private getImageDefaultPosition(): void {
         for(let i = 0, len = this.imageBox.numChildren; i < len; i++) {
             let imageItem = this.imageBox.getChildAt(i);
             this.imageDefaultPosition[imageItem.name] = [imageItem.x, imageItem.y];
         }
     }

     private down(evt: egret.TouchEvent) {
        let target = evt.target;
        let isDraw = target.isDraw;
        if(isDraw) {
            this.swapImageIndex(target);
            this.drawTarget = target;
            this.stage.addEventListener(Mouse.MOVE, this.move, this);
            this.stage.addEventListener(Mouse.END, this.up, this);

            let targetPoint = target.localToGlobal(0, 0);
            
            this.distanceX = evt.stageX - targetPoint.x;
            this.distanceY = evt.stageY - targetPoint.y;
        }
        evt.preventDefault();
    }

    private move(evt: egret.TouchEvent) {
        let targetPoint = this.drawTarget.parent.globalToLocal(evt.stageX - this.distanceX, evt.stageY - this.distanceY);   
        requestAnimationFrame(() => {
            this.drawTarget.x = targetPoint.x;
            this.drawTarget.y = targetPoint.y;
        });
             
        evt.preventDefault();        
    } 

    private up(evt: egret.TouchEvent) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.up2(evt);
        }, 50);
    }

    private up2(evt: egret.TouchEvent) {
        console.log('up...');
        // drawTarget 舞台坐标
        let drawTargeGlobalX = evt.stageX - this.distanceX;
        let drawTargeGlobalY = evt.stageY - this.distanceY;
        // drawTarget中心的 舞台坐标
        let drawTargeGlobalCenterX = drawTargeGlobalX + this.drawTarget.width / 2;
        let drawTargeGlobalCenterY = drawTargeGlobalY + this.drawTarget.height / 2;
        // 标记
        let flag = false;
        // 遍历border对象进行碰撞检测
        for(let i = 0, len = this.borderBox.numChildren; i < len; i++) {
            let borderItem = <eui.Group>this.borderBox.getChildAt(i);
            let isHit:boolean = borderItem.hitTestPoint( drawTargeGlobalCenterX, drawTargeGlobalCenterY );
            if(isHit) {
                // 排斥校验
                let borderId = borderItem.name;                
                let imageId = this.drawTarget.name;                
                if(this.mapArr.some(item => (item.borderId == borderId && item.imageId != imageId))) {
                    break;
                }
                this.checkoutImage(imageId);
                this.mapArr.push({borderId: borderId, imageId: imageId});
                // image中心与border中心重合
                // borderItem中心 相对坐标 相对于borderBox
                let borderItemCenterX = borderItem.x + borderItem.width / 2;
                let borderItemCenterY = borderItem.y + borderItem.height / 2;
                // drawTarget 相对于borderBox的坐标
                let drawTargetToX = borderItemCenterX - this.drawTarget.width / 2;
                let drawTargetToY = borderItemCenterY - this.drawTarget.height / 2;
                // drawTarget 舞台坐标
                let globalPoint = this.borderBox.localToGlobal(drawTargetToX, drawTargetToY);
                // drawTarget 相对于imageBox的坐标
                let localPoint = this.imageBox.globalToLocal(globalPoint.x, globalPoint.y)
                this.drawTarget.x = localPoint.x;
                this.drawTarget.y = localPoint.y;
                flag = true;
                break;
            }
        }

        if(!flag && this.isRestore) {
            let index = this.drawTarget.name;
            let defaultPosition = this.imageDefaultPosition[index];
            this.drawTarget.x = defaultPosition[0];
            this.drawTarget.y = defaultPosition[1];
            this.checkoutImage(index);
        }

        this.stage.removeEventListener(Mouse.MOVE, this.move, this);
        this.stage.removeEventListener(Mouse.END, this.up, this);
        evt.preventDefault();                
    }
    // 检查目标image是否在mapArr中，是则从mapArr中删除
    private checkoutImage(imageId: string) {
        if(this.mapArr.some(item => item.imageId == imageId)) {
            let mapArrIndex;
            for(let i = 0, len = this.mapArr.length; i < len; i++) {
                if(this.mapArr[i].imageId == imageId) {
                    mapArrIndex = i;
                }
            }
            this.mapArr.splice(mapArrIndex, 1);
        }
    }
    // 装换image的层级
    private swapImageIndex(target: UUImage) {
        this.topImage.parent.swapChildren(target, this.topImage);
        this.topImage = target;
    }

}