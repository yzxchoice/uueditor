interface IDragBorderBox {
    bgWidth: number;
    bgHeight: number;
    toAward: IResource[];
    layoutSet: ILayout;
    functions: FunctionType[];
    answerJudgePosition?: AnswerJudgePosition;
    rightAnswerPostion?: AnswerJudgePosition;
    rightAnswer?: ILabel;
}
declare class DragBorderBox extends eui.Group implements IDragBorderBox, ILayout, FunctionForReset, FunctionForAnswer {
    static uuType: UUType;
    bgWidth: number;
    bgHeight: number;
    toAward: IResource[];
    layoutSet: ILayout;
    functions: FunctionType[];
    answerJudgePosition: AnswerJudgePosition;
    rightAnswerPostion: AnswerJudgePosition;
    rightAnswer: ILabel;
    layoutType: LayoutType;
    gap: GapType;
    columnCount: number;
    private globalState;
    private hasAnswer;
    private observer;
    constructor(props: any);
    private init();
    private openFunctions();
    private createBorderBox();
    reset(): void;
    answer(): void;
}
