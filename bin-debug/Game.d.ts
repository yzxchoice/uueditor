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
    bgBox: BgBox;
    soundBox: SoundBox;
    comBox: ComponentBox;
    siderbarSkinBy: SiderbarSkinBy;
    private initEui();
    openComponentPanel(): void;
    openSoundePanel(): void;
    openImagePanel(): void;
    openBgPanel(): void;
    closeImagePanel(): void;
    private drawBg(container, isborder?);
}
