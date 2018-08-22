var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AnimateSet = (function () {
    function AnimateSet() {
        throw new Error('can not create a instance');
    }
    AnimateSet.move = function () {
        var _this = this;
        egret.Tween.get(this.target, { loop: true })
            .to({ x: egret.MainContext.instance.stage.stageWidth + this.target.width }, 2000)
            .call(function () {
            _this.target.rotation = 0;
            // this.target.matrix.translate(- this.target.width, 0);
        }, this, ["param1", { key: "key", value: 3 }])
            .wait(1000);
    };
    return AnimateSet;
}());
__reflect(AnimateSet.prototype, "AnimateSet");
//# sourceMappingURL=AnimateSet.js.map