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
var Table = (function (_super) {
    __extends(Table, _super);
    function Table(headDate, data) {
        var _this = _super.call(this) || this;
        _this.isShow = false;
        _this.lineHeight = 40;
        _this.boxWidth = 500;
        _this.headData = headDate;
        _this.data = data;
        _this._data = JSON.parse(JSON.stringify(_this.data));
        _this.observer(_this.data);
        _this.columnNum = _this.headData.length;
        _this.rowNum = _this.data.length + 1;
        // this.skinName = 'resource/skins/TableSkin.exml';
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Table.prototype.onAddToStage = function () {
        this.init();
        this.initEvent();
    };
    Table.prototype.init = function () {
        this.removeChildren();
        this.gp_box = new eui.Group();
        var tLayout = new eui.TileLayout();
        this.gp_box.layout = this.createTileLayout(1);
        this.reload();
        var vLayout = new eui.VerticalLayout();
        this.layout = vLayout;
        this.addChild(this.gp_box);
        this.addChild(this.createBtnBox());
    };
    Table.prototype.reload = function () {
        this.gp_box.removeChildren();
        this.gp_box.addChild(this.createHead());
        for (var i = 0, len = this.data.length; i < len; i++) {
            var obj = this.data[i];
            this.gp_box.addChild(this.createRow(obj, i));
        }
    };
    Table.prototype.initEvent = function () {
        this.btn_add.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_add_click, this);
        this.btn_del.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_del_click, this);
        this.btn_sure.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_sure_click, this);
    };
    Table.prototype.btn_add_click = function () {
        console.log('add...');
        var item = this.data[this.data.length - 1];
        this.data.push(JSON.parse(JSON.stringify(item)));
        this._data = JSON.parse(JSON.stringify(this.data));
        this.observer(this.data);
        this.reload();
        this.deliverMessage();
    };
    Table.prototype.btn_del_click = function (evt) {
        console.log('del...');
        try {
            this.gp_box.removeChild(this.activeRow);
            this.data.splice(this.activeIndex, 1);
            this.deliverMessage();
        }
        catch (e) {
            console.log(e);
        }
    };
    Table.prototype.btn_sure_click = function () {
        console.log('sure...');
        console.log(this.data);
        this.deliverMessage();
    };
    Table.prototype.createHead = function () {
        var group = new eui.Group;
        group.layout = this.createTileLayout(this.columnNum);
        for (var _i = 0, _a = this.headData; _i < _a.length; _i++) {
            var value = _a[_i];
            group.addChild(this.createTh(value));
        }
        return group;
    };
    Table.prototype.createRow = function (obj, index) {
        console.log('index = ' + index);
        var group = new eui.Group;
        group.name = index.toString();
        group.layout = this.createTileLayout(this.columnNum);
        for (var key in obj) {
            var td = this.createTd(key, obj[key]);
            group.addChild(td);
        }
        ;
        return group;
    };
    Table.prototype.createTh = function (value) {
        var group = new eui.Group();
        var input;
        input = new eui.Label();
        input.textAlign = 'center';
        input.textColor = 0x00000;
        input.size = 26;
        input.text = value;
        input.verticalAlign = 'middle';
        group.addChild(input);
        input.width = this.boxWidth / this.columnNum;
        input.height = this.lineHeight;
        return group;
    };
    Table.prototype.createTd = function (key, value) {
        var group = new eui.Group();
        var com = value.componentType ? eval(value.componentType) : eui.EditableText;
        var input;
        switch (com) {
            case eui.EditableText:
                input = new com();
                input.name = key;
                input.background = true;
                input.backgroundColor = 0xffffff;
                input.addEventListener(egret.FocusEvent.FOCUS_IN, this.onFocusIn, this);
                input.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onFocusOut, this);
                input.textColor = 0x00000;
                input.size = 26;
                input.text = value.value;
                input.verticalAlign = 'middle';
                break;
            case Select:
                var itemWidth = this.boxWidth / this.columnNum;
                input = new com(value.selectData, itemWidth);
                input.setDefaultItem(value.value);
                var callback = function (selectedVal) {
                    value.value = selectedVal;
                };
                input.listenSelectChange(callback);
                break;
            case eui.Button:
                input = new com();
                input.label = value.value;
                break;
        }
        group.addChild(input);
        input.width = this.boxWidth / this.columnNum;
        input.height = this.lineHeight;
        return group;
    };
    Table.prototype.draw = function (container) {
        this.container = container;
        this.container.addChild(this);
        this.isShow = true;
    };
    Table.prototype.undraw = function () {
        this.container.removeChild(this);
        this.isShow = false;
    };
    Table.prototype.listenChange = function (cb) {
        this.cb = cb;
    };
    Table.prototype.createTileLayout = function (columnCount) {
        var tLayout = new eui.TileLayout();
        tLayout.horizontalGap = 10;
        tLayout.verticalGap = 10;
        tLayout.columnAlign = eui.ColumnAlign.JUSTIFY_USING_WIDTH;
        tLayout.rowAlign = eui.RowAlign.JUSTIFY_USING_HEIGHT;
        tLayout.requestedColumnCount = columnCount; /// 设置两列显示
        return tLayout;
    };
    Table.prototype.createBtnBox = function () {
        var group = new eui.Group();
        group.width = this.boxWidth;
        var hlayout = new eui.HorizontalLayout();
        hlayout.verticalAlign = 'middle';
        hlayout.horizontalAlign = 'center';
        hlayout.gap = 40;
        group.layout = hlayout;
        this.btn_add = this.createBtn('添加');
        this.btn_del = this.createBtn('删除');
        this.btn_sure = this.createBtn('确定');
        group.addChild(this.btn_add);
        group.addChild(this.btn_del);
        group.addChild(this.btn_sure);
        return group;
    };
    Table.prototype.createBtn = function (content) {
        var btn = new eui.Button();
        btn.height = 40;
        btn.width = 80;
        btn.label = content;
        return btn;
    };
    Table.prototype.onFocusIn = function (evt) {
        console.log('onFocusIn...');
        var target = evt.target;
        var row = target.parent.parent;
        this.activeRow = row;
        this.activeIndex = Number(row.name);
        console.log(target);
        console.log(row);
    };
    Table.prototype.onFocusOut = function (evt) {
        console.log('onFocusOut...');
        var target = evt.target;
        var key = target.name;
        var text = target.text;
        console.log(target);
        console.log(name);
        this.data[this.activeIndex][key].value = text;
    };
    // 对props进行双向数据绑定
    Table.prototype.observer = function (data) {
        var _this = this;
        data.forEach(function (outObj, index) { return Object.keys(outObj).forEach(function (key) {
            var innerObj = outObj[key];
            Object.keys(innerObj).forEach(function (innerKey) {
                if (innerKey == 'value') {
                    Object.defineProperty(innerObj, innerKey, {
                        enumerable: true,
                        configurable: true,
                        get: function () {
                            return _this._data[index][key].value;
                        },
                        set: function (newValue) {
                            if (newValue === _this._data[index][key].value)
                                return;
                            _this._data[index][key].value = newValue;
                            console.log('props key is change');
                            _this.deliverMessage();
                        }
                    });
                }
            });
        }); });
    };
    ;
    // 将数据改变这一信息传递给外部组件
    Table.prototype.deliverMessage = function () {
        this.cb && this.cb();
    };
    return Table;
}(eui.Group));
__reflect(Table.prototype, "Table");
//# sourceMappingURL=Table.js.map