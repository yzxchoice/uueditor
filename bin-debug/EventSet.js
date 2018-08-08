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
var EventSetDome = (function (_super) {
    __extends(EventSetDome, _super);
    function EventSetDome(labelText) {
        if (labelText === void 0) { labelText = ''; }
        var _this = _super.call(this) || this;
        _this.siderbarSkin = SiderbarSkinBy.getInstance();
        _this._isShow = true;
        _this.skinName = "resource/skins/EventSet.exml";
        _this.label_title.text = labelText;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStageInit, _this);
        return _this;
    }
    Object.defineProperty(EventSetDome.prototype, "isShow", {
        get: function () {
            return this._isShow;
        },
        set: function (v) {
            this._isShow = v;
            this.currentState = v ? 'show' : 'hidden';
            this.updateMessage();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EventSetDome.prototype, "delayed", {
        get: function () {
            return this._delayed;
        },
        set: function (v) {
            this._delayed = v;
            this.input_time.text = v.toString();
            this.updateMessage();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EventSetDome.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (v) {
            this._id = v;
        },
        enumerable: true,
        configurable: true
    });
    EventSetDome.prototype.onAddToStageInit = function (event) {
        var _this = this;
        this.btn_show.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.isShow = true;
        }, this);
        this.btn_hidden.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.isShow = false;
        }, this);
        this.input_time.addEventListener(egret.FocusEvent.FOCUS_OUT, function (evt) {
            _this.delayed = Number(evt.target.text);
        }, this);
        this.label_close.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.siderbarSkin.removeEventSet({ id: _this.id });
        }, this);
    };
    EventSetDome.prototype.updateMessage = function () {
        var relevanceItem = this.siderbarSkin.relevanceItemIdObj[this.id];
        relevanceItem.isShow = this.isShow;
        relevanceItem.delayed = this.delayed;
        this.siderbarSkin.relevanceItemIdObj = this.siderbarSkin.relevanceItemIdObj;
    };
    return EventSetDome;
}(eui.Component));
__reflect(EventSetDome.prototype, "EventSetDome");
