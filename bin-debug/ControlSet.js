var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ControlSet = (function () {
    function ControlSet() {
        throw new Error('can not create a instance');
    }
    ControlSet.getStandard = function () {
        var translater = new this.controlClass(ControlType.TRANSLATE);
        translater.hitTestTarget = true;
        return [
            new this.controlClass(ControlType.BORDER),
            translater,
            new this.controlClass(ControlType.ROTATE, 0, 0, 0, 0, 10),
            new this.controlClass(ControlType.ROTATE, 0, 1, 0, 0, 10),
            new this.controlClass(ControlType.ROTATE, 1, 0, 0, 0, 10),
            new this.controlClass(ControlType.ROTATE, 1, 1, 0, 0, 10),
            new this.controlClass(ControlType.SCALE_X, 0, .5, 0, 0, 10),
            new this.controlClass(ControlType.SCALE_X, 1, .5, 0, 0, 10),
            new this.controlClass(ControlType.SCALE_Y, .5, 0, 0, 0, 10),
            new this.controlClass(ControlType.SCALE_Y, .5, 1, 0, 0, 10)
        ];
    };
    ControlSet.getScaler = function () {
        var translater = new this.controlClass(ControlType.TRANSLATE);
        translater.hitTestTarget = true;
        return [
            new this.controlClass(ControlType.BORDER),
            translater,
            new this.controlClass(ControlType.SCALE, 0, 0, 0, 0, 10),
            new this.controlClass(ControlType.SCALE, 0, 1, 0, 0, 10),
            new this.controlClass(ControlType.SCALE, 1, 0, 0, 0, 10),
            new this.controlClass(ControlType.SCALE, 1, 1, 0, 0, 10),
            new this.controlClass(ControlType.SCALE_X, 0, .5, 0, 0, 10),
            new this.controlClass(ControlType.SCALE_X, 1, .5, 0, 0, 10),
            new this.controlClass(ControlType.SCALE_Y, .5, 0, 0, 0, 10),
            new this.controlClass(ControlType.SCALE_Y, .5, 1, 0, 0, 10)
        ];
    };
    ControlSet.getUniformScaler = function () {
        var translater = new this.controlClass(ControlType.TRANSLATE);
        translater.hitTestTarget = true;
        return [
            new this.controlClass(ControlType.BORDER),
            translater,
            new this.controlClass(ControlType.ROTATE, .5, 0, 0, -20, 20),
            new this.controlClass(ControlType.SCALE_UNIFORM, 0, 0, 0, 0, 20),
            new this.controlClass(ControlType.SCALE_UNIFORM, 0, 1, 0, 0, 20),
            new this.controlClass(ControlType.SCALE_UNIFORM, 1, 0, 0, 0, 20),
            new this.controlClass(ControlType.SCALE_UNIFORM, 1, 1, 0, 0, 20)
        ];
    };
    ControlSet.getScalerWithRotate = function () {
        var translater = new this.controlClass(ControlType.TRANSLATE, 0, 0, 0, 0, -1);
        // translate control is "selected" by clicking
        // on the target's shape, not the control point
        translater.hitTestTarget = true;
        return [
            new this.controlClass(ControlType.BORDER),
            translater,
            new this.controlClass(ControlType.ROTATE, .5, 0, 0, -20, 10),
            new this.controlClass(ControlType.SCALE, 0, 0, 0, 0, 10),
            new this.controlClass(ControlType.SCALE, 0, 1, 0, 0, 10),
            new this.controlClass(ControlType.SCALE, 1, 0, 0, 0, 10),
            new this.controlClass(ControlType.SCALE, 1, 1, 0, 0, 10),
            new this.controlClass(ControlType.SCALE_X, 0, .5, 0, 0, 10),
            new this.controlClass(ControlType.SCALE_X, 1, .5, 0, 0, 10),
            new this.controlClass(ControlType.SCALE_Y, .5, 0, 0, 0, 10),
            new this.controlClass(ControlType.SCALE_Y, .5, 1, 0, 0, 10)
        ];
    };
    ControlSet.getDynamic = function () {
        var dyn = new this.controlClass(ControlType.TRANSLATE);
        dyn.dynamicUV = true;
        dyn.hitTestTarget = true;
        return [
            new this.controlClass(ControlType.BORDER),
            dyn
        ];
    };
    return ControlSet;
}());
__reflect(ControlSet.prototype, "ControlSet");
//# sourceMappingURL=ControlSet.js.map