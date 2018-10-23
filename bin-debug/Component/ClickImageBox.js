/**
 * 该组件包含的功能
 * 1、支持四种布局：上/下、下/上、左/右、右/上、左
 * 2、拖拽功能
 * 3、图片复位功能：未入框则恢复到初始的位置
 * 4、一框一图功能：一个框不能放置多张图片
 * 5、调整拖拽图片的层级：被拖拽的图片层级永远最高
 * 6、支持选择图片放置在框中的位置：TOP/MIDDLE/BOTTOM
 * 7、支持占位图功能
 * 8、支持图片可选状态的开启与关闭
 * 9、支持背景图的设置
 */
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
var ClickImageBox = (function (_super) {
    __extends(ClickImageBox, _super);
    function ClickImageBox(props) {
        var _this = _super.call(this) || this;
        // props
        _this.award = []; // 图片列表
        _this.layoutType = 1; // 布局方式
        _this.gap = GapType.Middle;
        _this.columnCount = 3;
        _this.imagePosition = ImagePosition.MIDDLE; // 拖拽图在边框图中放置的位置：TOP/MIDDLE/BOTTOM
        _this.placeholder = false; // 是否带占位图
        _this.hasBorder = false; // 是否带背景图
        _this.isRestore = true; // 是否开启图片复位功能
        _this.clickMode = ClickMode.MuchToMuch; // 点击模式 多对多/多对一
        _this.resourceType = ResourceType.Text; // 资源类型 文字/图片
        // other
        _this.imageDefaultPosition = []; // 图片初始位置，用于图片复位功能
        _this.mapArr = []; // 记录框、图匹配关系 用于一框一图功能
        _this.selectedImage = null; // 多对一模式 框内的dragImage
        _this.isTweening = false; // 多对一模式 动画是否正在进行的标记
        if (props.layoutSet.layoutType) {
            _this.layoutType = props.layoutSet.layoutType;
        }
        if (props.layoutSet.gap) {
            _this.gap = props.layoutSet.gap;
        }
        if (props.layoutSet.columnCount) {
            _this.columnCount = props.layoutSet.columnCount;
        }
        if (props.imagePosition) {
            _this.imagePosition = props.imagePosition;
        }
        _this.placeholder = props.placeholder ? props.placeholder : false;
        _this.hasBorder = props.hasBorder ? props.hasBorder : false;
        _this.isRestore = props.isRestore ? props.isRestore : true;
        if (props.resourceType) {
            _this.resourceType = props.resourceType;
        }
        if (props.clickMode) {
            _this.clickMode = props.clickMode;
        }
        _this.award = props.award;
        _this.renderUI();
        _this.listenEvent();
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.getDragBorderBox, _this);
        return _this;
    }
    // 初始化UI
    ClickImageBox.prototype.renderUI = function () {
        this.imageBox = this.createTotalGroupBox();
        this.width = this.imageBox.width;
        this.height = this.imageBox.height;
        this.addChild(this.imageBox);
        if (this.isRestore) {
            this.getImageDefaultPosition();
        }
        this.topImage = this.imageBox.getChildAt(this.imageBox.numChildren - 1);
    };
    // 监听事件
    ClickImageBox.prototype.listenEvent = function () {
        if (this.clickMode == 1) {
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.downForClickMode1, this);
        }
        else {
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.downForClickMode2, this);
        }
    };
    // 获取对应的匹配框组件
    ClickImageBox.prototype.getDragBorderBox = function () {
        var parent = this.parent;
        for (var i = 0; i < parent.numChildren; i++) {
            if (parent.getChildAt(i) instanceof DragBorderBox) {
                this.dragBorderBox = parent.getChildAt(i);
            }
        }
    };
    // 创建最外层的容器
    ClickImageBox.prototype.createTotalGroupBox = function () {
        // 每个item的容器的尺寸 及 内部目标元素的尺寸与位置
        var groupWidth = 240;
        var groupHeight = 240;
        var x = 0;
        var y = 0;
        if (this.hasBorder) {
            groupWidth = 300;
            groupHeight = 300;
            x = 30;
            y = 30;
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
    ClickImageBox.prototype.createPlaceholderImage = function (url) {
        var img = new UUImage();
        img.isDraw = false;
        img.source = url;
        img.width = 240;
        img.height = 240;
        img.filters = [FilterFactory.createShadowFilter()];
        return img;
    };
    ClickImageBox.prototype.createImage = function (item) {
        var img = new UUImage();
        img.isDraw = true;
        img.source = item.url;
        img.name = item.id.toString();
        img.width = 240;
        img.height = 240;
        img.filters = [FilterFactory.createGlodFilter()];
        return img;
    };
    ClickImageBox.prototype.createText = function (item) {
        var label = new UULabel();
        label.isDraw = true;
        label.name = item.id.toString();
        label.text = item.text;
        label.width = 240;
        label.height = 240;
        label.textAlign = 'center';
        label.verticalAlign = 'middle';
        label.filters = [FilterFactory.createGlodFilterForText()];
        return label;
    };
    ClickImageBox.prototype.getImageDefaultPosition = function () {
        for (var i = 0, len = this.imageBox.numChildren; i < len; i++) {
            var group = this.imageBox.getChildAt(i);
            var imageItem = group.getChildAt(group.numChildren - 1);
            this.imageDefaultPosition[imageItem.name] = [imageItem.x, imageItem.y];
        }
        console.log(this.imageDefaultPosition);
    };
    // 多对多模式的事件监听
    ClickImageBox.prototype.downForClickMode1 = function (evt) {
        evt.preventDefault();
        var target = evt.target;
        var isDraw = target.isDraw;
        if (this.judgeBorderisFull())
            return;
        if (isDraw) {
            this.drawTarget = target;
            this.mapBorder();
        }
    };
    // 多对一模式的事件监听
    ClickImageBox.prototype.downForClickMode2 = function (evt) {
        var _this = this;
        evt.preventDefault();
        var borderItem = this.dragBorderBox.getChildAt(0);
        var target = evt.target;
        if (!target.isDraw)
            return;
        if (this.isTweening)
            return;
        this.drawTarget = target;
        this.swapImageIndex(target);
        if (this.selectedImage) {
            this.recoverPosition(this.selectedImage);
            this.addMapState(this.selectedImage);
        }
        var point = this.getDrawTargetPointToparent(borderItem);
        this.isTweening = true;
        egret.Tween.get(target)
            .to({ x: point.x, y: point.y }, 1000)
            .call(function () {
            _this.isTweening = false;
            _this.selectedImage = target;
            _this.removeMapState(target);
        });
    };
    // 将匹配元素与匹配框进行匹配
    ClickImageBox.prototype.mapBorder = function () {
        var borderIndex = this.mapArr.length;
        var borderItem = this.dragBorderBox.getChildAt(borderIndex);
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
    // 匹配元素在匹配框中的位置
    ClickImageBox.prototype.getDrawTargetPointToparent = function (borderItem) {
        var borderScaleX = this.dragBorderBox.scaleX;
        var borderScaleY = this.dragBorderBox.scaleY;
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
        var globalPoint = this.dragBorderBox.localToGlobal(drawTargetToX, drawTargetToY);
        // drawTarget 相对于imageBox的坐标
        var localPoint = this.drawTarget.parent.globalToLocal(globalPoint.x, globalPoint.y);
        return localPoint;
    };
    // 判断匹配框是否已经满了
    ClickImageBox.prototype.judgeBorderisFull = function () {
        return this.mapArr.length === this.dragBorderBox.numChildren;
    };
    // 移除所有匹配元素的可点击状态
    ClickImageBox.prototype.removeAllEleClickState = function () {
        for (var i = 0, len = this.imageBox.numChildren; i < len; i++) {
            var group = this.imageBox.getChildAt(i);
            var dragImg = group.getChildAt(group.numChildren - 1);
            dragImg.filters = [];
        }
    };
    // 移除某个匹配元素的可匹配状态
    ClickImageBox.prototype.removeMapState = function (target) {
        target.isDraw = false;
        target.filters = [];
    };
    // 添加某个匹配元素的可匹配状态
    ClickImageBox.prototype.addMapState = function (target) {
        target.isDraw = true;
        if (this.resourceType == 1) {
            target.filters = [FilterFactory.createGlodFilterForText()];
        }
        else {
            target.filters = [FilterFactory.createGlodFilter()];
        }
    };
    // 复原某个匹配元素的位置
    ClickImageBox.prototype.recoverPosition = function (target) {
        var defaultPosition = this.imageDefaultPosition[target.name];
        target.x = defaultPosition[0];
        target.y = defaultPosition[1];
    };
    // 转换匹配元素的层级
    ClickImageBox.prototype.swapImageIndex = function (target) {
        this.imageBox.swapChildren(target.parent, this.topImage);
        this.topImage = target.parent;
    };
    ClickImageBox.uuType = UUType.CLICK_IMAGE_BOX;
    return ClickImageBox;
}(eui.Group));
__reflect(ClickImageBox.prototype, "ClickImageBox");
