declare class PageEvent extends egret.Event {
    static PAGE_CHANGE: string;
    static PAGE_ADD: string;
    static LAYER_ADD: string;
    static LAYER_CHANGE: string;
    static LAYER_SELECT: string;
    data: any;
    constructor(type: string, bubbles?: boolean, cancelable?: boolean);
}
