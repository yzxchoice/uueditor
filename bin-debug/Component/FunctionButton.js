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
var FunctionButton = (function (_super) {
    __extends(FunctionButton, _super);
    function FunctionButton(props) {
        var _this = _super.call(this) || this;
        // props
        _this.width = 200;
        _this.height = 60;
        _this.functionType = FunctionType.RESET;
        // 观察者
        _this.observer = Observer.getInstance();
        for (var key in props) {
            _this[key] = props[key];
        }
        ;
        _this.createUI();
        _this.listenEvent();
        return _this;
    }
    FunctionButton.prototype.createUI = function () {
        var bgImg = new eui.Image();
        bgImg.source = this.bgUrl;
        bgImg.width = this.width;
        bgImg.height = this.height;
        var label = new eui.Label();
        label.text = this.text;
        label.width = this.width;
        label.height = this.height;
        label.verticalAlign = 'middle';
        label.textAlign = 'center';
        this.addChild(bgImg);
        this.addChild(label);
    };
    FunctionButton.prototype.listenEvent = function () {
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.emitObserver, this);
    };
    FunctionButton.prototype.emitObserver = function () {
        this.observer.emit(SwitchState.switchFunctionType(this.functionType));
    };
    FunctionButton.uuType = UUType.FUNCTION_BUTTON;
    return FunctionButton;
}(eui.Group));
__reflect(FunctionButton.prototype, "FunctionButton", ["IFunctionBtn"]);
