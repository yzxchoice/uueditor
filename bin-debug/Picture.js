var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// TypeScript file
var Picture = (function () {
    function Picture(image, m) {
        this.image = image;
        var matrix = new Matrix(m.a, m.b, m.c, m.d, m.x, m.y);
        this.transform = new Transformable(image.width, image.height, matrix, this);
    }
    Picture.prototype.draw = function (container) {
        var m = this.transform.matrix;
        this.image.matrix = new egret.Matrix(m.a, m.b, m.c, m.d, m.x, m.y);
        container.addChild(this.image);
    };
    Picture.prototype.undraw = function (container) {
        container.removeChild(this.image);
    };
    return Picture;
}());
__reflect(Picture.prototype, "Picture");
