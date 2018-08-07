var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Transformable = (function () {
    function Transformable(width, height, matrix, owner) {
        this.width = 0;
        this.height = 0;
        this.width = width;
        this.height = height;
        this.matrix = matrix;
        this.owner = owner;
        this.changed = null;
    }
    return Transformable;
}());
__reflect(Transformable.prototype, "Transformable");
//# sourceMappingURL=Transformable.js.map