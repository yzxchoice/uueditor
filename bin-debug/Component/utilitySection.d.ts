declare enum LayoutType {
    HLayout = 1,
    VLayout = 2,
    TLayout = 3,
}
declare enum GapType {
    Small = 1,
    Middle = 2,
    Big = 3,
}
interface ILayout {
    layoutType: LayoutType;
    gap: GapType;
    columnCount?: number;
}
declare enum FunctionType {
    RESET = 1,
    ANSWER = 2,
    START = 3,
}
declare class SwitchState {
    static switchFunctionType(functionType: FunctionType): string;
}
