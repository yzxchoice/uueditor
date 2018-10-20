class CardAlert extends eui.Group {

    static uuType = UUType.CARDALERT;
    // props
    private title: string;
    private content: any;

    width: number = 600;
    height: number = 400;
    private bdUrl: string = '/assets/pic/draw_card_bg.png';
    private btn_close: string = '/assets/pic/btn_close.png';

    constructor(props) {
        super();
        console.log('CardAlert Instance...');
        console.log('hello')
        this.title = props.title;
		this.content = props.content;
        this.touchEnabled = false;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
    }

    private onAddToStage (event:egret.Event) {
		this.init()
    }

    private onRemoveFromStage (event: egret.Event) {

    }

    private async init(){
        let bg = UIFactory.createImage("resource/"+this.bdUrl, this.width, this.height);

        let btn = UIFactory.createImage("resource/"+this.btn_close, 50, 50);
        btn.right = 10;
        btn.top = 10;
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);

        let title = UIFactory.createLabel(this.title, 0x000000, 30);
        title.horizontalCenter = 0;
        title.top = 40;

        let contentGroup = UIFactory.createGroup(400, 260);
        contentGroup.horizontalCenter = 0;
        contentGroup.bottom = 30;

        let contentBorder = this.createContentBorder();
        let content = this.createContent();

        contentGroup.addChild(contentBorder);
        contentGroup.addChild(content);

		this.addChild(bg);
		this.addChild(btn);	
        this.addChild(title);
        this.addChild(contentGroup);
	}

    private createContentBorder() {
        var shp:egret.Shape = new egret.Shape();
        shp.graphics.lineStyle( 2, 0x00ff00 );
        shp.graphics.beginFill( 0xff0000, 0);
        shp.graphics.drawRect( 0, 0, 400, 260 );
        shp.graphics.endFill();
        return shp;
    }

    private createContent() {
        let group = new eui.Group();
        group.percentWidth = 100;
        group.percentHeight = 100;
        let type = this.content.type;
        if(type === 'text') {   
            let label = UIFactory.createLabel(this.content.message, 0x000000, 40)
            label.horizontalCenter = 0;
            label.verticalCenter = 0;         
            group.addChild(label);
        }else {
            let image = UIFactory.createImage("resource/" + this.content.message, 200, 200);
            image.horizontalCenter = 0;
            image.verticalCenter = 0;  
            group.addChild(image);
        }
        return group;
    }

    closePanel() {
        this.parent.removeChild(this);
    }
}