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
        _this.siderbar = Siderbar.getInstance();
        console.log('styleType...');
        console.log(styleType);
        _this.styleType = styleType;
        console.log('props...');
        console.log(props);
        _this.props = props || {};
        _this._props = JSON.parse(JSON.stringify(_this.props));
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
        if (!this.isTargetSelected())
            return;
        this.initPanel();
        this.bindData();
    };
    StyleType.prototype.removeFromStage = function () {
        this.clearPanel();
    };
    StyleType.prototype.clearPanel = function () {
        this.gp_styleContainer.removeChildren();
    };
    StyleType.prototype.initPanel = function () {
        var configList = UUPanelConfig[this.styleType];
        if (!configList)
            return;
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
        return new componentType(config, props);
    };
    // 数据绑定，只对需要的组件如文本、图片等进行，自定义组件不需要此操作
    StyleType.prototype.bindData = function () {
        var arr = [UUType.TEXT, UUType.IMAGE];
        if (arr.indexOf(this.styleType) !== -1) {
            this.observer(this.props);
        }
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
        var tool = this.siderbar.tool;
        var image = tool.target.owner.image;
        var target = tool.target;
        var picture = target.owner;
        tool.setTarget(null);
        this.siderbar.editGroup.clear();
        this.siderbar.updateDisplay(picture);
        target.width = image.width;
        target.height = image.height;
        tool.setTarget(target);
        tool.draw();
        this.siderbar.component_style.updateTarget();
    };
    StyleType.prototype.isTargetSelected = function () {
        var tool = this.siderbar.editGroup.tool;
        var target = tool.target;
        if (!(tool && target))
            return false;
        return true;
    };
    return StyleType;
}(eui.Component));
__reflect(StyleType.prototype, "StyleType", ["IUUContainer"]);
//# sourceMappingURL=StyleType.js.map