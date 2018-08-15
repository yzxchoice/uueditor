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
var FrameBox = (function (_super) {
    __extends(FrameBox, _super);
    function FrameBox() {
        var _this = _super.call(this) || this;
        _this.imgList = [
            {
                id: "9901",
                name: "post_item_34_png",
                url: "post_item_34.png"
            }
        ];
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    FrameBox.getInstance = function (name) {
        if (!this.instance) {
            this.instance = new ImageBox();
        }
        return this.instance;
    };
    FrameBox.prototype.onAddToStage = function (event) {
        this.init();
    };
    FrameBox.prototype.init = function () {
        this.horizontalCenter = 0;
        this.verticalCenter = 0;
        this.width = 1200;
        this.height = 800;
        /// 创建容器，在其中进行布局
        this._grpLayout = new eui.Group();
        this._grpLayout.horizontalCenter = 0;
        this._grpLayout.verticalCenter = 0;
        this.addChild(this._grpLayout);
        this._grpLayout.width = this.width;
        this._grpLayout.height = this.height - 50;
        var tLayout = new eui.TileLayout();
        tLayout.paddingTop = 30;
        tLayout.paddingLeft = 30;
        tLayout.paddingRight = 30;
        tLayout.paddingBottom = 30;
        this._grpLayout.layout = tLayout;
        for (var i = 0; i < this.imgList.length; i++) {
            var borderGroup = new eui.Group();
            borderGroup.width = 100;
            borderGroup.height = 100;
            this._grpLayout.addChild(borderGroup);
            var bg = new egret.Shape;
            bg.graphics.lineStyle(1, 0x999999);
            bg.graphics.beginFill(0xffffff, 1);
            bg.graphics.drawRect(0, 0, borderGroup.width, borderGroup.height);
            bg.graphics.endFill();
            borderGroup.addChild(bg);
            var image = new UUImage();
            image.source = "resource/assets/Pic/" + this.imgList[i].url;
            image.width = 100;
            image.height = 100;
            image.name = this.imgList[i].id;
            image.data = this.imgList[i];
            image.addEventListener(Mouse.START, this.addImage, this);
            borderGroup.addChild(image);
        }
    };
    FrameBox.prototype.addImage = function (event) {
        var g = this.parent;
        // g.imgBox.close();
        g.editGroup.addFrame(event.currentTarget.data);
        // g.closeImagePanel();
        // g.editGroup.changeBg(event.currentTarget.source);
    };
    FrameBox.prototype.open = function (container) {
        container.addChild(this);
    };
    return FrameBox;
}(eui.Panel));
__reflect(FrameBox.prototype, "FrameBox");
//# sourceMappingURL=FrameBox.js.map