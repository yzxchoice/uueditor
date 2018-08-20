declare class Select extends eui.Component implements IUUContainer {
    container: any;
    dispose(): void;
    draw(container: any): void;
    private selectData;
    private dataContainer;
    private stateObj;
    private isFirstSelect;
    itemWidth: number;
    private itemHeight;
    private gp_selection_rect;
    private gp_selection_box;
    private gp_selection;
    constructor(data: any);
    private onAddedToStage();
    private init();
    setDefaultItem(item: any): void;
    setDataContainer(dataContainer: any): void;
    hide(): void;
    private output();
    private listenEvent();
    setData(data: any): void;
    private createItem(obj);
    private touchSelection2(evt);
    private onMouseover_Selection(evt);
    private removeOverState();
    private onClick_Selection(evt);
}
