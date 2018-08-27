declare var UUPanelConfig: {
    [x: number]: ({
        type: string;
        title: string;
        componentType: typeof StyleInput;
    } | {
        type: string;
        title: string;
        componentType: typeof StyleSelect;
        selectData: {
            content: string;
        }[];
    } | {
        type: string;
        title: string;
        componentType: typeof StyleTextColor;
    })[] | ({
        type: string;
        title: string;
        componentType: typeof StyleInput;
    } | {
        type: string;
        title: string;
        componentType: typeof StyleCircleSector;
    })[];
};
