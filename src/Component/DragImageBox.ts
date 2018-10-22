/**
 * 该组件包含的功能
 * 1、支持四种布局：上/下、下/上、左/右、右/上、左
 * 2、拖拽功能
 * 3、图片复位功能：未入框则恢复到初始的位置
 * 4、一框一图功能：一个框不能放置多张图片
 * 5、调整拖拽图片的层级：被拖拽的图片层级永远最高 
 */


class DragImageBox extends eui.Group {

    static uuType = UUType.DRAG_IMAGE_BOX;
    // props
    private award: IResource[] = []; // 图片列表
    private dragBorderBoxId: number; // 框图片盒ID
    private layoutType: LayoutType = 1; // 布局方式
    private gap: GapType = GapType.Middle;
    private columnCount: number = 3;
    private isRestore: boolean = true; // 是否开启图片复位功能

    // 框图片盒
    private dragBorderBox: DragBorderBox;
    // draw event 
    private drawTarget; // 被拖拽的图片
    private distanceX: number; // 拖拽时 鼠标位置到被拖拽图片的X距离
    private distanceY: number; // 拖拽时 鼠标位置到被拖拽图片的Y距离

    // other
    private imageDefaultPosition: [number, number][] = []; // 图片初始位置，用于图片复位功能
    private mapArr: {borderId: string, imageId: string}[] = []; // 记录框、图匹配关系 用于一框一图功能
    private timer; // 用于up事件节流
    private topImage: UUImage; // 指向层级最高的image 用于 调整拖拽图片的层级功能

     constructor(props) {
        super();
        this.dragBorderBoxId = props.dragBorderBoxId;

        if(props.layoutSet.layoutType) {
            this.layoutType = props.layoutSet.layoutType;
         }
         if(props.layoutSet.gap) {
            this.gap = props.layoutSet.gap;
         }
         if(props.layoutSet.columnCount) {
            this.columnCount = props.layoutSet.columnCount;
         }
         if(props.isRestore) {
            this.isRestore = props.isRestore;             
         }
         this.award = props.award;
         this.init();
         this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.down, this);
         this.addEventListener(egret.Event.ADDED_TO_STAGE, this.getDragBorderBox, this);
     }

     private init() {
         this.createImageBox();
         if(this.isRestore) {
             this.getImageDefaultPosition();
         }
         this.topImage = <UUImage>this.getChildAt(this.numChildren - 1);
     }

     private getDragBorderBox() {
        let parent = this.parent;
        console.log('parent...');
        console.log(parent);
        let dragBorderBox = parent.getChildAt(1);
        console.log('dragBorderBox...');
        console.log(dragBorderBox);
        this.dragBorderBox = <DragBorderBox>dragBorderBox;
     }


     private createImageBox(): void {

         let sizeObj = LayoutFactory.setGroupSize(this.award.length, 240, 240, this.layoutType, this.gap, this.columnCount);     
         this.width = sizeObj.width;
         this.height = sizeObj.height;    

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
         LayoutBaseFactory.main( this, imgArr, this.layoutType, this.gap, this.columnCount );
     }

     private getImageDefaultPosition(): void {
         for(let i = 0, len = this.numChildren; i < len; i++) {
             let imageItem = this.getChildAt(i);
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
        let borderScaleX = this.dragBorderBox.scaleX;
        let borderScaleY = this.dragBorderBox.scaleY;
        let imageScaleX = this.scaleY;
        let imageScaleY = this.scaleY;
        // 遍历border对象进行碰撞检测
        for(let i = 0, len = this.dragBorderBox.numChildren; i < len; i++) {
            let borderItem = <eui.Group>this.dragBorderBox.getChildAt(i);
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
                let borderItemCenterX = borderItem.x * borderScaleX + borderItem.width * borderScaleX / 2;
                let borderItemCenterY = borderItem.y * borderScaleY + borderItem.height * borderScaleY / 2;
                // drawTarget 相对于borderBox的坐标, ps: 需要将缩放后的坐标除以borderScale， 因为dragBorderBox中的坐标为自动乘以borderScale
                let drawTargetToX = (borderItemCenterX - this.drawTarget.width * imageScaleX / 2) / borderScaleX;
                let drawTargetToY = (borderItemCenterY - this.drawTarget.height * imageScaleY / 2) / borderScaleY;
                // drawTarget 舞台坐标
                let globalPoint = this.dragBorderBox.localToGlobal(drawTargetToX, drawTargetToY);
                // drawTarget 相对于imageBox的坐标
                let localPoint = this.globalToLocal(globalPoint.x, globalPoint.y)
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