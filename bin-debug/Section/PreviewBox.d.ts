declare class PreviewBox extends eui.Group implements IUUContainer {
    container: Game;
    dispose(): void;
    draw(container: any): void;
    constructor();
    private close(event);
}
