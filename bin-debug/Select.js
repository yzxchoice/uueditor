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
var Select = (function (_super) {
    __extends(Select, _super);
    function Select(data) {
        var _this = _super.call(this) || this;
        _this.stateObj = {
            selectionVisible: false,
            selectedItem: 'default',
        };
        _this.isFirstSelect = true;
        _this.itemWidth = 190;
        _this.itemHeight = 30;
        _this.selectData = data;
        _this.skinName = 'resource/skins/SelectSkin.exml';
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddedToStage, _this);
        return _this;
    }
    Select.prototype.dispose = function () {
    };
    Select.prototype.draw = function (container) {
    };
    Select.prototype.onAddedToStage = function () {
        this.init();
    };
    Select.prototype.init = function () {
        this.listenEvent();
    };
    Select.prototype.setDefaultItem = function (item) {
        this.stateObj.selectedItem = item;
    };
    Select.prototype.setDataContainer = function (dataContainer) {
        this.dataContainer = dataContainer;
    };
    Select.prototype.hide = function () {
        this.stateObj.selectionVisible = false;
    };
    Select.prototype.output = function () {
        this.dataContainer.getFontFamily(this.stateObj.selectedItem);
    };
    Select.prototype.listenEvent = function () {
        this.gp_selection_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchSelection2, this);
    };
    Select.prototype.setData = function (data) {
        this.selectData = data;
    };
    Select.prototype.createItem = function (obj) {
        var group = new eui.Group();
        group.width = this.itemWidth;
        group.height = this.itemHeight;
        var shape = new egret.Shape();
        shape.graphics.beginFill(0x1593ff);
        shape.graphics.drawRect(0, 0, this.itemWidth, this.itemHeight);
        shape.graphics.endFill();
        shape.visible = false;
        shape.name = 'shape';
        group.addChild(shape);
        var label = new eui.Label();
        label.text = obj.content;
        label.textColor = 0x000000;
        label.size = 24;
        label.width = this.itemWidth;
        label.height = this.itemHeight;
        group.addChild(label);
        return group;
    };
    Select.prototype.touchSelection2 = function (evt) {
        evt.stopPropagation();
        this.stateObj.selectionVisible = !this.stateObj.selectionVisible;
        if (this.stateObj.selectionVisible) {
            this.gp_selection.removeChildren();
            for (var j = 0, num = this.selectData.length; j < num; j++) {
                var itemGroup = this.createItem(this.selectData[j]);
                this.gp_selection.addChild(itemGroup);
            }
            if (!this.isFirstSelect)
                return;
            this.isFirstSelect = false;
            this.gp_selection.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.onMouseover_Selection, this);
            this.gp_selection.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_Selection, this);
        }
        ;
    };
    Select.prototype.onMouseover_Selection = function (evt) {
        var target = evt.target;
        if (target instanceof eui.Group)
            return;
        this.removeOverState();
        var shape = target.parent.getChildByName('shape');
        shape.visible = true;
    };
    Select.prototype.removeOverState = function () {
        for (var i = 0, len = this.gp_selection.numChildren; i < len; i++) {
            var item = this.gp_selection.getChildAt(i);
            var shape = item.getChildByName('shape');
            shape.visible = false;
        }
    };
    Select.prototype.onClick_Selection = function (evt) {
        var target = evt.target;
        if (target instanceof eui.Group)
            return;
        var text = target.text;
        this.stateObj.selectedItem = text;
        this.stateObj.selectionVisible = false;
        this.output();
    };
    return Select;
}(eui.Component));
__reflect(Select.prototype, "Select", ["IUUContainer"]);
