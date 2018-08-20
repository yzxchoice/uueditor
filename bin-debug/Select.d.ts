declare class Select extends eui.Component {
    private selectData;
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
    private listenEvent();
    setData(data: any): void;
    private createItem(obj);
    private touchSelection2(evt);
    private onMouseover_Selection(evt);
    private removeOverState();
    private onClick_Selection(evt);
}
