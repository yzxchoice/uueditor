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
var StyleSlideshow = (function (_super) {
    __extends(StyleSlideshow, _super);
    function StyleSlideshow(config, props) {
        var _this = _super.call(this, config, props) || this;
        // 表头字段
        _this.headData = ['图片'];
        // 用到的props属性
        _this.propsKey = 'awards';
        // 用到的props属性的value值（数组）中每一项obj中属性对应的组件
        _this.componenntTypeConfig = {
            url: 'eui.Button'
        };
        return _this;
    }
    return StyleSlideshow;
}(StyleEdit));
__reflect(StyleSlideshow.prototype, "StyleSlideshow");
