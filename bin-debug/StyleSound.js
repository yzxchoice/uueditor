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
var StyleSound = (function (_super) {
    __extends(StyleSound, _super);
    function StyleSound() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    StyleSound.getInstance = function () {
        if (!this.instance) {
            this.instance = new StyleSound();
        }
        return this.instance;
    };
    StyleSound.prototype.setData = function (d) {
        // if(!d) return ;
        this.d = d;
        this.reset();
        this.render();
    };
    StyleSound.prototype.onAddToStage = function () {
        this.stage.addEventListener(PageEvent.SOUND_CHANGE, this.cb, this);
    };
    StyleSound.prototype.draw = function (container) {
        this.horizontalCenter = 0;
        this.container = container;
        this.container.addChild(this);
    };
    StyleSound.prototype.reset = function () {
        this.removeChildren();
    };
    StyleSound.prototype.render = function () {
        var btn = new eui.Button();
        btn.width = 300;
        btn.height = 50;
        btn.label = this.d ? this.d.name : "添加音效";
        btn.addEventListener(Mouse.START, this.select, this);
        this.addChild(btn);
    };
    StyleSound.prototype.select = function () {
        var tabStyle = this.container.parent.parent;
        var g = tabStyle.editGroup.parent.parent;
        g.openSoundePanel();
    };
    StyleSound.prototype.cb = function (event) {
        this.setData(event.data);
    };
    return StyleSound;
}(eui.Group));
__reflect(StyleSound.prototype, "StyleSound");
//# sourceMappingURL=StyleSound.js.map