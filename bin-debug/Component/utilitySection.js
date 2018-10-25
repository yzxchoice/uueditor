var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LayoutType;
(function (LayoutType) {
    LayoutType[LayoutType["HLayout"] = 1] = "HLayout";
    LayoutType[LayoutType["VLayout"] = 2] = "VLayout";
    LayoutType[LayoutType["TLayout"] = 3] = "TLayout";
})(LayoutType || (LayoutType = {}));
var GapType;
(function (GapType) {
    GapType[GapType["Small"] = 1] = "Small";
    GapType[GapType["Middle"] = 2] = "Middle";
    GapType[GapType["Big"] = 3] = "Big";
})(GapType || (GapType = {}));
var FunctionType;
(function (FunctionType) {
    FunctionType[FunctionType["RESET"] = 1] = "RESET";
    FunctionType[FunctionType["ANSWER"] = 2] = "ANSWER";
    FunctionType[FunctionType["START"] = 3] = "START";
})(FunctionType || (FunctionType = {}));
var SwitchState = (function () {
    function SwitchState() {
    }
    SwitchState.switchFunctionType = function (functionType) {
        var emitName;
        switch (functionType) {
            case FunctionType.RESET:
                emitName = 'reset';
                break;
            case FunctionType.ANSWER:
                emitName = 'answer';
                break;
            case FunctionType.START:
                emitName = 'start';
                break;
        }
        return emitName;
    };
    return SwitchState;
}());
__reflect(SwitchState.prototype, "SwitchState");
