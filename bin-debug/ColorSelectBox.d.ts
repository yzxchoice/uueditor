declare class ColorSelectBox extends eui.Component {
    private container;
    private gp_box;
    isShow: boolean;
    private cb;
    private colorPool;
    constructor();
    private onAddedToStage();
    private init();
    private onClick(evt);
    private createShape(color);
    private exchangeColor(color);
    listenColorChange(cb: Function): void;
    draw(container: any): void;
    undraw(): void;
}
