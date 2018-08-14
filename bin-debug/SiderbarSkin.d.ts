declare class SiderbarSkinBy extends eui.Component implements IUUContainer {
    container: Game;
    editGroup: EditGroup;
    dispose(): void;
    draw(container: any): void;
    private static _instance;
    static getInstance(): SiderbarSkinBy;
    component_style: TabStyle;
    component_animation: TabAnimation;
    component_event: TabEvent;
    private gp_tabs;
    private pagebox;
    constructor();
    private onAddToStageInit(event);
    private init();
    private listenEvent();
    private touchTabsClick(evt);
}
