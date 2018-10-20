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
var SelectImage = (function (_super) {
    __extends(SelectImage, _super);
    function SelectImage(props) {
        var _this = _super.call(this) || this;
        // props
        _this.award = [];
        // props layout
        _this.layoutType = LayoutType.HLayout;
        _this.gap = GapType.Small;
        // award changeData
        _this.awardChangeData = [];
        // item data 
        _this.itemHeight = 220;
        _this.itemWidth = 150;
        _this.radioWidth = 50;
        _this.radioHeight = 50;
        console.log('selectImg...');
        _this.award = props.award;
        _this.notSelectState = props.notSelectState;
        _this.selectState = props.selectState;
        if (props.layoutSet.layoutType) {
            _this.layoutType = props.layoutSet.layoutType;
        }
        if (props.layoutSet.gap) {
            _this.gap = props.layoutSet.gap;
        }
        if (props.layoutSet.columnCount) {
            _this.columnCount = props.layoutSet.columnCount;
        }
        _this.touchEnabled = false;
        _this.init();
        return _this;
    }
    SelectImage.prototype.init = function () {
        this.changeAward();
        this.addChild(this.createMian());
        this.setGroupSize();
    };
    SelectImage.prototype.changeAward = function () {
        this.awardChangeData = this.award.slice();
        for (var i = 0, len = this.awardChangeData.length; i < len; i++) {
            this.awardChangeData[i].isSelected = false;
        }
    };
    SelectImage.prototype.createMian = function () {
        var group = UIFactory.createGroup(720, 360);
        group.layout = this.createLayout();
        for (var i = 0, len = this.awardChangeData.length; i < len; i++) {
            var item = this.createItem(this.awardChangeData[i].url, this.awardChangeData[i].isSelected);
            item.name = i.toString();
            group.addChild(item);
        }
        return group;
    };
    SelectImage.prototype.createItem = function (imgUrl, isSelected) {
        var group = UIFactory.createGroup(this.itemWidth, this.itemHeight);
        var img = UIFactory.createImage(imgUrl, this.itemWidth, this.itemWidth);
        img.horizontalCenter = 0;
        img.top = 0;
        var radio = this.createRadio(isSelected);
        radio.horizontalCenter = 0;
        radio.bottom = 0;
        group.addChild(img);
        group.addChild(radio);
        group.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectItem, this);
        return group;
    };
    SelectImage.prototype.createRadio = function (isSelected) {
        var radioImage;
        if (isSelected) {
            radioImage = UIFactory.createImage(this.selectState, this.radioWidth, this.radioHeight);
        }
        else {
            radioImage = UIFactory.createImage(this.notSelectState, this.radioWidth, this.radioHeight);
        }
        return radioImage;
    };
    SelectImage.prototype.createLayout = function () {
        return LayoutFactory.main(this.layoutType, this.gap, this.columnCount);
    };
    SelectImage.prototype.setGroupSize = function () {
        var obj = LayoutFactory.setGroupSize(this.award.length, this.itemWidth, this.itemHeight, this.layoutType, this.gap, this.columnCount);
        this.width = obj.width;
        this.height = obj.height;
    };
    SelectImage.prototype.selectItem = function (evt) {
        console.log(evt.currentTarget);
        var item = evt.currentTarget;
        var index = Number(item.name);
        this.awardChangeData.forEach(function (item) { return item.isSelected = false; });
        this.awardChangeData[index].isSelected = true;
        this.removeChildren();
        this.addChild(this.createMian());
    };
    SelectImage.uuType = UUType.SELECT_IMAGE;
    return SelectImage;
}(eui.Group));
__reflect(SelectImage.prototype, "SelectImage");
