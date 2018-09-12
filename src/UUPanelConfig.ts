// TypeScript file
interface ConfigTotal {
    [key: number]: ConfigItem[];
}
interface ConfigItem {
    type: string;
    title: string;
    componentType: any;
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
var UUPanelConfig: ConfigTotal = {
    [UUType.TEXT]: [
        {
            type: 'text',
            title: '文本',
            componentType: StyleTextInput
        },
        {
            type: 'fontFamily',
            title: '字体',
            componentType: StyleTextSelect,
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
            componentType: StyleTextInput
        },
        {
            type: 'textColor',
            title: '颜色',
            componentType: StyleTextColor
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
            componentType: StyleColor,
        },
        {
            type: 'bdUrl',
            title: '边框',
            componentType: StyleImage,
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
