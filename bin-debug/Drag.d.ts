declare class Drag {
    private target;
    private stage;
    private distanceX;
    private distanceY;
    private onTouchBegin;
    private onTouchEnd;
    private onTouchMove;
    constructor(target: any, stage: any);
    on(): void;
    off(): void;
}
