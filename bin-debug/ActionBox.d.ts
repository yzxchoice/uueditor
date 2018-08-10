declare class ActionBox extends eui.Panel implements IUUContainer {
    container: Game;
    dispose(): void;
    draw(container: any): void;
    private imgList;
    static instance: ImageBox;
    constructor();
    static getInstance(name: any): ImageBox;
    private onAddToStage(event);
    private init();
    private addImage(event);
    open(container: eui.Component): void;
}
