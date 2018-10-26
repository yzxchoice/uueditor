interface FunctionForReset {
    reset(): void;
}
interface FunctionForAnswer {
    answer(): void;
}
interface FunctionForStart {
    start(): void;
}
interface IFunctionBtn {
    width: number;
    height: number;
    text: string;
    bgUrl: string;
    functionType: FunctionType;
}
declare class FunctionButton extends eui.Group implements IFunctionBtn {
    static uuType: UUType;
    width: number;
    height: number;
    text: string;
    bgUrl: string;
    functionType: FunctionType;
    private observer;
    constructor(props: any);
    private createUI();
    private listenEvent();
    private emitObserver();
}