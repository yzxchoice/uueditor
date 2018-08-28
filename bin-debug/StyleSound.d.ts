declare class StyleSound extends eui.Group {
    static instance: StyleSound;
    private d;
    private container;
    constructor();
    static getInstance(): StyleSound;
    setData(d: IResource): void;
    private onAddToStage();
    draw(container: any): void;
    reset(): void;
    render(): void;
    select(): void;
    cb(event: PageEvent): void;
}
