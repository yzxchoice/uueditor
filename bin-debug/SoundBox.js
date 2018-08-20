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
var SoundBox = (function (_super) {
    __extends(SoundBox, _super);
    function SoundBox() {
        var _this = _super.call(this) || this;
        _this.imgList = [
            {
                id: "19001",
                name: "test2_mp3",
                url: "test2.mp3"
            }
        ];
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    SoundBox.getInstance = function (name) {
        if (!this.instance) {
            this.instance = new ImageBox();
        }
        return this.instance;
    };
    SoundBox.prototype.onAddToStage = function (event) {
        this.init();
    };
    SoundBox.prototype.init = function () {
        this.horizontalCenter = 0;
        this.verticalCenter = 0;
        this.width = 1200;
        this.height = 800;
        for (var i = 0; i < this.imgList.length; i++) {
            var soundBtn = new SoundButton();
            soundBtn.y = 50;
            soundBtn.x = 120 * i;
            soundBtn.label = this.imgList[i].name;
            soundBtn.name = this.imgList[i].id;
            soundBtn.data = this.imgList[i];
            soundBtn.addEventListener(Mouse.START, this.addSound, this);
            this.addChild(soundBtn);
        }
    };
    SoundBox.prototype.addSound = function (event) {
        var g = this.parent;
        g.editGroup.addSound(event.currentTarget.data);
    };
    SoundBox.prototype.open = function (container) {
        container.addChild(this);
    };
    return SoundBox;
}(eui.Panel));
__reflect(SoundBox.prototype, "SoundBox");
