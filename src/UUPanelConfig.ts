// TypeScript file
interface ConfigTotal {
    [key: number]: ConfigItem[];
}
interface ConfigItem {
    type: string;
    title: string;
    componentType: any;
    styleType?: number;
    selectData?: {content: string}[];
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
    }
}
enum LabelStyleType {
    StyleInput = 1,
    StyleSelect = 2,
    StyleImage = 3,
    StyleRadio = 4,
    StyleCheckBox = 5,
    StyleToggleSwitch = 6,
    StyleHSlider = 7,
    StyleColor = 8,
}
var StyleTypeConfig: StyleTypeConfigTotal = {
    [LabelStyleType.StyleInput]: {
        eventName: egret.FocusEvent.FOCUS_OUT,
        skinName: 'resource/skins/StyleInputSkin.exml'
    },
    [LabelStyleType.StyleSelect]: {
        skinName: 'resource/skins/StyleSelect.exml'
    },
    [LabelStyleType.StyleImage]: {
        eventName: egret.TouchEvent.TOUCH_TAP,
        skinName: 'resource/skins/StyleImageSkin.exml'
    },
    [LabelStyleType.StyleToggleSwitch]: {
        eventName: eui.UIEvent.CHANGE,
        skinName: 'resource/skins/StyleToggleSwitchSkin.exml'
    },
    [LabelStyleType.StyleHSlider]: {
        eventName: eui.UIEvent.CHANGE,
        skinName: 'resource/skins/StyleHSliderSkin.exml'
    },
    [LabelStyleType.StyleColor]: {
        eventName: egret.TouchEvent.TOUCH_TAP,
        skinName: 'resource/skins/StyleTextColorSkin.exml'
    },
}
interface StyleTypeConfigTotal {
    [key :number]: StyleTypeConfigItem
}
interface StyleTypeConfigItem {
     eventName?: string;
     skinName: string;
}
var UUPanelConfig: ConfigTotal = {
    [UUType.TEXT]: [
        {
            type: 'text',
            title: '文本',
            componentType: StyleCommon,
            styleType: LabelStyleType.StyleInput,
        },
        {
            type: 'fontFamily',
            title: '字体',
            componentType: StyleCommon,
            styleType: LabelStyleType.StyleSelect,
            selectData: [
                {
                    content: 'Arial'
                },
                {
                    content: 'DFKai-SB'
                },
                {
                    content: 'FangSong'
                },
                {
                    content: 'Georgia'
                },
                {
                    content: 'Helvetica'
                },
                {
                    content: 'KaiTi'
                },
                {
                    content: 'Lucida Family'
                },
		    ]
        },
        {
            type: 'size',
            title: '字号',
            componentType: StyleCommon,
            styleType: LabelStyleType.StyleInput,            
        },
        {
            type: 'textColor',
            title: '颜色',
            componentType: StyleCommon,
            styleType: LabelStyleType.StyleColor,  
        },
    ],
    [UUType.CIRCLE_SECTOR]: [
        {
            type: 'awards',
            title: '转盘',
            componentType: StyleEditBae,
            editConfig: {
                headData: ['文本','图片'],
                propsKey: 'awards',
                componenntTypeConfig: {
                    text: '',
			        url: 'eui.Button'
                },
            }
        },
    ],
    [UUType.SLIDESHOW]: [
        {
            type: 'awards',
            title: '轮播图',
            componentType: StyleEditBae,
            editConfig: {
                headData: ['图片'],
                propsKey: 'awards',
                componenntTypeConfig: {
                    url: 'eui.Button'
                },
            }
        },
    ],
    [UUType.SLOT_MACHINE]: [
        {
            type: 'bgColor',
            title: '背景色',
            componentType: StyleCommon,
            styleType: LabelStyleType.StyleColor,
        },
        {
            type: 'bdUrl',
            title: '边框',
            componentType: StyleCommon,
            styleType: LabelStyleType.StyleImage,  
        },
        {
            type: 'awards',
            title: '老虎机',
            componentType: StyleEditBae,
            editConfig: {
                headData: ['图片'],
                propsKey: 'awards',
                componenntTypeConfig: {
                    url: 'eui.Button'
                },
            }
        }
    ]
}
