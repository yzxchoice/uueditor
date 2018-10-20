declare class SelectImage extends eui.Group {
    static uuType: UUType;
    private award;
    private notSelectState;
    private selectState;
    private layoutType;
    private gap;
    private columnCount;
    private awardChangeData;
    private itemHeight;
    private itemWidth;
    private radioWidth;
    private radioHeight;
    constructor(props: any);
    private init();
    private changeAward();
    private createMian();
    private createItem(imgUrl, isSelected);
    private createRadio(isSelected);
    private createLayout();
    private setGroupSize();
    private selectItem(evt);
}
