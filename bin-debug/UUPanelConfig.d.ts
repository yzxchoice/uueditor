declare var UUPanelConfig: {
    [x: number]: ({
        type: string;
        title: string;
        componentType: typeof StyleInput;
    } | {
        type: string;
        title: string;
        componentType: string;
        selectData: {
            content: string;
        }[];
    } | {
        type: string;
        title: string;
        componentType: string;
    })[];
    2: {
        type: string;
        title: string;
        componentType: string;
    }[];
};
