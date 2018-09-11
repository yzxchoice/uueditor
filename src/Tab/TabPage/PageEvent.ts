// TypeScript file
class PageEvent extends egret.Event
{
    /**
     * 页面切换
     */
    public static PAGE_CHANGE:string = "pageChange";
    /**
     * 增加页面
     */
    public static PAGE_ADD:string = "pageAdd"
    /**
     * 增加图层
     */
    public static LAYER_ADD:string = "layerAdd";
    /**
     * 图层切换
     */
    public static LAYER_CHANGE:string = "layerChange"
    /**
     * 选择图层
     */
    public static LAYER_SELECT:string = "layerSelect"
    /**
     * 改变音效
     */
    public static SOUND_CHANGE: string = "soundChange"
    public data:any;
    public constructor(type:string, bubbles:boolean=false, cancelable:boolean=false)
    {
        super(type,bubbles,cancelable);
    }
}