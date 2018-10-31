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
    width: number,
    height: number,
    text: string,
    bgUrl: string,
    functionType: FunctionType,
}

/**
 * 功能按钮
 * 1、提供reset、answer、start三种功能
 */
class FunctionButton extends eui.Group implements IFunctionBtn {
    
    static uuType = UUType.FUNCTION_BUTTON;
    // props
    width: number = 200;
    height: number = 60;
    text: string;
    bgUrl: string;
    functionType: FunctionType = FunctionType.RESET;

    // 观察者
    private observer: Observer = Observer.getInstance();

    constructor(props) {
        super();
        for(let key in props) {
            this[key] = props[key];
        };
        this.createUI();
        this.listenEvent();
    }

    private createUI(): void {
        let bgImg = new eui.Image();
        bgImg.source = this.bgUrl;
        bgImg.width = this.width;
        bgImg.height = this.height;
        let label = new eui.Label();
        label.text = this.text;
        label.width = this.width;
        label.height = this.height;
        label.verticalAlign = 'middle';
        label.textAlign = 'center';
        this.addChild(bgImg);
        this.addChild(label);
    }

    private listenEvent(): void {
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.emitObserver, this);
    }

    private emitObserver(): void {
        this.observer.emit(SwitchState.switchFunctionType(this.functionType));
    }
}