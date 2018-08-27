// TypeScript file
var UUPanelConfig = (_a = {},
    _a[UUType.TEXT] = [
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
    _a[UUType.IMAGE] = [
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
    _a[UUType.CIRCLE_SECTOR] = [
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
    ],
    _a);
var _a;
