
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


class ClickImageBox extends MapEleBoxFactory {

    static uuType = UUType.CLICK_IMAGE_BOX;
    // props
    clickMode: ClickMode = ClickMode.MuchToMuch; // 点击模式 多对多/多对一

    // other
    private selectedImage: UUImage | null = null; // 多对一模式 框内的dragImage
    private isTweening: boolean = false; // 多对一模式 动画是否正在进行的标记

     constructor(props) {
        super(props);
        if(props.clickMode) {
            this.clickMode = props.clickMode;             
        }
        this.listenEvent();        
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.getDragBorderBox, this);
     }

     // 监听事件
     listenEvent() {
        console.log('this.clickMode = ' + this.clickMode);         
        if(this.clickMode == 1) {
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.downForClickMode1, this);
         }else {
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.downForClickMode2, this);             
         }
     }

     // 多对多模式的事件监听
     private downForClickMode1(evt: egret.TouchEvent) {
        evt.preventDefault();         
        let target = evt.target;
        let isDraw = target.isDraw;
        if(this.judgeBorderisFull()) return;
        if(isDraw) {
            this.drawTarget = target;
            this.mapBorder();
        }
    }

    // 多对一模式的事件监听
    downForClickMode2(evt: egret.TouchEvent) {
        evt.preventDefault();  
        let borderItem = this.dragBorderBox[0].getChildAt(0);
        let target = evt.target;
        if(!target.isDraw) return;
        if(this.isTweening) return;
        this.drawTarget = target;
        this.swapImageIndex(target);
        if(this.selectedImage) {
            this.recoverPosition(this.selectedImage);
            this.addMapState(this.selectedImage);  
        }
        let point: egret.Point = this.getDrawTargetPointToparent(borderItem);
        this.isTweening = true;
        egret.Tween.get( target )
            .to({ x: point.x, y: point.y }, 1000)
            .call(() => {
                this.isTweening = false;
                this.selectedImage = target;
                this.removeMapState(target);
            })
    }
}   