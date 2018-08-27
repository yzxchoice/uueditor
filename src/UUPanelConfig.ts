// TypeScript file
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
            type: 'size',
            title: '字号',
            componentType: StyleInput
        },
        {
            type: 'drag',
            title: '可拖拽',
            componentType: StyleInput
        },
        {
            type: 'drag',
            title: '可拖拽',
            componentType: StyleInput
        },
    ],
    [UUType.CIRCLE_SECTOR]: [
        {
            type: 'size',
            title: '字号',
            componentType: StyleInput,
        },
        {
            type: 'awards',
            title: '转盘',
            componentType: StyleCircleSector,
        },
    ]
}
