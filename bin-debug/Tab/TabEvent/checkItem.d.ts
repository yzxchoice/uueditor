declare class CheckItem extends eui.Group {
    private _isOver;
    isOver: boolean;
    private _isSelected;
    isSelected: boolean;
    private labelText;
    private shape;
    checkBox: eui.CheckBox;
    constructor(labelText: string);
    private onAddToStage();
}
