declare class PageBox extends eui.Group implements IUUContainer {
    container: any;
    pages: any[];
    constructor();
    dispose(): void;
    draw(container: any): void;
    private onAddedToStage();
    private init();
    private getPages();
    private render(index?);
    redraw(index?: number): void;
    private pageAdd(event);
}
