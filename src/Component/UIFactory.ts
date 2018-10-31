
/**
 * UI工厂类
 */
class UIFactory {
    static createGroup(width?: number, height?: number): eui.Group {
        let group = new eui.Group;
        if(width) {
            group.width = width;
        }
        if(height) {
            group.height = height;
        }
        return group;
    }

    static createLabel(text: string, textColor: number = 0x000000, size?: number): eui.Label {
        let label = new eui.Label();
        label.text = text;
        label.textColor = textColor;
        if(size) {
            label.size = size;
        }
        return label
    }

    static createImage(url: string, width?: number, height?: number): eui.Image {
        let image = new eui.Image();
        image.source = url;
        if(width) {
            image.width = width;
        }
        if(height) {
            image.height = height;
        }
        return image;
    }

    static createHLayout(gap: number = 10, horizontalAlign: string = egret.HorizontalAlign.LEFT, verticalAlign: string = egret.VerticalAlign.TOP): eui.HorizontalLayout {
        let hLayout = new eui.HorizontalLayout();
        hLayout.gap = gap;
        hLayout.horizontalAlign = horizontalAlign;
        hLayout.verticalAlign = verticalAlign;
        return hLayout;
    }

    static createVLayout(gap: number = 10, horizontalAlign: string = egret.HorizontalAlign.LEFT, verticalAlign: string = egret.VerticalAlign.TOP): eui.VerticalLayout {
        let vLayout = new eui.VerticalLayout();
        vLayout.gap = gap;
        vLayout.horizontalAlign = horizontalAlign;
        vLayout.verticalAlign = verticalAlign;
        return vLayout;
    }

    static createTLayout(CCount: number = 1, hGap: number = 10, vGap: number = 10): eui.TileLayout {
        let tLayout = new eui.TileLayout();
        tLayout.requestedColumnCount = CCount;
        tLayout.horizontalGap = hGap;
        tLayout.verticalGap = vGap;
        return tLayout;
    }

    static createLayoutByNum(changeRowNum: number, realRowNum, defaultLayout: string = 'h'): eui.BasicLayout {
        let layout: eui.BasicLayout;
        if(realRowNum <= changeRowNum) {
            if(defaultLayout === 'h') {
                layout = this.createHLayout();
            }else {
                layout = this.createVLayout();
            }
        }else {
            layout = this.createTLayout(changeRowNum);
        }
        return layout;
    }

}