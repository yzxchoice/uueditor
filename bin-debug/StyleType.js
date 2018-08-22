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
var StyleType = (function (_super) {
    __extends(StyleType, _super);
    function StyleType(styleType, props) {
        var _this = _super.call(this) || this;
        _this.styleType = styleType;
        _this.props = props;
        _this._props = JSON.parse(JSON.stringify(props));
        _this.observer(_this.props);
        _this.skinName = 'resource/skins/StyleTypeSkin.exml';
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.removeFromStage, _this);
        return _this;
    }
    StyleType.prototype.dispose = function () {
    };
    StyleType.prototype.draw = function (container) {
        this.container = container;
        this.container.addChild(this);
    };
    StyleType.prototype.onAddToStage = function () {
        this.initPanel();
    };
    StyleType.prototype.removeFromStage = function () {
        this.clearPanel();
    };
    StyleType.prototype.clearPanel = function () {
        this.gp_styleContainer.removeChildren();
    };
    StyleType.prototype.initPanel = function () {
        var configList = UUPanelConfig[this.styleType];
        for (var i = 0, len = configList.length; i < len; i++) {
            var config = configList[i];
            var com = this.createComponent(config, this.props);
            com.y = 70 * i;
            this.gp_styleContainer.addChild(com);
            this.gp_styleContainer.setChildIndex(com, 1);
        }
    };
    StyleType.prototype.createComponent = function (config, props) {
        var componentType = config.componentType;
        var styleComponent = eval(componentType);
        return new styleComponent(config, props);
    };
    StyleType.prototype.setDataContainer = function (dataContainer) {
        this.dataContainer = dataContainer;
        this.item = dataContainer.tool.target.owner.image;
        this.data = this.item.data;
    };
    // 对props进行双向数据绑定
    StyleType.prototype.observer = function (data) {
        var _this = this;
        Object.keys(data).forEach(function (key) { return _this.defineActive(data, key, data[key]); });
    };
    ;
    StyleType.prototype.defineActive = function (data, key, value) {
        var _this = this;
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get: function () {
                return _this._props[key];
            },
            set: function (newValue) {
                if (newValue === _this._props[key])
                    return;
                if (!_this.isTargetSelected())
                    return;
                _this._props[key] = newValue;
                console.log('props key is change');
                _this.refresh();
            }
        });
    };
    ;
    StyleType.prototype.refresh = function () {
        var target = this.dataContainer.tool.target;
        var picture = target.owner;
        this.dataContainer.tool.setTarget(null);
        this.dataContainer.editGroup.clear();
        this.dataContainer.editGroup.updateDisplay(picture);
        target.width = this.item.width;
        target.height = this.item.height;
        this.dataContainer.tool.setTarget(target);
        this.dataContainer.tool.draw();
        this.dataContainer.updateTarget();
    };
    StyleType.prototype.isTargetSelected = function () {
        var tool = this.dataContainer.tool;
        var target = tool.target;
        if (!(tool && target))
            return false;
        return true;
    };
    return StyleType;
}(eui.Component));
__reflect(StyleType.prototype, "StyleType", ["IUUContainer"]);
//# sourceMappingURL=StyleType.js.map