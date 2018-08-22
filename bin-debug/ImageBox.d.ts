declare class ImageBox extends eui.Panel {
    static instance: ImageBox;
    private imgList;
    private _grpLayout;
    private url;
    private params;
    private uutype;
    private container;
    constructor();
    static getInstance(): ImageBox;
    private onAddToStage(event);
    getResources(url: string, params: any, uutype: number): Promise<void>;
    private reset();
    render(): void;
    private init();
    private addImage(event);
    open(container: eui.Component): void;
    close(): void;
}
