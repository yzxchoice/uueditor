declare class Siderbar extends eui.Component implements IUUContainer {
    container: Game;
    editGroup: EditGroup;
    tool: TransformTool;
    dispose(): void;
    draw(container: any): void;
    private static _instance;
    static getInstance(): Siderbar;
    component_style: TabStyle;
    component_animation: TabAnimation;
    component_event: TabEvent;
    component_layer: TabLayer;
    private gp_tabs;
    private scl_eventContainer;
    constructor();
    selectTarget(): void;
    moveTarget(): void;
    upTarget(): void;
    renderOneDisplay(): void;
    updateDisplay(display: Picture): void;
    private onAddToStageInit(event);
    private init();
    private listenEvent();
    private touchTabsClick(evt);
}
