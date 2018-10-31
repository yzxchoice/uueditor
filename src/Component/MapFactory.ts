
enum ImagePosition {
    TOP = 1,
    MIDDLE = 2,
    BOTTOM = 3,
}

enum ClickMode {
    MuchToMuch = 1,
    MuchToOne = 2,
}

enum ResourceType {
    Text = 1,
    Image = 2,
}

/**
 * 匹配元素类的基类
 * 1、处理UI层
 * 2、处理功能列表：reset、answer、start
 * 3、具体的交互方式由子类实现
 */
interface IMapEle {
    award: IResource[], // 匹配元素数据列表
    layoutSet: ILayout, // 布局方式    
    resourceType: ResourceType, // 匹配元素类型，文字/图片
    imgWidth: number, // 匹配元素宽度
    imgHeight: number, // 匹配元素高度
    imagePosition: ImagePosition, // 匹配元素在匹配框中的位置 top/center/bottom
    placeholder: boolean, // 是否有占位图
    functions: FunctionType[], // 需要开启的功能，例如：reset、answer    
    hasBorder: boolean, // 是否有背景图
    bgWidth?: number, // 背景图宽度
    bgHeight?: number, // 背景图高度
    clickMode?: ClickMode, // 点击匹配的模式 多对多/多对一
    answerJudgePosition?: AnswerJudgePosition, // 判断效果的显示位置
    fontStyle?: ILabel // 文字样式
}

abstract class MapEleBoxFactory extends eui.Group implements IMapEle, ILayout, FunctionForReset, FunctionForAnswer {
    // props
    award: IResource[] = []; 
    layoutSet: ILayout;      
    resourceType: ResourceType = ResourceType.Text; 
    imgWidth: number = 240;     
    imgHeight: number = 240;     
    imagePosition: ImagePosition = ImagePosition.MIDDLE; 
    placeholder: boolean = true; 
    functions: FunctionType[] = [];     
    hasBorder: boolean = true; 
    bgWidth: number = 300;     
    bgHeight: number = 300;     
    answerJudgePosition: AnswerJudgePosition =  AnswerJudgePosition.Center; 
    fontStyle: ILabel = {};    

    // other    
    dragBorderBox: DragBorderBox[] = []; // 匹配框组
    dragBorderBoxIndex: number = 0; // 某个匹配框的索引
    imageBox: eui.Group; // 匹配元素盒
    drawTarget; // 被匹配的图片
    imageDefaultPosition: [number, number][] = []; // 图片初始位置，用于图片复位功能
    mapArr: {borderId: string, imageId: string}[] = []; // 记录框、图匹配关系 用于一框一图功能
    topImage: eui.Group; // 指向层级最高的image 用于 调整拖拽图片的层级功能
    observer: Observer = Observer.getInstance(); // 观察者
    hasAnswer: boolean = false; // 是否已经answer

    // layout 
    layoutType: LayoutType = 1; // 布局方式
    gap: GapType = GapType.Middle;
    columnCount: number = 3;

    constructor(props) {
         super();
         for(let key in props) {
             if(props[key] !== undefined) {
                 this[key] = props[key];
             }
         }
         for(let key in props.layoutSet) {
             if(props.layoutSet[key] !== undefined) {
                 this[key] = props.layoutSet[key];
             }
         }
         this.renderUI();
         this.openFunctions();
     }

     // 初始化UI
     protected renderUI() {
         this.imageBox = this.createTotalGroupBox();
         this.width = this.imageBox.width;
         this.height = this.imageBox.height;
         this.addChild(this.imageBox);

         this.getImageDefaultPosition();
         this.topImage = <eui.Group>this.imageBox.getChildAt(this.imageBox.numChildren - 1);
     }

     // 开启组件功能
     protected openFunctions(): void {
         for(let i = 0, len = this.functions.length; i < len; i++) {
             let functionType = <FunctionType>this.functions[i];
             let functionName = SwitchState.switchFunctionType(functionType);
             this.observer.register(functionName, this[functionName].bind(this));
         }
     }

     // 获取对应的匹配框组件
     protected getDragBorderBox() {
        let parent = this.parent;
        for(let i = 0; i < parent.numChildren; i++) {
            if(parent.getChildAt(i) instanceof DragBorderBox){
                this.dragBorderBox.push(<DragBorderBox>parent.getChildAt(i))
            }
        }
     }

     // 创建最外层的容器
     protected createTotalGroupBox(): eui.Group {
         // 每个item的容器的尺寸 及 内部目标元素的尺寸与位置
         let groupWidth: number = this.imgWidth;
         let groupHeight: number = this.imgHeight;
         let x: number = 0;
         let y: number = 0;
         if(this.hasBorder) {
             groupWidth = this.bgWidth;
             groupHeight = this.bgHeight;
             x = (this.bgWidth - this.imgWidth) / 2;
             y = (this.bgHeight - this.imgHeight) / 2;
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

     protected createPlaceholderImage(url: string): UUImage {
        let img = new UUImage();
        img.isDraw = false;
        img.source = url
        img.width = this.imgWidth;
        img.height = this.imgHeight;
        img.filters = [ FilterFactory.createShadowFilter() ];
        return img;
     }

     protected createImage(item: IResource): UUImage {
        let img = new UUImage();
        img.isDraw = true;
        img.source = item.url;
        img.name = item.id.toString();
        img.width = this.imgWidth;
        img.height = this.imgHeight;
        img.filters = [ FilterFactory.createGlodFilter() ];
        return img;
     }

     protected createText(item: IResource): UULabel {
         let label = new UULabel(this.fontStyle);
         label.isDraw = true;
         label.name = item.id.toString();         
         label.text = item.text;
         label.width = this.imgWidth;
         label.height = this.imgHeight;
         label.textAlign = 'center';
         label.verticalAlign = 'middle';
         label.filters = [ FilterFactory.createGlodFilterForText() ];         
         return label;
     }

     protected getImageDefaultPosition(): void {
         for(let i = 0, len = this.imageBox.numChildren; i < len; i++) {
             let group = <eui.Group>this.imageBox.getChildAt(i);
             let imageItem = group.getChildAt(group.numChildren - 1);
             this.imageDefaultPosition[imageItem.name] = [imageItem.x, imageItem.y];
         }
         console.log(this.imageDefaultPosition);
     }

    // 将匹配元素与匹配框进行匹配
    protected mapBorder() {
        let borderIndex = this.mapArr.length;
        let borderItem = this.getBorderItem(borderIndex);
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

    protected getBorderItem(borderIndex: number) {
        let dragBorderBoxIndex = 0;
        let addNum = 0;
        let borderItem;
        while(true) {
            let len = this.dragBorderBox[dragBorderBoxIndex].numChildren;
            addNum += len;
            if(addNum > borderIndex) {
                borderItem = this.dragBorderBox[dragBorderBoxIndex].getChildAt(borderIndex - (addNum - len));
                this.dragBorderBoxIndex = dragBorderBoxIndex;
                break;
            }
            dragBorderBoxIndex += 1;
        }
        return borderItem;
    }

    // 匹配元素在匹配框中的位置
    protected getDrawTargetPointToparent(borderItem) : egret.Point {
        let borderScaleX = this.dragBorderBox[this.dragBorderBoxIndex].scaleX;
        let borderScaleY = this.dragBorderBox[this.dragBorderBoxIndex].scaleY;
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
        let globalPoint = this.dragBorderBox[this.dragBorderBoxIndex].localToGlobal(drawTargetToX, drawTargetToY);
        // drawTarget 相对于imageBox的坐标
        let localPoint = this.drawTarget.parent.globalToLocal(globalPoint.x, globalPoint.y);
        return localPoint;
    }
    
    // 判断匹配框是否已经满了
    protected judgeBorderisFull(): boolean {
        let borderItemNum = 0;
        this.dragBorderBox.forEach(item => borderItemNum += item.numChildren);
        return this.mapArr.length === borderItemNum;
    }

    // 移除所有匹配元素的可点击状态
    protected removeAllEleClickState(): void {
        for(let i = 0, len = this.imageBox.numChildren; i < len; i++) {
            let group = <eui.Group>this.imageBox.getChildAt(i);
            let dragImg = <UUImage | UULabel>group.getChildAt(group.numChildren - 1);
            dragImg.filters = [];
            dragImg.isDraw = false;
        }
    }

    // 移除某个匹配元素的可匹配状态
    protected removeMapState(target: UUImage | UULabel): void {
        target.isDraw = false;
        target.filters = [];
    }

    // 添加某个匹配元素的可匹配状态
    protected addMapState(target: UUImage | UULabel): void {
        target.isDraw = true;
        if(this.resourceType == 1) {
            target.filters = [ FilterFactory.createGlodFilterForText() ];
        } else {
            target.filters = [ FilterFactory.createGlodFilter() ];            
        }
    }

    // 复原某个匹配元素的位置
    protected recoverPosition(target: UUImage | UULabel): void {
        let defaultPosition = this.imageDefaultPosition[target.name];
        target.x = defaultPosition[0];
        target.y = defaultPosition[1];
    }

    // 转换匹配元素的层级
    protected swapImageIndex(target: UUImage) {
        this.imageBox.swapChildren(target.parent, this.topImage);
        this.topImage = <eui.Group>target.parent;
    }

    // 重置功能
    reset(): void {
        this.removeChildren();
        this.imageDefaultPosition = [];
        this.mapArr = [];
        this.hasAnswer = false;
        this.renderUI();        
    }

    // answer功能
    answer(): void {
        console.log('answer MapFactory...');
        if(this.hasAnswer) return;
        this.hasAnswer = true;
        for(let i = 0, len = this.imageBox.numChildren; i < len; i++) {
            let imageItem = <eui.Group>this.imageBox.getChildAt(i);
            let mapItem = imageItem.getChildAt(imageItem.numChildren - 1);
            let mapItemId = mapItem.name;
            let answer: boolean = this.award.filter(item => item.id == mapItemId)[0].answer;
            let params = {
                groupWidth: mapItem.width,
                groupHeight: mapItem.height,
                judge: answer,
                itemPosition: this.answerJudgePosition,
            }
            let anserJudge = new AnswerJudge(params);
            anserJudge.x = mapItem.x;
            anserJudge.y = mapItem.y;
            imageItem.addChild(anserJudge);
        }
    }
}