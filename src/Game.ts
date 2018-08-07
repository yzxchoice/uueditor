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
    }

    public editGroup: EditGroup = new EditGroup();
    public header: eui.Group = new Header();
    public imgBox: ImageBox = new ImageBox();
    public bgBox: BgBox = new BgBox();
    public soundBox: SoundBox = new SoundBox();
    public comBox: ComponentBox = new ComponentBox();
    public siderbarSkinBy: SiderbarSkinBy = SiderbarSkinBy.getInstance();

    private initEui() {

        var editContaier: eui.Group = new eui.Group();
        editContaier.horizontalCenter = 0;
        editContaier.verticalCenter = 0;
        this.addChild(editContaier);

        var img = new eui.Image("resource/assets/phone16.png");
        img.width = 393*1.5;
        img.height = 796*1.5;
        editContaier.addChild(img);

        // var img = new eui.Image("resource/assets/phonewhite.svg");
        // img.width = 328*1.5;
        // img.height = 560*1.5;
        // this.editGroup.horizontalCenter = 0;
        // this.editGroup.verticalCenter = 0;
        this.editGroup.width = 340*1.5;
        this.editGroup.height = 506*1.5;
        this.editGroup.horizontalCenter = 0;
        this.editGroup.y = 190*1.5;
        this.editGroup.scrollEnabled = true;
        // this.drawBg(this.editGroup);
        // this.editGroup.addChild(img);
        editContaier.addChild(this.editGroup);
        this.header.x = 0;
        this.header.y = 0;
        this.header.width = 1920;
        this.header.height = 100;
        this.drawBg(this.header);
        this.addChild(this.header);
        // this.addChild(this.imgBox);

        this.siderbarSkinBy.x = 1920 - 500;
        this.siderbarSkinBy.y = this.header.height + 10;
        this.addChild(this.siderbarSkinBy);
        console.log(this.siderbarSkinBy.data);

        var hLayout:eui.HorizontalLayout = new eui.HorizontalLayout();
        hLayout.gap = 30;
        hLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
        hLayout.verticalAlign = egret.VerticalAlign.MIDDLE;
        hLayout.paddingRight = 30;
        
        var bottomGroup = new eui.Group();
        bottomGroup.width = 750;
        bottomGroup.height = 100;
        bottomGroup.horizontalCenter = 0;
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
        var button2 = new eui.Button();
        button2.y = 50;
        button2.width = 100;
        button2.height = 40;
        button2.label = "下一页";
        button2.addEventListener(Mouse.START, this.editGroup.next, this.editGroup);
        bottomGroup.addChild(button2);
    }

    openComponentPanel () {
        this.comBox.open(this);
    }

    openSoundePanel () {
        this.soundBox.open(this);
    }

    openImagePanel () {
        this.imgBox.open(this);
    }

    openBgPanel () {
        this.bgBox.open(this);
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




    /**
     * 创建游戏场景
     * Create a game scene
     */
    // private createGameScene(): void {

    //     // this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouch,this);
    //     this.createMotorcycleExp();
    // }
    // /**
    //  * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
    //  * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
    //  */
    // private createBitmapByName(name: string): egret.Bitmap {
    //     var result: egret.Bitmap = new egret.Bitmap();
    //     var texture: egret.Texture = RES.getRes(name);
    //     result.texture = texture;
    //     return result;
    // }
    // /**骨骼角色拥有的动作列表**/
    // private actionArray;
    // /**骨骼角色执行的当前动作索引**/
    // private actionFlag;
    // /**存放骨骼动画的容器**/
    // private container;
    // /**骨骼的实体数据**/
    // private armature;
    // /**骨骼的可视对象**/
    // private armatureDisplay;
    // /**创建骨骼模型**/
    // private createMotorcycleExp():void
    // {
    //     this.actionArray = ["stop","run","run2","squat","oneLegStand","oneLegStand2","float","pushUp"]
    //     this.container = new egret.DisplayObjectContainer();

    //     // this.addChild(this.container);
    //     this.container.x = 250;
    //     this.container.y = 350;

    //     //读取一个骨骼数据,并创建实例显示到舞台
    //     var skeletonData = RES.getRes("skeleton_json");
    //     var textureData = RES.getRes("skeleton_tex_json");
    //     var texture = RES.getRes("skeleton_tex_png");

    //     var factory = new dragonBones.EgretFactory();
    //     factory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(skeletonData));
    //     factory.addTextureAtlasData(factory.parseTextureAtlasData(textureData, texture));

    //     this.armature = factory.buildArmature("Robot");
    //     this.armatureDisplay = this.armature.getDisplay();
    //     dragonBones.WorldClock.clock.add(this.armature);
    //     this.container.addChild(this.armatureDisplay);
    //     this.armatureDisplay.x = 0;
    //     this.armatureDisplay.y = 0;
    //     this.actionFlag = 0;
    //     //启动骨骼动画播放
    //     this.armature.animation.gotoAndPlay(this.actionArray[this.actionFlag]);

	// 	egret.startTick(this.onTicker, this);
    // }
	
	// private _time:number;

    // private onTicker(timeStamp:number) {

    //     if(!this._time) {
    //         this._time = timeStamp;
    //     }

    //     var now = timeStamp;
    //     var pass = now - this._time;
    //     this._time = now;

    //     dragonBones.WorldClock.clock.advanceTime(pass / 1000);

    //     return false;
    // }
	
   
}