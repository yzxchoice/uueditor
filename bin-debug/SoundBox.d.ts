interface uiData {
    id: string;
    name: string;
    url?: string;
}
declare class SoundBox extends eui.Panel {
    private imgList;
    static instance: ImageBox;
    constructor();
    static getInstance(name: any): ImageBox;
    private onAddToStage(event);
    private init();
    private addSound(event);
    open(container: eui.Component): void;
}
