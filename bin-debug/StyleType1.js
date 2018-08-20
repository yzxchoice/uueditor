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
var StyleType1 = (function (_super) {
    __extends(StyleType1, _super);
    function StyleType1() {
        var _this = _super.call(this) || this;
        _this.skinName = 'resource/skins/StyleType1Skin.exml';
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    StyleType1.prototype.dispose = function () {
    };
    StyleType1.prototype.draw = function (container) {
        this.container = container;
        this.container.addChild(this);
    };
    Object.defineProperty(StyleType1.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (v) {
            this._data = v;
            this.stateObj = JSON.parse(JSON.stringify(v));
        },
        enumerable: true,
        configurable: true
    });
    StyleType1.prototype.onAddToStage = function () {
        this.initEvent();
    };
    StyleType1.prototype.initEvent = function () {
        for (var i = 0, len = this.gp_styleContainer.numChildren; i < len; i++) {
            var groupInpput = this.gp_styleContainer.getChildAt(i);
            try {
                var input = groupInpput.getChildAt(1);
                input.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onFocusOut, this);
                input.addEventListener(egret.FocusEvent.FOCUS_IN, this.onFocusIn, this);
            }
            catch (e) {
                console.log('input...');
            }
        }
        ;
        this.lb_selectColor.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    StyleType1.prototype.initSelect = function () {
        var data = [
            {
                content: 'Arial'
            },
            {
                content: 'DFKai-SB'
            },
            {
                content: 'FangSong'
            },
            {
                content: 'Georgia'
            },
            {
                content: 'Helvetica'
            },
            {
                content: 'KaiTi'
            },
            {
                content: 'Lucida Family'
            },
        ];
        var select = new Select(data);
        this.gp_style_fontFamily_select.addChild(select);
        this.gp_styleContainer.setChildIndex(this.gp_style_fontFamily, 5);
        select.setDataContainer(this);
        console.log(this.data);
        select.setDefaultItem(this.data.props.fontFamily);
    };
    StyleType1.prototype.getFontFamily = function (v) {
        if (!this.isTargetSelected())
            return;
        this.data.props.fontFamily = v;
        this.refresh();
    };
    StyleType1.prototype.onClick = function () {
        if (!this.colorSelectBox || !this.colorSelectBox.isShow) {
            var colorSelectBox = new ColorSelectBox();
            colorSelectBox.draw(this);
            colorSelectBox.x = 280;
            colorSelectBox.y = 100;
            this.colorSelectBox = colorSelectBox;
            this.colorSelectBox.listenColorChange(this.changeColor.bind(this));
        }
        else {
            this.colorSelectBox.undraw();
        }
    };
    StyleType1.prototype.setDataContainer = function (dataContainer) {
        this.dataContainer = dataContainer;
        this.item = dataContainer.tool.target.owner.image;
        this.data = this.item.data;
        this.initSelect();
    };
    StyleType1.prototype.changeColor = function (color) {
        console.log('color = ' + color);
        if (!this.isTargetSelected())
            return;
        this.data.props.textColor = color;
        this.data = this.item.data;
        this.refresh();
    };
    StyleType1.prototype.onFocusIn = function (evt) {
        console.log('onFocusIn...');
        var textInput = evt.target.parent;
        var name = textInput.name;
        this.inputType = name;
    };
    StyleType1.prototype.onFocusOut = function (evt) {
        console.log('onFocusOut...');
        if (!this.isTargetSelected())
            return;
        var value = evt.target.text;
        this.data.props[this.inputType] = value;
        this.refresh();
    };
    StyleType1.prototype.refresh = function () {
        var target = this.dataContainer.tool.target;
        var picture = target.owner;
        this.dataContainer.tool.setTarget(null);
        this.dataContainer.editGroup.clear();
        this.dataContainer.editGroup.updateDisplay(picture);
        target.width = this.item.width;
        target.height = this.item.height;
        this.dataContainer.tool.setTarget(target);
        this.dataContainer.tool.draw();
        this.dataContainer.updateTarget();
    };
    StyleType1.prototype.isTargetSelected = function () {
        var tool = this.dataContainer.tool;
        var target = tool.target;
        if (!(tool && target))
            return false;
        return true;
    };
    return StyleType1;
}(eui.Component));
__reflect(StyleType1.prototype, "StyleType1", ["IUUContainer"]);
