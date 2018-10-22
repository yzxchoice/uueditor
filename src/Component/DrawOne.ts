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
    private isRestore: boolean = true;

    // draw event 
    private drawTarget;
    private distanceX: number;
    private distanceY: number;

    // other
    private borderBox: eui.Group;
    private imageBox: eui.Group;
    private boxLayoutType: LayoutType = LayoutType.HLayout;
    private imageDefaultPosition: [number, number][] = [];
    private mapArr: {border: number, image: number}[] = [];
    private timer;

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

         let borderBox = this.createBorderBox();
         this.borderBox = borderBox;
         let imageBox = this.createImageBox();
         this.imageBox = imageBox;

         this.createLayout();           
         this.createSize();
         if(this.isRestore) {
             this.getImageDefaultPosition();
         }
         
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
             img.name = this.toAward[i].id;
             img.width = 240;
             img.height = 240;
             let imgGroup = UIFactory.createGroup(img.width, img.height);
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
             img.name = this.award[i].id;
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
             this.imageDefaultPosition.push([imageItem.x, imageItem.y]);
         }
     }

     private down(evt: egret.TouchEvent) {
        let target = evt.target;
        let isDraw = target.isDraw;
        if(isDraw) {
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
                let borderIndex = this.borderBox.getChildIndex(borderItem);                
                let imageIndex = this.imageBox.getChildIndex(this.drawTarget);                
                if(this.mapArr.some(item => item.border == borderIndex)) {
                    break;
                }
                this.checkoutImage(imageIndex);
                this.mapArr.push({border: borderIndex, image: imageIndex});
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
            let index = this.imageBox.getChildIndex(this.drawTarget);
            let defaultPosition = this.imageDefaultPosition[index];
            this.drawTarget.x = defaultPosition[0];
            this.drawTarget.y = defaultPosition[1];
            this.checkoutImage(index);
        }

        this.stage.removeEventListener(Mouse.MOVE, this.move, this);
        this.stage.removeEventListener(Mouse.END, this.up, this);
        evt.preventDefault();                
    }

    private checkoutImage(imgaeIndex: number) {
        if(this.mapArr.some(item => item.image == imgaeIndex)) {
            let mapArrIndex;
            for(let i = 0, len = this.mapArr.length; i < len; i++) {
                if(this.mapArr[i].image == imgaeIndex) {
                    mapArrIndex = i;
                }
            }
            this.mapArr.splice(mapArrIndex, 1);
        }
    }

}