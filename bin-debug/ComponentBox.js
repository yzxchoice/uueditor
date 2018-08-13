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
// TypeScript file
var ComponentBox = (function (_super) {
    __extends(ComponentBox, _super);
    function ComponentBox() {
        var _this = _super.call(this) || this;
        _this.imgList = [
            {
                id: "10003",
                name: "circle.png"
            }
        ];
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    ComponentBox.getInstance = function (name) {
        if (!this.instance) {
            this.instance = new ImageBox();
        }
        return this.instance;
    };
    ComponentBox.prototype.onAddToStage = function (event) {
        this.init();
    };
    ComponentBox.prototype.init = function () {
        this.horizontalCenter = 0;
        this.verticalCenter = 0;
        this.width = 1200;
        this.height = 800;
        for (var i = 0; i < this.imgList.length; i++) {
            var image = new UUImage();
            image.source = "resource/assets/" + this.imgList[i].name;
            console.log(image.source);
            // image.scale9Grid = new egret.Rectangle(10,10,80,80);
            image.y = 50;
            image.x = 120 * i;
            image.width = 100;
            image.height = 100;
            image.name = this.imgList[i].id;
            image.data = this.imgList[i];
            image.addEventListener(Mouse.START, this.addImage, this);
            this.addChild(image);
        }
    };
    ComponentBox.prototype.addImage = function (event) {
        var g = this.parent;
        g.editGroup.addComponent(event.currentTarget.data);
    };
    ComponentBox.prototype.open = function (container) {
        container.addChild(this);
    };
    return ComponentBox;
}(eui.Panel));
__reflect(ComponentBox.prototype, "ComponentBox");
//# sourceMappingURL=ComponentBox.js.map