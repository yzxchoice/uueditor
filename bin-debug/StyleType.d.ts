declare class StyleType extends eui.Component implements IUUContainer {
    container: any;
    dispose(): void;
    draw(container: any): void;
    private siderbar;
    private item;
    private data;
    private styleType;
    private props;
    private _props;
    private gp_styleContainer;
    constructor(styleType: any, props: any);
    private onAddToStage();
    private removeFromStage();
    private clearPanel();
    private initPanel();
    private createComponent(config, props);
    private bindData();
    private observer(data);
    private defineActive(data, key, value);
    private refresh();
    private isTargetSelected();
}
