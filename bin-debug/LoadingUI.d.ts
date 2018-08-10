declare class LoadingUI extends egret.Sprite implements RES.PromiseTaskReporter {
    constructor();
    private textField;
    private progressBar;
    private createView();
    onProgress(current: number, total: number): void;
}
