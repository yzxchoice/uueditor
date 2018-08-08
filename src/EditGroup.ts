// TypeScript file
class EditGroup extends eui.Group {
    
    displayList = [];
    tool: any;
    private pages = [];
    private pageIndex: number = 0;
    private borderColor = 0xcccccc;
    private bg: eui.Component = new eui.Component;
    public constructor () {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    protected createChildren() {
        super.createChildren();
    }

    private onAddToStage (event:egret.Event) {
        this.tool = new TransformTool(this);
        this.bindHandlers();
        this.getPages();
        this.init();
    }

    private bindHandlers () {
        this.render = this.render.bind(this);
        // this.addSinglePicture = this.addSinglePicture.bind(this);
    }

    private getPages () {
        // console.log(RES.getRes("data_json"));
        this.pages = RES.getRes("data_json").list;
    }

    private init (): void {
        this.addBg();
        this.renderResources(this.pageIndex);
        this.setupTool();

        this.stage.addEventListener(Mouse.START, this.down, this);

        this.render();

        //添加转盘实例
        // var g = new CircleSector();
        // g.width = 400;
        // g.height = 400;
        // this.addChild(g);
        // this.displayList.push(new Picture(g, new Matrix(1,0,0,1,0,0)));
    }

    private addBg () {
        this.bg.width = this.width;
        this.bg.height = this.height;
        this.addChild(this.bg);
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
            this.stage.addEventListener(Mouse.MOVE, this.move, this);
            this.stage.addEventListener(Mouse.END, this.up, this);

            this.deliveryItemMessageToControlPanel(this.tool.target);
        }
        
        requestAnimationFrame(this.render);
        event.preventDefault();
    }

    move (event: egret.TouchEvent) {
        Mouse.get(event, this);
        this.applyDynamicControls(event);
        this.tool.move(Mouse.x, Mouse.y);

        this.deliveryItemMessageToControlPanel(this.tool.target);        
        
        requestAnimationFrame(this.render);
        event.preventDefault();
    }

    up (event: egret.TouchEvent) {
        this.tool.end();
        // console.log(this.tool.target);
        var eles = this.pages[this.pageIndex].elements;
        for(var i = 0; i<eles.length;i++){
            if(eles[i].id === this.tool.target.owner.image.data.id){
                eles[i].matrix = this.tool.target.matrix;
            }
        }
	
        this.stage.removeEventListener(Mouse.MOVE, this.move, this);
        this.stage.removeEventListener(Mouse.END, this.up, this);

        this.deliveryItemMessageToControlPanel(this.tool.target);
        
        requestAnimationFrame(this.render);
        event.preventDefault();
    }

    private deliveryItemMessageToControlPanel(targetItem){
        let matrix:Matrix = targetItem.matrix;
        let item = targetItem.owner.image;
        let {a, b, c, d, x, y} = matrix;
        let {width, height} = targetItem;
        let {scaleX, scaleY, rotation} = item;
        // TODO: this.parent.parent 优化
        let game:Game = <Game>this.parent.parent;
        let siderbarSkinBy:SiderbarSkinBy = <SiderbarSkinBy>game.siderbarSkinBy;
        let newData = {
            x: Math.floor(this.tool.regX),
            y: Math.floor(this.tool.regY),
            width: Math.floor(width * scaleX),
            height: Math.floor(height * scaleY),
            rotate: Math.floor(rotation)
        };
        siderbarSkinBy.data = newData;       
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
        console.log('dyn:'+dyn);
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

    selectImage (x: number, y: number) {
        var pic = null;
        var t = null;
        
        // walk backwards selecting top-most first
        var i = this.displayList.length;
        while (i--){
            pic = this.displayList[i];
            t = pic.transform;
            if (t.matrix.containsPoint(x, y, t.width, t.height)){
                if (this.tool.target !== t){
                    
                    // select
                    this.tool.setTarget(t);
                    // reorder for layer rendering
                    this.displayList.splice(i,1);
                    this.displayList.push(pic);
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
            return false;
        };
    }

    private renderResources (index: number): void {
        
        var i = 0;
        var elements = this.pages[index].elements;
        var n = elements.length;
        for (i=0; i<n; i++){
            switch (elements[i].type){
                case 1:
                    var label: UULabel = new UULabel();
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
                    var result: UUBitmap = new UUBitmap();
                    var texture:egret.Texture = RES.getRes(elements[i].name);
                    result.texture = texture;
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
                    soundBtn.width = 100;
                    soundBtn.height = 50;
                    this.displayList.push(new Picture(soundBtn, elements[i].matrix));
                    break;
                case 101: 
                    var circle:CircleSector = new CircleSector();
                    circle.name = elements[i].id;
                    circle.data = elements[i];
                    circle.width = 400;
                    circle.height = 400;
                    this.displayList.push(new Picture(circle, elements[i].matrix));
                    break;
                case 8:
                    // this.createGameScene();
                    // this.displayList.push(new Picture(this.container, elements[i].matrix));
                    break;
            }
            
        }
    }

    render () {
        this.clear();
        this.drawDisplayList();
        this.tool.draw();
    }

    clear () {
        this.tool.undraw();
    }

    reset () {
        this.clear();
        var i = 0;
        var n = this.displayList.length;
        for (i=0; i<n; i++){
            this.displayList[i].undraw(this);
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
                this.displayList[i].draw(this);
            // }
        }
    }

    pre (event: egret.TouchEvent) {
        if(this.pageIndex > 0){
            this.reset();
            this.pageIndex --;
            this.renderResources(this.pageIndex);
        }
        
    }

    next (event: egret.TouchEvent) {
        if(this.pageIndex < this.pages.length - 1){
            this.reset();
            this.pageIndex ++;
            this.renderResources(this.pageIndex);
        }
    }

    addSinglePicture (data: uiData) {
        RES.getResByUrl("resource/assets/"+data.url, function(texture:egret.Texture):void {
            var m = new Matrix(1,0,0,1,300,500);
            var result: UUBitmap = new UUBitmap();
            result.texture = texture;
            // this.addChild(result);
            // var n = url.substring(url.lastIndexOf("/")+1);
            var eles = this.pages[this.pageIndex].elements;
            
            data.id = data.id + '-'+ this.displayList.length;
            eles.push({
                "id": data.id,
                "name": data.name,
                "pageId": 201807311008,
                "type": 2,
                "matrix": {
                    "a": m.a,
                    "b": m.b,
                    "c": m.c,
                    "d": m.d,
                    "x": m.x,
                    "y": m.y
                },
                "src": "resource/assets/" + data.url,
                "sceneId": 1001
            })
            
            
            result.name = data.id;
            result.data = data;
            this.displayList.push(new Picture(result, m));
        }, this, RES.ResourceItem.TYPE_IMAGE);

    }

    changeBg (url: string) {
        RES.getResByUrl(url, function(texture:egret.Texture):void {
            var result:egret.Bitmap = new egret.Bitmap();
            result.texture = texture;
            result.width = this.bg.width;
            result.height = this.bg.height;
            this.bg.removeChildren();
            this.bg.addChild(result);
        }, this, RES.ResourceItem.TYPE_IMAGE);
    }

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
            "type": 18,
            "matrix": {
                "a": m.a,
                "b": m.b,
                "c": m.c,
                "d": m.d,
                "x": m.x,
                "y": m.y
            },
            "sound": {
                "id": data.id,
                "name": n,
                "src": "resource/assets/" + data.url
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

    }

    addComponent (data: uiData) {
        var m = new Matrix(1,0,0,1,0,0);
        var n = data.name;
        var eles = this.pages[this.pageIndex].elements;
        // var triggerGroup = this.pages[this.pageIndex].properties.triggerGroup;
        data.id = data.id + '-'+ this.displayList.length;
        eles.push({
            "id": data.id,
            "name": n,
            "pageId": 201807311008,
            "type": 101,
            "matrix": {
                "a": m.a,
                "b": m.b,
                "c": m.c,
                "d": m.d,
                "x": m.x,
                "y": m.y
            },
            "sceneId": 1001
        })
        
        var circle:CircleSector = new CircleSector();
        circle.data = data;
        circle.width = 400;
        circle.height = 400;
        this.displayList.push(new Picture(circle, m));
    }
}