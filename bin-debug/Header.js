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
var Header = (function (_super) {
    __extends(Header, _super);
    function Header() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Header.prototype.dispose = function () {
    };
    Header.prototype.draw = function (container) {
        this.container = container;
        this.container.addChild(this);
    };
    Header.prototype.onAddToStage = function (event) {
        this.init();
    };
    Header.prototype.init = function () {
        var hLayout = new eui.HorizontalLayout();
        hLayout.gap = 30;
        // hLayout.paddingTop = 30;
        hLayout.horizontalAlign = egret.HorizontalAlign.RIGHT;
        hLayout.verticalAlign = egret.VerticalAlign.MIDDLE;
        hLayout.paddingRight = 30;
        this.layout = hLayout;
        var btnAddText = new eui.Button();
        btnAddText.width = 100;
        btnAddText.height = 40;
        btnAddText.label = "文本";
        btnAddText.addEventListener(Mouse.START, this.onAddText, this);
        this.addChild(btnAddText);
        var btnAddPage = new eui.Button();
        btnAddPage.width = 100;
        btnAddPage.height = 40;
        btnAddPage.label = "加页";
        btnAddPage.addEventListener(Mouse.START, this.onAddPage, this);
        this.addChild(btnAddPage);
        var btnAddComponent = new eui.Button();
        btnAddComponent.width = 100;
        btnAddComponent.height = 40;
        btnAddComponent.label = "组件";
        btnAddComponent.addEventListener(Mouse.START, this.openComponentPanel, this);
        this.addChild(btnAddComponent);
        var btnAddFrame = new eui.Button();
        btnAddFrame.width = 100;
        btnAddFrame.height = 40;
        btnAddFrame.label = "边框";
        btnAddFrame.addEventListener(Mouse.START, this.openFramePanel, this);
        this.addChild(btnAddFrame);
        var btnAddSound = new eui.Button();
        btnAddSound.width = 100;
        btnAddSound.height = 40;
        btnAddSound.label = "声音";
        btnAddSound.addEventListener(Mouse.START, this.openSoundPanel, this);
        this.addChild(btnAddSound);
        var btnAddImage = new eui.Button();
        btnAddImage.width = 100;
        btnAddImage.height = 40;
        btnAddImage.label = "图片";
        btnAddImage.addEventListener(Mouse.START, this.openImagePanel, this);
        this.addChild(btnAddImage);
        var btnAddBg = new eui.Button();
        btnAddBg.width = 100;
        btnAddBg.height = 40;
        btnAddBg.label = "背景";
        btnAddBg.addEventListener(Mouse.START, this.openBgPanel, this);
        this.addChild(btnAddBg);
        var btnPreview = new eui.Button();
        btnPreview.width = 100;
        btnPreview.height = 40;
        btnPreview.label = "预览";
        btnPreview.addEventListener(Mouse.START, this.preview, this);
        this.addChild(btnPreview);
        var btnRelease = new eui.Button();
        btnRelease.width = 100;
        btnRelease.height = 40;
        btnRelease.label = "发布";
        // btnRelease.addEventListener(Mouse.START, this.preview, this);
        this.addChild(btnRelease);
        var btnSave = new eui.Button();
        btnSave.width = 100;
        btnSave.height = 40;
        btnSave.label = "保存";
        btnSave.addEventListener(Mouse.START, this.save, this);
        this.addChild(btnSave);
    };
    Header.prototype.save = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var g, obj, params, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        g = this.parent;
                        console.log(g.editGroup.pages[0]);
                        console.log(JSON.stringify(g.editGroup.pages[0]));
                        obj = {
                            code: 200,
                            msg: "success",
                            list: g.editGroup.pages
                        };
                        params = "id=" + Main.id + "&template=" + encodeURIComponent(JSON.stringify(obj)) + "&resource=" + encodeURIComponent(JSON.stringify(Utils.trans(g.editGroup.pages)));
                        return [4 /*yield*/, Fetch.start('http://10.63.5.71:8002/template/updateTemplate', params, 'POST')];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Header.prototype.onAddText = function () {
        var editGroup = this.container.editGroup;
        editGroup.addText();
    };
    Header.prototype.onAddPage = function (event) {
        var g = this.parent;
        g.editGroup.addPage();
        this.dispatchEvent(new PageEvent(PageEvent.PAGE_ADD, true));
    };
    Header.prototype.preview = function (event) {
        // callJsFunc("ts call js");
        var g = this.parent;
        var pb = new PreviewBox();
        pb.draw(g);
    };
    Header.prototype.openComponentPanel = function (event) {
        var g = this.parent;
        g.openComponentPanel();
    };
    Header.prototype.openFramePanel = function (event) {
        var g = this.parent;
        g.openFramePanel();
    };
    Header.prototype.openSoundPanel = function (event) {
        var g = this.parent;
        g.openSoundePanel();
    };
    Header.prototype.openImagePanel = function (event) {
        var g = this.parent;
        g.openImagePanel();
    };
    Header.prototype.openBgPanel = function (event) {
        var g = this.parent;
        g.openBgPanel();
    };
    return Header;
}(eui.Group));
__reflect(Header.prototype, "Header", ["IUUContainer"]);
//# sourceMappingURL=Header.js.map