declare class GlobalState {
    static getInstance(): GlobalState;
    private static instance;
    private showState;
    getShowState(): number;
    changeShowStateToEdit(): void;
    changeShowStateToPreview(): void;
}
