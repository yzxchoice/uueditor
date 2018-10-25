interface IDragBorderBox {
    bgWidth: number; // 每个匹配框的宽度
    bgHeight: number; // 每个匹配框的高度
    toAward: IResource[], // 匹配框数据列表
    layoutSet: ILayout, // 布局方式
    functions: FunctionType[], // 需要开启的功能，例如：reset、answer
    answerJudgePosition?: AnswerJudgePosition, // 判断效果的显示位置
    rightAnswerPostion?: AnswerJudgePosition, // 正确答案的显示位置
    rightAnswer?: ILabel, // 正确答案
}

class DragBorderBox extends eui.Group implements IDragBorderBox, ILayout, FunctionForReset, FunctionForAnswer {

    static uuType = UUType.DRAG_BORDER_BOX;
    // props
    bgWidth: number = 300;
    bgHeight: number = 300;
    toAward: IResource[] = []; 
    layoutSet: ILayout;
    functions: FunctionType[] = []; 
    answerJudgePosition: AnswerJudgePosition =  AnswerJudgePosition.Center; 
    rightAnswerPostion: AnswerJudgePosition =  AnswerJudgePosition.BottomRight; 
    rightAnswer: ILabel;

    // layout
    layoutType: LayoutType = 1; // 布局方式
    gap: GapType = GapType.Middle;
    columnCount: number = 3;

    // other
    private globalState: GlobalState = GlobalState.getInstance();
    private hasAnswer: boolean = false; // 是否已经answer
    private observer: Observer = Observer.getInstance(); // 观察者

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
         this.init();
     }

     private init() {
         this.layout = LayoutFactory.main(this.layoutType, this.gap, this.columnCount);
         let size = LayoutFactory.setGroupSize(this.toAward.length, this.bgWidth, this.bgHeight, this.layoutType, this.gap, this.columnCount);
         this.width = size.width;
         this.height = size.height;
         this.createBorderBox();
         this.openFunctions();
     }

      // 开启组件功能
     private openFunctions(): void {
         for(let i = 0, len = this.functions.length; i < len; i++) {
             let functionType = <FunctionType>this.functions[i];
             let functionName = SwitchState.switchFunctionType(functionType);
             this.observer.register(functionName, this[functionName].bind(this));
         }
     }

     private createBorderBox(): void {
         for(let i = 0, len = this.toAward.length; i < len; i++) {
             let imgGroup = UIFactory.createGroup(this.bgWidth, this.bgHeight);
             imgGroup.name = this.toAward[i].id.toString();  
             if(this.toAward[i].url) {
                let img = <eui.Image>UIFactory.createImage(this.toAward[i].url);
                img.width = this.bgWidth;
                img.height = this.bgHeight;
                imgGroup.addChild(img);
             } else {
                 let alpha: number = this.globalState.getShowState() == 1 ? 1 : 0;
                 let shape = new egret.Shape();
                 shape.graphics.beginFill(0x0000ff, alpha);
                 shape.graphics.drawRect(0, 0, this.bgWidth, this.bgHeight);
                 shape.graphics.endFill();
                 imgGroup.addChild(shape);
             }
             this.addChild(imgGroup);
         }
     }
    
    // 重置
    reset(): void {
        this.removeChildren();
        this.init();        
    }  

     // answer功能
    answer(): void {
        console.log('answer DragBorderBox...');
        if(this.hasAnswer) return;
        this.hasAnswer = true;
        for(let i = 0, len = this.numChildren; i < len; i++) {
            let imageItem = <eui.Group>this.getChildAt(i);
            let itemId = imageItem.name;
            let answer: boolean = this.toAward.filter(item => item.id == itemId)[0].answer;
            let rightAnswer: ILabel = this.toAward.filter(item => item.id == itemId)[0].rightAnswer;
            let params = {
                groupWidth: imageItem.width,
                groupHeight: imageItem.height,
                judge: answer,
                itemPosition: AnswerJudgePosition.Center,
                rightAnswerPostion: this.rightAnswerPostion,
                rightAnswer: new UULabel(rightAnswer),
            }
            let anserJudge = new AnswerJudge(params);
            imageItem.addChild(anserJudge);
        }
    }

}