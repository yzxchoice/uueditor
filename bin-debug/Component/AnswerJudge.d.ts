declare enum AnswerJudgePosition {
    'TopLeft' = 1,
    'TopRight' = 2,
    'BottomLeft' = 3,
    'BottomRight' = 4,
    'Center' = 5,
}
/**
 * 用于对错判断的类，功能包含
 * 1、正确、错误的帧动画效果
 * 2、可以设置正确答案及样式
 * 3、可以设置正确答案/判断效果的位置
 */
declare class AnswerJudge extends eui.Group {
    groupWidth: number;
    groupHeight: number;
    itemWidth: number;
    itemHeight: number;
    judge: boolean;
    itemPosition: AnswerJudgePosition;
    rightAnswerPostion: AnswerJudgePosition;
    rightAnswer: UULabel;
    private timer;
    constructor(params: any);
    private createUI();
    private createItem();
    private setItemPosition(item, positionType);
    private setRightAnswerPosition(label, positionType);
    private setPostion(item, positionType);
    private addErrorJudge();
    addRightJudge(): eui.Group;
}
