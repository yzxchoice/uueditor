
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


class ClickImageBox extends eui.Group {

    static uuType = UUType.CLICK_IMAGE_BOX;
    // props
    private award: IResource[] = []; // 图片列表
    private layoutType: LayoutType = 1; // 布局方式
    private gap: GapType = GapType.Middle;
    private columnCount: number = 3;
    private imagePosition: ImagePosition = ImagePosition.MIDDLE; // 拖拽图在边框图中放置的位置：TOP/MIDDLE/BOTTOM
    private placeholder: boolean = false; // 是否带占位图
    private hasBorder: boolean = false; // 是否带背景图
    private isRestore: boolean = true; // 是否开启图片复位功能
    private clickMode: ClickMode = ClickMode.MuchToMuch; // 点击模式 多对多/多对一
    private resourceType: ResourceType = ResourceType.Text; // 资源类型 文字/图片

    private dragBorderBox: DragBorderBox; // 框图片盒
    private imageBox: eui.Group; // 拖拽图片盒
    // draw event 
    private drawTarget: UUImage | UULabel; // 被拖拽的图片

    // other
    private imageDefaultPosition: [number, number][] = []; // 图片初始位置，用于图片复位功能
    private mapArr: {borderId: string, imageId: string}[] = []; // 记录框、图匹配关系 用于一框一图功能
    private topImage: eui.Group; // 指向层级最高的image 用于 调整拖拽图片的层级功能
    private selectedImage: UUImage | null = null; // 多对一模式 框内的dragImage
    private isTweening: boolean = false; // 多对一模式 动画是否正在进行的标记

     constructor(props) {
        super();
        if(props.layoutSet.layoutType) {
            this.layoutType = props.layoutSet.layoutType;
         }
         if(props.layoutSet.gap) {
            this.gap = props.layoutSet.gap;
         }
         if(props.layoutSet.columnCount) {
            this.columnCount = props.layoutSet.columnCount;
         }
         if(props.imagePosition) {
            this.imagePosition = props.imagePosition;
         }
         this.placeholder = props.placeholder ? props.placeholder : false;
         this.hasBorder = props.hasBorder ? props.hasBorder : false;
         this.isRestore = props.isRestore ? props.isRestore : true;
         if(props.resourceType) {
            this.resourceType = props.resourceType;
         }
         if(props.clickMode) {
            this.clickMode = props.clickMode;             
         }
         this.award = props.award;
         this.renderUI();
         this.listenEvent();
         this.addEventListener(egret.Event.ADDED_TO_STAGE, this.getDragBorderBox, this);
     }

     // 初始化UI
     private renderUI() {
         this.imageBox = this.createTotalGroupBox();
         this.width = this.imageBox.width;
         this.height = this.imageBox.height;
         this.addChild(this.imageBox);

         if(this.isRestore) {
             this.getImageDefaultPosition();
         }
         this.topImage = <eui.Group>this.imageBox.getChildAt(this.imageBox.numChildren - 1);
     }

     // 监听事件
     private listenEvent() {
        if(this.clickMode == 1) {
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.downForClickMode1, this);
         }else {
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.downForClickMode2, this);             
         }
     }

     // 获取对应的匹配框组件
     private getDragBorderBox() {
        let parent = this.parent;
        for(let i = 0; i < parent.numChildren; i++) {
            if(parent.getChildAt(i) instanceof DragBorderBox){
                this.dragBorderBox = <DragBorderBox>parent.getChildAt(i);      
            }
        }
     }

     // 创建最外层的容器
     private createTotalGroupBox(): eui.Group {
         // 每个item的容器的尺寸 及 内部目标元素的尺寸与位置
         let groupWidth: number = 240;
         let groupHeight: number = 240;
         let x: number = 0;
         let y: number = 0;
         if(this.hasBorder) {
             groupWidth = 300;
             groupHeight = 300;
             x = 30;
             y = 30;
         }
         let sizeObj = LayoutFactory.setGroupSize(this.award.length, groupWidth, groupHeight, this.layoutType, this.gap, this.columnCount);     
         let imageGroupBox = UIFactory.createGroup(sizeObj.width, sizeObj.height);   

         let imageGroupArr: eui.Group[] = [];
         for(let i = 0, len = this.award.length; i < len; i++) {
             let group = UIFactory.createGroup(groupWidth, groupHeight);

             if(this.hasBorder) {
                let img = new UUImage();
                img.isDraw = false;
                img.source = 'resource/assets/Pic/draw_card_bg.png';
                img.width = group.width;
                img.height = group.height;
                group.addChild(img);
             }

             if(this.placeholder) {
                let img = this.createPlaceholderImage(this.award[i].url);
                img.x = x;
                img.y = y;
                group.addChild(img);
             }

             if(this.resourceType == 1) {
                let label = this.createText(this.award[i]);
                label.x = x;
                label.y = y;
                group.addChild(label);
             }else {
                let img = this.createImage(this.award[i]);
                img.x = x;
                img.y = y;
                group.addChild(img);
             }
         
             imageGroupArr.push(group);
         }
         LayoutBaseFactory.main( imageGroupBox, imageGroupArr, this.layoutType, this.gap, this.columnCount );
         return imageGroupBox;
     }

     private createPlaceholderImage(url: string): UUImage {
        let img = new UUImage();
        img.isDraw = false;
        img.source = url
        img.width = 240;
        img.height = 240;
        img.filters = [ FilterFactory.createShadowFilter() ];
        return img;
     }

     private createImage(item: IResource): UUImage {
        let img = new UUImage();
        img.isDraw = true;
        img.source = item.url;
        img.name = item.id.toString();
        img.width = 240;
        img.height = 240;
        img.filters = [ FilterFactory.createGlodFilter() ];
        return img;
     }

     private createText(item: IResource): UULabel {
         let label = new UULabel();
         label.isDraw = true;
         label.name = item.id.toString();         
         label.text = item.text;
         label.width = 240;
         label.height = 240;
         label.textAlign = 'center';
         label.verticalAlign = 'middle';
         label.filters = [ FilterFactory.createGlodFilterForText() ];         
         return label;
     }

     private getImageDefaultPosition(): void {
         for(let i = 0, len = this.imageBox.numChildren; i < len; i++) {
             let group = <eui.Group>this.imageBox.getChildAt(i);
             let imageItem = group.getChildAt(group.numChildren - 1);
             this.imageDefaultPosition[imageItem.name] = [imageItem.x, imageItem.y];
         }
         console.log(this.imageDefaultPosition);
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
    private downForClickMode2(evt: egret.TouchEvent) {
        evt.preventDefault();  
        let borderItem = this.dragBorderBox.getChildAt(0);
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

    // 将匹配元素与匹配框进行匹配
    private mapBorder() {
        let borderIndex = this.mapArr.length;
        let borderItem = this.dragBorderBox.getChildAt(borderIndex);
        let borderId = borderItem.name;
        let imageId = this.drawTarget.name;
        
        this.removeMapState(this.drawTarget);
        this.mapArr.push({borderId: borderId, imageId: imageId});
        if(this.judgeBorderisFull()) {
            this.removeAllEleClickState();
        }

        let point: egret.Point = this.getDrawTargetPointToparent(borderItem);
        this.drawTarget.x = point.x;
        this.drawTarget.y = point.y;
    }

    // 匹配元素在匹配框中的位置
    private getDrawTargetPointToparent(borderItem) : egret.Point {
        let borderScaleX = this.dragBorderBox.scaleX;
        let borderScaleY = this.dragBorderBox.scaleY;
        let imageScaleX = this.scaleY;
        let imageScaleY = this.scaleY;

        let borderItemCenterX = borderItem.x * borderScaleX + borderItem.width * borderScaleX / 2;
        let borderItemCenterY = borderItem.y * borderScaleY + borderItem.height * borderScaleY / 2;
        // drawTarget 相对于borderBox的坐标, ps: 需要将缩放后的坐标除以borderScale， 因为dragBorderBox中的坐标为自动乘以borderScale
        let drawTargetToX = (borderItemCenterX - this.drawTarget.width * imageScaleX / 2) / borderScaleX;
        // 根据props字段 imagePosition 实现Y轴对齐方式
        // TOP: 距框顶部10
        // MIDDLE: 居中
        // BOTTOM: 距离框底部10
        let drawTargetToY;
        switch(this.imagePosition) {
            case ImagePosition.TOP:
                drawTargetToY = borderItem.y + 10;
                break;
            case ImagePosition.MIDDLE:
                drawTargetToY = (borderItemCenterY - this.drawTarget.height * imageScaleY / 2) / borderScaleY;
                break;
            case ImagePosition.BOTTOM:
                drawTargetToY = ((borderItem.y + borderItem.height) * borderScaleY - this.drawTarget.height * imageScaleY) / borderScaleY - 10;
                break;
        }
        // drawTarget 舞台坐标
        let globalPoint = this.dragBorderBox.localToGlobal(drawTargetToX, drawTargetToY);
        // drawTarget 相对于imageBox的坐标
        let localPoint = this.drawTarget.parent.globalToLocal(globalPoint.x, globalPoint.y);
        return localPoint;
    }
    
    // 判断匹配框是否已经满了
    private judgeBorderisFull(): boolean {
        return this.mapArr.length === this.dragBorderBox.numChildren
    }

    // 移除所有匹配元素的可点击状态
    private removeAllEleClickState(): void {
        for(let i = 0, len = this.imageBox.numChildren; i < len; i++) {
            let group = <eui.Group>this.imageBox.getChildAt(i);
            let dragImg = group.getChildAt(group.numChildren - 1);
            dragImg.filters = [];
        }
    }

    // 移除某个匹配元素的可匹配状态
    private removeMapState(target: UUImage | UULabel): void {
        target.isDraw = false;
        target.filters = [];
    }

    // 添加某个匹配元素的可匹配状态
    private addMapState(target: UUImage | UULabel): void {
        target.isDraw = true;
        if(this.resourceType == 1) {
            target.filters = [ FilterFactory.createGlodFilterForText() ];
        } else {
            target.filters = [ FilterFactory.createGlodFilter() ];            
        }
    }

    // 复原某个匹配元素的位置
    private recoverPosition(target: UUImage | UULabel): void {
        let defaultPosition = this.imageDefaultPosition[target.name];
        target.x = defaultPosition[0];
        target.y = defaultPosition[1];
    }

    // 转换匹配元素的层级
    private swapImageIndex(target: UUImage) {
        this.imageBox.swapChildren(target.parent, this.topImage);
        this.topImage = <eui.Group>target.parent;
    }
}   