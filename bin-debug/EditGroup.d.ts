declare class EditGroup extends eui.Group {
    displayList: any[];
    tool: any;
    maskTool: TransformTool;
    pages: any[];
    pageIndex: number;
    private borderColor;
    private displayGroup;
    private SiderbarSkinBy;
    constructor();
    protected createChildren(): void;
    private onAddToStage(event);
    private bindHandlers();
    private initEui();
    private getPages();
    private init();
    setupTool(): void;
    getCustomControls(): EgretControl[];
    down(event: egret.TouchEvent): boolean;
    move(event: egret.TouchEvent): void;
    up(event: egret.TouchEvent): void;
    private setProperty(x?, y?);
    applyDynamicControls(event: any): void;
    getDynamicControl(): any;
    findControlByType(type: any): any;
    containsPoint(x: number, y: number): boolean;
    select(event: PageEvent): void;
    selectImage(x: number, y: number): boolean;
    private renderResources(index);
    render(): void;
    renderOneDisplay(): void;
    clear(): void;
    reset(): void;
    drawDisplayList(): void;
    pre(event: egret.TouchEvent): void;
    next(event: egret.TouchEvent): void;
    go(event: PageEvent): void;
    updateDisplay(display: Picture): void;
    updateDisplayProps(display: Picture): void;
    triggerMaskById(imageId: any): void;
    addResource(data: uiData, uutype: number): void;
    addSinglePicture(data: uiData): void;
    changeBg(data: uiData): void;
    addSound(data: uiData): void;
    addComponent(data: uiData): void;
    addFrame(data: uiData): void;
    addPage(): void;
    addText(): void;
}
