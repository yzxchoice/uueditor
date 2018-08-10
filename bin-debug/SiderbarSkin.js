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
var SiderbarSkinBy = (function (_super) {
    __extends(SiderbarSkinBy, _super);
    function SiderbarSkinBy() {
        var _this = _super.call(this) || this;
        _this.color_AEEEEE = 0xAEEEEE;
        _this.color_000000 = 0x000000;
        _this._selectionVisible = false;
        _this.relevanceItemIdList = [];
        _this._relevanceItemIdObj = {};
        _this.defaultRelevanceItem = {
            "delay": 100,
            "eventType": 1,
            "sourceId": 8405,
            "sourceType": "e",
            "targetId": 8405,
            "targetState": 1,
            "targetType": "e"
        };
        _this.data = {
            width: 30,
            height: 30,
            x: 30,
            y: 30,
            rotate: 10,
        };
        _this.isFirstSelect = true;
        _this.skinName = "resource/skins/SiderbarSkin.exml";
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStageInit, _this);
        return _this;
    }
    SiderbarSkinBy.prototype.dispose = function () {
    };
    SiderbarSkinBy.prototype.draw = function (container) {
        this.container = container;
        this.container.addChild(this);
    };
    Object.defineProperty(SiderbarSkinBy.prototype, "selectionVisible", {
        get: function () {
            return this._selectionVisible;
        },
        set: function (v) {
            this._selectionVisible = v;
            this.gp_selection_box.visible = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SiderbarSkinBy.prototype, "targetItemId", {
        get: function () {
            return this._targetItemId;
        },
        set: function (v) {
            this._targetItemId = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SiderbarSkinBy.prototype, "triggerGroup", {
        get: function () {
            return this._triggerGroup;
        },
        set: function (v) {
            var _this = this;
            console.log('set triggerGroup...');
            console.log(v);
            this._triggerGroup = v;
            var triggerGroupFilter = v.filter(function (item) { return item.sourceId == _this.targetItemId; });
            this.relevanceItemIdList = triggerGroupFilter.map(function (item) { return item.targetId; });
            var obj = {};
            for (var i = 0, len = triggerGroupFilter.length; i < len; i++) {
                var item = triggerGroupFilter[i];
                obj[item.targetId] = item;
            }
            ;
            this.relevanceItemIdObj = obj;
            this.initShowEventSetList();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SiderbarSkinBy.prototype, "relevanceItemIdObj", {
        get: function () {
            return this._relevanceItemIdObj;
        },
        // 增/删/改 之后 relevanceItemIdObj = relevanceItemIdObj 从而触发set
        set: function (v) {
            this._relevanceItemIdObj = v;
            console.log('setter relevanceItemIdObj...');
            console.log(v);
        },
        enumerable: true,
        configurable: true
    });
    SiderbarSkinBy.getInstance = function () {
        if (SiderbarSkinBy._instance == null) {
            SiderbarSkinBy._instance = new SiderbarSkinBy();
        }
        ;
        return SiderbarSkinBy._instance;
    };
    Object.defineProperty(SiderbarSkinBy.prototype, "tabIndex", {
        get: function () {
            return this._tabIndex;
        },
        set: function (v) {
            this._tabIndex = v;
            this.changeTabIndex(v);
            this.gp_container_addEvent.visible = false;
        },
        enumerable: true,
        configurable: true
    });
    SiderbarSkinBy.prototype.onAddToStageInit = function (event) {
        this.init();
    };
    SiderbarSkinBy.prototype.init = function () {
        // 启用舞台的鼠标支持
        // 开启监听鼠标的移动事件
        mouse.enable(this.stage);
        mouse.setMouseMoveEnabled(true);
        var vLayout = new eui.VerticalLayout();
        vLayout.paddingTop = 5;
        this.gp_eventSetContainer.layout = vLayout;
        var vLayout2 = new eui.VerticalLayout();
        vLayout2.gap = 0;
        vLayout2.paddingTop = 5;
        this.gp_selection.layout = vLayout2;
        this.listenEvent();
        this.tabIndex = 2;
    };
    SiderbarSkinBy.prototype.listenEvent = function () {
        // 监听tabs click事件
        this.gp_tabs.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTabsClick, this);
        this.btn_add_event.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchAddEvent, this);
        this.gp_add_click_event.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addClickEventItem, this);
        this.gp_selection_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchSelection2, this);
        for (var i = 0, len = this.gp_inputContainer.numChildren; i < len; i++) {
            var groupInpput = this.gp_inputContainer.getChildAt(i);
            var input = groupInpput.getChildAt(1);
            input.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onFocusOut, this);
        }
    };
    SiderbarSkinBy.prototype.touchTabsClick = function (evt) {
        var point = new egret.Point(evt.stageX - this.x - 0, evt.stageY - this.y - 60);
        for (var i = 0, len = this.gp_tabs.numChildren; i < len; i++) {
            var tab = this.gp_tabs.getChildAt(i);
            var rect = new egret.Rectangle(tab.x, tab.y, tab.width, tab.height);
            if (rect.containsPoint(point)) {
                console.log(tab);
                console.log(i);
                this.tabIndex = i;
                break;
            }
        }
    };
    SiderbarSkinBy.prototype.touchAddEvent = function (evt) {
        this.gp_container_addEvent.visible = true;
        this.gp_container_addEvent.anchorOffsetX = -this.width;
        egret.Tween.get(this.gp_container_addEvent)
            .to({ "anchorOffsetX": 0 }, 300);
    };
    SiderbarSkinBy.prototype.addClickEventItem = function (evt) {
        var _this = this;
        this.gp_eventContainer_event_click.visible = true;
        egret.Tween.get(this.gp_container_addEvent)
            .to({ "anchorOffsetX": -this.width }, 300)
            .call(function () {
            _this.gp_container_addEvent.visible = false;
        });
    };
    // tab 触发 功能
    SiderbarSkinBy.prototype.touchSelection2 = function () {
        var _this = this;
        if (!this.targetItemId)
            return;
        this.selectionVisible = !this.selectionVisible;
        if (this.selectionVisible) {
            this.gp_selection.removeChildren();
            var g = this.parent;
            var disPlayList = g.editGroup.displayList;
            var _loop_1 = function (j, num) {
                var displayItemData = disPlayList[j].image.data;
                var relevanceItemId = displayItemData.id;
                var checkBoxGroup = new CheckItem(relevanceItemId);
                checkBoxGroup.addEventListener(egret.Event.ADDED_TO_STAGE, function () {
                    var isSelected = _this.relevanceItemIdList.indexOf(relevanceItemId) == -1 ? false : true;
                    checkBoxGroup.isSelected = isSelected;
                }, this_1);
                this_1.gp_selection.addChild(checkBoxGroup);
            };
            var this_1 = this;
            for (var j = 0, num = disPlayList.length; j < num; j++) {
                _loop_1(j, num);
            }
            if (!this.isFirstSelect) {
                return;
            }
            this.isFirstSelect = false;
            this.gp_selection.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.onMouseover_Selection, this);
            this.gp_selection.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_Selection, this);
        }
        ;
    };
    SiderbarSkinBy.prototype.onMouseover_Selection = function (evt) {
        for (var i = 0, len = this.gp_selection.numChildren; i < len; i++) {
            var item = this.gp_selection.getChildAt(i);
            item.isOver = false;
        }
        ;
        evt.target.parent.isOver = true;
    };
    SiderbarSkinBy.prototype.onClick_Selection = function (evt) {
        var checkoutBox = evt.target;
        var checkItem = evt.target.parent;
        var selected = checkoutBox.selected;
        if (selected === undefined)
            return;
        var relevanceItemId = checkItem.labelText;
        var eventSetMessage = this.relevanceItemIdObj[relevanceItemId];
        if (!eventSetMessage) {
            this.relevanceItemIdObj[relevanceItemId] = JSON.parse(JSON.stringify(this.defaultRelevanceItem));
            this.relevanceItemIdObj[relevanceItemId].sourceId = this.targetItemId;
            this.relevanceItemIdObj[relevanceItemId].targetId = relevanceItemId;
            this.relevanceItemIdObj = this.relevanceItemIdObj;
            eventSetMessage = this.relevanceItemIdObj[relevanceItemId];
        }
        if (selected) {
            this.pushEventSet(eventSetMessage);
            this.relevanceItemIdList.push(relevanceItemId);
        }
        else {
            this.removeEventSet(eventSetMessage);
        }
    };
    SiderbarSkinBy.prototype.drawEventSet = function (eventSetMessage) {
        var eventSet = new EventSetDome();
        eventSet.name = eventSetMessage.targetId;
        eventSet.data = eventSetMessage;
        eventSet.isShow = eventSetMessage.targetState == 1 ? true : false;
        eventSet.draw(this.gp_eventSetContainer);
        return eventSet;
    };
    SiderbarSkinBy.prototype.pushEventSet = function (eventSetMessage) {
        var eventSet = this.drawEventSet(eventSetMessage);
        eventSet.pushData();
    };
    SiderbarSkinBy.prototype.removeEventSet = function (eventSetMessage) {
        var relevanceItemId = eventSetMessage.targetId;
        console.log('relevanceItemId = ' + relevanceItemId);
        var eventSet = this.gp_eventSetContainer.getChildByName(relevanceItemId);
        this.gp_eventSetContainer.removeChild(eventSet);
        eventSet.dispose();
        this.relevanceItemIdList.splice(this.relevanceItemIdList.indexOf(relevanceItemId), 1);
    };
    SiderbarSkinBy.prototype.initShowEventSetList = function () {
        this.gp_eventSetContainer.removeChildren();
        var g = this.parent;
        var disPlayList = g.editGroup.displayList;
        for (var j = 0, num = disPlayList.length; j < num; j++) {
            var relevanceItemId = disPlayList[j].image.data.id;
            var isSelected = this.relevanceItemIdList.indexOf(relevanceItemId) == -1 ? false : true;
            if (isSelected) {
                var eventSetMessage = this.relevanceItemIdObj[relevanceItemId];
                this.drawEventSet(eventSetMessage);
            }
        }
    };
    SiderbarSkinBy.prototype.onFocusOut = function (evt) {
        console.log(evt.target.id);
        var textInput = evt.target.parent;
        var name = textInput.name;
        var propertyName = name.split('_')[1];
        this.data[propertyName] = Number(evt.target.text);
        // TODO: 去修改对应的视图元素的信息
        var game = this.parent;
        var tool = game.editGroup.tool;
        var target = tool.target;
        var element = tool.target.owner.image;
        if (name == "input_width") {
            tool.scale(this.data['width'] / Math.round(target.width * tool.endMatrix.a));
        }
        if (name == "input_x" || name == "input_y") {
            tool.translate(this.data['x'] - tool.regX, this.data['y'] - tool.regY);
        }
        if (name == "input_rotate") {
            tool.rotate((this.data['rotate']) * Math.PI / 180 - tool.endMatrix.getRotationX());
        }
        // console.log(tool.endMatrix.getRotationX(),tool.endMatrix.getRotationY());
        // console.log(tool.regX, tool.regY);
        this.container.editGroup.render();
        // console.log(tool.regEndU, tool.regEndV);
        // console.log(tool.regStartU, tool.regStartV);
    };
    SiderbarSkinBy.prototype.activetedTab = function (tab) {
        var label = tab.getChildByName('label');
        var rect_default = tab.getChildByName('rect_default');
        var rect_activeted = tab.getChildByName('rect_activeted');
        rect_default.visible = false;
        rect_activeted.visible = true;
        label.textColor = this.color_AEEEEE;
    };
    SiderbarSkinBy.prototype.unActivetedTab = function (tab) {
        var label = tab.getChildByName('label');
        var rect_default = tab.getChildByName('rect_default');
        var rect_activeted = tab.getChildByName('rect_activeted');
        rect_default.visible = true;
        rect_activeted.visible = false;
        label.textColor = this.color_000000;
    };
    SiderbarSkinBy.prototype.cleanTab = function () {
        for (var i = 0, len = this.gp_tabs.numChildren; i < len; i++) {
            var tab = this.gp_tabs.getChildAt(i);
            this.unActivetedTab(tab);
        }
    };
    SiderbarSkinBy.prototype.cleanContainer = function () {
        for (var i = 0, len = this.gp_eventContainers.numChildren; i < len; i++) {
            var eventContainer = this.gp_eventContainers.getChildAt(i);
            eventContainer.visible = false;
        }
    };
    SiderbarSkinBy.prototype.changeTabIndex = function (index) {
        var tab = this.gp_tabs.getChildAt(index);
        var eventContainer = this.gp_eventContainers.getChildAt(index);
        this.cleanTab();
        this.activetedTab(tab);
        this.cleanContainer();
        eventContainer.visible = true;
    };
    SiderbarSkinBy._instance = null;
    return SiderbarSkinBy;
}(eui.Component));
__reflect(SiderbarSkinBy.prototype, "SiderbarSkinBy", ["IUUContainer"]);
