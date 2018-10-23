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
        var _this = _super.call(this, props) || this;
        // props
        _this.clickMode = ClickMode.MuchToMuch; // 点击模式 多对多/多对一
        // other
        _this.selectedImage = null; // 多对一模式 框内的dragImage
        _this.isTweening = false; // 多对一模式 动画是否正在进行的标记
        if (props.clickMode) {
            _this.clickMode = props.clickMode;
        }
        _this.listenEvent();
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.getDragBorderBox, _this);
        return _this;
    }
    // 监听事件
    ClickImageBox.prototype.listenEvent = function () {
        console.log('this.clickMode = ' + this.clickMode);
        if (this.clickMode == 1) {
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.downForClickMode1, this);
        }
        else {
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.downForClickMode2, this);
        }
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
    ClickImageBox.uuType = UUType.CLICK_IMAGE_BOX;
    return ClickImageBox;
}(MapEleBoxFactory));
__reflect(ClickImageBox.prototype, "ClickImageBox");
