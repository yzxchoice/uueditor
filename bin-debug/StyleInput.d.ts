declare class StyleInput extends StyleBase {
    private textInput_input;
    constructor(config: any, props: any);
    protected initEvent(): void;
    private onFocusOut(evt);
}
