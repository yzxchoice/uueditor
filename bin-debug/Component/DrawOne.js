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
        _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.down, _this);
        return _this;
    }
    DrawOne.prototype.init = function () {
        var layout = LayoutFactory.main(LayoutType.VLayout, GapType.Big);
        layout.horizontalAlign = egret.HorizontalAlign.CENTER;
        this.layout = layout;
        var borderBox = this.createBorderBox();
        this.borderBox = borderBox;
        var imageBox = this.createImageBox();
        this.imageBox = imageBox;
        this.addChild(borderBox);
        this.addChild(imageBox);
        this.width = borderBox.width > imageBox.width ? borderBox.width + 10 * 2 : imageBox.width + 10 * 2;
        this.height = borderBox.height + imageBox.height + 10 * 2 + 30;
    };
    DrawOne.prototype.createBorderBox = function () {
        var group = new eui.Group();
        group.layout = LayoutFactory.main(LayoutType.HLayout, GapType.Middle);
        for (var i = 0, len = this.toAward.length; i < len; i++) {
            var img = UIFactory.createImage(this.toAward[i].url);
            img.name = this.toAward[i].id;
            img.width = 240;
            img.height = 240;
            var imgGroup = UIFactory.createGroup(img.width, img.height);
            imgGroup.addChild(img);
            group.addChild(imgGroup);
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
    DrawOne.prototype.down = function (evt) {
        var target = evt.target;
        var isDraw = target.isDraw;
        if (isDraw) {
            this.drawTarget = target;
            this.addEventListener(Mouse.MOVE, this.move, this);
            this.addEventListener(Mouse.END, this.up, this);
            var targetPoint = target.localToGlobal(0, 0);
            this.distanceX = evt.stageX - targetPoint.x;
            this.distanceY = evt.stageY - targetPoint.y;
        }
        evt.preventDefault();
    };
    DrawOne.prototype.move = function (evt) {
        var _this = this;
        var targetPoint = this.drawTarget.parent.globalToLocal(evt.stageX - this.distanceX, evt.stageY - this.distanceY);
        requestAnimationFrame(function () {
            _this.drawTarget.x = targetPoint.x;
            _this.drawTarget.y = targetPoint.y;
        });
        evt.preventDefault();
    };
    DrawOne.prototype.up = function (evt) {
        // drawTarget 舞台坐标
        var drawTargeGlobalX = evt.stageX - this.distanceX;
        var drawTargeGlobalY = evt.stageY - this.distanceY;
        // drawTarget中心的 舞台坐标
        var drawTargeGlobalCenterX = drawTargeGlobalX + this.drawTarget.width / 2;
        var drawTargeGlobalCenterY = drawTargeGlobalY + this.drawTarget.height / 2;
        // 遍历border对象进行碰撞检测
        for (var i = 0, len = this.borderBox.numChildren; i < len; i++) {
            var borderItem = this.borderBox.getChildAt(i);
            var isHit = borderItem.hitTestPoint(drawTargeGlobalCenterX, drawTargeGlobalCenterY);
            if (isHit) {
                // borderItem中心 相对坐标 相对于borderBox
                var borderItemCenterX = borderItem.x + borderItem.width / 2;
                var borderItemCenterY = borderItem.y + borderItem.height / 2;
                // drawTarget 相对于borderBox的坐标
                var drawTargetToX = borderItemCenterX - this.drawTarget.width / 2;
                var drawTargetToY = borderItemCenterY - this.drawTarget.height / 2;
                // drawTarget 舞台坐标
                var globalPoint = this.borderBox.localToGlobal(drawTargetToX, drawTargetToY);
                // drawTarget 相对于imageBox的坐标
                var localPoint = this.imageBox.globalToLocal(globalPoint.x, globalPoint.y);
                this.drawTarget.x = localPoint.x;
                this.drawTarget.y = localPoint.y;
                break;
            }
            console.log('isHit = ' + isHit);
        }
        this.removeEventListener(Mouse.MOVE, this.move, this);
        this.removeEventListener(Mouse.END, this.up, this);
        evt.preventDefault();
    };
    DrawOne.uuType = UUType.DRAW_ONE;
    return DrawOne;
}(eui.Group));
__reflect(DrawOne.prototype, "DrawOne");
