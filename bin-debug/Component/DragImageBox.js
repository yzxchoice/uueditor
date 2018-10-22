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
var DragImageBox = (function (_super) {
    __extends(DragImageBox, _super);
    function DragImageBox(props) {
        var _this = _super.call(this) || this;
        // props
        _this.award = []; // 图片列表
        _this.layoutType = 1; // 布局方式
        _this.gap = GapType.Middle;
        _this.columnCount = 3;
        _this.imagePosition = ImagePosition.MIDDLE; // 拖拽图在边框图中放置的位置：TOP/MIDDLE/BOTTOM
        _this.placeholder = true; // 是否带占位图
        _this.hasBorder = true; // 是否带背景图
        _this.isRestore = true; // 是否开启图片复位功能
        // other
        _this.imageDefaultPosition = []; // 图片初始位置，用于图片复位功能
        _this.mapArr = []; // 记录框、图匹配关系 用于一框一图功能
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
        if (props.placeholder) {
            _this.placeholder = props.placeholder;
        }
        if (props.isRestore) {
            _this.isRestore = props.isRestore;
        }
        _this.award = props.award;
        _this.init();
        _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.down, _this);
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.getDragBorderBox, _this);
        return _this;
    }
    DragImageBox.prototype.init = function () {
        this.imageBox = this.createIamgeGroupBox();
        this.width = this.imageBox.width;
        this.height = this.imageBox.height;
        this.addChild(this.imageBox);
        if (this.isRestore) {
            this.getImageDefaultPosition();
        }
        this.topImage = this.imageBox.getChildAt(this.imageBox.numChildren - 1);
    };
    DragImageBox.prototype.getDragBorderBox = function () {
        var parent = this.parent;
        for (var i = 0; i < parent.numChildren; i++) {
            if (parent.getChildAt(i) instanceof DragBorderBox) {
                this.dragBorderBox = parent.getChildAt(i);
            }
        }
    };
    DragImageBox.prototype.createIamgeGroupBox = function () {
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
                var img_1 = new UUImage();
                img_1.isDraw = false;
                img_1.source = 'resource/assets/Pic/draw_card_bg.png';
                img_1.width = group.width;
                img_1.height = group.height;
                group.addChild(img_1);
            }
            if (this.placeholder) {
                var img_2 = this.createPlaceholderImage(this.award[i].url);
                img_2.x = x;
                img_2.y = y;
                group.addChild(img_2);
            }
            var img = this.createImage(this.award[i]);
            img.x = x;
            img.y = y;
            group.addChild(img);
            imageGroupArr.push(group);
        }
        LayoutBaseFactory.main(imageGroupBox, imageGroupArr, this.layoutType, this.gap, this.columnCount);
        return imageGroupBox;
    };
    DragImageBox.prototype.createPlaceholderImage = function (url) {
        var img = new UUImage();
        img.isDraw = false;
        img.source = url;
        img.width = 240;
        img.height = 240;
        img.filters = [FilterFactory.createShadowFilter()];
        return img;
    };
    DragImageBox.prototype.createImage = function (item) {
        var img = new UUImage();
        img.isDraw = true;
        img.source = item.url;
        img.name = item.id.toString();
        img.width = 240;
        img.height = 240;
        img.filters = [FilterFactory.createGlodFilter()];
        return img;
    };
    DragImageBox.prototype.getImageDefaultPosition = function () {
        for (var i = 0, len = this.imageBox.numChildren; i < len; i++) {
            var group = this.imageBox.getChildAt(i);
            var imageItem = group.getChildAt(group.numChildren - 1);
            this.imageDefaultPosition[imageItem.name] = [imageItem.x, imageItem.y];
        }
        console.log(this.imageDefaultPosition);
    };
    DragImageBox.prototype.down = function (evt) {
        var target = evt.target;
        var isDraw = target.isDraw;
        if (isDraw) {
            this.swapImageIndex(target);
            this.drawTarget = target;
            this.stage.addEventListener(Mouse.MOVE, this.move, this);
            this.stage.addEventListener(Mouse.END, this.up, this);
            var targetPoint = target.localToGlobal(0, 0);
            this.distanceX = evt.stageX - targetPoint.x;
            this.distanceY = evt.stageY - targetPoint.y;
        }
        evt.preventDefault();
    };
    DragImageBox.prototype.move = function (evt) {
        var _this = this;
        var targetPoint = this.drawTarget.parent.globalToLocal(evt.stageX - this.distanceX, evt.stageY - this.distanceY);
        requestAnimationFrame(function () {
            _this.drawTarget.x = targetPoint.x;
            _this.drawTarget.y = targetPoint.y;
        });
        evt.preventDefault();
    };
    DragImageBox.prototype.up = function (evt) {
        var _this = this;
        clearTimeout(this.timer);
        this.timer = setTimeout(function () {
            _this.up2(evt);
        }, 50);
    };
    DragImageBox.prototype.up2 = function (evt) {
        console.log('up...');
        // drawTarget 舞台坐标
        var drawTargeGlobalX = evt.stageX - this.distanceX;
        var drawTargeGlobalY = evt.stageY - this.distanceY;
        // drawTarget中心的 舞台坐标
        var drawTargeGlobalCenterX = drawTargeGlobalX + this.drawTarget.width / 2;
        var drawTargeGlobalCenterY = drawTargeGlobalY + this.drawTarget.height / 2;
        // 标记
        var flag = false;
        var borderScaleX = this.dragBorderBox.scaleX;
        var borderScaleY = this.dragBorderBox.scaleY;
        var imageScaleX = this.scaleY;
        var imageScaleY = this.scaleY;
        var _loop_1 = function (i, len) {
            var borderItem = this_1.dragBorderBox.getChildAt(i);
            var isHit = borderItem.hitTestPoint(drawTargeGlobalCenterX, drawTargeGlobalCenterY);
            if (isHit) {
                // 排斥校验
                var borderId_1 = borderItem.name;
                var imageId_1 = this_1.drawTarget.name;
                if (this_1.mapArr.some(function (item) { return (item.borderId == borderId_1 && item.imageId != imageId_1); })) {
                    return "break";
                }
                this_1.checkoutImage(imageId_1);
                this_1.mapArr.push({ borderId: borderId_1, imageId: imageId_1 });
                this_1.drawTarget.filters = [];
                // image中心与border中心重合
                // borderItem中心 相对坐标 相对于borderBox
                var borderItemCenterX = borderItem.x * borderScaleX + borderItem.width * borderScaleX / 2;
                var borderItemCenterY = borderItem.y * borderScaleY + borderItem.height * borderScaleY / 2;
                // drawTarget 相对于borderBox的坐标, ps: 需要将缩放后的坐标除以borderScale， 因为dragBorderBox中的坐标为自动乘以borderScale
                var drawTargetToX = (borderItemCenterX - this_1.drawTarget.width * imageScaleX / 2) / borderScaleX;
                // 根据props字段 imagePosition 实现Y轴对齐方式
                // TOP: 距框顶部10
                // MIDDLE: 居中
                // BOTTOM: 距离框底部10
                var drawTargetToY = void 0;
                switch (this_1.imagePosition) {
                    case ImagePosition.TOP:
                        drawTargetToY = borderItem.y + 10;
                        break;
                    case ImagePosition.MIDDLE:
                        drawTargetToY = (borderItemCenterY - this_1.drawTarget.height * imageScaleY / 2) / borderScaleY;
                        break;
                    case ImagePosition.BOTTOM:
                        drawTargetToY = ((borderItem.y + borderItem.height) * borderScaleY - this_1.drawTarget.height * imageScaleY) / borderScaleY - 10;
                        break;
                }
                // drawTarget 舞台坐标
                var globalPoint = this_1.dragBorderBox.localToGlobal(drawTargetToX, drawTargetToY);
                // drawTarget 相对于imageBox的坐标
                var localPoint = this_1.drawTarget.parent.globalToLocal(globalPoint.x, globalPoint.y);
                this_1.drawTarget.x = localPoint.x;
                this_1.drawTarget.y = localPoint.y;
                flag = true;
                return "break";
            }
        };
        var this_1 = this;
        // 遍历border对象进行碰撞检测
        for (var i = 0, len = this.dragBorderBox.numChildren; i < len; i++) {
            var state_1 = _loop_1(i, len);
            if (state_1 === "break")
                break;
        }
        if (!flag && this.isRestore) {
            var index = this.drawTarget.name;
            var defaultPosition = this.imageDefaultPosition[index];
            this.drawTarget.x = defaultPosition[0];
            this.drawTarget.y = defaultPosition[1];
            this.checkoutImage(index);
        }
        this.stage.removeEventListener(Mouse.MOVE, this.move, this);
        this.stage.removeEventListener(Mouse.END, this.up, this);
        evt.preventDefault();
    };
    // 检查目标image是否在mapArr中，是则从mapArr中删除
    DragImageBox.prototype.checkoutImage = function (imageId) {
        if (this.mapArr.some(function (item) { return item.imageId == imageId; })) {
            this.drawTarget.filters = [FilterFactory.createGlodFilter()];
            var mapArrIndex = void 0;
            for (var i = 0, len = this.mapArr.length; i < len; i++) {
                if (this.mapArr[i].imageId == imageId) {
                    mapArrIndex = i;
                }
            }
            this.mapArr.splice(mapArrIndex, 1);
        }
    };
    // 装换image的层级
    DragImageBox.prototype.swapImageIndex = function (target) {
        this.imageBox.swapChildren(target.parent, this.topImage);
        this.topImage = target.parent;
    };
    DragImageBox.uuType = UUType.DRAG_IMAGE_BOX;
    return DragImageBox;
}(eui.Group));
__reflect(DragImageBox.prototype, "DragImageBox");
