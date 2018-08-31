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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// TypeScript file
var EditGroup = (function (_super) {
    __extends(EditGroup, _super);
    function EditGroup() {
        var _this = _super.call(this) || this;
        _this.displayList = [];
        _this.pages = [];
        _this.pageIndex = 0;
        _this.borderColor = 0xcccccc;
        // private bg: eui.Component = new eui.Component;
        _this.displayGroup = new eui.Group();
        _this.siderbar = Siderbar.getInstance();
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    EditGroup.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    EditGroup.prototype.onAddToStage = function (event) {
        this.tool = new TransformTool(this);
        this.maskTool = new TransformTool(this);
        this.bindHandlers();
        this.getPages();
        this.initEui();
        this.init();
    };
    EditGroup.prototype.bindHandlers = function () {
        this.render = this.render.bind(this);
        this.renderOneDisplay = this.renderOneDisplay.bind(this);
        // this.addSinglePicture = this.addSinglePicture.bind(this);
    };
    EditGroup.prototype.initEui = function () {
        this.displayGroup.width = this.width;
        this.displayGroup.height = this.height;
        this.displayGroup.scrollEnabled = true;
        this.addChild(this.displayGroup);
    };
    EditGroup.prototype.getPages = function () {
        // console.log(RES.getRes("data_json"));
        this.pages = RES.getRes("data_json").list;
    };
    EditGroup.prototype.init = function () {
        this.renderResources(this.pageIndex);
        this.setupTool();
        this.addEventListener(Mouse.START, this.down, this);
        this.stage.addEventListener(PageEvent.PAGE_CHANGE, this.go, this);
        this.stage.addEventListener(PageEvent.LAYER_SELECT, this.select, this);
        this.render();
    };
    EditGroup.prototype.setupTool = function () {
        ControlSet.controlClass = EgretControl;
        // var controls = this.getCustomControls();
        this.tool.setControls(ControlSet.getUniformScaler());
    };
    EditGroup.prototype.getCustomControls = function () {
        var translater = new EgretControl(ControlType.TRANSLATE);
        // translate control is "selected" by clicking
        // on the target's shape, not the control point
        translater.hitTestTarget = true;
        var targetContent = new EgretControl(ControlType.TARGET);
        return [
            new EgretControl(ControlType.ROTATE, 0, 0, 0, 0, 40),
            new EgretControl(ControlType.ROTATE, 0, 1, 0, 0, 40),
            new EgretControl(ControlType.ROTATE, 1, 0, 0, 0, 40),
            new EgretControl(ControlType.ROTATE, 1, 1, 0, 0, 40),
            targetContent,
            translater,
            new EgretControl(ControlType.BORDER),
            new EgretControl(ControlType.REGISTRATION, .5, .5, 0, 0, 20),
            new EgretControl(ControlType.SKEW_Y, 0, .5, 0, 0, 10),
            new EgretControl(ControlType.SCALE_X, 1, .5, 0, 0, 10),
            new EgretControl(ControlType.SKEW_X, .5, 0, 0, 0, 10),
            new EgretControl(ControlType.SCALE_Y, .5, 1, 0, 0, 10),
            new EgretControl(ControlType.SCALE, 0, 0, 0, 0, 10),
            new EgretControl(ControlType.SCALE, 0, 1, 0, 0, 10),
            new EgretControl(ControlType.SCALE, 1, 0, 0, 0, 10),
            new EgretControl(ControlType.SCALE, 1, 1, 0, 0, 10),
            new EgretControl(ControlType.ROTATE_SCALE, 1, 0, 15, -15, 10),
            new EgretControl(ControlType.SCALE_UNIFORM, 1, 1, 15, 15, 10),
            new EgretControl(ControlType.ROTATE, .5, 0, 0, -20)
        ];
    };
    EditGroup.prototype.down = function (event) {
        Mouse.get(event, this);
        var controlled = this.tool.start(Mouse.x, Mouse.y);
        if (!this.containsPoint(Mouse.x, Mouse.y)) {
            return false;
        }
        // if tool wasnt selected and being controlled
        // attempt to make a new selection at this location
        if (!controlled && this.selectImage(Mouse.x, Mouse.y)) {
            // selection occurred
            // force select the translate control
            // to be able to start moving right away
            controlled = this.tool.start(Mouse.x, Mouse.y, this.findControlByType(ControlType.TRANSLATE));
        }
        if (controlled) {
            // events for moving selection
            this.addEventListener(Mouse.MOVE, this.move, this);
            this.addEventListener(Mouse.END, this.up, this);
            this.siderbar.selectTarget();
            // AnimateSet.target = this.tool.target.owner.image;
            // AnimateSet.move();
        }
        // requestAnimationFrame(this.renderOneDisplay);        
        requestAnimationFrame(this.render);
        event.preventDefault();
    };
    EditGroup.prototype.move = function (event) {
        Mouse.get(event, this);
        this.applyDynamicControls(event);
        this.tool.move(Mouse.x, Mouse.y);
        this.siderbar.moveTarget();
        // requestAnimationFrame(this.renderOneDisplay);
        requestAnimationFrame(this.render);
        event.preventDefault();
    };
    EditGroup.prototype.up = function (event) {
        this.tool.end();
        // console.log(this.tool.target);
        var eles = this.pages[this.pageIndex].elements;
        if (this.tool.target) {
            for (var i = 0; i < eles.length; i++) {
                if (eles[i].id === this.tool.target.owner.image.data.id) {
                    eles[i].matrix = this.tool.target.matrix;
                }
            }
        }
        this.removeEventListener(Mouse.MOVE, this.move, this);
        this.removeEventListener(Mouse.END, this.up, this);
        this.siderbar.upTarget();
        // requestAnimationFrame(this.renderOneDisplay);        
        requestAnimationFrame(this.render);
        event.preventDefault();
    };
    EditGroup.prototype.setProperty = function (x, y) {
        var eles = this.pages[this.pageIndex].elements;
        var currentMatrix = this.tool.target.matrix;
        currentMatrix.translate(x, y);
        for (var i = 0; i < eles.length; i++) {
            if (eles[i].id === this.tool.target.owner.image.name) {
                eles[i].matrix = currentMatrix;
            }
        }
    };
    EditGroup.prototype.applyDynamicControls = function (event) {
        // if dynamic, set controls based on 
        // keyboard keys
        var dyn = this.getDynamicControl();
        // console.log('dyn:'+dyn);
        if (dyn) {
            if (event.ctrlKey) {
                if (event.shiftKey) {
                    dyn.type = ControlType.ROTATE_SCALE;
                }
                else {
                    dyn.type = ControlType.ROTATE;
                }
            }
            else if (event.shiftKey) {
                dyn.type = ControlType.SCALE;
            }
            else {
                dyn.type = ControlType.TRANSLATE;
            }
        }
    };
    EditGroup.prototype.getDynamicControl = function () {
        var i = 0;
        var n = this.tool.controls.length;
        for (i = 0; i < n; i++) {
            if (this.tool.controls[i].dynamicUV) {
                return this.tool.controls[i];
            }
        }
        return null;
    };
    EditGroup.prototype.findControlByType = function (type) {
        var i = 0;
        var n = this.tool.controls.length;
        for (i = 0; i < n; i++) {
            if (this.tool.controls[i].type == type) {
                return this.tool.controls[i];
            }
        }
        return null;
    };
    EditGroup.prototype.containsPoint = function (x, y) {
        var globalEdit = this.parent.localToGlobal(this.matrix.tx, this.matrix.ty);
        var globalMouse = this.localToGlobal(Mouse.x, Mouse.y);
        var m = new Matrix(this.matrix.a, this.matrix.b, this.matrix.c, this.matrix.d, globalEdit.x, globalEdit.y);
        // console.log(globalMouse.x, globalMouse.y)
        // console.log(m.containsPoint(globalMouse.x, globalMouse.y, this.width, this.height));
        return m.containsPoint(globalMouse.x, globalMouse.y, this.width, this.height);
    };
    EditGroup.prototype.select = function (event) {
        this.tool.setTarget(event.data.t.transform);
        requestAnimationFrame(this.render);
        event.preventDefault();
    };
    EditGroup.prototype.selectImage = function (x, y) {
        var pic = null;
        var t = null;
        // walk backwards selecting top-most first
        var i = this.displayList.length;
        while (i--) {
            pic = this.displayList[i];
            if (!pic.b) {
                console.log('点击了背景...');
                this.tool.setTarget(null);
                this.clear();
                return false;
            }
            ;
            t = pic.transform;
            if (t.matrix.containsPoint(x, y, t.width, t.height)) {
                if (this.tool.target !== t) {
                    // select
                    this.tool.setTarget(t);
                    var e = new PageEvent(PageEvent.LAYER_CHANGE, true);
                    e.data = { layerIndex: i };
                    this.dispatchEvent(e);
                    // reorder for layer rendering
                    // this.displayList.splice(i,1);
                    // this.displayList.push(pic);
                    return true;
                }
                // already selected
                return false;
            }
        }
        // deselect
        var point = new egret.Point(x, y);
        var rect = new egret.Rectangle(0, 0, this.width, this.height);
        if (rect.containsPoint(point)) {
            this.tool.setTarget(null);
            return false;
        }
        ;
    };
    EditGroup.prototype.renderResources = function (index) {
        return __awaiter(this, void 0, void 0, function () {
            var elements, n, i, texture, t, com, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        elements = this.pages[index].elements;
                        n = elements.length;
                        i = 0;
                        _b.label = 1;
                    case 1:
                        if (!(i < n)) return [3 /*break*/, 6];
                        texture = RES.getRes(elements[i].name);
                        t = LayerSet.getLayer(Utils.getComs(), elements[i].type)[0];
                        com = LayerSet.createInstance(t, elements[i].props);
                        com.name = elements[i].id;
                        com.data = elements[i];
                        if (!(!texture && (elements[i].type === UUType.IMAGE || elements[i].type === UUType.BACKGROUND))) return [3 /*break*/, 3];
                        _a = com;
                        return [4 /*yield*/, Utils.getTexture("resource/" + elements[i].src)];
                    case 2:
                        _a.texture = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        com.texture = texture;
                        _b.label = 4;
                    case 4:
                        this.displayList.push(new Picture(com, elements[i].matrix, elements[i].type == UUType.BACKGROUND ? false : true));
                        _b.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 1];
                    case 6:
                        requestAnimationFrame(this.render);
                        return [2 /*return*/];
                }
            });
        });
    };
    EditGroup.prototype.render = function () {
        this.clear();
        this.drawDisplayList();
        this.tool.draw();
    };
    EditGroup.prototype.renderOneDisplay = function () {
        var target = this.tool.target;
        if (!target)
            return;
        var display = target.owner;
        this.clear();
        display.draw(this.displayGroup);
        this.tool.draw();
    };
    EditGroup.prototype.clear = function () {
        this.tool.undraw();
    };
    EditGroup.prototype.reset = function () {
        this.clear();
        this.tool.setTarget(null);
        var i = 0;
        var n = this.displayList.length;
        for (i = 0; i < n; i++) {
            this.displayList[i].undraw(this.displayGroup);
        }
        this.displayList = [];
    };
    EditGroup.prototype.drawDisplayList = function () {
        var i = 0;
        var n = this.displayList.length;
        for (i = 0; i < n; i++) {
            // let the TARGET control draw the selected image
            // so it can be layered within the controls
            // otherwise draw the other images here
            // if (!targetControl || this.tool.target !== this.displayList[i].transform){
            this.displayList[i].draw(this.displayGroup);
            // }
        }
    };
    EditGroup.prototype.pre = function (event) {
        if (this.pageIndex > 0) {
            // this.reset();
            this.pageIndex--;
            // this.renderResources(this.pageIndex);
            var e = new PageEvent(PageEvent.PAGE_CHANGE, true);
            e.data = {
                pageIndex: this.pageIndex
            };
            this.dispatchEvent(e);
        }
    };
    EditGroup.prototype.next = function (event) {
        if (this.pageIndex < this.pages.length - 1) {
            // this.reset();
            this.pageIndex++;
            // this.renderResources(this.pageIndex);
            var e = new PageEvent(PageEvent.PAGE_CHANGE, true);
            e.data = {
                pageIndex: this.pageIndex
            };
            this.dispatchEvent(e);
        }
    };
    EditGroup.prototype.go = function (event) {
        this.reset();
        this.pageIndex = event.data.pageIndex;
        this.renderResources(this.pageIndex);
    };
    // 更新显示对象
    EditGroup.prototype.updateDisplay = function (display) {
        this.updateDisplayProps(display);
        display.draw(this);
    };
    // 更新props中的属性
    EditGroup.prototype.updateDisplayProps = function (display) {
        var image = display.image;
        var props = image.data.props;
        for (var key in props) {
            image[key] = props[key];
        }
    };
    // 使用图形遮罩
    EditGroup.prototype.triggerMaskById = function (imageId) {
        var id = imageId;
        var displayList = this.displayList;
        var transform;
        for (var i = 0, len = displayList.length; i < len; i++) {
            var item = displayList[i];
            if (item.image.data.id == id) {
                transform = item.transform;
                break;
            }
        }
        ;
        if (!transform) {
            this.maskTool.removeMask();
            return;
        }
        this.maskTool.setPreTarget(transform);
        this.maskTool.addMask();
    };
    EditGroup.prototype.addResource = function (data, uutype) {
        switch (uutype) {
            case UUType.IMAGE:
            case UUType.BACKGROUND:
            case UUType.FRAME:
            case UUType.CIRCLE_SECTOR:
                this.addResource1(uutype, data);
                break;
            case UUType.SOUND:
                this.addSound(data);
            default:
                this.addResource1(uutype, data);
                break;
        }
    };
    //TODO 
    EditGroup.prototype.addSound = function (data) {
        var m = new Matrix(1, 0, 0, 1, 300, 500);
        var n = data.name;
        var eles = this.pages[this.pageIndex].elements;
        var triggerGroup = this.pages[this.pageIndex].properties.triggerGroup;
        data.id = data.id + '-' + this.displayList.length;
        eles.push({
            "id": data.id,
            "name": n,
            "pageId": 201807311008,
            "type": UUType.SOUND,
            "matrix": {
                "a": m.a,
                "b": m.b,
                "c": m.c,
                "d": m.d,
                "x": m.x,
                "y": m.y
            },
            "props": {
                "width": 100,
                "height": 50
            },
            "sound": {
                "id": data.id,
                "name": n,
                "src": data.url
            },
            "sceneId": 1001
        });
        triggerGroup.push({
            "delay": 0,
            "eventType": 1,
            "sourceId": data.id,
            "sourceType": "e",
            "targetId": data.id,
            "targetState": 4,
            "targetType": "e"
        });
        var soundBtn = new SoundButton();
        soundBtn.label = data.name;
        soundBtn.name = data.id;
        soundBtn.width = 100;
        soundBtn.height = 50;
        soundBtn.data = data;
        this.displayList.push(new Picture(soundBtn, m));
        requestAnimationFrame(this.render);
    };
    EditGroup.prototype.addPage = function () {
        var pages = this.pages;
        pages.push({
            id: Date.now,
            elements: [],
            properties: {
                triggerGroup: []
            }
        });
    };
    EditGroup.prototype.addResource1 = function (type, d) {
        return __awaiter(this, void 0, void 0, function () {
            var t, com, id, data, eles, texture, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        t = LayerSet.getLayer(Utils.getComs(), type)[0];
                        com = LayerSet.createInstance(t, {});
                        id = (new Date()).valueOf().toString();
                        data = {
                            id: id,
                            /**
                             * 1.png  => 1_png  预加载资源
                             */
                            name: d ? d.url.substring(d.url.lastIndexOf("/") + 1).replace('.', '_') : id,
                            pageId: 201807311008,
                            type: type,
                            matrix: new Matrix(1, 0, 0, 1, 300, 300),
                            // src: d ? d.url : '',
                            props: com.getProps ? com.getProps() : {}
                        };
                        if (data.type === UUType.IMAGE || data.type === UUType.BACKGROUND) {
                            data.src = d ? d.url : '';
                        }
                        eles = this.pages[this.pageIndex].elements;
                        texture = RES.getRes(data.name);
                        com.name = data.id;
                        com.data = data;
                        if (!(!texture && (data.type === UUType.IMAGE || data.type === UUType.BACKGROUND))) return [3 /*break*/, 2];
                        _a = com;
                        return [4 /*yield*/, Utils.getTexture("resource/" + data.src)];
                    case 1:
                        _a.texture = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        com.texture = texture;
                        _b.label = 3;
                    case 3:
                        if (data.type == UUType.BACKGROUND) {
                            if (eles.length > 0 && eles[0].type == UUType.BACKGROUND) {
                                this.displayList[0].undraw(this.displayGroup);
                                this.displayList.splice(0, 1);
                                eles.splice(0, 1);
                            }
                            data.matrix = new Matrix(this.displayGroup.width / texture.bitmapData.width, 0, 0, this.displayGroup.width / texture.bitmapData.width, 0, 0);
                            eles.unshift(data);
                            this.displayList.unshift(new Picture(com, data.matrix, false));
                        }
                        else {
                            eles.push(data);
                            this.displayList.push(new Picture(com, data.matrix, true));
                        }
                        this.dispatchEvent(new PageEvent(PageEvent.LAYER_ADD, true));
                        requestAnimationFrame(this.render);
                        return [2 /*return*/];
                }
            });
        });
    };
    return EditGroup;
}(eui.Group));
__reflect(EditGroup.prototype, "EditGroup");
//# sourceMappingURL=EditGroup.js.map