class GlobalState {
    static getInstance(): GlobalState {
        if(!this.instance) {
            this.instance = new this();
        }
        return this.instance;
    }

    private static instance: GlobalState | null = null;

    private showState: number = 2; // 显示状态 编辑：1/预览： 2

    getShowState(): number {
        return this.showState;
    }

    changeShowStateToEdit(): void {
        this.showState = 1;
    }

    changeShowStateToPreview(): void {
        this.showState = 2;
    }
}