// TypeScript file
class PageEvent extends egret.Event
{
    public static PAGE_CHANGE:string = "pageChange";
    public static PAGE_ADD:string = "pageAdd"
    public data:any;
    public constructor(type:string, bubbles:boolean=false, cancelable:boolean=false)
    {
        super(type,bubbles,cancelable);
    }
}