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
var DragBorderBox = (function (_super) {
    __extends(DragBorderBox, _super);
    function DragBorderBox(props) {
        var _this = _super.call(this) || this;
        // props
        _this.toAward = []; // 框图片列表
        _this.layoutType = 1; // 布局方式
        _this.gap = GapType.Middle;
        _this.columnCount = 3;
        if (props.layoutSet.layoutType) {
            _this.layoutType = props.layoutSet.layoutType;
        }
        if (props.layoutSet.gap) {
            _this.gap = props.layoutSet.gap;
        }
        if (props.layoutSet.columnCount) {
            _this.columnCount = props.layoutSet.columnCount;
        }
        _this.toAward = props.toAward;
        _this.init();
        return _this;
    }
    DragBorderBox.prototype.init = function () {
        this.layout = LayoutFactory.main(this.layoutType, this.gap, this.columnCount);
        var size = LayoutFactory.setGroupSize(this.toAward.length, 240, 240, this.layoutType, this.gap, this.columnCount);
        this.width = size.width;
        this.height = size.height;
        this.createBorderBox();
    };
    DragBorderBox.prototype.createBorderBox = function () {
        for (var i = 0, len = this.toAward.length; i < len; i++) {
            var img = UIFactory.createImage(this.toAward[i].url);
            img.width = 240;
            img.height = 240;
            var imgGroup = UIFactory.createGroup(img.width, img.height);
            imgGroup.name = this.toAward[i].id.toString();
            imgGroup.addChild(img);
            this.addChild(imgGroup);
        }
    };
    DragBorderBox.uuType = UUType.DRAG_BORDER_BOX;
    return DragBorderBox;
}(eui.Group));
__reflect(DragBorderBox.prototype, "DragBorderBox");
