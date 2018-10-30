class SelectImage extends eui.Group {

    static uuType = UUType.SELECT_IMAGE;
    // props
    private award: IResource[] = [];
    private radioBorderColor: string = '0x000000';
    private radioCenterColor: string = '0x000000';

    constructor(props) {
        super();
        this.award = props.award;
        if(props.radioBorderColor) {
            this.radioBorderColor = props.radioBorderColor;
        }
        if(props.radioCenterColor) {
            this.radioCenterColor = props.radioCenterColor;
        }
        this.touchEnabled = false;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
    }

    private onAddToStage (event:egret.Event) {
		this.init()
    }

    private onRemoveFromStage (event: egret.Event) {

    }

    private init() {
        this.addChild(this.createMian());
    }

    private createMian(): eui.Group {
        let group = UIFactory.createGroup(720, 360);
        group.layout = this.createLayout();
        for(let i = 0, len = this.award.length; i < len; i++) {
            group.addChild(this.createItem(this.award[i].url));
        }
        return group;
    }

    private createItem(imgUrl: string): eui.Group {
        let group = UIFactory.createGroup(150, 220);
        group.layout = UIFactory.createVLayout(10, egret.VerticalAlign.JUSTIFY);
        let img = UIFactory.createImage(imgUrl, 150, 150);
        group.addChild(img);
        group.addChild(this.createRadio());
        return group;
    }

    private createRadio(): eui.Group {
        let group = UIFactory.createGroup(50, 50);

        let border = new egret.Shape();
        border.graphics.lineStyle(2, Number(this.radioBorderColor));
        border.graphics.beginFill( 0xff0000, 0);
        border.graphics.drawCircle( 0, 0, 50 );
        border.graphics.endFill();

        let center = new egret.Shape();
        center.graphics.beginFill(Number(this.radioCenterColor))
        border.graphics.drawCircle( 0, 0, 40 );
        border.graphics.endFill();

        group.addChild(border);
        group.addChild(center);

        return group;
    }

    private createLayout(): eui.BasicLayout {
        let layout: eui.BasicLayout;
        layout = UIFactory.createLayoutByNum(3, this.award.length);
        return layout;
    }
}