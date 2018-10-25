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
var ImagePosition;
(function (ImagePosition) {
    ImagePosition[ImagePosition["TOP"] = 1] = "TOP";
    ImagePosition[ImagePosition["MIDDLE"] = 2] = "MIDDLE";
    ImagePosition[ImagePosition["BOTTOM"] = 3] = "BOTTOM";
})(ImagePosition || (ImagePosition = {}));
var ClickMode;
(function (ClickMode) {
    ClickMode[ClickMode["MuchToMuch"] = 1] = "MuchToMuch";
    ClickMode[ClickMode["MuchToOne"] = 2] = "MuchToOne";
})(ClickMode || (ClickMode = {}));
var ResourceType;
(function (ResourceType) {
    ResourceType[ResourceType["Text"] = 1] = "Text";
    ResourceType[ResourceType["Image"] = 2] = "Image";
})(ResourceType || (ResourceType = {}));
var MapEleBoxFactory = (function (_super) {
    __extends(MapEleBoxFactory, _super);
    function MapEleBoxFactory(props) {
        var _this = _super.call(this) || this;
        // props
        _this.award = [];
        _this.resourceType = ResourceType.Text;
        _this.imgWidth = 240;
        _this.imgHeight = 240;
        _this.imagePosition = ImagePosition.MIDDLE;
        _this.placeholder = true;
        _this.functions = [];
        _this.hasBorder = true;
        _this.bgWidth = 300;
        _this.bgHeight = 300;
        _this.answerJudgePosition = AnswerJudgePosition.Center;
        _this.fontStyle = {};
        // other    
        _this.dragBorderBox = []; // 匹配框组
        _this.dragBorderBoxIndex = 0; // 某个匹配框的索引
        _this.imageDefaultPosition = []; // 图片初始位置，用于图片复位功能
        _this.mapArr = []; // 记录框、图匹配关系 用于一框一图功能
        _this.observer = Observer.getInstance(); // 观察者
        _this.hasAnswer = false; // 是否已经answer
        // layout 
        _this.layoutType = 1; // 布局方式
        _this.gap = GapType.Middle;
        _this.columnCount = 3;
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
        _this.renderUI();
        _this.openFunctions();
        return _this;
    }
    // 初始化UI
    MapEleBoxFactory.prototype.renderUI = function () {
        this.imageBox = this.createTotalGroupBox();
        this.width = this.imageBox.width;
        this.height = this.imageBox.height;
        this.addChild(this.imageBox);
        this.getImageDefaultPosition();
        this.topImage = this.imageBox.getChildAt(this.imageBox.numChildren - 1);
    };
    // 开启组件功能
    MapEleBoxFactory.prototype.openFunctions = function () {
        for (var i = 0, len = this.functions.length; i < len; i++) {
            var functionType = this.functions[i];
            var functionName = SwitchState.switchFunctionType(functionType);
            this.observer.register(functionName, this[functionName].bind(this));
        }
    };
    // 获取对应的匹配框组件
    MapEleBoxFactory.prototype.getDragBorderBox = function () {
        var parent = this.parent;
        for (var i = 0; i < parent.numChildren; i++) {
            if (parent.getChildAt(i) instanceof DragBorderBox) {
                this.dragBorderBox.push(parent.getChildAt(i));
            }
        }
    };
    // 创建最外层的容器
    MapEleBoxFactory.prototype.createTotalGroupBox = function () {
        // 每个item的容器的尺寸 及 内部目标元素的尺寸与位置
        var groupWidth = this.imgWidth;
        var groupHeight = this.imgHeight;
        var x = 0;
        var y = 0;
        if (this.hasBorder) {
            groupWidth = this.bgWidth;
            groupHeight = this.bgHeight;
            x = (this.bgWidth - this.imgWidth) / 2;
            y = (this.bgHeight - this.imgHeight) / 2;
        }
        var sizeObj = LayoutFactory.setGroupSize(this.award.length, groupWidth, groupHeight, this.layoutType, this.gap, this.columnCount);
        var imageGroupBox = UIFactory.createGroup(sizeObj.width, sizeObj.height);
        var imageGroupArr = [];
        for (var i = 0, len = this.award.length; i < len; i++) {
            var group = UIFactory.createGroup(groupWidth, groupHeight);
            if (this.hasBorder) {
                var img = new UUImage();
                img.isDraw = false;
                img.source = 'resource/assets/Pic/draw_card_bg.png';
                img.width = group.width;
                img.height = group.height;
                group.addChild(img);
            }
            if (this.placeholder) {
                var img = this.createPlaceholderImage(this.award[i].url);
                img.x = x;
                img.y = y;
                group.addChild(img);
            }
            if (this.resourceType == 1) {
                var label = this.createText(this.award[i]);
                label.x = x;
                label.y = y;
                group.addChild(label);
            }
            else {
                var img = this.createImage(this.award[i]);
                img.x = x;
                img.y = y;
                group.addChild(img);
            }
            imageGroupArr.push(group);
        }
        LayoutBaseFactory.main(imageGroupBox, imageGroupArr, this.layoutType, this.gap, this.columnCount);
        return imageGroupBox;
    };
    MapEleBoxFactory.prototype.createPlaceholderImage = function (url) {
        var img = new UUImage();
        img.isDraw = false;
        img.source = url;
        img.width = this.imgWidth;
        img.height = this.imgHeight;
        img.filters = [FilterFactory.createShadowFilter()];
        return img;
    };
    MapEleBoxFactory.prototype.createImage = function (item) {
        var img = new UUImage();
        img.isDraw = true;
        img.source = item.url;
        img.name = item.id.toString();
        img.width = this.imgWidth;
        img.height = this.imgHeight;
        img.filters = [FilterFactory.createGlodFilter()];
        return img;
    };
    MapEleBoxFactory.prototype.createText = function (item) {
        var label = new UULabel(this.fontStyle);
        label.isDraw = true;
        label.name = item.id.toString();
        label.text = item.text;
        label.width = this.imgWidth;
        label.height = this.imgHeight;
        label.textAlign = 'center';
        label.verticalAlign = 'middle';
        label.filters = [FilterFactory.createGlodFilterForText()];
        return label;
    };
    MapEleBoxFactory.prototype.getImageDefaultPosition = function () {
        for (var i = 0, len = this.imageBox.numChildren; i < len; i++) {
            var group = this.imageBox.getChildAt(i);
            var imageItem = group.getChildAt(group.numChildren - 1);
            this.imageDefaultPosition[imageItem.name] = [imageItem.x, imageItem.y];
        }
        console.log(this.imageDefaultPosition);
    };
    // 将匹配元素与匹配框进行匹配
    MapEleBoxFactory.prototype.mapBorder = function () {
        var borderIndex = this.mapArr.length;
        var borderItem = this.getBorderItem(borderIndex);
        var borderId = borderItem.name;
        var imageId = this.drawTarget.name;
        this.removeMapState(this.drawTarget);
        this.mapArr.push({ borderId: borderId, imageId: imageId });
        if (this.judgeBorderisFull()) {
            this.removeAllEleClickState();
        }
        var point = this.getDrawTargetPointToparent(borderItem);
        this.drawTarget.x = point.x;
        this.drawTarget.y = point.y;
    };
    MapEleBoxFactory.prototype.getBorderItem = function (borderIndex) {
        var dragBorderBoxIndex = 0;
        var addNum = 0;
        var borderItem;
        while (true) {
            var len = this.dragBorderBox[dragBorderBoxIndex].numChildren;
            addNum += len;
            if (addNum > borderIndex) {
                borderItem = this.dragBorderBox[dragBorderBoxIndex].getChildAt(borderIndex - (addNum - len));
                this.dragBorderBoxIndex = dragBorderBoxIndex;
                break;
            }
            dragBorderBoxIndex += 1;
        }
        return borderItem;
    };
    // 匹配元素在匹配框中的位置
    MapEleBoxFactory.prototype.getDrawTargetPointToparent = function (borderItem) {
        var borderScaleX = this.dragBorderBox[this.dragBorderBoxIndex].scaleX;
        var borderScaleY = this.dragBorderBox[this.dragBorderBoxIndex].scaleY;
        var imageScaleX = this.scaleY;
        var imageScaleY = this.scaleY;
        var borderItemCenterX = borderItem.x * borderScaleX + borderItem.width * borderScaleX / 2;
        var borderItemCenterY = borderItem.y * borderScaleY + borderItem.height * borderScaleY / 2;
        // drawTarget 相对于borderBox的坐标, ps: 需要将缩放后的坐标除以borderScale， 因为dragBorderBox中的坐标为自动乘以borderScale
        var drawTargetToX = (borderItemCenterX - this.drawTarget.width * imageScaleX / 2) / borderScaleX;
        // 根据props字段 imagePosition 实现Y轴对齐方式
        // TOP: 距框顶部10
        // MIDDLE: 居中
        // BOTTOM: 距离框底部10
        var drawTargetToY;
        switch (this.imagePosition) {
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
        var globalPoint = this.dragBorderBox[this.dragBorderBoxIndex].localToGlobal(drawTargetToX, drawTargetToY);
        // drawTarget 相对于imageBox的坐标
        var localPoint = this.drawTarget.parent.globalToLocal(globalPoint.x, globalPoint.y);
        return localPoint;
    };
    // 判断匹配框是否已经满了
    MapEleBoxFactory.prototype.judgeBorderisFull = function () {
        var borderItemNum = 0;
        this.dragBorderBox.forEach(function (item) { return borderItemNum += item.numChildren; });
        return this.mapArr.length === borderItemNum;
    };
    // 移除所有匹配元素的可点击状态
    MapEleBoxFactory.prototype.removeAllEleClickState = function () {
        for (var i = 0, len = this.imageBox.numChildren; i < len; i++) {
            var group = this.imageBox.getChildAt(i);
            var dragImg = group.getChildAt(group.numChildren - 1);
            dragImg.filters = [];
            dragImg.isDraw = false;
        }
    };
    // 移除某个匹配元素的可匹配状态
    MapEleBoxFactory.prototype.removeMapState = function (target) {
        target.isDraw = false;
        target.filters = [];
    };
    // 添加某个匹配元素的可匹配状态
    MapEleBoxFactory.prototype.addMapState = function (target) {
        target.isDraw = true;
        if (this.resourceType == 1) {
            target.filters = [FilterFactory.createGlodFilterForText()];
        }
        else {
            target.filters = [FilterFactory.createGlodFilter()];
        }
    };
    // 复原某个匹配元素的位置
    MapEleBoxFactory.prototype.recoverPosition = function (target) {
        var defaultPosition = this.imageDefaultPosition[target.name];
        target.x = defaultPosition[0];
        target.y = defaultPosition[1];
    };
    // 转换匹配元素的层级
    MapEleBoxFactory.prototype.swapImageIndex = function (target) {
        this.imageBox.swapChildren(target.parent, this.topImage);
        this.topImage = target.parent;
    };
    // 重置功能
    MapEleBoxFactory.prototype.reset = function () {
        this.removeChildren();
        this.imageDefaultPosition = [];
        this.mapArr = [];
        this.hasAnswer = false;
        this.renderUI();
    };
    // answer功能
    MapEleBoxFactory.prototype.answer = function () {
        console.log('answer MapFactory...');
        if (this.hasAnswer)
            return;
        this.hasAnswer = true;
        var _loop_1 = function (i, len) {
            var imageItem = this_1.imageBox.getChildAt(i);
            var mapItem = imageItem.getChildAt(imageItem.numChildren - 1);
            var mapItemId = mapItem.name;
            var answer = this_1.award.filter(function (item) { return item.id == mapItemId; })[0].answer;
            var params = {
                groupWidth: mapItem.width,
                groupHeight: mapItem.height,
                judge: answer,
                itemPosition: this_1.answerJudgePosition,
            };
            var anserJudge = new AnswerJudge(params);
            anserJudge.x = mapItem.x;
            anserJudge.y = mapItem.y;
            imageItem.addChild(anserJudge);
        };
        var this_1 = this;
        for (var i = 0, len = this.imageBox.numChildren; i < len; i++) {
            _loop_1(i, len);
        }
    };
    return MapEleBoxFactory;
}(eui.Group));
__reflect(MapEleBoxFactory.prototype, "MapEleBoxFactory", ["IMapEle", "ILayout", "FunctionForReset", "FunctionForAnswer"]);
