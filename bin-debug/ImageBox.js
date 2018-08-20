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
var ImageBox = (function (_super) {
    __extends(ImageBox, _super);
    function ImageBox() {
        var _this = _super.call(this) || this;
        _this.imgList = [];
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    ImageBox.getInstance = function (name) {
        if (!this.instance) {
            this.instance = new ImageBox();
        }
        return this.instance;
    };
    ImageBox.prototype.onAddToStage = function (event) {
        this.init();
        this.getImages();
    };
    ImageBox.prototype.getImages = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, i, borderGroup, bg, image;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Fetch.start('http://10.63.5.71:8002/image/getImages', { tag: 1 })];
                    case 1:
                        res = _a.sent();
                        this.imgList = res;
                        for (i = 0; i < this.imgList.length; i++) {
                            this.imgList[i].id = this.imgList[i]._id;
                            this.imgList[i].url = this.imgList[i].img_path;
                            this.imgList[i].name = this.imgList[i].img_path.replace('.', '_');
                            borderGroup = new eui.Group();
                            borderGroup.width = 100;
                            borderGroup.height = 100;
                            this._grpLayout.addChild(borderGroup);
                            bg = new egret.Shape;
                            bg.graphics.lineStyle(1, 0x999999);
                            bg.graphics.beginFill(0xffffff, 1);
                            bg.graphics.drawRect(0, 0, borderGroup.width, borderGroup.height);
                            bg.graphics.endFill();
                            borderGroup.addChild(bg);
                            image = new UUImage();
                            image.source = "resource/" + this.imgList[i].img_path;
                            image.width = 100;
                            image.height = 100;
                            image.name = this.imgList[i].id;
                            image.data = this.imgList[i];
                            image.addEventListener(Mouse.START, this.addImage, this);
                            borderGroup.addChild(image);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ImageBox.prototype.init = function () {
        this.horizontalCenter = 0;
        this.verticalCenter = 0;
        this.width = 1200;
        this.height = 800;
        /// 创建容器，在其中进行布局
        this._grpLayout = new eui.Group();
        this._grpLayout.horizontalCenter = 0;
        this._grpLayout.verticalCenter = 0;
        this.addChild(this._grpLayout);
        this._grpLayout.width = this.width;
        this._grpLayout.height = this.height - 50;
        var tLayout = new eui.TileLayout();
        tLayout.paddingTop = 30;
        tLayout.paddingLeft = 30;
        tLayout.paddingRight = 30;
        tLayout.paddingBottom = 30;
        this._grpLayout.layout = tLayout;
    };
    ImageBox.prototype.addImage = function (event) {
        var g = this.parent;
        // g.imgBox.close();
        g.editGroup.addSinglePicture(event.currentTarget.data);
        // g.closeImagePanel();
        // g.editGroup.changeBg(event.currentTarget.source);
    };
    ImageBox.prototype.open = function (container) {
        container.addChild(this);
    };
    return ImageBox;
}(eui.Panel));
__reflect(ImageBox.prototype, "ImageBox");
