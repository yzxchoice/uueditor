declare class PageEvent extends egret.Event {
    static PAGE_CHANGE: string;
    static PAGE_ADD: string;
    data: any;
    constructor(type: string, bubbles?: boolean, cancelable?: boolean);
}
