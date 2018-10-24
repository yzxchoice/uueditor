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
var DragImageBox = (function (_super) {
    __extends(DragImageBox, _super);
    function DragImageBox(props) {
        var _this = _super.call(this, props) || this;
        _this.listenEvent();
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.getDragBorderBox, _this);
        return _this;
    }
    // 监听事件
    DragImageBox.prototype.listenEvent = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.down, this);
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
        // 遍历border对象进行碰撞检测
        outermost: for (var j = 0, len = this.dragBorderBox.length; j < len; j++) {
            var _loop_1 = function (i, len_1) {
                var borderItem = this_1.dragBorderBox[j].getChildAt(i);
                var isHit = borderItem.hitTestPoint(drawTargeGlobalCenterX, drawTargeGlobalCenterY);
                if (isHit) {
                    // 排斥校验
                    var borderId_1 = borderItem.name;
                    var imageId_1 = this_1.drawTarget.name;
                    if (this_1.mapArr.some(function (item) { return (item.borderId == borderId_1 && item.imageId != imageId_1); })) {
                        return "break-outermost";
                    }
                    this_1.checkoutImage(imageId_1);
                    this_1.mapArr.push({ borderId: borderId_1, imageId: imageId_1 });
                    if (this_1.judgeBorderisFull()) {
                        this_1.removeAllEleClickState();
                    }
                    this_1.removeMapState(this_1.drawTarget);
                    this_1.dragBorderBoxIndex = j;
                    var point = this_1.getDrawTargetPointToparent(borderItem);
                    this_1.drawTarget.x = point.x;
                    this_1.drawTarget.y = point.y;
                    flag = true;
                    return "break-outermost";
                }
            };
            var this_1 = this;
            for (var i = 0, len_1 = this.dragBorderBox[j].numChildren; i < len_1; i++) {
                var state_1 = _loop_1(i, len_1);
                switch (state_1) {
                    case "break-outermost": break outermost;
                }
            }
        }
        if (!flag && this.isRestore) {
            var index = this.drawTarget.name;
            this.recoverPosition(this.drawTarget);
            this.checkoutImage(index);
        }
        this.stage.removeEventListener(Mouse.MOVE, this.move, this);
        this.stage.removeEventListener(Mouse.END, this.up, this);
        evt.preventDefault();
    };
    // 检查目标image是否在mapArr中，是则从mapArr中删除
    DragImageBox.prototype.checkoutImage = function (imageId) {
        if (this.mapArr.some(function (item) { return item.imageId == imageId; })) {
            this.removeMapState(this.drawTarget);
            var mapArrIndex = void 0;
            for (var i = 0, len = this.mapArr.length; i < len; i++) {
                if (this.mapArr[i].imageId == imageId) {
                    mapArrIndex = i;
                }
            }
            this.mapArr.splice(mapArrIndex, 1);
        }
    };
    DragImageBox.uuType = UUType.DRAG_IMAGE_BOX;
    return DragImageBox;
}(MapEleBoxFactory));
__reflect(DragImageBox.prototype, "DragImageBox");
