declare class CardAlert extends eui.Group {
    static uuType: UUType;
    private title;
    private content;
    width: number;
    height: number;
    private bdUrl;
    private btn_close;
    constructor(props: any);
    private onAddToStage(event);
    private onRemoveFromStage(event);
    private init();
    private createContentBorder();
    private createContent();
    closePanel(): void;
}
