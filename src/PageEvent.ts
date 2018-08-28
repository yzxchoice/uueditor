// TypeScript file
class PageEvent extends egret.Event
{
    public static PAGE_CHANGE:string = "pageChange";
    public static PAGE_ADD:string = "pageAdd"
    public static LAYER_ADD:string = "layerAdd";
    public static LAYER_CHANGE:string = "layerChange"
    public static LAYER_SELECT:string = "layerSelect"

    public static SOUND_CHANGE: string = "soundChange"
    public data:any;
    public constructor(type:string, bubbles:boolean=false, cancelable:boolean=false)
    {
        super(type,bubbles,cancelable);
    }
}