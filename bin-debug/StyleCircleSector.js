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
var StyleCircleSector = (function (_super) {
    __extends(StyleCircleSector, _super);
    function StyleCircleSector(config, props) {
        var _this = _super.call(this) || this;
        _this.config = config;
        _this.props = props;
        _this.inputType = config.type;
        _this.stateObj = {
            title: config.title,
            content: props[_this.inputType]
        };
        _this.initdata = props.list;
        // 表头字段
        _this.headData = ['文本', '图片'];
        _this.data = _this.exchangeInitdata(_this.initdata);
        _this.skinName = 'resource/skins/StyleCircleSectorSkin.exml';
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    StyleCircleSector.prototype.onAddToStage = function () {
        this.initEvent();
    };
    StyleCircleSector.prototype.initEvent = function () {
        this.lb_edit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    StyleCircleSector.prototype.onClick = function () {
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
    StyleCircleSector.prototype.exchangeInitdata = function (initdata) {
        var arr = [];
        var _loop_1 = function (i, len) {
            var newObj = {};
            var obj = initdata[i];
            Object.keys(obj).forEach(function (key) {
                if (key == 'text') {
                    newObj[key] = {
                        value: obj[key],
                        componentType: ''
                    };
                }
                else if (key == 'url') {
                    newObj[key] = {
                        value: obj[key],
                        componentType: 'eui.Button',
                    };
                }
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
    StyleCircleSector.prototype.exchangeData = function () {
        console.log('exchangeData...');
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
        console.log(arr);
        this.initdata = this.props.list = arr;
    };
    return StyleCircleSector;
}(eui.Component));
__reflect(StyleCircleSector.prototype, "StyleCircleSector");
