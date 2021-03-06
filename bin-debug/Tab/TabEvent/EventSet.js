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
    function EventSetDome() {
        var _this = _super.call(this) || this;
        _this._isShow = true;
        _this.skinName = "resource/skins/EventSet.exml";
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStageInit, _this);
        return _this;
        // this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedToStageInit, this);
    }
    EventSetDome.prototype.dispose = function () {
        var data = this.data;
        var index = null;
        for (var i = 0, len = this.triggerGroup.length; i < len; i++) {
            var obj = this.triggerGroup[i];
            if (data.sourceId == obj.sourceId && data.targetId == obj.targetId) {
                index = i;
                break;
            }
        }
        ;
        if (index !== null) {
            this.triggerGroup.splice(index, 1);
        }
        ;
    };
    EventSetDome.prototype.draw = function (container) {
        this.container = container;
        this.container.addChild(this);
    };
    Object.defineProperty(EventSetDome.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (v) {
            this._data = v;
            // 需要拷贝一份数据用于skin，直接赋值会污染本身的data
            this.stateObj = JSON.parse(JSON.stringify(v));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EventSetDome.prototype, "isShow", {
        get: function () {
            return this._isShow;
        },
        set: function (v) {
            console.log('isShow = ' + v);
            this._isShow = v;
            this.currentState = v ? 'show' : 'hidden';
            this.data.targetState = v ? 1 : 2;
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
            _this.data.delay = Number(evt.target.text);
        }, this);
        this.label_close.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.removeData();
        }, this);
    };
    EventSetDome.prototype.getDataContainer = function (dataContainer) {
        this.dataContainer = dataContainer;
        this.triggerGroup = this.dataContainer.triggerGroup;
    };
    EventSetDome.prototype.initData = function (data) {
        this.data = data;
        this.name = data.targetId;
        this.isShow = data.targetState == 1 ? true : false;
    };
    EventSetDome.prototype.pushData = function () {
        this.triggerGroup.push(this.data);
    };
    EventSetDome.prototype.removeData = function () {
        var relevanceItemId = this.data.targetId;
        this.container.removeChild(this);
        this.dispose();
        this.dataContainer.relevanceItemIdList.splice(this.dataContainer.relevanceItemIdList.indexOf(relevanceItemId), 1);
    };
    return EventSetDome;
}(eui.Component));
__reflect(EventSetDome.prototype, "EventSetDome", ["IUUContainer"]);
