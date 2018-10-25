enum AnswerJudgePosition {
    'TopLeft' = 1,
    'TopRight' = 2,
    'BottomLeft' = 3,
    'BottomRight' = 4,
    'Center' = 5,
}

class AnswerJudge extends eui.Group {
    // props
    groupWidth: number; // 容器宽度 由挂载元素决定
    groupHeight: number; // 容器高度 由挂载元素决定
    itemWidth: number = 40;
    itemHeight: number = 40;
    judge: boolean = true; // 对错判断
    itemPosition: AnswerJudgePosition = AnswerJudgePosition.Center;
    rightAnswerPostion: AnswerJudgePosition = AnswerJudgePosition.TopRight;
    rightAnswer: UULabel;

    private timer;

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
        console.log('this.rightAnswer...');
        console.log(this.rightAnswer);
        if(this.rightAnswer) {
            this.setRightAnswerPosition(this.rightAnswer, this.rightAnswerPostion);
            this.addChild(this.rightAnswer);
        }
    }

    private createItem(): eui.Group {
        if(this.judge) {
            return this.addRightJudge();
        }else {
            return this.addErrorJudge();         
        }
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

    // 错误判断动态效果
    private addErrorJudge(): eui.Group {
        let textTureGroup = new eui.Group();
        textTureGroup.width = this.itemWidth;
        textTureGroup.height = this.itemWidth;

        let index = 0;
        let textTureNames = ['error_tex_r5_c2', 'error_tex_r4_c2', 'error_tex_r3_c2', 'error_tex_r2_c2', 'error_tex_r1_c5', 'error_tex_r1_c6', 'error_tex_r1_c1'];
        const cb = () => {
            this.timer = setInterval(() => {

                var txtr:egret.Texture = RES.getRes( `error_json#${textTureNames[index]}` );
                var img:egret.Bitmap = new egret.Bitmap( txtr );
                img.x = 0;
                img.y = 0;
                textTureGroup.removeChildren();
                textTureGroup.addChild(img);

                index ++;
                
                if(index >= textTureNames.length){
                    clearInterval(this.timer);
                    return;
                }

            }, 50);
        };
        cb();
        return textTureGroup;
    }

    // 正确判断动态效果
    addRightJudge(): eui.Group {
        let textTureGroup = new eui.Group();
        textTureGroup.width = this.itemWidth;
        textTureGroup.height = this.itemWidth;

        let index = 0;
        let textTureNames = ['right_tex_r4_c2', 'right_tex_r4_c1', 'right_tex_r3_c8', 'right_tex_r1_c8', 'right_tex_r1_c5', 'right_tex_r1_c3', 'right_tex_r1_c1'];
        const cb = () => {
            this.timer = setInterval(() => {

                var txtr:egret.Texture = RES.getRes( `right_json#${textTureNames[index]}` );
                var img:egret.Bitmap = new egret.Bitmap( txtr );
                img.x = 0;
                img.y = textTureGroup.width - img.width;;
                textTureGroup.removeChildren();
                textTureGroup.addChild(img);

                index ++;
                
                if(index >= textTureNames.length){
                    clearInterval(this.timer);
                    return;
                }

            }, 50);
        };
        cb();
        return textTureGroup;
    }
}