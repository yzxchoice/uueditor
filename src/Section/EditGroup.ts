// TypeScript file
class EditGroup extends eui.Group {
    displayList = [];
    tool: any;
    maskTool: TransformTool;
    public pages = [];
    public pageIndex: number = 0;
    private borderColor = 0xcccccc;
    // private bg: eui.Component = new eui.Component;
    public displayGroup: eui.Group = new eui.Group();
    private siderbar: Siderbar = Siderbar.getInstance();
    public uutween: UUTween;
    public tweenControl: TweenControl = new TweenControl();
    public constructor () {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    protected createChildren() {
        super.createChildren();
    }

    private onAddToStage (event:egret.Event) {
        this.tool = new TransformTool(this);
        this.maskTool = new TransformTool(this);   
        this.uutween = new UUTween(this);     
        this.bindHandlers();
        this.getPages();
        this.initEui();
        this.init();
    }

    private bindHandlers () {
        this.render = this.render.bind(this);
        this.renderOneDisplay = this.renderOneDisplay.bind(this);
        // this.addSinglePicture = this.addSinglePicture.bind(this);
    }

    private initEui() {
        this.displayGroup.width = this.width;
        this.displayGroup.height = this.height;
        this.displayGroup.scrollEnabled = true;
        this.addChild(this.displayGroup);
    }

    private getPages () {
        // console.log(RES.getRes("data_json"));
        this.pages = RES.getRes("data_json").list;
    }

    private init (): void {
        this.renderResources(this.pageIndex);
        this.setupTool();

        this.addEventListener(Mouse.START, this.down, this);
        this.stage.addEventListener(PageEvent.PAGE_CHANGE, this.go, this);
        this.stage.addEventListener(PageEvent.LAYER_SELECT, this.select, this);


        this.render();
    }

    setupTool () {
        ControlSet.controlClass = EgretControl;
        // var controls = this.getCustomControls();
        this.tool.setControls(ControlSet.getUniformScaler());	
    }

    getCustomControls () {
        var translater = new EgretControl(ControlType.TRANSLATE);
        // translate control is "selected" by clicking
        // on the target's shape, not the control point
        translater.hitTestTarget = true;
        
        var targetContent = new EgretControl(ControlType.TARGET);
        return [
            new EgretControl(ControlType.ROTATE, 0,0, 0,0, 40),
            new EgretControl(ControlType.ROTATE, 0,1, 0,0, 40),
            new EgretControl(ControlType.ROTATE, 1,0, 0,0, 40),
            new EgretControl(ControlType.ROTATE, 1,1, 0,0, 40),
            targetContent, // renders target between controls
            translater,
            new EgretControl(ControlType.BORDER),
            new EgretControl(ControlType.REGISTRATION, .5,.5, 0,0, 20),
            new EgretControl(ControlType.SKEW_Y, 0,.5, 0,0, 10),
            new EgretControl(ControlType.SCALE_X, 1,.5, 0,0, 10),
            new EgretControl(ControlType.SKEW_X, .5,0, 0,0, 10),
            new EgretControl(ControlType.SCALE_Y, .5,1, 0,0, 10),
            new EgretControl(ControlType.SCALE, 0,0, 0,0, 10),
            new EgretControl(ControlType.SCALE, 0,1, 0,0, 10),
            new EgretControl(ControlType.SCALE, 1,0, 0,0, 10),
            new EgretControl(ControlType.SCALE, 1,1, 0,0, 10),
            new EgretControl(ControlType.ROTATE_SCALE, 1,0, 15,-15, 10),
            new EgretControl(ControlType.SCALE_UNIFORM, 1,1, 15,15, 10),
            new EgretControl(ControlType.ROTATE, .5,0, 0,-20)
        ];
    }

    down (event: egret.TouchEvent) {
        Mouse.get(event, this);
        var controlled = this.tool.start(Mouse.x, Mouse.y);

        if(!this.containsPoint(Mouse.x, Mouse.y)){
            return false;
        }
        
        // if tool wasnt selected and being controlled
        // attempt to make a new selection at this location
        if (!controlled && this.selectImage(Mouse.x, Mouse.y)){
            // selection occurred
            // force select the translate control
            // to be able to start moving right away
            controlled = this.tool.start(Mouse.x, Mouse.y, this.findControlByType(ControlType.TRANSLATE)); 
        }
        
        if (controlled){
            // events for moving selection
            this.addEventListener(Mouse.MOVE, this.move, this);
            this.addEventListener(Mouse.END, this.up, this);

            this.siderbar.selectTarget();
            // AnimateSet.target = this.tool.target.owner.image;
            // AnimateSet.move();
        }
        // requestAnimationFrame(this.renderOneDisplay);        
        requestAnimationFrame(this.render);
        event.preventDefault();
    }

    move (event: egret.TouchEvent) {
        Mouse.get(event, this);
        this.applyDynamicControls(event);
        this.tool.move(Mouse.x, Mouse.y);

        this.siderbar.moveTarget();    
        
        // requestAnimationFrame(this.renderOneDisplay);
        requestAnimationFrame(this.render);
        event.preventDefault();
    }

    up (event: egret.TouchEvent) {

        this.tool.end();
        // console.log(this.tool.target);
        var eles = this.pages[this.pageIndex].elements;
        if(this.tool.target){
            for(var i = 0; i<eles.length;i++){
                if(eles[i].id === this.tool.target.owner.image.data.id){
                    eles[i].matrix = this.tool.target.matrix;
                }
            }
        }
        
	
        this.removeEventListener(Mouse.MOVE, this.move, this);
        this.removeEventListener(Mouse.END, this.up, this);

        this.siderbar.upTarget(); 

        // requestAnimationFrame(this.renderOneDisplay);        
        requestAnimationFrame(this.render);
        event.preventDefault();
    }

    private setProperty(x?: number, y?: number) {
        var eles = this.pages[this.pageIndex].elements;
        var currentMatrix: Matrix = this.tool.target.matrix;
        currentMatrix.translate(x, y);
        for(var i = 0; i<eles.length;i++){
            if(eles[i].id === this.tool.target.owner.image.name){
                eles[i].matrix = currentMatrix;
            }
        }
    }

    applyDynamicControls (event: any) {
        // if dynamic, set controls based on 
        // keyboard keys
        var dyn = this.getDynamicControl();
        // console.log('dyn:'+dyn);
        if (dyn){
            if (event.ctrlKey){
                if (event.shiftKey){
                    dyn.type = ControlType.ROTATE_SCALE;
                }else{
                    dyn.type = ControlType.ROTATE;
                }
            }else if (event.shiftKey){
                dyn.type = ControlType.SCALE;
            }else{
                dyn.type = ControlType.TRANSLATE;
            }
        }
    }

    getDynamicControl () {
        var i = 0;
        var n = this.tool.controls.length;
        for (i=0; i<n; i++){
            if (this.tool.controls[i].dynamicUV){
                return this.tool.controls[i];
            }
        }
        return null;
    }

    findControlByType(type: any) {
        var i = 0;
        var n = this.tool.controls.length;
        for (i=0; i<n; i++){
            if (this.tool.controls[i].type == type){
                return this.tool.controls[i];
            }
        }
        return null;
    }

    containsPoint (x: number, y: number) {
        var globalEdit: egret.Point = this.parent.localToGlobal(this.matrix.tx, this.matrix.ty);
        var globalMouse: egret.Point = this.localToGlobal(Mouse.x, Mouse.y);

        var m: Matrix = new Matrix(
            this.matrix.a,
            this.matrix.b,
            this.matrix.c,
            this.matrix.d,
            globalEdit.x,
            globalEdit.y
        );

        // console.log(globalMouse.x, globalMouse.y)
        // console.log(m.containsPoint(globalMouse.x, globalMouse.y, this.width, this.height));

        return m.containsPoint(globalMouse.x, globalMouse.y, this.width, this.height);
    }

    select (event: PageEvent) {
        this.tool.setTarget(event.data.t.transform);
        requestAnimationFrame(this.render);
        event.preventDefault();
    }

    selectImage (x: number, y: number) {
        var pic = null;
        var t = null;
        
        // walk backwards selecting top-most first
        var i = this.displayList.length;
        while (i--){
            pic = this.displayList[i];
            if(!pic.b) {
                console.log('点击了背景...');
                this.tool.setTarget(null);  
                this.clear();             
                return false;
            };
            t = pic.transform;
            if (t.matrix.containsPoint(x, y, t.width, t.height)){
                if (this.tool.target !== t){
                    
                    // select
                    this.tool.setTarget(t);

                    // this.addAnimate();
                    this.uutween.setTool(this.tool, this.tweenControl);
                    this.tweenControl.setTarget(t.owner.image);
                    
                    var e: PageEvent = new PageEvent(PageEvent.LAYER_CHANGE, true);
                    e.data = { layerIndex: i }
                    this.dispatchEvent(e);
                    // reorder for layer rendering
                    // this.displayList.splice(i,1);
                    // this.displayList.push(pic);
                    return true;
                }
                
                // already selected
                return false;
            }
        }

        // deselect
        let point = new egret.Point(x,y);
        let rect = new egret.Rectangle(0,0,this.width,this.height);
        if(rect.containsPoint(point)){
            this.tool.setTarget(null);  
            this.uutween.reset();     
            return false;
        };
    }

    async renderResources (index: number) {
        // let s = await Utils.getScript(["https://cdn.bootcss.com/underscore.js/1.9.0/underscore-min.js"]);
        // _.each([1, 2, 3], alert);
        
        var elements = this.pages[index].elements;
        var n = elements.length;
        for (let i=0; i<n; i++){
            var texture:egret.Texture = RES.getRes(elements[i].name);
                    
            var t = LayerSet.getLayer(Utils.getComs(), elements[i].type)[0];
            var com = LayerSet.createInstance(t,elements[i].props);
            com.name = elements[i].id;
            com.data = elements[i];
            if(!texture && (elements[i].type === UUType.IMAGE || elements[i].type === UUType.BACKGROUND)){
                com.texture = await Utils.getTexture("resource/"+elements[i].src);
            }else {
                com.texture = texture;
            }
            this.displayList.push(new Picture(com, elements[i].matrix, elements[i].type==UUType.BACKGROUND?false:true));
            
            
        }    
        requestAnimationFrame(this.render);
    }

    render () {
        this.clear();
        this.drawDisplayList();
        this.tool.draw();
        
        this.displayGroup.addChild(this.uutween);
        this.displayGroup.addChild(this.tweenControl);
    }

    renderOneDisplay(){
        let target = this.tool.target;
        if(!target) return;
        let display: Picture = target.owner;
        this.clear();
        display.draw(this.displayGroup);
        this.tool.draw();
    }

    clear () {
        this.tool.undraw();    
    }

    reset () {
        this.clear();
        
        this.tool.setTarget(null);  
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
            // let the TARGET control draw the selected image
            // so it can be layered within the controls
            // otherwise draw the other images here
            // if (!targetControl || this.tool.target !== this.displayList[i].transform){
                this.displayList[i].draw(this.displayGroup);
            // }
        }
    }

    pre (event: egret.TouchEvent) {
        if(this.pageIndex > 0){
            // this.reset();
            this.pageIndex --;
            // this.renderResources(this.pageIndex);
            var e: PageEvent = new PageEvent(PageEvent.PAGE_CHANGE, true);
            e.data = {
                pageIndex: this.pageIndex
            }
            this.dispatchEvent(e);
        }
        
    }

    next (event: egret.TouchEvent) {
        if(this.pageIndex < this.pages.length - 1){
            // this.reset();
            this.pageIndex ++;
            // this.renderResources(this.pageIndex);
            var e: PageEvent = new PageEvent(PageEvent.PAGE_CHANGE, true);
            e.data = {
                pageIndex: this.pageIndex
            }
            this.dispatchEvent(e);
            
        }
    }

    go (event: PageEvent) {
        this.reset();
        this.pageIndex = event.data.pageIndex;
        this.renderResources(this.pageIndex);
    }
    // 更新显示对象
    updateDisplay(display: Picture){
        this.updateDisplayProps(display);
        display.draw(this);
    }
    // 更新props中的属性
    updateDisplayProps(display: Picture){
        let image = display.image;
        let props = image.data.props;
        for(let key in props){
            image[key] = props[key];
        }
    }
    // 使用图形遮罩
    public triggerMaskById(imageId){
		let id = imageId;
		let displayList = this.displayList;
		let transform: Transformable;
		for(let i = 0, len = displayList.length; i < len; i++){
			let item = <Picture>displayList[i];
			if(item.image.data.id == id){
				transform = item.transform;
				break;
			}
		};
		if(!transform){
			this.maskTool.removeMask();
			return;
		}
		this.maskTool.setPreTarget(transform);
		this.maskTool.addMask();
	}

    addResource (data: uiData, uutype: number) {
        switch (uutype) {
            case UUType.IMAGE:  
            case UUType.BACKGROUND:
            case UUType.FRAME:  
            case UUType.CIRCLE_SECTOR:
                this.addResource1(uutype, data);
                break;
            case UUType.SOUND:
                this.addSound(data);
            default:
                this.addResource1(uutype, data);
                break;
        }
    }

    //TODO 
    addSound (data: uiData) {
        var m = new Matrix(1,0,0,1,300,500);
        var n = data.name;
        var eles = this.pages[this.pageIndex].elements;
        var triggerGroup = this.pages[this.pageIndex].properties.triggerGroup;
        data.id = data.id + '-'+ this.displayList.length;
        eles.push({
            "id": data.id,
            "name": n,
            "pageId": 201807311008,
            "type": UUType.SOUND,
            "matrix": {
                "a": m.a,
                "b": m.b,
                "c": m.c,
                "d": m.d,
                "x": m.x,
                "y": m.y
            },
            "props": {
                "width": 100,
                "height": 50
            },
            "sound": {
                "id": data.id,
                "name": n,
                "src": data.url
            },
            "sceneId": 1001
        })
        triggerGroup.push({
            "delay": 0,
            "eventType": 1,
            "sourceId": data.id,
            "sourceType": "e",
            "targetId": data.id,
            "targetState": 4,
            "targetType": "e"
        })
        
        var soundBtn: SoundButton = new SoundButton();
        soundBtn.label = data.name;
        soundBtn.name = data.id;
        soundBtn.width = 100;
        soundBtn.height = 50;
        soundBtn.data = data;
        
        this.displayList.push(new Picture(soundBtn, m));

        requestAnimationFrame(this.render);

    }

    addPage () {
        var pages = this.pages;
        pages.push({
            id: Date.now,
            elements: [],
            properties: {
                triggerGroup: []
            }
        })
    }

    addAnimate (animType: number) {
        if(!this.tool.target)  return;
        egret.log(this.tool.target.owner.image.data);
        let t: ITween = {
            type: animType,
            start: null,
            control: null,
            end: null
        }
        let data = this.tool.target.owner.image.data;
        if(!data.hasOwnProperty('properties')){
            data['properties'] = {};
        }
        data['properties']['anims'] = [];
        data.properties.anims.push(t);
    }


    async addResource1 (type: number, d?: uiData) {
        var t = LayerSet.getLayer(Utils.getComs(), type)[0];
        var com: IUUBase = LayerSet.createInstance(t, {});

        let id = (new Date()).valueOf().toString();
        let data: UUData<any> = {
            id: id,
            /**
             * 1.png  => 1_png  预加载资源
             */
            name: d?d.url.substring(d.url.lastIndexOf("/")+1).replace('.','_'):id,
            pageId: 201807311008,
            type: type,
            matrix: new Matrix(1,0,0,1,300,300),
            // src: d ? d.url : '',
            props: com.getProps ? com.getProps() : {},
            properties: {}
        }; 
        if(data.type === UUType.IMAGE || data.type === UUType.BACKGROUND){
            data.src = d ? d.url : ''
        }
        
        var eles = this.pages[this.pageIndex].elements;

        var texture:egret.Texture = RES.getRes(data.name);
        com.name = data.id;
        com.data = data;
        
        if(!texture && (data.type === UUType.IMAGE || data.type === UUType.BACKGROUND)){
            com.texture = await Utils.getTexture("resource/"+data.src);
        }else {
            com.texture = texture;
        }

        if(data.type == UUType.BACKGROUND){
            if(eles.length > 0 && eles[0].type == UUType.BACKGROUND){
                this.displayList[0].undraw(this.displayGroup);
                this.displayList.splice(0,1);
                eles.splice(0,1);
            }
            data.matrix = new Matrix(this.displayGroup.width/texture.bitmapData.width,0,0,this.displayGroup.width/texture.bitmapData.width,0,0);
            eles.unshift(data);
            this.displayList.unshift(new Picture(com, data.matrix, false));
        }else {
            eles.push(data)
            this.displayList.push(new Picture(com, data.matrix, true));
        }    

        this.dispatchEvent(new PageEvent(PageEvent.LAYER_ADD, true));

        requestAnimationFrame(this.render);
    }

    

}