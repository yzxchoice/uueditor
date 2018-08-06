// TypeScript file
class Preview extends eui.Component {
    private displayList = [];
    tool: any;
    pages = [];
    private pageIndex: number = 0;
    public constructor () {
        super();
        
        // this.tool = new TransformTool(this);
        this.getPages();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStageInit, this);
    }

    private onAddToStageInit(event:egret.Event) {
        this.initEui();
        this.init(); 
        // initEvent();
    }

    private initEui() {

        this.width = 1920;
        this.height = 1080;
        var bg:egret.Shape = new egret.Shape;
        bg.graphics.lineStyle(3,0x999999);
        bg.graphics.beginFill(0xffffff,1);
        bg.graphics.drawRect(0, 0, 1920, 1080);
        bg.graphics.endFill();
        this.addChild(bg);

        var button = new eui.Button();
        button.width = 100;
        button.height = 40;
        button.label = "上一页";
        button.right = 0;
        button.addEventListener(Mouse.START, this.pre, this);
        this.addChild(button);
        var button2 = new eui.Button();
        button2.y = 50;
        button2.right = 0;
        button2.width = 100;
        button2.height = 40;
        button2.label = "下一页";
        button2.addEventListener(Mouse.START, this.next, this);
        this.addChild(button2);
        var button3 = new eui.Button();
        button3.y = 100;
        button3.right = 0;
        button3.width = 100;
        button3.height = 40;
        button3.label = "关闭";
        button3.addEventListener(Mouse.START, this.close, this);
        this.addChild(button3);

        var img = new eui.Image("resource/assets/phonewhite.svg");
        img.width = 328*1.5;
        img.height = 560*1.5;
        this.displayGroup.horizontalCenter = 0;
        this.displayGroup.verticalCenter = 0;
        this.displayGroup.width = 328*1.5;
        this.displayGroup.height = 560*1.5;
        this.displayGroup.scrollEnabled = true;
        // this.drawBg(this.editGroup);
        this.displayGroup.addChild(img);
        this.addChild(this.displayGroup);
    }

    private displayGroup: eui.Group = new eui.Group();


    private getPages () {
        console.log(RES.getRes("data_json"));
        this.pages = RES.getRes("data_json").list;
    }

    private pre (event: egret.TouchEvent) {
        if(this.pageIndex > 0){
            this.reset();
            this.pageIndex --;
            this.addResources(this.pageIndex);
            this.render();
        }
    }

    private next (event: egret.TouchEvent) {
        if(this.pageIndex < this.pages.length - 1){
            this.reset();
            this.pageIndex ++;
            this.addResources(this.pageIndex);
            this.render();
        }
    }

    private close (event: egret.TouchEvent) {
        this.parent.removeChild(this);
    }

    private init (): void {
        this.addResources(this.pageIndex);
        // this.setupTool();
	
        // selects pictures on mouse down
        this.addEventListener(Mouse.START, this.down, this);

        this.render();
    }

    down (event: egret.TouchEvent) {
        console.log(event.target);
        if(this.pages[this.pageIndex].hasOwnProperty("properties") && this.pages[this.pageIndex].properties.hasOwnProperty("triggerGroup")){
        
            var triggerGroup = this.pages[this.pageIndex].properties.triggerGroup;
            triggerGroup.forEach( (item) => {
                if(item.sourceId == event.target.name){
                    if(event.target.data.hasOwnProperty("sound")){
                        console.log(event.target.data.name);
                        var sound:egret.Sound = RES.getRes(event.target.data.name);
                        sound.play(0, 1);
                    }else {
                        egret.Tween.get( this.getDisplayByName(item.targetId)[0].image ).to( {alpha: 0}, 300, egret.Ease.sineIn );
                        console.log(this.getDisplayByName(item.targetId));
                    }
                    
                }
            })
        }
        
        event.preventDefault();
    }

    private getDisplayByName (name: string) {
        return this.displayList.filter( item => 
            item.image.name == name
        )
    }

    private addResources (index: number): void {
        
        var i = 0;
        var elements = this.pages[index].elements;
        // var triggerGroup = this.pages[index].properties.triggerGroup;
        var n = elements.length;
        for (i=0; i<n; i++){
            switch (elements[i].type){
                case 1:
                    var label:UULabel = new UULabel();
                    label.text = elements[i].content;
                    label.textColor = 0xff0000;
                    label.size = 16;
                    label.lineSpacing = 12;
                    label.textAlign = egret.HorizontalAlign.JUSTIFY;
                    label.name = elements[i].id;
                    label.data = elements[i];
                    this.displayList.push(new Picture(label, elements[i].matrix));
                    break;
                case 2:
                    var result:UUImage = new UUImage();
                    var texture:egret.Texture = RES.getRes(elements[i].name);
                    // result.texture = texture;
                    result.source = texture;
                    result.name = elements[i].id;
                    result.data = elements[i];
                    this.displayList.push(new Picture(result, elements[i].matrix));
                    break;
                case 18:
                    var soundBtn:SoundButton = new SoundButton();
                    soundBtn.label = elements[i].name;
                    // var texture:egret.Texture = RES.getRes(elements[i].name);
                    // result.source = texture;
                    soundBtn.name = elements[i].id;
                    soundBtn.data = elements[i];
                    this.displayList.push(new Picture(soundBtn, elements[i].matrix));
                    break;
                case 101: 
                    var circle:CircleSector = new CircleSector();
                    circle.data = elements[i];
                    circle.width = 400;
                    circle.height = 400;
                    this.displayList.push(new Picture(circle, elements[i].matrix));
                    break;
                case 8:
                    // this.createGameScene();
                    this.displayList.push(new Picture(this, elements[i].matrix));
                    break;
            }
            
        }
    }

    render () {
        this.clear();
        this.drawDisplayList();
        // this.tool.draw();
    }

    clear () {
        // this.tool.undraw();
    }

    reset () {
        this.clear();
        var i = 0;
        var n = this.displayList.length;
        for (i=0; i<n; i++){
            this.displayList[i].undraw(this.displayGroup);
        }
        this.displayList = [];
    }

    drawDisplayList (): void {
        var i = 0;
        var n = this.displayList.length;
        for (i=0; i<n; i++){
            // if (!targetControl || this.tool.target !== this.displayList[i].transform){
                this.displayList[i].draw(this.displayGroup);
            // }
        }
    }

}