declare class PageEvent extends egret.Event {
    /**
     * 页面切换
     */
    static PAGE_CHANGE: string;
    /**
     * 增加页面
     */
    static PAGE_ADD: string;
    /**
     * 增加图层
     */
    static LAYER_ADD: string;
    /**
     * 图层切换
     */
    static LAYER_CHANGE: string;
    /**
     * 选择图层
     */
    static LAYER_SELECT: string;
    /**
     * 改变音效
     */
    static SOUND_CHANGE: string;
    data: any;
    constructor(type: string, bubbles?: boolean, cancelable?: boolean);
}
