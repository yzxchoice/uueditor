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
// TypeScript file
var TriggerPanel = (function (_super) {
    __extends(TriggerPanel, _super);
    function TriggerPanel() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    TriggerPanel.prototype.onAddToStage = function (event) {
    };
    return TriggerPanel;
}(eui.Group));
__reflect(TriggerPanel.prototype, "TriggerPanel");
//# sourceMappingURL=TriggerPanel.js.map