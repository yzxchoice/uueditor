declare class ImagesLoader {
    private completeCallback;
    imageCount: number;
    images: any;
    constructor(completeCallback: any);
    load(imgList: any): void;
    loadImage(url: any): void;
    checkComplete(): void;
}
