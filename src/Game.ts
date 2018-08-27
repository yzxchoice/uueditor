// TypeScript file  
/**
 * Game
 */
class Game extends eui.Component {
    
    private borderColor = 0xcccccc;
    public constructor () {
        super();
        this.skinName = "resource/skins/GameSkin.exml";
        
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStageInit, this);
    }

    private onAddToStageInit(event:egret.Event) {
        this.initEui();
        mouse.enable(this.stage);
        mouse.setMouseMoveEnabled(true);
        
    }

    public editGroup: EditGroup = new EditGroup();
    public header: Header = new Header();
    public imgBox: ImageBox = ImageBox.getInstance();
    public Siderbar: Siderbar = Siderbar.getInstance();

    private initEui() {
        
        var editContaier: eui.Group = new eui.Group();
        editContaier.x = 0;
        editContaier.y = 110;
        this.addChild(editContaier);

        var bg:egret.Shape = new egret.Shape;
        // bg.graphics.lineStyle(3,0x999999);
        bg.graphics.beginFill(0xffffff,1);
        bg.graphics.drawRect(0, 0, 1200, 900);
        bg.graphics.endFill();
        editContaier.addChild(bg);

        this.editGroup.width = 1200;
        this.editGroup.height = 900;
        this.editGroup.x = 0;
        this.editGroup.y = 0;
        this.editGroup.scrollEnabled = true;
        editContaier.addChild(this.editGroup);
        
        this.header.x = 0;
        this.header.y = 0;
        this.header.width = 1920;
        this.header.height = 100;
        this.drawBg(this.header);
        this.header.draw(this);
        // this.addChild(this.imgBox);

        this.Siderbar.x = 1920 - 500;
        this.Siderbar.y = this.header.height + 10;
        this.Siderbar.draw(this);

        var hLayout:eui.HorizontalLayout = new eui.HorizontalLayout();
        hLayout.gap = 30;
        hLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
        hLayout.verticalAlign = egret.VerticalAlign.MIDDLE;
        hLayout.paddingRight = 30;
        
        var bottomGroup = new eui.Group();
        bottomGroup.width = 1200;
        bottomGroup.height = 100;
        bottomGroup.x = 0;
        bottomGroup.layout = hLayout;
        bottomGroup.bottom = 0;
        this.addChild(bottomGroup);
        var button = new eui.Button();
        button.width = 100;
        button.height = 40;
        button.label = "上一页";
        button.x = 0;
        button.addEventListener(Mouse.START, this.editGroup.pre, this.editGroup);
        bottomGroup.addChild(button);
        mouse.setButtonMode(button, true);
        var button2 = new eui.Button();
        button2.y = 50;
        button2.width = 100;
        button2.height = 40;
        button2.label = "下一页";
        button2.addEventListener(Mouse.START, this.editGroup.next, this.editGroup);
        bottomGroup.addChild(button2);
    }

    openComponentPanel () {
        this.imgBox.open(this);
        this.imgBox.getResources(getImages, {tag: 101}, UUType.CIRCLE_SECTOR);
    }

    openFramePanel () {
        this.imgBox.open(this);
        this.imgBox.getResources(getImages, {tag: 102}, UUType.FRAME);
    }

    openSoundePanel () {
        this.imgBox.open(this);
        this.imgBox.getResources(getImages, {tag: 18}, UUType.SOUND);
    }

    openImagePanel () {
        this.imgBox.open(this);
        this.imgBox.getResources(getImages, {tag: 1}, UUType.IMAGE);
    }

    openBgPanel () {
        this.imgBox.open(this);
        this.imgBox.getResources(getImages, {tag: 2}, UUType.BACKGROUND);
    }

    closeImagePanel () {
        this.imgBox.close();
    }

    private drawBg (container, isborder: number = 1) {
        var border:egret.Shape = new egret.Shape;
        border.graphics.lineStyle(2,this.borderColor);
        border.graphics.beginFill(0xffffff, isborder);
        border.graphics.drawRect(0, 0, container.width, container.height);
        border.graphics.endFill();
        container.addChild(border);
    }

   
}