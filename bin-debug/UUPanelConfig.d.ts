interface ConfigTotal {
    [key: number]: ConfigItem[];
}
interface ConfigItem {
    type: string;
    title: string;
    componentType: any;
    styleType?: number;
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
declare enum LabelStyleType {
    StyleInput = 1,
    StyleSelect = 2,
    StyleImage = 3,
    StyleRadio = 4,
    StyleCheckBox = 5,
    StyleToggleSwitch = 6,
    StyleHSlider = 7,
    StyleColor = 8,
}
declare var StyleTypeConfig: StyleTypeConfigTotal;
interface StyleTypeConfigTotal {
    [key: number]: StyleTypeConfigItem;
}
interface StyleTypeConfigItem {
    eventName?: string;
    skinName: string;
}
declare var UUPanelConfig: ConfigTotal;
