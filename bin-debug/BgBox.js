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
            // {
            //     id: "9104",
            //     name: "bg.jpg",
            //     url: "bg.jpg"
            // },
            // {
            //     id: "9105",
            //     name: "start_f_bg.png",
            //     url: "start_f_bg.png"
            // },
            // {
            //     id: "9106",
            //     name: "start_bg.png",
            //     url: "start_bg.png"
            // },
            {
                id: "9203",
                name: "bg1_jpg",
                url: "bg1.jpg"
            },
            {
                id: "9204",
                name: "bg2_jpg",
                url: "bg2.jpg"
            },
            {
                id: "9205",
                name: "bg3_jpg",
                url: "bg3.jpg"
            },
            {
                id: "9206",
                name: "bg4_jpg",
                url: "bg4.jpg"
            },
            {
                id: "9207",
                name: "bg5_jpg",
                url: "bg5.jpg"
            },
            {
                id: "9208",
                name: "bg6_jpg",
                url: "bg6.jpg"
            },
            {
                id: "9209",
                name: "bg7_jpg",
                url: "bg7.jpg"
            },
            {
                id: "9210",
                name: "bg8_jpg",
                url: "bg8.jpg"
            },
            {
                id: "9211",
                name: "bg9_jpg",
                url: "bg9.jpg"
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
            var image = new UUImage();
            image.source = "resource/assets/Background/" + this.imgList[i].url;
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
    BgBox.prototype.addImage = function (event) {
        console.log('addIamge...');
        console.log(event);
        console.log(event.currentTarget);
        var g = this.parent;
        // g.imgBox.close();
        // g.editGroup.addSinglePicture(event.currentTarget.source);
        // g.closeImagePanel();
        g.editGroup.changeBg(event.currentTarget.data);
    };
    BgBox.prototype.open = function (container) {
        container.addChild(this);
    };
    return BgBox;
}(eui.Panel));
__reflect(BgBox.prototype, "BgBox");
//# sourceMappingURL=BgBox.js.map