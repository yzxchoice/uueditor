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
    initEui(): Promise<void>;
    openComponentPanel(): void;
    openFramePanel(): void;
    openSoundePanel(cb?: Function): void;
    openImagePanel(cb?: Function, isForComponent?: boolean): void;
    openBgPanel(): void;
    closeImagePanel(): void;
    private drawBg(container, isborder?);
}
