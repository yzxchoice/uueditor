class StyleSound extends eui.Group {
	static instance: StyleSound;
	private d: IResource;
	private container: TabStyle;

	public constructor() {
		super();
		
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}

	static getInstance() {
        if(!this.instance) {
            this.instance = new StyleSound();
        }
        return this.instance;
    }

	setData (d: IResource) {
		// if(!d) return ;
		this.d = d;
		this.reset();
		this.render();
	}

	private onAddToStage(){
		this.stage.addEventListener(PageEvent.SOUND_CHANGE, this.cb, this);
	}

	draw (container: any): void{
		this.horizontalCenter = 0;
		
		this.container = container;
		this.container.addChild(this);
	}

	reset () {
		this.removeChildren();
	}

	render () {
		var btn = new eui.Button();
		btn.width = 300;
		btn.height = 50;
		btn.label = this.d ? this.d.name : "添加音效";
		btn.addEventListener(Mouse.START, this.select, this);
		this.addChild(btn);
	}

	select () {
		var tabStyle: TabStyle = this.container.parent.parent as TabStyle;
		var g: Game = tabStyle.editGroup.parent.parent as Game;
        g.openSoundePanel();
	}

	cb (event: PageEvent) {
		this.setData(event.data);
	}
}