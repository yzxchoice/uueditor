/**
 * 该组件包含的功能
 * 1、支持四种布局：上/下、下/上、左/右、右/上、左
 * 2、拖拽功能
 * 3、图片复位功能：未入框则恢复到初始的位置
 * 4、一框一图功能：一个框不能放置多张图片
 * 5、调整拖拽图片的层级：被拖拽的图片层级永远最高
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
// 四种布局方式
var DrawOneLayoutType;
(function (DrawOneLayoutType) {
    DrawOneLayoutType[DrawOneLayoutType["topToBottom"] = 1] = "topToBottom";
    DrawOneLayoutType[DrawOneLayoutType["BottomTo"] = 2] = "BottomTo";
    DrawOneLayoutType[DrawOneLayoutType["LeftToRight"] = 3] = "LeftToRight";
    DrawOneLayoutType[DrawOneLayoutType["RightToLeft"] = 4] = "RightToLeft";
})(DrawOneLayoutType || (DrawOneLayoutType = {}));
var DrawOne = (function (_super) {
    __extends(DrawOne, _super);
    function DrawOne(props) {
        var _this = _super.call(this) || this;
        // props
        _this.award = []; // 图片列表
        _this.toAward = []; // 框图片列表
        _this.layoutType = 1; // 布局方式
        _this.isRestore = true; // 是否开启图片复位功能
        _this.boxLayoutType = LayoutType.HLayout; // 边框、图片容器的布局方式
        _this.imageDefaultPosition = []; // 图片初始位置，用于图片复位功能
        _this.mapArr = []; // 记录框、图匹配关系 用于一框一图功能
        if (props.layoutType) {
            _this.layoutType = props.layoutType;
        }
        if (props.isRestore) {
            _this.isRestore = props.isRestore;
        }
        _this.award = props.award;
        _this.toAward = props.toAward;
        _this.init();
        _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.down, _this);
        return _this;
    }
    DrawOne.prototype.init = function () {
        this.getBoxLayoutType();
        this.borderBox = this.createBorderBox();
        this.imageBox = this.createImageBox();
        this.createLayout();
        this.createSize();
        if (this.isRestore) {
            this.getImageDefaultPosition();
        }
        this.topImage = this.imageBox.getChildAt(this.imageBox.numChildren - 1);
    };
    DrawOne.prototype.getBoxLayoutType = function () {
        switch (this.layoutType) {
            case DrawOneLayoutType.topToBottom:
            case DrawOneLayoutType.BottomTo:
                this.boxLayoutType = LayoutType.HLayout;
                break;
            case DrawOneLayoutType.LeftToRight:
            case DrawOneLayoutType.RightToLeft:
                this.boxLayoutType = LayoutType.VLayout;
                break;
        }
    };
    DrawOne.prototype.createLayout = function () {
        switch (this.layoutType) {
            case DrawOneLayoutType.topToBottom:
                LayoutBaseFactory.main(this, [this.borderBox, this.imageBox], LayoutType.VLayout, GapType.Big);
                break;
            case DrawOneLayoutType.BottomTo:
                LayoutBaseFactory.main(this, [this.imageBox, this.borderBox], LayoutType.VLayout, GapType.Big);
                this.swapChildren(this.borderBox, this.imageBox);
                break;
            case DrawOneLayoutType.LeftToRight:
                LayoutBaseFactory.main(this, [this.borderBox, this.imageBox], LayoutType.HLayout, GapType.Big);
                break;
            case DrawOneLayoutType.RightToLeft:
                LayoutBaseFactory.main(this, [this.imageBox, this.borderBox], LayoutType.HLayout, GapType.Big);
                this.swapChildren(this.borderBox, this.imageBox);
                break;
        }
    };
    DrawOne.prototype.createSize = function () {
        switch (this.boxLayoutType) {
            case LayoutType.HLayout:
                this.width = this.borderBox.width > this.imageBox.width ? this.borderBox.width + 10 * 2 : this.imageBox.width + 10 * 2;
                this.height = this.borderBox.height + this.imageBox.height + 10 * 2 + 30;
                break;
            case LayoutType.VLayout:
                this.width = this.borderBox.width + this.imageBox.width + 10 * 2 + 30;
                this.height = this.borderBox.height > this.imageBox.height ? this.borderBox.height + 10 * 2 : this.imageBox.height + 10 * 2;
                break;
        }
    };
    DrawOne.prototype.createBorderBox = function () {
        var group = new eui.Group();
        group.layout = LayoutFactory.main(this.boxLayoutType, GapType.Middle);
        for (var i = 0, len = this.toAward.length; i < len; i++) {
            var img = UIFactory.createImage(this.toAward[i].url);
            img.width = 240;
            img.height = 240;
            var imgGroup = UIFactory.createGroup(img.width, img.height);
            imgGroup.name = this.toAward[i].id.toString();
            imgGroup.addChild(img);
            group.addChild(imgGroup);
        }
        var sizeObj = LayoutFactory.setGroupSize(this.toAward.length, 240, 240, this.boxLayoutType, GapType.Big);
        group.width = sizeObj.width;
        group.height = sizeObj.height;
        return group;
    };
    DrawOne.prototype.createImageBox = function () {
        var sizeObj = LayoutFactory.setGroupSize(this.award.length, 240, 240, this.boxLayoutType, GapType.Big);
        var group = UIFactory.createGroup(sizeObj.width, sizeObj.height);
        var imgArr = [];
        for (var i = 0, len = this.award.length; i < len; i++) {
            var img = new UUImage();
            img.isDraw = true;
            img.source = this.award[i].url;
            img.name = this.award[i].id.toString();
            img.width = 240;
            img.height = 240;
            imgArr.push(img);
        }
        LayoutBaseFactory.main(group, imgArr, this.boxLayoutType, GapType.Middle);
        return group;
    };
    DrawOne.prototype.getImageDefaultPosition = function () {
        for (var i = 0, len = this.imageBox.numChildren; i < len; i++) {
            var imageItem = this.imageBox.getChildAt(i);
            this.imageDefaultPosition[imageItem.name] = [imageItem.x, imageItem.y];
        }
    };
    DrawOne.prototype.down = function (evt) {
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
    DrawOne.prototype.move = function (evt) {
        var _this = this;
        var targetPoint = this.drawTarget.parent.globalToLocal(evt.stageX - this.distanceX, evt.stageY - this.distanceY);
        requestAnimationFrame(function () {
            _this.drawTarget.x = targetPoint.x;
            _this.drawTarget.y = targetPoint.y;
        });
        evt.preventDefault();
    };
    DrawOne.prototype.up = function (evt) {
        var _this = this;
        clearTimeout(this.timer);
        this.timer = setTimeout(function () {
            _this.up2(evt);
        }, 50);
    };
    DrawOne.prototype.up2 = function (evt) {
        console.log('up...');
        // drawTarget 舞台坐标
        var drawTargeGlobalX = evt.stageX - this.distanceX;
        var drawTargeGlobalY = evt.stageY - this.distanceY;
        // drawTarget中心的 舞台坐标
        var drawTargeGlobalCenterX = drawTargeGlobalX + this.drawTarget.width / 2;
        var drawTargeGlobalCenterY = drawTargeGlobalY + this.drawTarget.height / 2;
        // 标记
        var flag = false;
        var _loop_1 = function (i, len) {
            var borderItem = this_1.borderBox.getChildAt(i);
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
                // image中心与border中心重合
                // borderItem中心 相对坐标 相对于borderBox
                var borderItemCenterX = borderItem.x + borderItem.width / 2;
                var borderItemCenterY = borderItem.y + borderItem.height / 2;
                // drawTarget 相对于borderBox的坐标
                var drawTargetToX = borderItemCenterX - this_1.drawTarget.width / 2;
                var drawTargetToY = borderItemCenterY - this_1.drawTarget.height / 2;
                // drawTarget 舞台坐标
                var globalPoint = this_1.borderBox.localToGlobal(drawTargetToX, drawTargetToY);
                // drawTarget 相对于imageBox的坐标
                var localPoint = this_1.imageBox.globalToLocal(globalPoint.x, globalPoint.y);
                this_1.drawTarget.x = localPoint.x;
                this_1.drawTarget.y = localPoint.y;
                flag = true;
                return "break";
            }
        };
        var this_1 = this;
        // 遍历border对象进行碰撞检测
        for (var i = 0, len = this.borderBox.numChildren; i < len; i++) {
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
    DrawOne.prototype.checkoutImage = function (imageId) {
        if (this.mapArr.some(function (item) { return item.imageId == imageId; })) {
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
    DrawOne.prototype.swapImageIndex = function (target) {
        this.topImage.parent.swapChildren(target, this.topImage);
        this.topImage = target;
    };
    DrawOne.uuType = UUType.DRAW_ONE;
    return DrawOne;
}(eui.Group));
__reflect(DrawOne.prototype, "DrawOne");
