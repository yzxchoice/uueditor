declare enum AnswerJudgePosition {
    'TopLeft' = 1,
    'TopRight' = 2,
    'BottomLeft' = 3,
    'BottomRight' = 4,
    'Center' = 5,
}
declare class AnswerJudge extends eui.Group {
    groupWidth: number;
    groupHeight: number;
    itemWidth: number;
    itemHeight: number;
    judge: boolean;
    itemPosition: AnswerJudgePosition;
    rightAnswerPostion: AnswerJudgePosition;
    rightAnswer: UULabel;
    constructor(params: any);
    private createUI();
    private createItem();
    private setItemPosition(item, positionType);
    private setRightAnswerPosition(label, positionType);
    private setPostion(item, positionType);
}
