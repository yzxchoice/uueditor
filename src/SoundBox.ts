// TypeScript file
interface uiData {
    id: string,
    name: string,
    url?: string
}
class SoundBox extends eui.Panel {
    private imgList = [
        {
            id: "19001",
            name: "test2_mp3",
            url: "test2.mp3"
        }
    ];
    static instance: ImageBox;
    public constructor () {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    static getInstance(name) {
        if(!this.instance) {
            this.instance = new ImageBox();
        }
        return this.instance;
    }

    private onAddToStage(event:egret.Event) {
        this.init(); 
    }

    private init () {
        this.horizontalCenter = 0;
        this.verticalCenter = 0;
        this.width = 1200;
        this.height = 800;

        for(var i = 0; i<this.imgList.length;i++){

            var soundBtn:SoundButton = new SoundButton();
            soundBtn.y = 50;
            soundBtn.x = 120 * i;
            soundBtn.label = this.imgList[i].name
            soundBtn.name = this.imgList[i].id;
            soundBtn.data = this.imgList[i];
            soundBtn.addEventListener(Mouse.START, this.addSound, this);
            this.addChild(soundBtn);
        }
    }

    private addSound (event: egret.TouchEvent) {
        var g: Game = this.parent as Game;
        g.editGroup.addSound(event.currentTarget.data);
    }

    open (container: eui.Component) {
        container.addChild(this);
    }
}