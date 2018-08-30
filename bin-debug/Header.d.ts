declare class Header extends eui.Group implements IUUContainer {
    container: Game;
    dispose(): void;
    draw(container: any): void;
    constructor();
    private onAddToStage(event);
    private init();
    save(event: egret.TouchEvent): Promise<void>;
    onAddText(): void;
    onAddPage(event: egret.TouchEvent): void;
    preview(event: egret.TouchEvent): void;
    openComponentPanel(event: egret.TouchEvent): void;
    openFramePanel(event: egret.TouchEvent): void;
    openSoundPanel(event: egret.TouchEvent): void;
    openImagePanel(event: egret.TouchEvent): void;
    openBgPanel(event: egret.TouchEvent): void;
}
