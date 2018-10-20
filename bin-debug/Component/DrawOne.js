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
var DrawOneLayoutType;
(function (DrawOneLayoutType) {
    DrawOneLayoutType[DrawOneLayoutType["topToBottom"] = 1] = "topToBottom";
    DrawOneLayoutType[DrawOneLayoutType["BottomTo"] = 2] = "BottomTo";
    DrawOneLayoutType[DrawOneLayoutType["LeftToRight"] = 3] = "LeftToRight";
    DrawOneLayoutType[DrawOneLayoutType["RightToLeft"] = 4] = "RightToLeft";
})(DrawOneLayoutType || (DrawOneLayoutType = {}));
var DrawOne = (function (_super) {
    __extends(DrawOne, _super);
    function DrawOne(props) {
        var _this = _super.call(this) || this;
        // props
        _this.award = [];
        _this.toAward = [];
        _this.layoutType = 1;
        _this.award = props.award;
        _this.toAward = props.toAward;
        _this.init();
        return _this;
    }
    DrawOne.prototype.init = function () {
        var layout = LayoutFactory.main(LayoutType.VLayout, GapType.Big);
        layout.horizontalAlign = egret.HorizontalAlign.CENTER;
        this.layout = layout;
        this.addChild(this.createBorderBox());
        this.addChild(this.createImageBox());
        this.width = 800;
        this.height = 600;
    };
    DrawOne.prototype.createBorderBox = function () {
        var group = new eui.Group();
        group.layout = LayoutFactory.main(LayoutType.HLayout, GapType.Middle);
        for (var i = 0, len = this.toAward.length; i < len; i++) {
            var img = UIFactory.createImage(this.toAward[i].url);
            img.name = this.toAward[i].id;
            img.width = 240;
            img.height = 240;
            group.addChild(img);
        }
        var sizeObj = LayoutFactory.setGroupSize(this.toAward.length, 240, 240, LayoutType.HLayout, GapType.Big);
        group.width = sizeObj.width;
        group.height = sizeObj.height;
        return group;
    };
    DrawOne.prototype.createImageBox = function () {
        var sizeObj = LayoutFactory.setGroupSize(this.award.length, 240, 240, LayoutType.HLayout, GapType.Big);
        var group = UIFactory.createGroup(sizeObj.width, sizeObj.height);
        var imgArr = [];
        for (var i = 0, len = this.award.length; i < len; i++) {
            var img = new UUImage();
            img.isDraw = true;
            img.source = this.award[i].url;
            img.name = this.award[i].id;
            img.width = 240;
            img.height = 240;
            imgArr.push(img);
        }
        LayoutBaseFactory.main(group, imgArr, LayoutType.HLayout, GapType.Middle);
        return group;
    };
    DrawOne.uuType = UUType.DRAW_ONE;
    return DrawOne;
}(eui.Group));
__reflect(DrawOne.prototype, "DrawOne");
