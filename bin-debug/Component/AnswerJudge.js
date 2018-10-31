var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var AnswerJudgePosition;
(function (AnswerJudgePosition) {
    AnswerJudgePosition[AnswerJudgePosition["TopLeft"] = 1] = "TopLeft";
    AnswerJudgePosition[AnswerJudgePosition["TopRight"] = 2] = "TopRight";
    AnswerJudgePosition[AnswerJudgePosition["BottomLeft"] = 3] = "BottomLeft";
    AnswerJudgePosition[AnswerJudgePosition["BottomRight"] = 4] = "BottomRight";
    AnswerJudgePosition[AnswerJudgePosition["Center"] = 5] = "Center";
})(AnswerJudgePosition || (AnswerJudgePosition = {}));
/**
 * 用于对错判断的类，功能包含
 * 1、正确、错误的帧动画效果
 * 2、可以设置正确答案及样式
 * 3、可以设置正确答案/判断效果的位置
 */
var AnswerJudge = (function (_super) {
    __extends(AnswerJudge, _super);
    function AnswerJudge(params) {
        var _this = _super.call(this) || this;
        _this.itemWidth = 40; // 动态判断效果的宽度
        _this.itemHeight = 40; // 动态判断效果的高度
        _this.judge = true; // 对错判断
        _this.itemPosition = AnswerJudgePosition.Center; // 动态判断效果的位置
        _this.rightAnswerPostion = AnswerJudgePosition.TopRight; // 正确答案的位置
        for (var key in params) {
            _this[key] = params[key];
        }
        _this.createUI();
        return _this;
    }
    AnswerJudge.prototype.createUI = function () {
        this.width = this.groupWidth;
        this.height = this.groupHeight;
        var item = this.createItem();
        this.setItemPosition(item, this.itemPosition);
        this.addChild(item);
        console.log('this.rightAnswer...');
        console.log(this.rightAnswer);
        if (this.rightAnswer) {
            this.setRightAnswerPosition(this.rightAnswer, this.rightAnswerPostion);
            this.addChild(this.rightAnswer);
        }
    };
    AnswerJudge.prototype.createItem = function () {
        if (this.judge) {
            return this.addRightJudge();
        }
        else {
            return this.addErrorJudge();
        }
    };
    AnswerJudge.prototype.setItemPosition = function (item, positionType) {
        this.setPostion(item, positionType);
    };
    AnswerJudge.prototype.setRightAnswerPosition = function (label, positionType) {
        this.setPostion(label, positionType);
    };
    AnswerJudge.prototype.setPostion = function (item, positionType) {
        var x;
        var y;
        switch (positionType) {
            case AnswerJudgePosition.TopLeft:
                x = 0;
                y = 0;
                break;
            case AnswerJudgePosition.TopLeft:
                x = this.groupWidth - item.width;
                y = 0;
                break;
            case AnswerJudgePosition.BottomLeft:
                x = 0;
                y = this.groupHeight - item.height;
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
    };
    // 错误判断动态效果
    AnswerJudge.prototype.addErrorJudge = function () {
        var _this = this;
        var textTureGroup = new eui.Group();
        textTureGroup.width = this.itemWidth;
        textTureGroup.height = this.itemWidth;
        var index = 0;
        var textTureNames = ['error_tex_r5_c2', 'error_tex_r4_c2', 'error_tex_r3_c2', 'error_tex_r2_c2', 'error_tex_r1_c5', 'error_tex_r1_c6', 'error_tex_r1_c1'];
        var cb = function () {
            _this.timer = setInterval(function () {
                var txtr = RES.getRes("error_json#" + textTureNames[index]);
                var img = new egret.Bitmap(txtr);
                img.x = 0;
                img.y = 0;
                textTureGroup.removeChildren();
                textTureGroup.addChild(img);
                index++;
                if (index >= textTureNames.length) {
                    clearInterval(_this.timer);
                    return;
                }
            }, 50);
        };
        cb();
        return textTureGroup;
    };
    // 正确判断动态效果
    AnswerJudge.prototype.addRightJudge = function () {
        var _this = this;
        var textTureGroup = new eui.Group();
        textTureGroup.width = this.itemWidth;
        textTureGroup.height = this.itemWidth;
        var index = 0;
        var textTureNames = ['right_tex_r4_c2', 'right_tex_r4_c1', 'right_tex_r3_c8', 'right_tex_r1_c8', 'right_tex_r1_c5', 'right_tex_r1_c3', 'right_tex_r1_c1'];
        var cb = function () {
            _this.timer = setInterval(function () {
                var txtr = RES.getRes("right_json#" + textTureNames[index]);
                var img = new egret.Bitmap(txtr);
                img.x = 0;
                img.y = textTureGroup.width - img.width;
                ;
                textTureGroup.removeChildren();
                textTureGroup.addChild(img);
                index++;
                if (index >= textTureNames.length) {
                    clearInterval(_this.timer);
                    return;
                }
            }, 50);
        };
        cb();
        return textTureGroup;
    };
    return AnswerJudge;
}(eui.Group));
__reflect(AnswerJudge.prototype, "AnswerJudge");
