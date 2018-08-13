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
var BgBox = (function (_super) {
    __extends(BgBox, _super);
    function BgBox() {
        var _this = _super.call(this) || this;
        _this.imgList = [
            {
                id: "9003",
                name: "bg1.jpg"
            },
            {
                id: "9004",
                name: "bg2.jpg"
            },
            {
                id: "9005",
                name: "bg3.jpg"
            },
            {
                id: "9006",
                name: "bg4.jpg"
            },
            {
                id: "9007",
                name: "bg5.jpg"
            },
            {
                id: "9008",
                name: "bg6.jpg"
            },
            {
                id: "9009",
                name: "bg7.jpg"
            },
            {
                id: "9010",
                name: "bg8.jpg"
            },
            {
                id: "9011",
                name: "bg9.jpg"
            }
        ];
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    BgBox.getInstance = function (name) {
        if (!this.instance) {
            this.instance = new ImageBox();
        }
        return this.instance;
    };
    BgBox.prototype.onAddToStage = function (event) {
        this.init();
    };
    BgBox.prototype.init = function () {
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
            var image = new eui.Image();
            image.source = "resource/assets/Background/" + this.imgList[i].name;
            // image.scale9Grid = new egret.Rectangle(10,10,80,80);
            image.y = 50;
            image.x = 120 * i;
            image.width = 100;
            image.height = 100;
            // image.horizontalCenter = 0;
            image.name = this.imgList[i].id;
            // image.id = this.imgList[i].id;
            image.addEventListener(Mouse.START, this.addImage, this);
            this.addChild(image);
        }
    };
    BgBox.prototype.addImage = function (event) {
        console.log('addIamge...');
        console.log(event);
        console.log(event.currentTarget);
        var g = this.parent;
        // g.imgBox.close();
        // g.editGroup.addSinglePicture(event.currentTarget.source);
        // g.closeImagePanel();
        g.editGroup.changeBg(event.currentTarget.source, event.currentTarget.name);
    };
    BgBox.prototype.open = function (container) {
        container.addChild(this);
    };
    return BgBox;
}(eui.Panel));
__reflect(BgBox.prototype, "BgBox");
