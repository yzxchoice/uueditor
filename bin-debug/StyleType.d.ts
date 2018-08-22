declare class StyleType extends eui.Component implements IUUContainer {
    container: any;
    dispose(): void;
    draw(container: any): void;
    private item;
    private data;
    private styleType;
    private props;
    private _props;
    private gp_styleContainer;
    private dataContainer;
    constructor(styleType: any, props: any);
    private onAddToStage();
    private removeFromStage();
    private clearPanel();
    private initPanel();
    private createComponent(config, props);
    setDataContainer(dataContainer: TabStyle): void;
    private observer(data);
    private defineActive(data, key, value);
    private refresh();
    private isTargetSelected();
}
