// TypeScript file
class CircleSector extends eui.Group {
    constructor () {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage (event:egret.Event) {
        this.drawSector(); 
    }
    

    private drawSector () {
        var shape:egret.Shape = new egret.Shape();
        this.addChild(shape);

        var awards = [    
            '大保健', '话费10元', '话费20元', '话费30元', '保时捷911', '土豪金项链', 'iphone 20', '火星7日游'
        ];
        var arc = 360 / awards.length;
        var lastAngle = 0;
        var r = 200;

        var fillStyle: any = 0xffffff;
        var strokeStyle: any = 0x007eff;
        var lineWidth: number = 2;

        for (var i = 0; i< awards.length; i++){

            if (i % 2 === 0) fillStyle = 0xFFFFFF;
            else             fillStyle = 0xFD5757;
            lastAngle = i * arc;

            this.drawArc(shape,r,r,r,arc,lastAngle,fillStyle);


            var g: eui.Group = new eui.Group();
            g.width = 2 * r * Math.sin(arc * 2 * Math.PI/ 360/2);
            g.height = r;
            g.x = 200 + Math.cos(lastAngle * Math.PI / 180 + arc* Math.PI / 180 / 2) * 200;
            g.y = 200 + Math.sin(lastAngle * Math.PI / 180 + arc* Math.PI / 180 / 2) * 200;
            // g.rotation = 30 * i;//lastAngle * 2 * Math.PI / 360 + arc * 2 * Math.PI / 360 + Math.PI / 2;
            g.rotation = (lastAngle * Math.PI / 180 + arc * Math.PI / 180 / 2 + Math.PI /2 ) * 180 / Math.PI;
            var s: egret.Shape = new egret.Shape();
            s.graphics.beginFill(0x000000, 0);
            s.graphics.lineStyle(1, 0xf2f2f2);
            s.graphics.drawRect(0, 0, g.width, g.height);
            s.graphics.endFill();
            g.addChild(s);
            var label: eui.Label = new eui.Label(awards[i]);
            label.textColor = 0xE5302F;
            label.size = 18;
            // label.horizontalCenter = 0;
            // label.top = 5;
            // label.width = g.width - 30;
            label.x = - label.width / 2;
            label.y = 10;
            g.addChild(label);
            // var img: egret.Bitmap = new egret.Bitmap();
            // var texture:egret.Texture = RES.getRes(Math.round(5)*);
            // img.texture = texture;

            
            this.addChild(g);
        }

    }

    drawArc(mc:egret.Shape, x:number=200, y:number=200, r:number=100, angle:number=27, startFrom:number=270, color:number=0xff0000):void {
        mc.graphics.beginFill(color,50);
        mc.graphics.lineStyle(0,color);   
        mc.graphics.moveTo(x,y);
        angle=(Math.abs(angle)>360)?360:angle;
        var n:number=Math.ceil(Math.abs(angle)/45);
        var angleA:number=angle/n;
        angleA=angleA*Math.PI/180;
        startFrom=startFrom*Math.PI/180;
        mc.graphics.lineTo(x+r*Math.cos(startFrom),y+r*Math.sin(startFrom));
        for (var i=1; i<=n; i++) {
            startFrom+=angleA;
            var angleMid=startFrom-angleA/2;
            var bx=x+r/Math.cos(angleA/2)*Math.cos(angleMid);
            var by=y+r/Math.cos(angleA/2)*Math.sin(angleMid);
            var cx=x+r*Math.cos(startFrom);
            var cy=y+r*Math.sin(startFrom);
            mc.graphics.curveTo(bx,by,cx,cy);
        }
        if (angle!=360) {
            mc.graphics.lineTo(x,y);
        }
        mc.graphics.endFill();
    }

}