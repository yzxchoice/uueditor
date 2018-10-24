// TypeScript file
class Header extends eui.Group implements IUUContainer {

    container: Game;

    dispose (): void {

    }

    draw (container: any): void {
        this.container = container;
        this.container.addChild(this);
    }

    public constructor () {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage (event:egret.Event) {
        this.init();
    }

    private init () {
        var hLayout:eui.HorizontalLayout = new eui.HorizontalLayout();
        hLayout.gap = 30;
        // hLayout.paddingTop = 30;
        hLayout.horizontalAlign = egret.HorizontalAlign.RIGHT;
        hLayout.verticalAlign = egret.VerticalAlign.MIDDLE;
        hLayout.paddingRight = 30;
        this.layout = hLayout;

        // let btnSlotMachine = this.createBtn('老虎机');
        // btnSlotMachine.addEventListener(Mouse.START, this.onAddSlotMachine, this);     
        // this.addChild(btnSlotMachine);  

        // let btnSlideShow = this.createBtn('轮播图');
        // btnSlideShow.addEventListener(Mouse.START, this.onAddSlideShow, this);     
        // this.addChild(btnSlideShow);          
        
        // var btnAddText = new eui.Button();
        // btnAddText.width = 100;
        // btnAddText.height = 40;
        // btnAddText.label = "文本";
        // btnAddText.addEventListener(Mouse.START, this.onAddText, this);     
        // this.addChild(btnAddText);           
        // var btnAddPage = new eui.Button();
        // btnAddPage.width = 100;
        // btnAddPage.height = 40;
        // btnAddPage.label = "加页";
        // btnAddPage.addEventListener(Mouse.START, this.onAddPage, this);
        // this.addChild(btnAddPage);
        // var btnAddComponent = new eui.Button();
        // btnAddComponent.width = 100;
        // btnAddComponent.height = 40;
        // btnAddComponent.label = "组件";
        // btnAddComponent.addEventListener(Mouse.START, this.openComponentPanel, this);
        // this.addChild(btnAddComponent);
        // var btnAddFrame = new eui.Button();
        // btnAddFrame.width = 100;
        // btnAddFrame.height = 40;
        // btnAddFrame.label = "边框";
        // btnAddFrame.addEventListener(Mouse.START, this.openFramePanel, this);
        // this.addChild(btnAddFrame);
        // var btnAddSound = new eui.Button();
        // btnAddSound.width = 100;
        // btnAddSound.height = 40;
        // btnAddSound.label = "声音";
        // btnAddSound.addEventListener(Mouse.START, this.openSoundPanel, this);
        // this.addChild(btnAddSound);
        // var btnAddImage = new eui.Button();
        // btnAddImage.width = 100;
        // btnAddImage.height = 40;
        // btnAddImage.label = "图片";
        // btnAddImage.addEventListener(Mouse.START, this.openImagePanel, this);
        // this.addChild(btnAddImage);
        // var btnAddBg = new eui.Button();
        // btnAddBg.width = 100;
        // btnAddBg.height = 40;
        // btnAddBg.label = "背景";
        // btnAddBg.addEventListener(Mouse.START, this.openBgPanel, this);
        // this.addChild(btnAddBg);
        var btnPreview = new eui.Button();
        btnPreview.width = 100;
        btnPreview.height = 40;
        btnPreview.label = "预览";
        btnPreview.addEventListener(Mouse.START, this.preview, this);
        this.addChild(btnPreview);
        var btnRelease = new eui.Button();
        btnRelease.width = 100;
        btnRelease.height = 40;
        btnRelease.label = "发布";
        // btnRelease.addEventListener(Mouse.START, this.preview, this);
        this.addChild(btnRelease);
        var btnSave = new eui.Button();
        btnSave.width = 100;
        btnSave.height = 40;
        btnSave.label = "保存";
        btnSave.addEventListener(Mouse.START, this.save, this);
        this.addChild(btnSave);
    }

    private createBtn(label: string): eui.Button{
        let btn = new eui.Button();
        btn.width = 100;
        btn.height = 40;
        btn.label = label;
        return btn;
    }

    async save (event: egret.TouchEvent) {
        // egret.log(this.getQueryString()['id']);
        // var id = this.getQueryString()['id'];
        var g: Game = this.parent as Game;
        console.log(g.editGroup.pages[0]);
        console.log(JSON.stringify(g.editGroup.pages[0]));                
        var obj = {
            code: 200,
            msg: "success",
            list: g.editGroup.pages
        }
        var params = "id="+Main.id+"&template="+encodeURIComponent(JSON.stringify(obj))+"&resource="+encodeURIComponent(JSON.stringify(Utils.trans(g.editGroup.pages, Main.id)));
        var res = await Fetch.start(`${prefixApi}template/updateTemplate`,params, 'POST');
        // egret.log(Utils.trans(g.editGroup.pages));
    }

    onAddSlideShow(){
        let editGroup = this.container.editGroup;
        editGroup.addResource1(UUType.SLIDESHOW);
    }

    onAddSlotMachine(){
        let editGroup = this.container.editGroup;
        editGroup.addResource1(UUType.SLOT_MACHINE);
    }

    onAddText(){
        let editGroup = this.container.editGroup;
        editGroup.addResource1(UUType.TEXT);
    }

    onAddPage (event: egret.TouchEvent) {
        var g: Game = this.parent as Game;
        g.editGroup.addPage();
        this.dispatchEvent(new PageEvent(PageEvent.PAGE_ADD, true));
    }
    
    preview (event: egret.TouchEvent) {
        // callJsFunc("ts call js");
        let globalState: GlobalState = GlobalState.getInstance(); // 全局状态管理
        globalState.changeShowStateToPreview();
        Observer.getInstance().clear();
        var g: Game = this.parent as Game;
        var pb: PreviewBox = new PreviewBox();
        pb.draw(g);
    }

    openComponentPanel (event: egret.TouchEvent) {
        var g: Game = this.parent as Game;
        g.openComponentPanel();
    }

    openFramePanel (event: egret.TouchEvent) {
        var g: Game = this.parent as Game;
        g.openFramePanel();
    }

    openSoundPanel (event: egret.TouchEvent) {
        var g: Game = this.parent as Game;
        g.openSoundePanel();
    }

    openImagePanel (event: egret.TouchEvent) {
        var g: Game = this.parent as Game;
        g.openImagePanel();
    }

    openBgPanel (event: egret.TouchEvent) {
        var g: Game = this.parent as Game;
        g.openBgPanel();
    }
}