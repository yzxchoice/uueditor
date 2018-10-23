
/**
 * 该组件包含的功能
 * 1、支持四种布局：上/下、下/上、左/右、右/上、左
 * 2、拖拽功能
 * 3、图片复位功能：未入框则恢复到初始的位置
 * 4、一框一图功能：一个框不能放置多张图片
 * 5、调整拖拽图片的层级：被拖拽的图片层级永远最高 
 * 6、支持选择图片放置在框中的位置：TOP/MIDDLE/BOTTOM
 * 7、支持占位图功能
 * 8、支持图片可选状态的开启与关闭
 * 9、支持背景图的设置
 */


class DragImageBox extends MapEleBoxFactory {

    static uuType = UUType.DRAG_IMAGE_BOX;
    // props
    // draw event 
    private distanceX: number; // 拖拽时 鼠标位置到被拖拽图片的X距离
    private distanceY: number; // 拖拽时 鼠标位置到被拖拽图片的Y距离

    // other
    private timer; // 用于up事件节流

     constructor(props) {
        super(props);
        this.listenEvent();        
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.getDragBorderBox, this);
     }

      // 监听事件
     listenEvent() {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.down, this);
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
        outermost:
        for(let j = 0, len = this.dragBorderBox.length; j < len; j++){
            for(let i = 0, len = this.dragBorderBox[j].numChildren; i < len; i++) {
                let borderItem = <eui.Group>this.dragBorderBox[j].getChildAt(i);
                let isHit:boolean = borderItem.hitTestPoint( drawTargeGlobalCenterX, drawTargeGlobalCenterY );
                if(isHit) {
                    console.log('borderItem........');
                    console.log(borderItem);
                    // 排斥校验
                    let borderId = borderItem.name;                
                    let imageId = this.drawTarget.name;   
                    if(this.mapArr.some(item => (item.borderId == borderId && item.imageId != imageId))) {
                        break outermost;
                    }
                    this.checkoutImage(imageId);
                    this.mapArr.push({borderId: borderId, imageId: imageId});
                    if(this.judgeBorderisFull()) {
                        this.removeAllEleClickState();
                    }
                    this.removeMapState(this.drawTarget);
                
                    this.dragBorderBoxIndex = j;
                    let point: egret.Point = this.getDrawTargetPointToparent(borderItem);
                    this.drawTarget.x = point.x;
                    this.drawTarget.y = point.y;
                    flag = true;
                    break outermost;
                }
            }
        }
      

        if(!flag && this.isRestore) {
            let index = this.drawTarget.name;
            this.recoverPosition(this.drawTarget);
            this.checkoutImage(index);
        }

        this.stage.removeEventListener(Mouse.MOVE, this.move, this);
        this.stage.removeEventListener(Mouse.END, this.up, this);
        evt.preventDefault();                
    }
    // 检查目标image是否在mapArr中，是则从mapArr中删除
    private checkoutImage(imageId: string) {
        if(this.mapArr.some(item => item.imageId == imageId)) {
            this.removeMapState(this.drawTarget);
            let mapArrIndex;
            for(let i = 0, len = this.mapArr.length; i < len; i++) {
                if(this.mapArr[i].imageId == imageId) {
                    mapArrIndex = i;
                }
            }
            this.mapArr.splice(mapArrIndex, 1);
        }
    }
}