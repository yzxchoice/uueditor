var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TransformTool = (function () {
    function TransformTool(container) {
        // transform interaction
        // where interaction starts
        this.startMatrix = new Matrix();
        this.regStartU = 0.5;
        this.regStartV = 0.5;
        this.startX = 0;
        this.startY = 0;
        // trnasforms to apply
        this.preMatrix = new Matrix();
        this.postMatrix = new Matrix();
        // where interaction ends
        this.endMatrix = new Matrix();
        this.regEndU = 0.5;
        this.regEndV = 0.5;
        this.endX = 0;
        this.endY = 0;
        // transform UV delta
        this.dU = 0;
        this.dV = 0;
        // registration point in px
        this.regX = 0;
        this.regY = 0;
        // inverted matrices
        this.inv = new Matrix();
        this.controls = [];
        // style guide for controls
        this.fillStyle = 0xffffff;
        this.strokeStyle = 0x007eff;
        this.lineWidth = 2;
        this.container = container;
    }
    TransformTool.prototype.setTarget = function (target) {
        if (this.target === target) {
            return;
        }
        this.target = target;
        this.updateFromTarget();
    };
    TransformTool.prototype.updateFromTarget = function () {
        if (this.target && this.target.matrix) {
            console.log('updateFromTarget...');
            console.log(this.target.matrix);
            this.endMatrix.copyFrom(this.target.matrix);
            this.commit();
            this.updateRegistration();
            this.updateControls();
        }
    };
    TransformTool.prototype.setControls = function (controls) {
        this.controls.length = 0;
        if (!controls || !controls.length) {
            return;
        }
        var i = 0;
        var n = controls.length;
        for (i = 0; i < n; i++) {
            controls[i].tool = this;
            this.controls[i] = controls[i];
            this.controls[i].updatePosition();
        }
    };
    TransformTool.prototype.updateControls = function () {
        var i = 0;
        var n = this.controls.length;
        for (i = 0; i < n; i++) {
            this.controls[i].updatePosition();
        }
    };
    TransformTool.prototype.getControlAt = function (x, y) {
        // walking in reverse order to find those 
        // drawn on top (later in list) first
        var i = this.controls.length;
        while (i--) {
            if (this.controls[i].contains(x, y)) {
                return this.controls[i];
            }
        }
        // control not found
        return null;
    };
    TransformTool.prototype.draw = function () {
        if (!this.shouldDraw()) {
            return;
        }
        var i = 0;
        var n = this.controls.length;
        for (i = 0; i < n; i++) {
            this.controls[i].draw(this.container);
        }
    };
    TransformTool.prototype.undraw = function () {
        var i = 0;
        var n = this.controls.length;
        for (i = 0; i < n; i++) {
            this.controls[i].undraw(this.container);
        }
    };
    TransformTool.prototype.shouldDraw = function () {
        return this.target != null;
    };
    TransformTool.prototype.start = function (x, y, control) {
        if (!this.target) {
            return false;
        }
        // commits and gives default state
        this.end();
        this.control = control || this.getControlAt(x, y);
        if (this.control) {
            this.startX = x;
            this.startY = y;
            this.dU = 0;
            this.dV = 0;
            if (this.control.dynamicUV) {
                // update the control point location
                // to match the mouse location at start
                var cx = x - this.startMatrix.x;
                var cy = y - this.startMatrix.y;
                this.control.u = (this.inv.a * cx + this.inv.c * cy) / this.target.width;
                this.control.v = (this.inv.d * cy + this.inv.b * cx) / this.target.height;
            }
            this.updateRegistration();
            return true;
        }
        return false;
    };
    TransformTool.prototype.move = function (x, y) {
        this.updateMoveValues(x, y);
        if (this.control) {
            this.applyControl();
            this.updateTransform();
            this.updateTarget();
            this.updateRegistration();
            this.updateControls();
        }
    };
    TransformTool.prototype.scale = function (s) {
        this.preMatrix.scale(s, s);
        // if (this.control){
        this.updateTransform();
        this.updateTarget();
        this.updateRegistration();
        this.updateControls();
        // }
    };
    TransformTool.prototype.translate = function (x, y) {
        this.postMatrix.translate(x, y);
        // if (this.control){
        this.updateTransform();
        this.updateTarget();
        this.updateRegistration();
        this.updateControls();
        // }
    };
    TransformTool.prototype.rotate = function (r) {
        this.postMatrix.rotate(r);
        // if (this.control){
        this.updateTransform();
        this.updateTarget();
        this.updateRegistration();
        this.updateControls();
        // }
    };
    TransformTool.prototype.end = function () {
        this.commit();
        this.control = null;
    };
    TransformTool.prototype.updateMoveValues = function (x, y) {
        this.endX = x;
        this.endY = y;
        var cx = this.endX - this.startX;
        var cy = this.endY - this.startY;
        // inline transformPoint to target local space
        this.dU = (this.inv.a * cx + this.inv.c * cy) / this.target.width;
        this.dV = (this.inv.d * cy + this.inv.b * cx) / this.target.height;
    };
    TransformTool.prototype.applyControl = function () {
        if (this.control) {
            // for custom drawing methods, call
            // that method and skip standard drawing
            // if it returns false
            if (this.control.transformCallback !== null) {
                if (!this.control.transformCallback(this.control)) {
                    return;
                }
            }
            // variables for working with position and size
            var x = 0;
            var y = 0;
            var w = this.target.width;
            var h = this.target.height;
            // difference between registration and control points
            var cu = this.control.u - this.regStartU;
            var cv = this.control.v - this.regStartV;
            // if the abs px difference is less than 0, normalize to
            // 1 (or -1) to prevent outrageous divisions by 0 or a
            // very small number resulting in oversized transforms
            if (cu > 0) {
                if (cu * w < 1) {
                    cu = 1 / w;
                }
            }
            else if (cu * w > -1) {
                cu = -1 / w;
            }
            if (cv > 0) {
                if (cv * h < 1) {
                    cv = 1 / h;
                }
            }
            else if (cv * h > -1) {
                cv = -1 / h;
            }
            // perform transform based on control type
            switch (this.control.type) {
                case ControlType.SCALE: {
                    x = (cu + this.dU) / cu;
                    y = (cv + this.dV) / cv;
                    this.preMatrix.scale(x, y);
                    break;
                }
                case ControlType.SCALE_X: {
                    x = (cu + this.dU) / cu;
                    this.preMatrix.scale(x, 1);
                    break;
                }
                case ControlType.SCALE_Y: {
                    y = (cv + this.dV) / cv;
                    this.preMatrix.scale(1, y);
                    break;
                }
                case ControlType.SCALE_UNIFORM: {
                    x = (cu + this.dU) / cu;
                    y = (cv + this.dV) / cv;
                    // find the ratio to make the scaling
                    // uniform in both the x (w) and y (h) axes
                    w = y ? Math.abs(x / y) : 0;
                    h = x ? Math.abs(y / x) : 0;
                    // for 0 scale, scale both axises to 0
                    if (w === 0 || h === 0) {
                        x = 0;
                        y = 0;
                        // scale mased on the smaller ratio
                    }
                    else if (w > h) {
                        x *= h;
                    }
                    else {
                        y *= w;
                    }
                    this.preMatrix.scale(x, y);
                    break;
                }
                case ControlType.SKEW_X: {
                    this.preMatrix.c = (w / h) * (this.dU / cv);
                    break;
                }
                case ControlType.SKEW_Y: {
                    this.preMatrix.b = (h / w) * (this.dV / cu);
                    break;
                }
                case ControlType.ROTATE_SCALE: {
                    // rotation in global space
                    x = this.startX - this.regX;
                    y = this.startY - this.regY;
                    var ex = this.endX - this.regX;
                    var ey = this.endY - this.regY;
                    var angle = Math.atan2(ey, ex) - Math.atan2(y, x);
                    this.postMatrix.rotate(angle);
                    // determine scale factor from change
                    // this is also done in global space
                    // in matching with the rotation
                    var s = Math.sqrt(x * x + y * y);
                    if (s === 0) {
                        this.preMatrix.scale(0, 0);
                    }
                    else {
                        s = Math.sqrt(ex * ex + ey * ey) / s;
                        this.preMatrix.scale(s, s);
                    }
                    break;
                }
                case ControlType.ROTATE: {
                    // rotation in global space
                    x = Math.atan2(this.startY - this.regY, this.startX - this.regX);
                    y = Math.atan2(this.endY - this.regY, this.endX - this.regX);
                    this.postMatrix.rotate(y - x);
                    break;
                }
                case ControlType.TRANSLATE: {
                    // translate in global space
                    this.postMatrix.translate(this.endX - this.startX, this.endY - this.startY);
                    break;
                }
                case ControlType.REGISTRATION: {
                    this.regEndU = this.regStartU + this.dU;
                    this.regEndV = this.regStartV + this.dV;
                    // reg UV isn't set until end()
                    break;
                }
            }
        }
    };
    TransformTool.prototype.updateRegistration = function () {
        var x = this.regEndU * this.target.width;
        var y = this.regEndV * this.target.height;
        var m = this.endMatrix;
        this.regX = m.x + m.a * x + m.c * y;
        this.regY = m.y + m.d * y + m.b * x;
        console.log(this.regX, this.regY);
    };
    TransformTool.prototype.updateTransform = function () {
        // apply transforms (pre, post)
        this.endMatrix.identity();
        this.endMatrix.concat(this.preMatrix);
        this.endMatrix.concat(this.startMatrix);
        // next, the post transform is concatenated on top
        // of the previous result, but for the post transform,
        // translation (x,y) values are not transformed. They're
        // saved with the respective post transform offset, then 
        // reassigned after concatenating the post transformation
        var x = this.endMatrix.x + this.postMatrix.x;
        var y = this.endMatrix.y + this.postMatrix.y;
        // finally, concatenate post transform on to final
        this.endMatrix.concat(this.postMatrix);
        // reassign saved tx and ty values with the 
        // included registration offset
        this.endMatrix.x = x;
        this.endMatrix.y = y;
        // shift for registration not being in (0,0)
        this.applyRegistrationOffset();
        // reset transforms
        this.preMatrix.identity();
        this.postMatrix.identity();
    };
    TransformTool.prototype.applyRegistrationOffset = function () {
        if (this.regEndU !== 0 || this.regEndV !== 0) {
            // registration offset
            // local registration location
            var x = this.regEndU * this.target.width;
            var y = this.regEndV * this.target.height;
            // delta tansform by start matrix
            var rx = this.startMatrix.a * x + this.startMatrix.c * y;
            var ry = this.startMatrix.d * y + this.startMatrix.b * x;
            // subtract delta transform end matrix
            rx -= this.endMatrix.a * x + this.endMatrix.c * y;
            ry -= this.endMatrix.d * y + this.endMatrix.b * x;
            // shift by remaining
            this.endMatrix.translate(rx, ry);
        }
    };
    TransformTool.prototype.updateTarget = function () {
        if (this.target && this.target.matrix && !this.target.matrix.equals(this.endMatrix)) {
            this.target.matrix.copyFrom(this.endMatrix);
            if (this.target.changed !== null) {
                this.target.changed();
            }
        }
    };
    TransformTool.prototype.commit = function () {
        // registration
        this.regStartU = this.regEndU;
        this.regStartV = this.regEndV;
        // transform
        this.startMatrix.copyFrom(this.endMatrix);
        this.sanitizeStartMatrix(); // prevent by-0 errors
        // update inversion matrix
        this.inv.copyFrom(this.startMatrix);
        this.inv.invert();
    };
    TransformTool.prototype.sanitizeStartMatrix = function () {
        if (!this.target) {
            return;
        }
        if (this.startMatrix.a === 0 && this.startMatrix.b === 0) {
            this.startMatrix.a = 1 / this.target.width;
        }
        if (this.startMatrix.d === 0 && this.startMatrix.c === 0) {
            this.startMatrix.d = 1 / this.target.height;
        }
    };
    return TransformTool;
}());
__reflect(TransformTool.prototype, "TransformTool");
