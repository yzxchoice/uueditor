/**
 * Game
 */
declare class Game extends eui.Component {
    private borderColor;
    constructor();
    private onAddToStageInit(event);
    editGroup: EditGroup;
    header: Header;
    imgBox: ImageBox;
    Siderbar: Siderbar;
    private initEui();
    openComponentPanel(): void;
    openFramePanel(): void;
    openSoundePanel(): void;
    openImagePanel(): void;
    openBgPanel(): void;
    closeImagePanel(): void;
    private drawBg(container, isborder?);
}
