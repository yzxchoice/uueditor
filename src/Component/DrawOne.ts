enum DrawOneLayoutType {
    topToBottom = 1,
    BottomTo = 2,
    LeftToRight = 3,
    RightToLeft = 4,
}

class DrawOne extends eui.Group {

    static uuType = UUType.DRAW_ONE;
    // props
     private award: IResource[] = [];
     private toAward: IResource[] = [];
     private layoutType: DrawOneLayoutType = 1;

     constructor(props) {
         super();
         this.award = props.award;
         this.toAward = props.toAward;
         this.init();
     }

     private init() {
         let layout = <eui.VerticalLayout>LayoutFactory.main(LayoutType.VLayout, GapType.Big);
         layout.horizontalAlign = egret.HorizontalAlign.CENTER;
         this.layout = layout;
         this.addChild(this.createBorderBox()); 
         this.addChild(this.createImageBox());         
         this.width = 800;
         this.height = 600;
     }

     private createBorderBox(): eui.Group {
         let group = new eui.Group();
         group.layout = LayoutFactory.main(LayoutType.HLayout, GapType.Middle);
         for(let i = 0, len = this.toAward.length; i < len; i++) {
             let img = <eui.Image>UIFactory.createImage(this.toAward[i].url);
             img.name = this.toAward[i].id;
             img.width = 240;
             img.height = 240;
             group.addChild(img);
         }
         let sizeObj = LayoutFactory.setGroupSize(this.toAward.length, 240, 240, LayoutType.HLayout, GapType.Big);
         group.width = sizeObj.width;
         group.height = sizeObj.height;
         return group;
     }

     private createImageBox(): eui.Group {

         let sizeObj = LayoutFactory.setGroupSize(this.award.length, 240, 240, LayoutType.HLayout, GapType.Big);         
         let group = UIFactory.createGroup(sizeObj.width, sizeObj.height);

         let imgArr: UUImage[] = []
         for(let i = 0, len = this.award.length; i < len; i++) {
             let img = new UUImage();
             img.isDraw = true;
             img.source = this.award[i].url;
             img.name = this.award[i].id;
             img.width = 240;
             img.height = 240;
            
             imgArr.push(img);
         }
         LayoutBaseFactory.main( group, imgArr, LayoutType.HLayout, GapType.Middle );
         return group;
     }
}