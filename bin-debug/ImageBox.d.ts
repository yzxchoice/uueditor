declare class ImageBox extends eui.Panel {
    static instance: ImageBox;
    private imgList;
    private _grpLayout;
    private url;
    private params;
    private uutype;
    private container;
    private cb;
    private isForComponent;
    private errTxt;
    constructor();
    static getInstance(): ImageBox;
    private onAddToStage(event);
    getResources(url: string, params: any, uutype: number): Promise<void>;
    private reset();
    renderSound(): void;
    render(): void;
    private init();
    addSound(event: egret.TouchEvent): void;
    private addImage(event);
    private addImageForComponent(event);
    open(container: eui.Component, cb?: Function, isForComponent?: boolean): void;
    close(): void;
}
