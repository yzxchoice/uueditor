class SelectImage extends eui.Group {

    static uuType = UUType.SELECT_IMAGE;
    // props
    private award: IResource[] = [];
    private notSelectState: string;
    private selectState: string;
    // props layout
    private layoutType: LayoutType = LayoutType.HLayout;
    private gap: GapType = GapType.Small;
    private columnCount: number;

    // award changeData
    private awardChangeData: any[] = [];
    // item data 
    private itemHeight = 220;
    private itemWidth = 150;
    private radioWidth = 50;
    private radioHeight = 50;

    constructor(props) {
        super();
        console.log('selectImg...');
        this.award = props.award;
        this.notSelectState = props.notSelectState;
        this.selectState = props.selectState;

        if(props.layoutSet.layoutType) {
            this.layoutType = props.layoutSet.layoutType;
        }
        if(props.layoutSet.gap) {
            this.gap = props.layoutSet.gap;
        }
        if(props.layoutSet.columnCount) {
            this.columnCount = props.layoutSet.columnCount;
        }

        this.touchEnabled = false;
        this.init();
    }

    private init() {
        this.changeAward();
        this.addChild(this.createMian());
        this.setGroupSize();
    }

    private changeAward() {
        this.awardChangeData = [...this.award];
        for(let i = 0, len = this.awardChangeData.length; i < len; i++) {
            this.awardChangeData[i].isSelected = false;
        }
    }

    private createMian(): eui.Group {
        let group = UIFactory.createGroup(720, 360);
        group.layout = this.createLayout();
        for(let i = 0, len = this.awardChangeData.length; i < len; i++) {
            let item = this.createItem(this.awardChangeData[i].url, this.awardChangeData[i].isSelected);
            item.name = i.toString();
            group.addChild(item);
        }
        return group;
    }

    private createItem(imgUrl: string, isSelected: boolean): eui.Group {
        let group = UIFactory.createGroup(this.itemWidth, this.itemHeight);

        let img = UIFactory.createImage(imgUrl, this.itemWidth, this.itemWidth);
        img.horizontalCenter = 0;
        img.top = 0;

        let radio = this.createRadio(isSelected);
        radio.horizontalCenter = 0;
        radio.bottom = 0;

        group.addChild(img);
        group.addChild(radio);
        group.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectItem, this);
        return group;
    }

    private createRadio(isSelected: boolean): eui.Image {
        let radioImage: eui.Image;
        if(isSelected) {
            radioImage = UIFactory.createImage(this.selectState, this.radioWidth, this.radioHeight);
        }else {
            radioImage = UIFactory.createImage(this.notSelectState, this.radioWidth, this.radioHeight);
        }
        return radioImage;
    }

    private createLayout(): eui.BasicLayout {
        return LayoutFactory.main(this.layoutType, this.gap, this.columnCount);
    }

    private setGroupSize(): void {
        let obj = LayoutFactory.setGroupSize(this.award.length, this.itemWidth, this.itemHeight, this.layoutType, this.gap, this.columnCount);
        this.width = obj.width;
        this.height = obj.height;
    }

    private selectItem(evt: egret.Event) {
        console.log(evt.currentTarget);        
        let item = evt.currentTarget;
        let index = Number(item.name);
        this.awardChangeData.forEach(item => item.isSelected = false);
        this.awardChangeData[index].isSelected = true;
        this.removeChildren();
        this.addChild(this.createMian());
    }
}