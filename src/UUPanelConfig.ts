// TypeScript file
interface ConfigItem {
    type: string;
    title: string;
    componentType: any;
    selectData?: {content: string}[];
}
var UUPanelConfig = {
    [UUType.TEXT]: [
        {
            type: 'text',
            title: '文本',
            componentType: StyleInput
        },
        {
            type: 'fontFamily',
            title: '字体',
            componentType: StyleSelect,
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
            componentType: StyleInput
        },
        {
            type: 'textColor',
            title: '颜色',
            componentType: StyleTextColor
        },
    ],
    [UUType.IMAGE]: [
        {
            type: 'drag',
            title: '可拖拽',
            componentType: StyleInput
        }
    ],
    [UUType.CIRCLE_SECTOR]: [
        {
            type: 'awards',
            title: '转盘',
            componentType: StyleCircleSector,
        },
    ],
    [UUType.SLIDESHOW]: [
        {
            type: 'awards',
            title: '轮播图',
            componentType: StyleSlideshow,
        },
    ],
    [UUType.SLOT_MACHINE]: [
        {
            type: 'bgColor',
            title: '背景色',
            componentType: StyleTextColor,
        },
        {
            type: 'bdUrl',
            title: '边框',
            componentType: StyleImage,
        },
        {
            type: 'awards',
            title: '老虎机',
            componentType: StyleSlideshow,
        }
    ]
}
