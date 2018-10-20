declare class UIFactory {
    static createGroup(width?: number, height?: number): eui.Group;
    static createLabel(text: string, textColor?: number, size?: number): eui.Label;
    static createImage(url: string, width?: number, height?: number): eui.Image;
    static createHLayout(gap?: number, horizontalAlign?: string, verticalAlign?: string): eui.HorizontalLayout;
    static createVLayout(gap?: number, horizontalAlign?: string, verticalAlign?: string): eui.VerticalLayout;
    static createTLayout(CCount?: number, hGap?: number, vGap?: number): eui.TileLayout;
    static createLayoutByNum(changeRowNum: number, realRowNum: any, defaultLayout?: string): eui.BasicLayout;
}
