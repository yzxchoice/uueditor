interface Item {
    value: string;
    componentType: any;
    selectData?: {
        content: string;
    }[];
}
declare class Table extends eui.Group {
    private gp_box;
    private headData;
    private container;
    isShow: boolean;
    private columnNum;
    private rowNum;
    private lineHeight;
    private boxWidth;
    private btn_add;
    private btn_del;
    private btn_sure;
    private activeRow;
    private activeIndex;
    private data;
    private _data;
    private cb;
    constructor(headDate: any, data: any);
    private onAddToStage();
    private init();
    private reload();
    private initEvent();
    private btn_add_click();
    private btn_del_click(evt);
    private btn_sure_click();
    private createHead();
    private createRow(obj, index);
    private createTh(value);
    private createTd(key, value);
    draw(container: any): void;
    undraw(): void;
    listenChange(cb: any): void;
    private createTileLayout(columnCount);
    private createBtnBox();
    private createBtn(content);
    private onFocusIn(evt);
    private onFocusOut(evt);
    private observer(data);
}
