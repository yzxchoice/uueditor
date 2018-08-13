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
        // state
        _this.stateObj = {
            selectionVisible: false,
        };
        _this.selectionVisible = false;
        _this.isFirstSelect = true;
        _this.relevanceItemIdList = [];
        _this.data = {
            width: 30,
            height: 30,
            x: 30,
            y: 30,
            rotate: 10,
        };
        _this.skinName = "resource/skins/SiderbarSkin.exml";
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStageInit, _this);
        return _this;
    }
    SiderbarSkinBy.prototype.dispose = function () {
    };
    SiderbarSkinBy.prototype.draw = function (container) {
        this.container = container;
        this.editGroup = this.container.editGroup;
        this.container.addChild(this);
    };
    SiderbarSkinBy.getInstance = function () {
        if (SiderbarSkinBy._instance == null) {
            SiderbarSkinBy._instance = new SiderbarSkinBy();
        }
        ;
        return SiderbarSkinBy._instance;
    };
    Object.defineProperty(SiderbarSkinBy.prototype, "triggerGroup", {
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
    SiderbarSkinBy.prototype.onAddToStageInit = function (event) {
        this.init();
    };
    SiderbarSkinBy.prototype.init = function () {
        // 启用舞台的鼠标支持
        // 开启监听鼠标的移动事件
        mouse.enable(this.stage);
        mouse.setMouseMoveEnabled(true);
        this.initLayout();
        this.listenEvent();
        this.currentState = 'style';
    };
    SiderbarSkinBy.prototype.initLayout = function () {
        var vLayout = new eui.VerticalLayout();
        vLayout.paddingTop = 5;
        this.gp_eventSetContainer.layout = vLayout;
        var vLayout2 = new eui.VerticalLayout();
        vLayout2.gap = 0;
        vLayout2.paddingTop = 5;
        this.gp_selection.layout = vLayout2;
    };
    SiderbarSkinBy.prototype.listenEvent = function () {
        var _this = this;
        // 监听tabs click事件
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function (evt) {
            console.log(evt.target);
            if (evt.target.name == 'gp_selection_rect') {
                _this.stateObj.selectionVisible = true;
                _this.touchSelection2();
            }
            else {
                _this.stateObj.selectionVisible = false;
            }
        }, this, false, 1);
        this.gp_tabs.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTabsClick, this);
        this.btn_add_event.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchAddEvent, this);
        this.gp_add_click_event.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addClickEventItem, this);
        // this.gp_selection_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchSelection2, this, false, 2);
        for (var i = 0, len = this.gp_inputContainer.numChildren; i < len; i++) {
            var groupInpput = this.gp_inputContainer.getChildAt(i);
            var input = groupInpput.getChildAt(1);
            input.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onFocusOut, this);
        }
    };
    SiderbarSkinBy.prototype.setTarget = function (tool) {
        this.tool = tool;
    };
    SiderbarSkinBy.prototype.updateTarget = function () {
        var matrix = this.tool.target.matrix;
        var item = this.tool.target.owner.image;
        var _a = this.tool.target, width = _a.width, height = _a.height;
        var scaleX = item.scaleX, scaleY = item.scaleY, rotation = item.rotation;
        var newData = {
            x: Math.floor(this.tool.regX),
            y: Math.floor(this.tool.regY),
            width: Math.floor(width * scaleX),
            height: Math.floor(height * scaleY),
            rotate: Math.floor(rotation)
        };
        this.data = newData;
        this.targetItemId = this.tool.target.owner.image.data.id;
        this.triggerGroup = this.editGroup.pages[this.editGroup.pageIndex].properties.triggerGroup;
    };
    SiderbarSkinBy.prototype.touchTabsClick = function (evt) {
        this.currentState = evt.target.parent.name;
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
            this.relevanceItemIdObj[relevanceItemId] = JSON.parse(JSON.stringify(SiderbarSkinBy.defaultRelevanceItem));
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
    SiderbarSkinBy.prototype.drawEventSet = function (eventSetMessage) {
        var eventSet = new EventSetDome();
        eventSet.initData(eventSetMessage);
        eventSet.draw(this.gp_eventSetContainer);
        return eventSet;
    };
    SiderbarSkinBy.prototype.pushEventSet = function (eventSetMessage) {
        var eventSet = this.drawEventSet(eventSetMessage);
        eventSet.pushData();
    };
    SiderbarSkinBy.prototype.removeEventSet = function (eventSetMessage) {
        var relevanceItemId = eventSetMessage.targetId;
        var eventSet = this.gp_eventSetContainer.getChildByName(relevanceItemId);
        eventSet.removeData();
    };
    SiderbarSkinBy.prototype.initShowEventSetList = function () {
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
    SiderbarSkinBy._instance = null;
    SiderbarSkinBy.defaultRelevanceItem = {
        "delay": 100,
        "eventType": 1,
        "sourceId": 8405,
        "sourceType": "e",
        "targetId": 8405,
        "targetState": 1,
        "targetType": "e"
    };
    return SiderbarSkinBy;
}(eui.Component));
__reflect(SiderbarSkinBy.prototype, "SiderbarSkinBy", ["IUUContainer"]);
