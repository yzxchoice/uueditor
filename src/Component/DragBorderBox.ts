
class DragBorderBox extends eui.Group {

    static uuType = UUType.DRAG_BORDER_BOX;
    // props
    private bgWidth: number = 300;
    private bgHeight: number = 300;
    private toAward: IResource[] = []; // 框图片列表
    private layoutType: LayoutType = 1; // 布局方式
    private gap: GapType = GapType.Middle;
    private columnCount: number = 3;

     constructor(props) {
         super();
         for(let key in props) {
             if(props[key] !== undefined) {
                 this[key] = props[key];
             }
         }
          for(let key in props.layoutSet) {
             if(props.layoutSet[key] !== undefined) {
                 this[key] = props.layoutSet[key];
             }
         }
         this.init();
     }

     private init() {
         this.layout = LayoutFactory.main(this.layoutType, this.gap, this.columnCount);
         let size = LayoutFactory.setGroupSize(this.toAward.length, this.bgWidth, this.bgHeight, this.layoutType, this.gap, this.columnCount);
         this.width = size.width;
         this.height = size.height;
         this.createBorderBox();
     }

     private createBorderBox(): void {
         for(let i = 0, len = this.toAward.length; i < len; i++) {
             let img = <eui.Image>UIFactory.createImage(this.toAward[i].url);
             img.width = this.bgWidth;
             img.height = this.bgHeight;
             let imgGroup = UIFactory.createGroup(img.width, img.height);
             imgGroup.name = this.toAward[i].id.toString();             
             imgGroup.addChild(img);
             this.addChild(imgGroup);
         }
     }

}