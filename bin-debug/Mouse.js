var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Mouse = (function () {
    function Mouse() {
        throw new Error('can not create a instance');
    }
    Mouse.get = function (event, elem) {
        if (!elem) {
            elem = event.currentTarget;
        }
        // if (event.touches){
        //     if (event.touches.length){
        //         Mouse.x = parseInt(event.touches[0].pageX);
        //         Mouse.y = parseInt(event.touches[0].pageY);
        //     }
        // }else{
        //     // mouse events
        //     Mouse.x = parseInt(event.clientX);
        //     Mouse.y = parseInt(event.clientY);
        // }
        // console.log(event.stageX,event.stageY);
        // console.log(event.localX,event.localY);
        var targetPoint = elem.globalToLocal(event.stageX, event.stageY);
        Mouse.x = targetPoint.x;
        Mouse.y = targetPoint.y;
        // console.log(Mouse.x,Mouse.y);
        // var rect = elem.getBoundingClientRect();
        // Mouse.x += elem.scrollLeft - elem.clientLeft - rect.left;
        // Mouse.y += elem.scrollTop - elem.clientTop - rect.top;
        return Mouse;
    };
    Mouse.x = 0;
    Mouse.y = 0;
    Mouse.START = "touchBegin";
    Mouse.MOVE = "touchMove";
    Mouse.END = "touchEnd";
    return Mouse;
}());
__reflect(Mouse.prototype, "Mouse");
//# sourceMappingURL=Mouse.js.map