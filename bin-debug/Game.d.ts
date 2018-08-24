/**
 * Game
 */
interface Person {
    name: string;
    age: number;
    location: string;
}
interface PartialPerson {
    name?: string;
    age?: number;
    location?: string;
}
declare class Game extends eui.Component {
    private borderColor;
    constructor();
    private onAddToStageInit(event);
    editGroup: EditGroup;
    header: Header;
    imgBox: ImageBox;
    siderbarSkinBy: SiderbarSkinBy;
    private initEui();
    openComponentPanel(): void;
    openFramePanel(): void;
    openSoundePanel(): void;
    openImagePanel(): void;
    openBgPanel(): void;
    closeImagePanel(): void;
    private drawBg(container, isborder?);
}
