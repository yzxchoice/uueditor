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
var UUTween = (function (_super) {
    __extends(UUTween, _super);
    function UUTween(container) {
        var _this = _super.call(this) || this;
        _this.container = container;
        return _this;
        // this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    UUTween.prototype.onAddToStage = function (event) {
    };
    UUTween.prototype.setTool = function (tool, tweenBox) {
        this.reset();
        this._shape = new egret.Shape();
        this.addChild(this._shape);
        this.tool = tool;
        if (!this.tool.target)
            return;
        this.target = this.tool.target.owner.image;
        this.data = this.tool.target.owner.image.data;
        this.tweenBox = tweenBox;
        if (this.data.hasOwnProperty('properties') && this.data.properties.hasOwnProperty('anims')) {
            this.tweener = this.data.properties.anims[0];
            this.init();
            this.initGraphics();
        }
    };
    UUTween.prototype.reset = function () {
        this.removeChildren();
        this._shape = null;
        this.tool = null;
    };
    //初始化赋值
    UUTween.prototype.initGraphics = function () {
        var shape = this._shape;
        /*** 关键代码段开始 ***/
        shape.graphics.clear();
        shape.graphics.lineStyle(3, 0xff0ff0);
        switch (this.tweener.type) {
            case animType.circle:
                shape.graphics.drawCircle(this._startShape.x, this._startShape.y + 100, 100);
                break;
            case animType.curve:
                shape.graphics.moveTo(this._startShape.x, this._startShape.y);
                shape.graphics.curveTo(this._control.x, this._control.y, this._anchor.x, this._anchor.y);
                break;
        }
        /*** 关键代码段结束 ***/
    };
    /**
     * 初始化动画类的数值
     */
    UUTween.prototype.init = function () {
        this.offsetX = this.tool.regX - this.target.x;
        this.offsetY = this.tool.regY - this.target.y;
        this._startShape = this.tweener.start ? this.initShape(this.tweener.start.x + this.offsetX, this.tweener.start.y + this.offsetY, 0xffff00)
            : this.initShape(this.tool.regX, this.tool.regY, 0xffff00);
        this._control = this.tweener.control ? this.initShape(this.tweener.control.x + this.offsetX, this.tweener.control.y + this.offsetY, 0xff0000)
            : this.initShape(this.tool.regX + 100, this.tool.regY - 100, 0xff0000);
        this._anchor = this.tweener.end ? this.initShape(this.tweener.end.x + this.offsetX, this.tweener.end.y + this.offsetY, 0x000ff0)
            : this.initShape(this.tool.regX + 200, this.tool.regY + 10, 0x000ff0);
        var start, control, anchor;
        switch (this.tweener.type) {
            case animType.circle:
                start = new egret.Point(this._startShape.x - this.offsetX, this._startShape.y - this.offsetY + 100);
                this.tweenBox.setValue(start);
                this.tweener.start = start;
                break;
            case animType.curve:
                start = this.tweener.start || new egret.Point(this._startShape.x - this.offsetX, this._startShape.y - this.offsetY);
                control = this.tweener.control || new egret.Point(this._control.x - this.offsetX, this._control.y - this.offsetY);
                anchor = this.tweener.end || new egret.Point(this._anchor.x - this.offsetX, this._anchor.y - this.offsetY);
                this.tweenBox.setValue(start, control, anchor);
                this.tweener.start = start;
                this.tweener.control = control;
                this.tweener.end = anchor;
                break;
        }
    };
    /**
     * 初始化控制点
     */
    UUTween.prototype.initShape = function (x, y, color) {
        var shape = new egret.Shape();
        shape.graphics.beginFill(color);
        shape.graphics.drawCircle(0, 0, 10);
        shape.graphics.endFill();
        this.addChild(shape);
        shape.x = x;
        shape.y = y;
        shape.touchEnabled = true;
        shape.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginHandler, this);
        return shape;
    };
    UUTween.prototype.onBeginHandler = function (e) {
        e.stopImmediatePropagation();
        if (!this.tool.target)
            return;
        this.drapShape = e.currentTarget;
        this.drapShape.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginHandler, this);
        this.drapShape.touchEnabled = false;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMoveHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onEndHandler, this);
    };
    UUTween.prototype.onMoveHandler = function (e) {
        this.drapShape.x = e.stageX;
        this.drapShape.y = e.stageY;
        this.initGraphics();
    };
    UUTween.prototype.onEndHandler = function (e) {
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMoveHandler, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onEndHandler, this);
        this.drapShape.touchEnabled = true;
        ;
        this.drapShape.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginHandler, this);
        var start = new egret.Point(this._startShape.x - this.offsetX, this._startShape.y - this.offsetY);
        var control = new egret.Point(this._control.x - this.offsetX, this._control.y - this.offsetY);
        var anchor = new egret.Point(this._anchor.x - this.offsetX, this._anchor.y - this.offsetY);
        this.tweenBox.setValue(start, control, anchor);
        this.tweener.start = start;
        this.tweener.control = control;
        this.tweener.end = anchor;
    };
    return UUTween;
}(egret.DisplayObjectContainer));
__reflect(UUTween.prototype, "UUTween");
