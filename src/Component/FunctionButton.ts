interface FunctionForReset {
    reset(): void;
}

interface FunctionForAnswer {
    answer(): void;
}

interface FunctionForStart {
    start(): void;
}

enum FunctionType {
    RESET = 1,
    ANSWER = 2,
    START = 3,
}

interface IFunctionBtn {
    width: number,
    height: number,
    text: string,
    bgUrl: string,
    functionType: FunctionType,
}

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
        let label = new UULabel;
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
        console.log('emit = ' + this.getEmitName(this.functionType));
        this.observer.emit(this.getEmitName(this.functionType));
    }

    private getEmitName(functionType: FunctionType): string {
        let emitName: string;
        switch(functionType) {
            case FunctionType.RESET:
                emitName = 'reset';
                break;
            case FunctionType.ANSWER:
                emitName = 'answer';
                break;
            case FunctionType.START:
                emitName = 'start';
                break;
        }
        return emitName;
    }
}