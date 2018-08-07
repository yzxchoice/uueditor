var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ControlType;
(function (ControlType) {
    ControlType[ControlType["SCALE"] = 1] = "SCALE";
    ControlType[ControlType["SCALE_X"] = 2] = "SCALE_X";
    ControlType[ControlType["SCALE_Y"] = 3] = "SCALE_Y";
    ControlType[ControlType["SCALE_UNIFORM"] = 4] = "SCALE_UNIFORM";
    ControlType[ControlType["ROTATE"] = 5] = "ROTATE";
    ControlType[ControlType["TRANSLATE"] = 6] = "TRANSLATE";
    ControlType[ControlType["REGISTRATION"] = 7] = "REGISTRATION";
    ControlType[ControlType["SKEW_X"] = 8] = "SKEW_X";
    ControlType[ControlType["SKEW_Y"] = 9] = "SKEW_Y";
    ControlType[ControlType["BORDER"] = 10] = "BORDER";
    ControlType[ControlType["TARGET"] = 11] = "TARGET";
    ControlType[ControlType["ROTATE_SCALE"] = 12] = "ROTATE_SCALE";
    ControlType[ControlType["SHAPE_CIRCLE"] = 1] = "SHAPE_CIRCLE";
    ControlType[ControlType["SHAPE_SQUARE"] = 2] = "SHAPE_SQUARE";
    ControlType[ControlType["SHAPE_BORDER"] = 3] = "SHAPE_BORDER";
})(ControlType || (ControlType = {}));
var Control = (function () {
    function Control(type, u, v, offsetX, offsetY, size) {
        this.hitTestTarget = false;
        this.shape = null;
        this.dynamicUV = false;
        this.transformCallback = null;
        this.tool = null;
        this.type = type;
        this.x = 0;
        this.y = 0;
        this.offsetX = offsetX || 0;
        this.offsetY = offsetY || 0;
        // this.hitTestTarget = false;
        this.size = size || 15;
        this.shape = null;
        this.setDefaultShape();
        this.u = u;
        this.v = v;
        this.dynamicUV = false;
        this.drawCallback = null;
        this.transformCallback = null;
    }
    Control.prototype.setDefaultShape = function () {
        switch (this.type) {
            case ControlType.ROTATE:
            case ControlType.ROTATE_SCALE:
            case ControlType.REGISTRATION: {
                this.shape = ControlType.SHAPE_CIRCLE;
                break;
            }
            case ControlType.SCALE:
            case ControlType.SCALE_UNIFORM:
            case ControlType.SCALE_X:
            case ControlType.SCALE_Y:
            case ControlType.SKEW_X:
            case ControlType.SKEW_Y: {
                this.shape = ControlType.SHAPE_SQUARE;
                break;
            }
            case ControlType.BORDER: {
                this.shape = ControlType.SHAPE_BORDER;
                break;
            }
        }
    };
    Control.prototype.updatePosition = function () {
        if (!this.tool || !this.tool.target) {
            return;
        }
        if (this.type === ControlType.REGISTRATION) {
            this.x = this.tool.regX;
            this.y = this.tool.regY;
            return;
        }
        var m = this.tool.endMatrix;
        // matrix transform for UV
        var w = this.tool.target.width * this.u;
        var h = this.tool.target.height * this.v;
        this.x = m.x + m.a * w + m.c * h;
        this.y = m.y + m.d * h + m.b * w;
        // offset
        var angle = 0;
        if (this.offsetX) {
            angle = m.getRotationX();
            this.x += this.offsetX * Math.cos(angle);
            this.y += this.offsetX * Math.sin(angle);
        }
        if (this.offsetY) {
            angle = m.getRotationY();
            this.x += this.offsetY * Math.sin(angle);
            this.y += this.offsetY * Math.cos(angle);
        }
    };
    Control.prototype.draw = function (ctx) {
        // for custom drawing methods, call
        // that method and skip standard drawing
        // if it returns false
        if (this.drawCallback !== null) {
            if (!this.drawCallback(this, ctx)) {
                return;
            }
        }
        // do not draw for non-positive sizes
        if (this.size <= 0) {
            return;
        }
        var x = 0;
        var y = 0;
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = this.tool.fillStyle;
        ctx.strokeStyle = this.tool.strokeStyle;
        ctx.lineWidth = this.tool.lineWidth;
        switch (this.shape) {
            case ControlType.SHAPE_CIRCLE: {
                ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
                break;
            }
            case ControlType.SHAPE_SQUARE: {
                x = (this.x - this.size / 2) | 0;
                y = (this.y - this.size / 2) | 0;
                ctx.fillRect(x, y, this.size, this.size);
                ctx.strokeRect(x, y, this.size, this.size);
                break;
            }
            case ControlType.SHAPE_BORDER: {
                // render to half pixel for hard lines
                ctx.fillStyle = "";
                var t = this.tool.target;
                var m = this.tool.endMatrix;
                ctx.moveTo(m.x, m.y);
                x = m.x + m.a * t.width;
                y = m.y + m.b * t.width;
                ctx.lineTo(x, y);
                x = m.x + m.a * t.width + m.c * t.height;
                y = m.y + m.d * t.height + m.b * t.width;
                ctx.lineTo(x, y);
                x = m.x + m.c * t.height;
                y = m.y + m.d * t.height;
                ctx.lineTo(x, y);
                ctx.lineTo(m.x, m.y);
                ctx.stroke();
                break;
            }
            default: {
                // no draw
                break;
            }
        }
        ctx.restore();
    };
    Control.prototype.contains = function (x, y) {
        if (this.hitTestTarget) {
            var t = this.tool.target;
            return t.matrix.containsPoint(x, y, t.width, t.height);
        }
        else {
            var cx = Math.abs(this.x - x);
            var cy = Math.abs(this.y - y);
            var sr = this.size / 2;
            if (cx < sr && cy < sr) {
                return true;
            }
        }
        return false;
    };
    return Control;
}());
__reflect(Control.prototype, "Control");
//# sourceMappingURL=Control.js.map