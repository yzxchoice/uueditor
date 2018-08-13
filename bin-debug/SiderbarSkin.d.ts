declare class SiderbarSkinBy extends eui.Component implements IUUContainer {
    container: Game;
    editGroup: EditGroup;
    dispose(): void;
    draw(container: any): void;
    private static _instance;
    static getInstance(): SiderbarSkinBy;
    private tool;
    private gp_tabs;
    private gp_container_addEvent;
    private btn_add_event;
    private gp_add_click_event;
    private gp_eventContainer_event_click;
    private gp_selection_rect;
    private gp_selection;
    private gp_eventSetContainer;
    private gp_inputContainer;
    stateObj: {
        selectionVisible: boolean;
    };
    selectionVisible: boolean;
    private isFirstSelect;
    private targetItemId;
    private _triggerGroup;
    triggerGroup: Array<any>;
    relevanceItemIdList: any[];
    private relevanceItemIdObj;
    static defaultRelevanceItem: {
        "delay": number;
        "eventType": number;
        "sourceId": number;
        "sourceType": string;
        "targetId": number;
        "targetState": number;
        "targetType": string;
    };
    data: Object;
    constructor();
    private onAddToStageInit(event);
    private init();
    private initLayout();
    private listenEvent();
    setTarget(tool: any): void;
    updateTarget(): void;
    private touchTabsClick(evt);
    private touchAddEvent(evt);
    private addClickEventItem(evt);
    private touchSelection2();
    private onMouseover_Selection(evt);
    private onClick_Selection(evt);
    private drawEventSet(eventSetMessage);
    private pushEventSet(eventSetMessage);
    removeEventSet(eventSetMessage: any): void;
    private initShowEventSetList();
    private onFocusOut(evt);
}