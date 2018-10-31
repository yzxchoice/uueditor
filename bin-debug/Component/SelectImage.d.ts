declare class SelectImage extends eui.Group {
    static uuType: UUType;
    private award;
    private radioBorderColor;
    private radioCenterColor;
    constructor(props: any);
    private onAddToStage(event);
    private onRemoveFromStage(event);
    private init();
    private createMian();
    private createItem(imgUrl);
    private createRadio();
    private createLayout();
}
