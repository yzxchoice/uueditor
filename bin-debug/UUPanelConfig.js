var UUPanelConfig = (_a = {},
    _a[UUType.TEXT] = [
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
    _a[UUType.CIRCLE_SECTOR] = [
        {
            type: 'awards',
            title: '转盘',
            componentType: StyleEditBae,
            editConfig: {
                headData: ['文本', '图片'],
                propsKey: 'awards',
                componenntTypeConfig: {
                    text: '',
                    url: 'eui.Button'
                },
            }
        },
    ],
    _a[UUType.SLIDESHOW] = [
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
    _a[UUType.SLOT_MACHINE] = [
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
    ],
    _a);
var _a;
