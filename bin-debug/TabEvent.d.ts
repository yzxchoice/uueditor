declare class TabEvent extends eui.Component implements IUUContainer {
    container: SiderbarSkinBy;
    editGroup: EditGroup;
    dispose(): void;
    draw(container: SiderbarSkinBy): void;
    private gp_selection_rect;
    private gp_selection;
    private gp_eventSetContainer;
    stateObj: {
        selectionVisible: boolean;
    };
    private isFirstSelect;
    private targetItemId;
    private _triggerGroup;
    triggerGroup: Array<any>;
    relevanceItemIdList: any[];
    private relevanceItemIdObj;
    private defaultRelevanceItem;
    constructor();
    private onAddedToStage();
    private init();
    private initLayout();
    private listenEvent();
    getTargetItemId(): void;
    private touchSelection2(evt);
    private onMouseover_Selection(evt);
    private removeOver();
    private onClick_Selection(evt);
    private drawEventSet(eventSetMessage);
    private pushEventSet(eventSetMessage);
    removeEventSet(eventSetMessage: any): void;
    private initShowEventSetList();
}
