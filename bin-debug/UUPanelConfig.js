var LabelStyleType;
(function (LabelStyleType) {
    LabelStyleType[LabelStyleType["StyleInput"] = 1] = "StyleInput";
    LabelStyleType[LabelStyleType["StyleSelect"] = 2] = "StyleSelect";
    LabelStyleType[LabelStyleType["StyleImage"] = 3] = "StyleImage";
    LabelStyleType[LabelStyleType["StyleRadio"] = 4] = "StyleRadio";
    LabelStyleType[LabelStyleType["StyleCheckBox"] = 5] = "StyleCheckBox";
    LabelStyleType[LabelStyleType["StyleToggleSwitch"] = 6] = "StyleToggleSwitch";
    LabelStyleType[LabelStyleType["StyleHSlider"] = 7] = "StyleHSlider";
    LabelStyleType[LabelStyleType["StyleColor"] = 8] = "StyleColor";
})(LabelStyleType || (LabelStyleType = {}));
var StyleTypeConfig = (_a = {},
    _a[LabelStyleType.StyleInput] = {
        eventName: egret.FocusEvent.FOCUS_OUT,
        skinName: 'resource/skins/StyleInputSkin.exml'
    },
    _a[LabelStyleType.StyleSelect] = {
        skinName: 'resource/skins/StyleSelect.exml'
    },
    _a[LabelStyleType.StyleImage] = {
        eventName: egret.TouchEvent.TOUCH_TAP,
        skinName: 'resource/skins/StyleImageSkin.exml'
    },
    _a[LabelStyleType.StyleToggleSwitch] = {
        eventName: eui.UIEvent.CHANGE,
        skinName: 'resource/skins/StyleToggleSwitchSkin.exml'
    },
    _a[LabelStyleType.StyleHSlider] = {
        eventName: eui.UIEvent.CHANGE,
        skinName: 'resource/skins/StyleHSliderSkin.exml'
    },
    _a[LabelStyleType.StyleColor] = {
        eventName: egret.TouchEvent.TOUCH_TAP,
        skinName: 'resource/skins/StyleTextColorSkin.exml'
    },
    _a);
var UUPanelConfig = (_b = {},
    _b[UUType.TEXT] = [
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
    _b[UUType.CIRCLE_SECTOR] = [
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
    _b[UUType.SLIDESHOW] = [
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
    _b[UUType.SLOT_MACHINE] = [
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
    ],
    _b);
var _a, _b;
