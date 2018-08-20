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
var CheckItem = (function (_super) {
    __extends(CheckItem, _super);
    function CheckItem(labelText) {
        var _this = _super.call(this) || this;
        _this.labelText = labelText;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Object.defineProperty(CheckItem.prototype, "isOver", {
        get: function () {
            return this._isOver;
        },
        set: function (v) {
            this._isOver = v;
            this.shape.visible = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckItem.prototype, "isSelected", {
        get: function () {
            return this._isSelected;
        },
        set: function (v) {
            this._isSelected = v;
            this.checkBox.selected = v;
        },
        enumerable: true,
        configurable: true
    });
    CheckItem.prototype.onAddToStage = function () {
        this.width = this.parent.width;
        this.height = 30;
        this.shape = new egret.Shape();
        this.shape.graphics.beginFill(0x198ae7);
        this.shape.graphics.drawRect(0, 0, this.width, this.height);
        this.shape.graphics.endFill();
        this.isOver = false;
        this.addChild(this.shape);
        this.checkBox = new eui.CheckBox();
        this.checkBox.label = this.labelText;
        this.checkBox.width = this.width;
        this.checkBox.height = this.height;
        this.addChild(this.checkBox);
    };
    return CheckItem;
}(eui.Group));
__reflect(CheckItem.prototype, "CheckItem");
//# sourceMappingURL=checkItem.js.map