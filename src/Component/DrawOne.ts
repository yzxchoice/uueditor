enum DrawOneLayoutType {
    topToBottom = 1,
    BottomTo = 2,
    LeftToRight = 3,
    RightToLeft = 4,
}

class DrawOne extends eui.Group {

    static uuType = UUType.DRAW_ONE;
    // props
    private award: IResource[] = [];
    private toAward: IResource[] = [];
    private layoutType: DrawOneLayoutType = 1;

    // draw event 
    private drawTarget;
    private distanceX: number;
    private distanceY: number;

    // other
    private borderBox: eui.Group;
    private imageBox: eui.Group;

     constructor(props) {
         super();
         this.award = props.award;
         this.toAward = props.toAward;
         this.init();
         this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.down, this);
     }

     private init() {
         let layout = <eui.VerticalLayout>LayoutFactory.main(LayoutType.VLayout, GapType.Big);
         layout.horizontalAlign = egret.HorizontalAlign.CENTER;
         this.layout = layout;

         let borderBox = this.createBorderBox();
         this.borderBox = borderBox;
         let imageBox = this.createImageBox();
         this.imageBox = imageBox;

         this.addChild(borderBox); 
         this.addChild(imageBox);    

         this.width = borderBox.width > imageBox.width ? borderBox.width + 10 * 2: imageBox.width + 10 * 2; 
         this.height = borderBox.height + imageBox.height + 10 * 2 + 30;    
     }

     private createBorderBox(): eui.Group {
         let group = new eui.Group();
         group.layout = LayoutFactory.main(LayoutType.HLayout, GapType.Middle);
         for(let i = 0, len = this.toAward.length; i < len; i++) {
             let img = <eui.Image>UIFactory.createImage(this.toAward[i].url);
             img.name = this.toAward[i].id;
             img.width = 240;
             img.height = 240;
             let imgGroup = UIFactory.createGroup(img.width, img.height);
             imgGroup.addChild(img);
             group.addChild(imgGroup);
         }
         let sizeObj = LayoutFactory.setGroupSize(this.toAward.length, 240, 240, LayoutType.HLayout, GapType.Big);
         group.width = sizeObj.width;
         group.height = sizeObj.height;
         return group;
     }

     private createImageBox(): eui.Group {

         let sizeObj = LayoutFactory.setGroupSize(this.award.length, 240, 240, LayoutType.HLayout, GapType.Big);         
         let group = UIFactory.createGroup(sizeObj.width, sizeObj.height);

         let imgArr: UUImage[] = []
         for(let i = 0, len = this.award.length; i < len; i++) {
             let img = new UUImage();
             img.isDraw = true;
             img.source = this.award[i].url;
             img.name = this.award[i].id;
             img.width = 240;
             img.height = 240;
            
             imgArr.push(img);
         }
         LayoutBaseFactory.main( group, imgArr, LayoutType.HLayout, GapType.Middle );
         return group;
     }

     down(evt: egret.TouchEvent) {
        let target = evt.target;
        let isDraw = target.isDraw;
        if(isDraw) {
            this.drawTarget = target;
            this.addEventListener(Mouse.MOVE, this.move, this);
            this.addEventListener(Mouse.END, this.up, this);

            let targetPoint = target.localToGlobal(0, 0);
            
            this.distanceX = evt.stageX - targetPoint.x;
            this.distanceY = evt.stageY - targetPoint.y;
        }
        evt.preventDefault();
    }

    move(evt: egret.TouchEvent) {
        let targetPoint = this.drawTarget.parent.globalToLocal(evt.stageX - this.distanceX, evt.stageY - this.distanceY);   
        requestAnimationFrame(() => {
            this.drawTarget.x = targetPoint.x;
            this.drawTarget.y = targetPoint.y;
        });
             
        evt.preventDefault();        
    } 

    up(evt: egret.TouchEvent) {
        // drawTarget 舞台坐标
        let drawTargeGlobalX = evt.stageX - this.distanceX;
        let drawTargeGlobalY = evt.stageY - this.distanceY;
        // drawTarget中心的 舞台坐标
        let drawTargeGlobalCenterX = drawTargeGlobalX + this.drawTarget.width / 2;
        let drawTargeGlobalCenterY = drawTargeGlobalY + this.drawTarget.height / 2;
        // 遍历border对象进行碰撞检测
        for(let i = 0, len = this.borderBox.numChildren; i < len; i++) {
            let borderItem = <eui.Group>this.borderBox.getChildAt(i);
            let isHit:boolean = borderItem.hitTestPoint( drawTargeGlobalCenterX, drawTargeGlobalCenterY );
            if(isHit) {
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
                break;
            }
            console.log('isHit = ' + isHit);
        }

        this.removeEventListener(Mouse.MOVE, this.move, this);
        this.removeEventListener(Mouse.END, this.up, this);
        evt.preventDefault();                
    }
}