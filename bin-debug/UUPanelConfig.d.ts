interface ConfigTotal {
    [key: number]: ConfigItem[];
}
interface ConfigItem {
    type: string;
    title: string;
    componentType: any;
    selectData?: {
        content: string;
    }[];
    radioData?: Array<RadioData>;
    checkBoxData?: Array<RadioData>;
    editConfig?: EditConfig;
}
interface RadioData {
    label: string;
    value?: number | string;
    isSelected?: boolean;
}
interface EditConfig {
    headData: string[];
    propsKey: string;
    componenntTypeConfig: {
        [key: string]: string;
    };
}
declare var UUPanelConfig: ConfigTotal;
