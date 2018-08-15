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
var TabStyle = (function (_super) {
    __extends(TabStyle, _super);
    function TabStyle() {
        var _this = _super.call(this) || this;
        _this.data = {
            width: 30,
            height: 30,
            x: 30,
            y: 30,
            rotate: 10,
        };
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddedToStage, _this);
        return _this;
    }
    TabStyle.prototype.dispose = function () {
    };
    TabStyle.prototype.draw = function (container) {
        this.container = container;
        this.editGroup = container.editGroup;
    };
    TabStyle.prototype.onAddedToStage = function () {
        this.initEvent();
    };
    TabStyle.prototype.initEvent = function () {
        for (var i = 0, len = this.gp_inputContainer.numChildren; i < len; i++) {
            var groupInpput = this.gp_inputContainer.getChildAt(i);
            var input = groupInpput.getChildAt(1);
            input.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onFocusOut, this);
        }
    };
    TabStyle.prototype.setTarget = function () {
        this.tool = this.editGroup.tool;
    };
    TabStyle.prototype.updateTarget = function () {
        var matrix = this.tool.target.matrix;
        var item = this.tool.target.owner.image;
        var _a = this.tool.target, width = _a.width, height = _a.height;
        var scaleX = item.scaleX, scaleY = item.scaleY, rotation = item.rotation;
        var newData = {
            x: Math.floor(this.tool.regX),
            y: Math.floor(this.tool.regY),
            width: Math.floor(width * scaleX),
            height: Math.floor(height * scaleY),
            rotate: Math.floor(rotation)
        };
        this.data = newData;
    };
    TabStyle.prototype.onFocusOut = function (evt) {
        console.log(evt.target.id);
        var textInput = evt.target.parent;
        var name = textInput.name;
        var propertyName = name.split('_')[1];
        this.data[propertyName] = Number(evt.target.text);
        // TODO: 去修改对应的视图元素的信息
        var game = this.parent;
        var tool = this.tool;
        var target = tool.target;
        var element = tool.target.owner.image;
        if (name == "input_width") {
            tool.scale(this.data['width'] / Math.round(target.width * tool.endMatrix.a));
        }
        if (name == "input_x" || name == "input_y") {
            tool.translate(this.data['x'] - tool.regX, this.data['y'] - tool.regY);
        }
        if (name == "input_rotate") {
            tool.rotate((this.data['rotate']) * Math.PI / 180 - tool.endMatrix.getRotationX());
        }
        // console.log(tool.endMatrix.getRotationX(),tool.endMatrix.getRotationY());
        // console.log(tool.regX, tool.regY);
        this.editGroup.render();
        // console.log(tool.regEndU, tool.regEndV);
        // console.log(tool.regStartU, tool.regStartV);
    };
    return TabStyle;
}(eui.Component));
__reflect(TabStyle.prototype, "TabStyle", ["IUUContainer"]);
