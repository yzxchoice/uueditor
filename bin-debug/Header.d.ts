declare class Header extends eui.Group implements IUUContainer {
    container: Game;
    dispose(): void;
    draw(container: any): void;
    constructor();
    private onAddToStage(event);
    private init();
    private save(event);
    private onPostComplete(event);
    private onPostIOError(event);
    private onPostProgress(event);
    onAddPage(event: egret.TouchEvent): void;
    preview(event: egret.TouchEvent): void;
    openComponentPanel(event: egret.TouchEvent): void;
    openSoundPanel(event: egret.TouchEvent): void;
    openImagePanel(event: egret.TouchEvent): void;
    openBgPanel(event: egret.TouchEvent): void;
}
