declare class Header extends eui.Group implements IUUContainer {
    container: Game;
    dispose(): void;
    draw(container: any): void;
    constructor();
    private onAddToStage(event);
    private init();
    preview(event: egret.TouchEvent): void;
    openComponentPanel(event: egret.TouchEvent): void;
    openSoundPanel(event: egret.TouchEvent): void;
    openImagePanel(event: egret.TouchEvent): void;
    openBgPanel(event: egret.TouchEvent): void;
}
