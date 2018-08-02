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
// TypeScript file
var Preview = (function (_super) {
    __extends(Preview, _super);
    function Preview() {
        var _this = _super.call(this) || this;
        _this.displayList = [];
        _this.pages = [];
        _this.pageIndex = 0;
        _this.displayGroup = new eui.Group();
        // this.tool = new TransformTool(this);
        _this.getPages();
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStageInit, _this);
        return _this;
    }
    Preview.prototype.onAddToStageInit = function (event) {
        this.initEui();
        this.init();
        // initEvent();
    };
    Preview.prototype.initEui = function () {
        this.width = 1920;
        this.height = 1080;
        var bg = new egret.Shape;
        bg.graphics.lineStyle(3, 0x999999);
        bg.graphics.beginFill(0xffffff, 1);
        bg.graphics.drawRect(0, 0, 1920, 1080);
        bg.graphics.endFill();
        this.addChild(bg);
        var button = new eui.Button();
        button.width = 100;
        button.height = 40;
        button.label = "上一页";
        button.right = 0;
        button.addEventListener(Mouse.START, this.pre, this);
        this.addChild(button);
        var button2 = new eui.Button();
        button2.y = 50;
        button2.right = 0;
        button2.width = 100;
        button2.height = 40;
        button2.label = "下一页";
        button2.addEventListener(Mouse.START, this.next, this);
        this.addChild(button2);
        var button3 = new eui.Button();
        button3.y = 100;
        button3.right = 0;
        button3.width = 100;
        button3.height = 40;
        button3.label = "关闭";
        button3.addEventListener(Mouse.START, this.close, this);
        this.addChild(button3);
        var img = new eui.Image("resource/assets/phonewhite.svg");
        img.width = 328 * 1.5;
        img.height = 560 * 1.5;
        this.displayGroup.horizontalCenter = 0;
        this.displayGroup.verticalCenter = 0;
        this.displayGroup.width = 328 * 1.5;
        this.displayGroup.height = 560 * 1.5;
        this.displayGroup.scrollEnabled = true;
        // this.drawBg(this.editGroup);
        this.displayGroup.addChild(img);
        this.addChild(this.displayGroup);
    };
    Preview.prototype.getPages = function () {
        console.log(RES.getRes("data_json"));
        this.pages = RES.getRes("data_json").list;
    };
    Preview.prototype.pre = function (event) {
        if (this.pageIndex > 0) {
            this.reset();
            this.pageIndex--;
            this.addResources(this.pageIndex);
            this.render();
        }
    };
    Preview.prototype.next = function (event) {
        if (this.pageIndex < this.pages.length - 1) {
            this.reset();
            this.pageIndex++;
            this.addResources(this.pageIndex);
            this.render();
        }
    };
    Preview.prototype.close = function (event) {
        this.parent.removeChild(this);
    };
    Preview.prototype.init = function () {
        this.addResources(this.pageIndex);
        // this.setupTool();
        // selects pictures on mouse down
        this.addEventListener(Mouse.START, this.down, this);
        this.render();
    };
    Preview.prototype.down = function (event) {
        var _this = this;
        console.log(event.target);
        if (this.pages[this.pageIndex].hasOwnProperty("properties") && this.pages[this.pageIndex].properties.hasOwnProperty("triggerGroup")) {
            var triggerGroup = this.pages[this.pageIndex].properties.triggerGroup;
            triggerGroup.forEach(function (item) {
                if (item.sourceId == event.target.name) {
                    egret.Tween.get(_this.getDisplayByName(item.targetId)[0].image).to({ alpha: 0 }, 300, egret.Ease.sineIn);
                    console.log(_this.getDisplayByName(item.targetId));
                }
            });
        }
        event.preventDefault();
    };
    Preview.prototype.getDisplayByName = function (name) {
        return this.displayList.filter(function (item) {
            return item.image.name == name;
        });
    };
    Preview.prototype.addResources = function (index) {
        var i = 0;
        var elements = this.pages[index].elements;
        // var triggerGroup = this.pages[index].properties.triggerGroup;
        var n = elements.length;
        for (i = 0; i < n; i++) {
            switch (elements[i].type) {
                case 1:
                    var label = new UULabel();
                    label.text = elements[i].content;
                    label.textColor = 0xff0000;
                    label.size = 16;
                    label.lineSpacing = 12;
                    label.textAlign = egret.HorizontalAlign.JUSTIFY;
                    label.name = elements[i].id;
                    this.displayList.push(new Picture(label, elements[i].matrix));
                    break;
                case 2:
                    var result = new UUImage();
                    var texture = RES.getRes(elements[i].name);
                    // result.texture = texture;
                    result.source = texture;
                    result.name = elements[i].id;
                    this.displayList.push(new Picture(result, elements[i].matrix));
                    break;
                case 8:
                    // this.createGameScene();
                    this.displayList.push(new Picture(this, elements[i].matrix));
                    break;
            }
        }
    };
    Preview.prototype.render = function () {
        this.clear();
        this.drawDisplayList();
        // this.tool.draw();
    };
    Preview.prototype.clear = function () {
        // this.tool.undraw();
    };
    Preview.prototype.reset = function () {
        this.clear();
        var i = 0;
        var n = this.displayList.length;
        for (i = 0; i < n; i++) {
            this.displayList[i].undraw(this.displayGroup);
        }
        this.displayList = [];
    };
    Preview.prototype.drawDisplayList = function () {
        var i = 0;
        var n = this.displayList.length;
        for (i = 0; i < n; i++) {
            // if (!targetControl || this.tool.target !== this.displayList[i].transform){
            this.displayList[i].draw(this.displayGroup);
            // }
        }
    };
    return Preview;
}(eui.Component));
__reflect(Preview.prototype, "Preview");
//# sourceMappingURL=Preview.js.map