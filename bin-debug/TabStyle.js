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
        var item = this.tool.target.owner.image;
        var width = item.width, height = item.height, scaleX = item.scaleX, scaleY = item.scaleY, rotation = item.rotation;
        var newData = {
            x: Math.floor(this.tool.regX),
            y: Math.floor(this.tool.regY),
            width: Math.floor(width * scaleX),
            height: Math.floor(height * scaleY),
            rotate: Math.floor(rotation)
        };
        this.preData = JSON.parse(JSON.stringify(newData));
        this.data = newData;
    };
    TabStyle.prototype.onFocusOut = function (evt) {
        console.log('onFocusOut...');
        var textInput = evt.target.parent;
        var name = textInput.name;
        var propertyName = name.split('_')[1];
        this.data[propertyName] = Number(evt.target.text);
        // TODO: 去修改对应的视图元素的信息
        var game = this.parent;
        var tool = this.tool;
        console.log('tool...');
        console.log(tool);
        var target = tool.target;
        var element = tool.target.owner.image;
        if (name == "input_width") {
            tool.scale(this.data.width / this.preData.width);
        }
        if (name == "input_x" || name == "input_y") {
            tool.translate(this.data.x - this.preData.x, this.data['y'] - this.preData.y);
        }
        if (name == "input_rotate") {
            tool.rotate((this.data.rotate - this.preData.rotate) * Math.PI / 180);
        }
        var newData = {
            x: this.data.x,
            y: this.data.y,
            width: this.data.width,
            height: this.data.height,
            rotate: this.data.rotate
        };
        this.preData = JSON.parse(JSON.stringify(newData));
        this.tool.startMatrix.copyFrom(this.tool.endMatrix);
        this.editGroup.render();
    };
    return TabStyle;
}(eui.Component));
__reflect(TabStyle.prototype, "TabStyle", ["IUUContainer"]);
//# sourceMappingURL=TabStyle.js.map