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
var StyleEditBae = (function (_super) {
    __extends(StyleEditBae, _super);
    function StyleEditBae(config, props) {
        var _this = _super.call(this) || this;
        _this.siderbar = Siderbar.getInstance();
        _this.image = _this.siderbar.tool.target.owner.image;
        _this.config = config;
        _this.props = props;
        _this.stateObj = {
            title: config.title,
            content: props[config.type]
        };
        _this.skinName = 'resource/skins/StyleCircleSectorSkin.exml';
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    StyleEditBae.prototype.onAddToStage = function () {
        this.initEvent();
        this.initdata = this.image.getProps()[this.propsKey];
        this.data = this.exchangeInitdata(this.initdata);
    };
    StyleEditBae.prototype.initEvent = function () {
        this.lb_edit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    StyleEditBae.prototype.onClick = function () {
        if (!this.table || !this.table.isShow) {
            var table = new Table(this.headData, this.data);
            table.listenChange(this.exchangeData.bind(this));
            table.draw(this);
            table.x = 0;
            table.y = 60;
            this.table = table;
        }
        else {
            this.table.undraw();
        }
    };
    // 将data.json数据转换成Tabel需要的数据
    StyleEditBae.prototype.exchangeInitdata = function (initdata) {
        var componenntTypeConfig = this.componenntTypeConfig;
        var arr = [];
        var _loop_1 = function (i, len) {
            var newObj = {};
            var obj = initdata[i];
            Object.keys(obj).forEach(function (key) {
                newObj[key] = {
                    value: obj[key],
                    componentType: componenntTypeConfig[key]
                };
            });
            arr.push(newObj);
        };
        for (var i = 0, len = initdata.length; i < len; i++) {
            _loop_1(i, len);
        }
        ;
        return arr;
    };
    // 将Tabel需要的数据转换成data.json数据
    StyleEditBae.prototype.exchangeData = function () {
        var arr = [];
        var _loop_2 = function (i, len) {
            var newObj = {};
            var obj = this_1.data[i];
            Object.keys(obj).forEach(function (key) {
                newObj[key] = obj[key].value;
            });
            arr.push(newObj);
        };
        var this_1 = this;
        for (var i = 0, len = this.data.length; i < len; i++) {
            _loop_2(i, len);
        }
        ;
        // 改变initdata的同时改变data.json中props中的对应属性
        this.initdata = this.props[this.propsKey] = arr;
        var props = this.image.getProps();
        props[this.propsKey] = arr;
        this.image.setProps(props);
        this.image.redraw();
    };
    return StyleEditBae;
}(eui.Component));
__reflect(StyleEditBae.prototype, "StyleEditBae");
//# sourceMappingURL=StyleEditBae.js.map