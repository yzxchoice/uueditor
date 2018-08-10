// TypeScript file
class PreviewBox extends eui.Group implements IUUContainer {
    container: Game;

    dispose (): void {

    }

    draw (container: any): void {
        this.container = container;
        this.container.addChild(this);

        this.width = 1920;
        this.height = 1080;
        var bg:egret.Shape = new egret.Shape;
        bg.graphics.beginFill(0xcccccc,1);
        bg.graphics.drawRect(0, 0, 1920, 1080);
        bg.graphics.endFill();
        this.addChild(bg);
        this.addChild(new Preview());

        var button3 = new eui.Button();
        button3.y = 0;
        button3.right = 0;
        button3.width = 100;
        button3.height = 40;
        button3.label = "关闭";
        button3.addEventListener(Mouse.START, this.close, this);
        this.addChild(button3);
    }
    
    public constructor () {
        super();
    }

    private close (event: egret.TouchEvent) {
        this.parent.removeChild(this);
    }
}