interface ConfigItem {
    type: string;
    title: string;
    componentType: any;
    selectData?: {
        content: string;
    }[];
    radioData?: Array<RadioData>;
    checkBoxData?: Array<RadioData>;
}
interface RadioData {
    label: string;
    value?: number | string;
    isSelected?: boolean;
}
declare var UUPanelConfig: {
    [x: number]: ({
        type: string;
        title: string;
        componentType: typeof StyleTextInput;
    } | {
        type: string;
        title: string;
        componentType: typeof StyleTextSelect;
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
        componentType: typeof StyleColor;
    } | {
        type: string;
        title: string;
        componentType: typeof StyleImage;
    } | {
        type: string;
        title: string;
        componentType: typeof StyleSlideshow;
    })[];
};
