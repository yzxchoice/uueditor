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
                id: "8001",
                name: "post_item_34_png",
                url: "post_item_34.png"
            },
            {
                id: "8002",
                name: "post_item_35_png",
                url: "post_item_35.png"
            },
            {
                id: "8003",
                name: "post_item_36_png",
                url: "post_item_36.png"
            },
            {
                id: "8004",
                name: "post_item_37_png",
                url: "post_item_37.png"
            },
            {
                id: "8005",
                name: "post_item_38_png",
                url: "post_item_38.png"
            },
            {
                id: "8006",
                name: "post_item_39_png",
                url: "post_item_39.png"
            },
            {
                id: "8007",
                name: "post_item_41_png",
                url: "post_item_41.png"
            },
            {
                id: "8008",
                name: "post_item_42_png",
                url: "post_item_42.png"
            },
            {
                id: "8009",
                name: "post_item_43_png",
                url: "post_item_43.png"
            },
            {
                id: "8010",
                name: "post_item_44_png",
                url: "post_item_44.png"
            },
            {
                id: "8011",
                name: "post_item_45_png",
                url: "post_item_45.png"
            },
            {
                id: "8012",
                name: "post_item_46_png",
                url: "post_item_46.png"
            },
            {
                id: "8013",
                name: "post_item_1_png",
                url: "post_item_1.png"
            },
            {
                id: "8014",
                name: "post_item_2_png",
                url: "post_item_2.png"
            },
            {
                id: "8015",
                name: "post_item_3_png",
                url: "post_item_3.png"
            },
            {
                id: "8016",
                name: "post_item_4_png",
                url: "post_item_4.png"
            },
            {
                id: "8017",
                name: "post_item_5_png",
                url: "post_item_5.png"
            },
            {
                id: "8018",
                name: "post_item_6_png",
                url: "post_item_6.png"
            },
            {
                id: "8019",
                name: "post_item_7_png",
                url: "post_item_7.png"
            },
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
            image.source = "resource/assets/Pic/" + this.imgList[i].url;
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