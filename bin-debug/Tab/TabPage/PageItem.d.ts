declare class PageItem extends eui.Group implements IUUContainer {
    pageIndex: number;
    container: TabPage;
    selected: boolean;
    dispose(): void;
    draw(container: any): void;
    undraw(container: any): void;
    constructor(pageIndex: number);
    private onAddedToStage();
    private init();
    private initEvent();
    private changePage(event);
}
