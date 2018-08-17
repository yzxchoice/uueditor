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
            var input = groupInpput.getChildAt(1);
            input.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onFocusOut, this);
            input.addEventListener(egret.FocusEvent.FOCUS_IN, this.onFocusIn, this);
        }
        ;
    };
    StyleType1.prototype.setDataContainer = function (dataContainer) {
        this.dataContainer = dataContainer;
        this.item = dataContainer.tool.target.owner.image;
        this.data = this.item.data;
    };
    StyleType1.prototype.onFocusIn = function (evt) {
        console.log('onFocusIn...');
        var textInput = evt.target.parent;
        var name = textInput.name;
        this.inputType = name;
    };
    StyleType1.prototype.onFocusOut = function (evt) {
        var _this = this;
        console.log('onFocusOut...');
        var value = evt.target.text;
        console.log('item...');
        console.log(this.item);
        console.log('tool...');
        console.log(this.dataContainer.tool);
        if (this.inputType == 'text') {
            this.data.content = value;
        }
        else {
            this.data.property[this.inputType] = value;
        }
        var target = this.dataContainer.tool.target;
        var preWidth = this.item.width;
        console.log('this.item.width = ' + this.item.width);
        console.log('this.item.height = ' + this.item.height);
        setTimeout(function () {
            var nowWidth = _this.item.width;
            _this.dataContainer.tool.scale(nowWidth / preWidth);
            _this.dataContainer.tool.startMatrix.copyFrom(_this.dataContainer.tool.endMatrix);
            console.log('render...');
            _this.dataContainer.editGroup.render();
            console.log('this.item.width = ' + _this.item.width);
            console.log('this.item.height = ' + _this.item.height);
            // target.width = this.item.width;
            // target.height = this.item.height;	
        }, 0);
        console.log('render...');
        // this.dataContainer.editGroup.render();
        // this.dataContainer.editGroup.render();
        // console.log('refresh...');;
        // this.dataContainer.editGroup.refresh();
    };
    return StyleType1;
}(eui.Component));
__reflect(StyleType1.prototype, "StyleType1", ["IUUContainer"]);
