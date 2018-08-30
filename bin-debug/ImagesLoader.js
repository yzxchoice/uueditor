var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// TypeScript file
var ImagesLoader = (function () {
    function ImagesLoader(completeCallback) {
        this.imageCount = 0;
        this.images = [];
        this.completeCallback = completeCallback;
    }
    ImagesLoader.prototype.load = function (imgList) {
        var i;
        this.imageCount = imgList.length;
        for (i = 0; i < this.imageCount; i++) {
            this.loadImage(imgList[i]);
        }
    };
    ImagesLoader.prototype.loadImage = function (url) {
        //创建 ImageLoader 对象
        var loader = new egret.ImageLoader();
        this.images.push(loader);
        //添加加载完成侦听
        loader.addEventListener(egret.Event.COMPLETE, this.checkComplete, this);
        //开始加载
        loader.load(url);
    };
    ImagesLoader.prototype.checkComplete = function () {
        if (--this.imageCount <= 0) {
            if (this.completeCallback != null) {
                var temp = this.completeCallback;
                this.completeCallback = null;
                temp();
            }
        }
    };
    return ImagesLoader;
}());
__reflect(ImagesLoader.prototype, "ImagesLoader");
