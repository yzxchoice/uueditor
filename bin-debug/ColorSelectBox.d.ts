declare class ColorSelectBox extends eui.Component {
    private container;
    private gp_box;
    isShow: boolean;
    private colorPool;
    constructor();
    private onAddedToStage();
    private init();
    private onClick(evt);
    private createShape(color);
    private exchangeColor(color);
    draw(container: any): void;
    undraw(): void;
}
