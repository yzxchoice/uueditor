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
var DragBorderBox = (function (_super) {
    __extends(DragBorderBox, _super);
    function DragBorderBox(props) {
        var _this = _super.call(this) || this;
        // props
        _this.bgWidth = 300;
        _this.bgHeight = 300;
        _this.toAward = [];
        _this.functions = [];
        _this.answerJudgePosition = AnswerJudgePosition.Center;
        _this.rightAnswerPostion = AnswerJudgePosition.BottomRight;
        // layout
        _this.layoutType = 1; // 布局方式
        _this.gap = GapType.Middle;
        _this.columnCount = 3;
        // other
        _this.globalState = GlobalState.getInstance();
        _this.hasAnswer = false; // 是否已经answer
        _this.observer = Observer.getInstance(); // 观察者
        for (var key in props) {
            if (props[key] !== undefined) {
                _this[key] = props[key];
            }
        }
        for (var key in props.layoutSet) {
            if (props.layoutSet[key] !== undefined) {
                _this[key] = props.layoutSet[key];
            }
        }
        _this.init();
        return _this;
    }
    DragBorderBox.prototype.init = function () {
        this.layout = LayoutFactory.main(this.layoutType, this.gap, this.columnCount);
        var size = LayoutFactory.setGroupSize(this.toAward.length, this.bgWidth, this.bgHeight, this.layoutType, this.gap, this.columnCount);
        this.width = size.width;
        this.height = size.height;
        this.createBorderBox();
        this.openFunctions();
    };
    // 开启组件功能
    DragBorderBox.prototype.openFunctions = function () {
        for (var i = 0, len = this.functions.length; i < len; i++) {
            var functionType = this.functions[i];
            var functionName = SwitchState.switchFunctionType(functionType);
            this.observer.register(functionName, this[functionName].bind(this));
        }
    };
    DragBorderBox.prototype.createBorderBox = function () {
        for (var i = 0, len = this.toAward.length; i < len; i++) {
            var imgGroup = UIFactory.createGroup(this.bgWidth, this.bgHeight);
            imgGroup.name = this.toAward[i].id.toString();
            if (this.toAward[i].url) {
                var img = UIFactory.createImage(this.toAward[i].url);
                img.width = this.bgWidth;
                img.height = this.bgHeight;
                imgGroup.addChild(img);
            }
            else {
                var alpha = this.globalState.getShowState() == 1 ? 1 : 0;
                var shape = new egret.Shape();
                shape.graphics.beginFill(0x0000ff, alpha);
                shape.graphics.drawRect(0, 0, this.bgWidth, this.bgHeight);
                shape.graphics.endFill();
                imgGroup.addChild(shape);
            }
            this.addChild(imgGroup);
        }
    };
    // 重置
    DragBorderBox.prototype.reset = function () {
        this.hasAnswer = false;
        this.removeChildren();
        this.init();
    };
    // answer功能
    DragBorderBox.prototype.answer = function () {
        console.log('answer DragBorderBox...');
        if (this.hasAnswer)
            return;
        this.hasAnswer = true;
        var _loop_1 = function (i, len) {
            var imageItem = this_1.getChildAt(i);
            var itemId = imageItem.name;
            var answer = this_1.toAward.filter(function (item) { return item.id == itemId; })[0].answer;
            var rightAnswer = this_1.toAward.filter(function (item) { return item.id == itemId; })[0].rightAnswer;
            var params = {
                groupWidth: imageItem.width,
                groupHeight: imageItem.height,
                judge: answer,
                itemPosition: AnswerJudgePosition.Center,
                rightAnswerPostion: this_1.rightAnswerPostion,
                rightAnswer: new UULabel(rightAnswer),
            };
            var anserJudge = new AnswerJudge(params);
            imageItem.addChild(anserJudge);
        };
        var this_1 = this;
        for (var i = 0, len = this.numChildren; i < len; i++) {
            _loop_1(i, len);
        }
    };
    DragBorderBox.uuType = UUType.DRAG_BORDER_BOX;
    return DragBorderBox;
}(eui.Group));
__reflect(DragBorderBox.prototype, "DragBorderBox", ["IDragBorderBox", "ILayout", "FunctionForReset", "FunctionForAnswer"]);
