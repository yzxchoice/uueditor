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
var AnswerJudge = (function (_super) {
    __extends(AnswerJudge, _super);
    function AnswerJudge(params) {
        var _this = _super.call(this) || this;
        _this.itemWidth = 40;
        _this.itemHeight = 40;
        _this.judge = true; // 对错判断
        _this.itemPosition = AnswerJudgePosition.Center;
        _this.rightAnswerPostion = AnswerJudgePosition.TopRight;
        for (var key in params) {
            _this[key] = params[key];
        }
        return _this;
    }
    AnswerJudge.prototype.createUI = function () {
        this.width = this.groupWidth;
        this.height = this.groupHeight;
        var item = this.createItem();
        this.setItemPosition(item, this.itemPosition);
        this.addChild(item);
        if (this.rightAnswer) {
            this.setRightAnswerPosition(this.rightAnswer, this.rightAnswerPostion);
        }
    };
    AnswerJudge.prototype.createItem = function () {
        var group = UIFactory.createGroup(this.itemWidth, this.itemHeight);
        var img = new eui.Image();
        img.width = this.itemWidth;
        img.height = this.itemHeight;
        if (this.judge) {
            img.source = 'resource/assets/Pic/radio/select.png';
        }
        else {
            img.source = 'resource/assets/Pic/radio/empty.png';
        }
        group.addChild(img);
        return group;
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
                x = -item.width;
                y = -item.height;
                break;
            case AnswerJudgePosition.TopLeft:
                x = this.groupWidth;
                y = -item.height;
                break;
            case AnswerJudgePosition.BottomLeft:
                x = -item.width;
                y = this.groupHeight;
                break;
            case AnswerJudgePosition.BottomRight:
                x = this.groupWidth;
                y = this.groupHeight;
                break;
            case AnswerJudgePosition.Center:
                x = (this.groupWidth - item.width) / 2;
                y = (this.groupHeight - item.height) / 2;
                break;
        }
        item.x = x;
        item.y = y;
    };
    return AnswerJudge;
}(eui.Group));
__reflect(AnswerJudge.prototype, "AnswerJudge");
