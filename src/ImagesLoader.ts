// TypeScript file
class ImagesLoader {
    private completeCallback: Function;
    imageCount: number = 0;
    images: any = [];
    constructor (completeCallback) {
        this.completeCallback = completeCallback;
    }

    load (imgList) {
        var i;
        this.imageCount = imgList.length;
        for (i=0; i< this.imageCount; i++){
            this.loadImage(imgList[i]);
        }
    }

    loadImage (url) {
         //创建 ImageLoader 对象
        var loader:egret.ImageLoader = new egret.ImageLoader();
        this.images.push(loader);
        //添加加载完成侦听
        loader.addEventListener(egret.Event.COMPLETE, this.checkComplete, this);
        //开始加载
        loader.load(url);
    }

    checkComplete () {
        if (--this.imageCount <= 0){
            if (this.completeCallback != null){
                var temp = this.completeCallback;
                this.completeCallback = null;
                temp();
            }
        }
    }
}