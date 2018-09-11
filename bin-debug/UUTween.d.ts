declare class UUTween extends egret.DisplayObjectContainer {
    /**
     * 图像容器
     */
    private _shape;
    /**
     * 开始点
     */
    private _startShape;
    /**
     * 中间点
     */
    private _control;
    /**
     * 结束点
     */
    private _anchor;
    /**
     * x轴偏移
     */
    private offsetX;
    /**
     * y轴偏移
     */
    private offsetY;
    tool: TransformTool;
    /**
     * 实际显示对象
     */
    target: any;
    /**
     * 容器
     */
    protected container: any;
    /**
     * 图层数据对象
     */
    data: UUData<null>;
    /**
     * 动画数据接口
     */
    private tweener;
    /**
     * 动画类
     */
    private tweenBox;
    constructor(container: any);
    private onAddToStage(event);
    setTool(tool: TransformTool, tweenBox: TweenControl): void;
    reset(): void;
    private initGraphics();
    /**
     * 初始化动画类的数值
     */
    private init();
    /**
     * 初始化控制点
     */
    private initShape(x, y, color);
    private drapShape;
    private onBeginHandler(e);
    private onMoveHandler(e);
    private onEndHandler(e);
}
