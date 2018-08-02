var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Matrix = (function () {
    function Matrix(a, b, c, d, x, y) {
        this.a = (a != null) ? a : 1;
        this.b = b || 0;
        this.c = c || 0;
        this.d = (d != null) ? d : 1;
        this.x = x || 0;
        this.y = y || 0;
    }
    Matrix.prototype.toString = function () {
        return "matrix(" + this.a + "," + this.b + "," + this.c + "," + this.d + ","
            + this.x + "," + this.y + ")";
    };
    Matrix.prototype.equals = function (m) {
        if (this.a === m.a
            && this.b === m.b
            && this.c === m.c
            && this.d === m.d
            && this.x === m.x
            && this.y === m.y) {
            return true;
        }
        return false;
    };
    Matrix.prototype.identity = function () {
        this.a = 1;
        this.b = 0;
        this.c = 0;
        this.d = 1;
        this.x = 0;
        this.y = 0;
    };
    Matrix.prototype.clone = function () {
        return new Matrix(this.a, this.b, this.c, this.d, this.x, this.y);
    };
    Matrix.prototype.copyFrom = function (m) {
        this.a = m.a;
        this.b = m.b;
        this.c = m.c;
        this.d = m.d;
        this.x = m.x;
        this.y = m.y;
    };
    Matrix.prototype.rotate = function (angle) {
        var u = Math.cos(angle);
        var v = Math.sin(angle);
        var temp = this.a;
        this.a = u * this.a - v * this.b;
        this.b = v * temp + u * this.b;
        temp = this.c;
        this.c = u * this.c - v * this.d;
        this.d = v * temp + u * this.d;
        temp = this.x;
        this.x = u * this.x - v * this.y;
        this.y = v * temp + u * this.y;
    };
    Matrix.prototype.translate = function (x, y) {
        this.x += x;
        this.y += y;
    };
    Matrix.prototype.concat = function (m) {
        var a = this.a * m.a;
        var b = 0;
        var c = 0;
        var d = this.d * m.d;
        var x = this.x * m.a + m.x;
        var y = this.y * m.d + m.y;
        if (this.b !== 0 || this.c !== 0 || m.b !== 0 || m.c !== 0) {
            a += this.b * m.c;
            d += this.c * m.b;
            b += this.a * m.b + this.b * m.d;
            c += this.c * m.a + this.d * m.c;
            x += this.y * m.c;
            y += this.x * m.b;
        }
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.x = x;
        this.y = y;
    };
    Matrix.prototype.invert = function () {
        if (this.b === 0 && this.c === 0 && this.a !== 0 && this.d !== 0) {
            this.a = 1 / this.a;
            this.d = 1 / this.d;
            this.b = 0;
            this.c = 0;
            this.x = -this.a * this.x;
            this.y = -this.d * this.y;
        }
        else {
            var det = this.a * this.d - this.b * this.c;
            if (det === 0) {
                this.identity();
                return;
            }
            det = 1 / det;
            var temp = this.a;
            this.a = this.d * det;
            this.b = -this.b * det;
            this.c = -this.c * det;
            this.d = temp * det;
            temp = this.y;
            this.y = -(this.b * this.x + this.d * this.y);
            this.x = -(this.a * this.x + this.c * temp);
        }
    };
    Matrix.prototype.getRotationX = function () {
        return Math.atan2(this.b, this.a);
    };
    Matrix.prototype.getRotationY = function () {
        return Math.atan2(this.c, this.d);
    };
    Matrix.prototype.getTransformedX = function (x, y) {
        return this.x + this.a * x + this.c * y;
    };
    Matrix.prototype.getTransformedY = function (x, y) {
        return this.y + this.d * y + this.b * x;
    };
    Matrix.prototype.scale = function (x, y) {
        this.a *= x;
        this.b *= y;
        this.c *= x;
        this.d *= y;
        this.x *= x;
        this.y *= y;
    };
    Matrix.prototype.containsPoint = function (x, y, w, h) {
        // find mouse in local target space
        // and check within bounds of that area
        var inv = Matrix.temp; // use pooled Matrix to reduce allocations
        inv.copyFrom(this);
        inv.invert();
        var tx = inv.x + inv.a * x + inv.c * y;
        var ty = inv.y + inv.d * y + inv.b * x;
        // compare locations in non-transformed space (inverted)
        if (tx >= 0 && tx <= w && ty >= 0 && ty <= h) {
            return true;
        }
        return false;
    };
    Matrix.temp = new Matrix();
    return Matrix;
}());
__reflect(Matrix.prototype, "Matrix");
//# sourceMappingURL=Matrix.js.map