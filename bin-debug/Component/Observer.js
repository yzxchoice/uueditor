var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Observer = (function () {
    function Observer() {
        // private subscribers: { subscriberName: string, eventList: Function[] }[] = [];
        this.subscribers = {};
    }
    Observer.getInstance = function () {
        if (!this.instance) {
            this.instance = new this;
        }
        return this.instance;
    };
    Observer.prototype.register = function (subscriberName, event) {
        if (!this.subscribers[subscriberName]) {
            this.subscribers[subscriberName] = [];
        }
        this.subscribers[subscriberName].push(event);
    };
    Observer.prototype.emit = function (subscriberName) {
        if (!this.subscribers[subscriberName])
            return;
        this.subscribers[subscriberName].forEach(function (fn) { return fn(); });
    };
    Observer.prototype.remove = function (subscriberName, event) {
        if (!this.subscribers[subscriberName])
            return;
        for (var i = 0, len = this.subscribers[subscriberName].length; i < len; i++) {
            var fn = this.subscribers[subscriberName][i];
            if (fn == event) {
                this.subscribers[subscriberName].splice(i, 1);
                break;
            }
        }
    };
    Observer.prototype.clear = function () {
        this.subscribers = {};
    };
    Observer.instance = null;
    return Observer;
}());
__reflect(Observer.prototype, "Observer");
