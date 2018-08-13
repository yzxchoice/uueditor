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
var ImageBox = (function (_super) {
    __extends(ImageBox, _super);
    function ImageBox() {
        var _this = _super.call(this) || this;
        _this.imgList = [
            {
                id: "9001",
                name: "fatcap_png",
                url: "fatcap.png"
            },
            {
                id: "9002",
                name: "piggy_png",
                url: "piggy.png"
            },
            {
                id: "9002",
                name: "border_jpg",
                url: "border.jpg"
            }
        ];
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    ImageBox.getInstance = function (name) {
        if (!this.instance) {
            this.instance = new ImageBox();
        }
        return this.instance;
    };
    ImageBox.prototype.onAddToStage = function (event) {
        this.init();
    };
    ImageBox.prototype.init = function () {
        this.horizontalCenter = 0;
        this.verticalCenter = 0;
        this.width = 1200;
        this.height = 800;
        // var hLayout:eui.HorizontalLayout = new eui.HorizontalLayout();
        // hLayout.gap = 30;
        // hLayout.horizontalAlign = egret.HorizontalAlign.LEFT;
        // // hLayout.verticalAlign = egret.VerticalAlign.MIDDLE;
        // hLayout.paddingRight = 30;
        // hLayout.paddingLeft = 30;
        // hLayout.paddingTop = 30;
        // this.layout = hLayout;
        for (var i = 0; i < this.imgList.length; i++) {
            var image = new UUImage();
            image.source = "resource/assets/" + this.imgList[i].url;
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
    ImageBox.prototype.addImage = function (event) {
        var g = this.parent;
        // g.imgBox.close();
        g.editGroup.addSinglePicture(event.currentTarget.data);
        // g.closeImagePanel();
        // g.editGroup.changeBg(event.currentTarget.source);
    };
    ImageBox.prototype.open = function (container) {
        container.addChild(this);
    };
    return ImageBox;
}(eui.Panel));
__reflect(ImageBox.prototype, "ImageBox");
//# sourceMappingURL=ImageBox.js.map