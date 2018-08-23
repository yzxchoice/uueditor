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
        this.kb = new KeyBoard();
        this.initEvent();
    };
    TabStyle.prototype.initEvent = function () {
        for (var i = 0, len = this.gp_inputContainer.numChildren; i < len; i++) {
            var groupInpput = this.gp_inputContainer.getChildAt(i);
            var input = groupInpput.getChildAt(1);
            input.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onFocusOut, this);
            input.addEventListener(egret.FocusEvent.FOCUS_IN, this.onFocusIn, this);
        }
        ;
        // 双击事件
        // var type:string = GestureType.DOUBLE_TAP;
        // var event:string = GestureState.RECOGNIZED;
        // var config = {};
        // config[type] = {};
        // config[type][event] = this.onDoubleClick;
        // GestureManager.add(this.btn_update, config, false);
    };
    // private onDoubleClick(){
    // 	console.log("double_click");
    // }
    TabStyle.prototype.createStyleType = function (data) {
        this.gp_diff.removeChildren();
        var type = data.type;
        var props = data.props;
        var styleType = new StyleType(type, props);
        styleType.draw(this.gp_diff);
    };
    TabStyle.prototype.setTarget = function () {
        this.tool = this.editGroup.tool;
        console.log(this.tool);
        var data = this.tool.target.owner.image.data;
        this.createStyleType(data);
    };
    TabStyle.prototype.updateTarget = function () {
        var item = this.tool.target.owner.image;
        var width = item.width, height = item.height, scaleX = item.scaleX, scaleY = item.scaleY, rotation = item.rotation;
        var newData = {
            x: Math.floor(this.tool.regX),
            y: Math.floor(this.tool.regY),
            width: Math.floor(width * scaleX),
            height: Math.floor(height * scaleY),
            rotate: Math.floor(rotation) || '0'
        };
        this.preData = JSON.parse(JSON.stringify(newData));
        this.data = newData;
    };
    TabStyle.prototype.onFocusIn = function (evt) {
        console.log('onFocusIn...');
        console.log('add keyboard...');
        var textInput = evt.target.parent;
        var name = textInput.name;
        var propertyName = name.split('_')[1];
        this.inputType = propertyName;
        console.log(propertyName);
        this.kb.addEventListener(KeyBoard.onkeydown, this.onkeydown, this);
    };
    TabStyle.prototype.onFocusOut = function (evt) {
        console.log('onFocusOut...');
        console.log('remove keyboard...');
        if (!this.preData)
            return;
        this.kb.removeEventListener(KeyBoard.onkeydown, this.onkeydown, this);
        var addValue = Number(evt.target.text) - this.preData[this.inputType];
        if (!addValue)
            return;
        this.adjuctMatrix(addValue);
    };
    TabStyle.prototype.onkeydown = function (evt) {
        console.log('onkeydown...');
        evt.stopPropagation();
        evt.preventDefault();
        evt.stopImmediatePropagation();
        if (this.kb.isContain(evt.data, KeyBoard.DownArrow)) {
            console.log(evt.data);
            this.adjuctMatrix(-1);
        }
        if (this.kb.isContain(evt.data, KeyBoard.UpArrow)) {
            console.log(evt.data);
            this.adjuctMatrix(1);
        }
    };
    TabStyle.prototype.adjuctMatrix = function (value) {
        var addValue = value;
        var tool = this.tool;
        if (!(tool && tool.target))
            return;
        console.log(addValue);
        switch (this.inputType) {
            case 'width':
                console.log('width');
                this.data.width += addValue;
                tool.scale(this.data.width / this.preData.width);
                this.preData.width = this.data.width;
                break;
            case 'height':
                console.log('height');
                this.data.height += addValue;
                tool.scale(this.data.height / this.preData.height);
                this.preData.height = this.data.height;
                break;
            case 'x':
                console.log('x');
                this.data.x += addValue;
                tool.translate(addValue, 0);
                this.preData.x = this.data.x;
                break;
            case 'y':
                console.log('y');
                this.data.y += addValue;
                tool.translate(0, addValue);
                this.preData.y = this.data.y;
                break;
            case 'rotate':
                console.log('rotate');
                this.data.rotate = Number(this.data.rotate) + addValue;
                tool.rotate(addValue * Math.PI / 180);
                this.preData.rotate = this.data.rotate;
                break;
        }
        this.tool.startMatrix.copyFrom(this.tool.endMatrix);
        this.container.renderOneDisplay();
    };
    return TabStyle;
}(eui.Component));
__reflect(TabStyle.prototype, "TabStyle", ["IUUContainer"]);
