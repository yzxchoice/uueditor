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
var ActionBox = (function (_super) {
    __extends(ActionBox, _super);
    function ActionBox() {
        var _this = _super.call(this) || this;
        _this.imgList = [
            {
                id: "10003",
                name: "timg.jpg"
            }
        ];
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    ActionBox.prototype.dispose = function () {
    };
    ActionBox.prototype.draw = function (container) {
        this.container = container;
        this.container.addChild(this);
    };
    ActionBox.getInstance = function (name) {
        if (!this.instance) {
            this.instance = new ImageBox();
        }
        return this.instance;
    };
    ActionBox.prototype.onAddToStage = function (event) {
        this.init();
    };
    ActionBox.prototype.init = function () {
        this.horizontalCenter = 0;
        this.verticalCenter = 0;
        this.width = 1200;
        this.height = 800;
        for (var i = 0; i < this.imgList.length; i++) {
            var image = new UUImage();
            image.source = "resource/assets/" + this.imgList[i].name;
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
    ActionBox.prototype.addImage = function (event) {
        this.container.editGroup.addComponent(event.currentTarget.data);
    };
    ActionBox.prototype.open = function (container) {
        container.addChild(this);
    };
    return ActionBox;
}(eui.Panel));
<<<<<<< HEAD
__reflect(ActionBox.prototype, "ActionBox", ["IUUContainer"]);
//# sourceMappingURL=ActionBox.js.map
=======
__reflect(ActionBox.prototype, "ActionBox");
>>>>>>> 1708809f742427bf89cebd4f370dab3ad76c0c57
