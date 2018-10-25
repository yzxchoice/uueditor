enum LayoutType {
    HLayout = 1,
    VLayout = 2,
    TLayout = 3,
}

enum GapType {
    Small = 1,
    Middle = 2,
    Big = 3,
}

interface ILayout {
    layoutType: LayoutType,
    gap: GapType,
    columnCount?: number,
}

enum FunctionType {
    RESET = 1,
    ANSWER = 2,
    START = 3,
}

class SwitchState {
    static switchFunctionType(functionType: FunctionType): string {
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

