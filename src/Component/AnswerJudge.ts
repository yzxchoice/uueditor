enum AnswerJudgePosition {
    'TopLeft' = 1,
    'TopRight' = 2,
    'BottomLeft' = 3,
    'BottomRight' = 4,
    'Center' = 5,
}

class AnswerJudge extends eui.Group {
    groupWidth: number; // 容器宽度 由挂载元素决定
    groupHeight: number; // 容器高度 由挂载元素决定
    itemWidth: number = 40;
    itemHeight: number = 40;
    judge: boolean = true; // 对错判断
    itemPosition: AnswerJudgePosition = AnswerJudgePosition.Center;
    rightAnswerPostion: AnswerJudgePosition = AnswerJudgePosition.TopRight;
    rightAnswer: UULabel;

    constructor(params) {
        super();
        for(let key in params) {
            this[key] = params[key];
        }
        this.createUI();
    }

    private createUI(): void {
        this.width = this.groupWidth;
        this.height = this.groupHeight;
        let item = this.createItem();
        this.setItemPosition(item, this.itemPosition);
        this.addChild(item);
        if(this.rightAnswer) {
            this.setRightAnswerPosition(this.rightAnswer, this.rightAnswerPostion)
        }
    }

    private createItem(): eui.Group {
        let group = UIFactory.createGroup(this.itemWidth, this.itemHeight);
        let img = new eui.Image();
        img.width = this.itemWidth;
        img.height = this.itemHeight;
        if(this.judge) {
            img.source = 'resource/assets/Pic/radio/select.png';
        }else {
            img.source = 'resource/assets/Pic/radio/empty.png';            
        }
        group.addChild(img);
        return group;
    }

    private setItemPosition(item: eui.Group, positionType: AnswerJudgePosition): void {
        this.setPostion(item, positionType);
    } 

    private setRightAnswerPosition(label: UULabel, positionType: AnswerJudgePosition): void {
        this.setPostion(label, positionType);
    }

    private setPostion(item: eui.Group | UULabel, positionType: AnswerJudgePosition): void {
        let x: number;
        let y: number;
        switch(positionType) {
            case AnswerJudgePosition.TopLeft:
                x = 0
                y = 0
                break;
            case AnswerJudgePosition.TopLeft:
                x = this.groupWidth - item.width
                y = 0
                break;
            case AnswerJudgePosition.BottomLeft:
                x = 0
                y = this.groupHeight - item.height
                break;
            case AnswerJudgePosition.BottomRight:
                x = this.groupWidth - item.width;
                y = this.groupHeight - item.height;
                break;
            case AnswerJudgePosition.Center:
                x = (this.groupWidth - item.width) / 2;
                y = (this.groupHeight - item.height) / 2;
                break;
        }
        item.x = x;
        item.y = y;
    }
}