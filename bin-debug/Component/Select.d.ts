interface SelectItem {
    content: string;
    [propName: string]: any;
}
declare class Select extends eui.Component implements IUUContainer {
    container: any;
    dispose(): void;
    draw(container: any): void;
    private cb;
    private selectData;
    private dataContainer;
    private stateObj;
    private isFirstSelect;
    itemWidth: number;
    private itemHeight;
    private gp_selection_rect;
    private gp_selection_box;
    private gp_selection;
    constructor(data: SelectItem[], width?: number);
    private onAddedToStage();
    private init();
    setDefaultItem(item: any): void;
    setDataContainer(dataContainer: any): void;
    hide(): void;
    private output();
    listenSelectChange(cb: Function): void;
    private listenEvent();
    setData(data: any): void;
    private createItem(obj);
    private touchSelection2(evt);
    private onMouseover_Selection(evt);
    private removeOverState();
    private onClick_Selection(evt);
}
