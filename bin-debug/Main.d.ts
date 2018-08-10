declare class Main extends eui.UILayer {
    protected createChildren(): void;
    private runGame();
    private loadResource();
    private loadTheme();
    private textfield;
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene(): void;
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result);
}
