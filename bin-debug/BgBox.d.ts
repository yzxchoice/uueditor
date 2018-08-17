declare class BgBox extends eui.Panel {
    private imgList;
    static instance: ImageBox;
    private _grpLayout;
    constructor();
    static getInstance(name: any): ImageBox;
    private onAddToStage(event);
    private init();
    private addImage(event);
    open(container: eui.Component): void;
}
