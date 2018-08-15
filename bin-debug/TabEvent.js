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
var TabEvent = (function (_super) {
    __extends(TabEvent, _super);
    function TabEvent() {
        var _this = _super.call(this) || this;
        // state
        _this.stateObj = {
            selectionVisible: false,
        };
        _this.isFirstSelect = true;
        _this.relevanceItemIdList = [];
        _this.defaultRelevanceItem = {
            "delay": 100,
            "eventType": 1,
            "sourceId": 8405,
            "sourceType": "e",
            "targetId": 8405,
            "targetState": 1,
            "targetType": "e"
        };
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddedToStage, _this);
        return _this;
    }
    TabEvent.prototype.dispose = function () {
    };
    TabEvent.prototype.draw = function (container) {
        this.container = container;
        this.editGroup = container.editGroup;
    };
    Object.defineProperty(TabEvent.prototype, "triggerGroup", {
        get: function () {
            return this._triggerGroup;
        },
        set: function (v) {
            var _this = this;
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
    TabEvent.prototype.onAddedToStage = function () {
        this.init();
    };
    TabEvent.prototype.init = function () {
        // 启用舞台的鼠标支持
        // 开启监听鼠标的移动事件
        mouse.enable(this.stage);
        mouse.setMouseMoveEnabled(true);
        this.initLayout();
        this.listenEvent();
    };
    TabEvent.prototype.initLayout = function () {
        var vLayout = new eui.VerticalLayout();
        vLayout.paddingTop = 5;
        this.gp_eventSetContainer.layout = vLayout;
        var vLayout2 = new eui.VerticalLayout();
        vLayout2.gap = 0;
        vLayout2.paddingTop = 5;
        this.gp_selection.layout = vLayout2;
    };
    TabEvent.prototype.listenEvent = function () {
        var _this = this;
        // 监听tabs click事件
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function (evt) {
            _this.stateObj.selectionVisible = false;
        }, this);
        this.gp_selection_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchSelection2, this);
    };
    TabEvent.prototype.getTargetItemId = function () {
        this.targetItemId = this.editGroup.tool.target.owner.image.data.id;
    };
    TabEvent.prototype.touchSelection2 = function (evt) {
        var _this = this;
        evt.stopPropagation();
        if (!this.targetItemId)
            return;
        this.stateObj.selectionVisible = !this.stateObj.selectionVisible;
        if (this.stateObj.selectionVisible) {
            this.gp_selection.removeChildren();
            var disPlayList = this.editGroup.displayList;
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
            if (!this.isFirstSelect)
                return;
            this.isFirstSelect = false;
            this.gp_selection.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.onMouseover_Selection, this);
            this.gp_selection.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_Selection, this);
        }
        ;
    };
    TabEvent.prototype.onMouseover_Selection = function (evt) {
        for (var i = 0, len = this.gp_selection.numChildren; i < len; i++) {
            var item = this.gp_selection.getChildAt(i);
            item.isOver = false;
        }
        ;
        evt.target.parent.isOver = true;
    };
    TabEvent.prototype.onClick_Selection = function (evt) {
        evt.stopPropagation();
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
    TabEvent.prototype.drawEventSet = function (eventSetMessage) {
        var eventSet = new EventSetDome();
        eventSet.initData(eventSetMessage);
        eventSet.getDataContainer(this);
        eventSet.draw(this.gp_eventSetContainer);
        return eventSet;
    };
    TabEvent.prototype.pushEventSet = function (eventSetMessage) {
        var eventSet = this.drawEventSet(eventSetMessage);
        eventSet.pushData();
    };
    TabEvent.prototype.removeEventSet = function (eventSetMessage) {
        var relevanceItemId = eventSetMessage.targetId;
        var eventSet = this.gp_eventSetContainer.getChildByName(relevanceItemId);
        eventSet.removeData();
    };
    TabEvent.prototype.initShowEventSetList = function () {
        this.gp_eventSetContainer.removeChildren();
        var disPlayList = this.editGroup.displayList;
        for (var j = 0, num = disPlayList.length; j < num; j++) {
            var relevanceItemId = disPlayList[j].image.data.id;
            var isSelected = this.relevanceItemIdList.indexOf(relevanceItemId) == -1 ? false : true;
            if (isSelected) {
                var eventSetMessage = this.relevanceItemIdObj[relevanceItemId];
                this.drawEventSet(eventSetMessage);
            }
        }
    };
    return TabEvent;
}(eui.Component));
__reflect(TabEvent.prototype, "TabEvent", ["IUUContainer"]);
