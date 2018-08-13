class Drag {
    private target:any;
    private stage:any;
    private distanceX:number;
    private distanceY:number;    
    private onTouchBegin = (evt:egret.TouchEvent) => {
        this.distanceX = evt.stageX - this.target.x;
        this.distanceY = evt.stageY - this.target.y;            
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
    }
    private onTouchEnd = (evt:egret.TouchEvent) => {
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
    }
    private onTouchMove = (evt:egret.TouchEvent) => {
        this.target.x = evt.stageX - this.distanceX;
        this.target.y = evt.stageY - this.distanceY; 
    }
    constructor(target, stage){
        this.target = target;
        this.stage = stage;
    }    
    public on(){
        this.target.touchEnabled = true;        
        this.target.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.target.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    }
    public off(){
        this.target.touchEnabled = false;        
        this.target.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.target.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    }
}