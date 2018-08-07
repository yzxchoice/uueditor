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
        this.container.addChild(this);
    };
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
        this.listenEvent();
        this.tabIndex = 0;
    };
    SiderbarSkinBy.prototype.listenEvent = function () {
        // 监听tabs click事件
        this.gp_tabs.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTabsClick, this);
        this.btn_add_event.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchAddEvent, this);
        this.gp_add_click_event.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addClickEventItem, this);
        this.gp_selection_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchSelection, this);
        // for(let i = 0, len = this.gp_inputContainer.numChildren; i < len; i++){
        // 	let groupInpput = <eui.Group>this.gp_inputContainer.getChildAt(i);
        // 	let input = groupInpput.getChildAt(1);
        // 	input.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onFocusOut, this);			
        // }
        this.btn_update.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFocusOut, this);
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
    SiderbarSkinBy.prototype.touchSelection = function (evt) {
        var isShow = this.gp_selection_box.visible = !this.gp_selection_box.visible;
        if (isShow) {
            this.gp_selection.removeChildren();
            var g = this.parent;
            var disPlayList = g.editGroup.displayList;
            for (var j = 0, num = disPlayList.length; j < num; j++) {
                var checkBox = new eui.CheckBox();
                checkBox.y = 30 * j;
                checkBox.label = "\u5143\u7D20" + (j + 1);
                var displayItemData = disPlayList[j].image.data;
                checkBox.selected = false;
                checkBox.addEventListener(egret.Event.CHANGE, (function (displayItemData) {
                    return function () {
                        console.log(displayItemData);
                    };
                })(displayItemData), this);
                this.gp_selection.addChild(checkBox);
            }
        }
    };
    SiderbarSkinBy.prototype.onFocusOut = function (evt) {
        var textInput = evt.target.parent;
        var name = textInput.name;
        var propertyName = name.split('_')[1];
        this.data[propertyName] = Number(evt.target.text);
        var game = this.parent;
        var tool = game.editGroup.tool;
        var element = tool.target.owner.image;
        console.log(tool.target.matrix);
        console.log(tool.target.owner.image);
        element.x = 100;
        element.y = 100;
        element.alpha = 0.5;
        tool.updateFromTarget();
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
