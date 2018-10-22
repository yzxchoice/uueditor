
class DragBorderBox extends eui.Group {

    static uuType = UUType.DRAG_BORDER_BOX;
    // props
    private toAward: IResource[] = []; // 框图片列表
    private layoutType: LayoutType = 1; // 布局方式
    private gap: GapType = GapType.Middle;
    private columnCount: number = 3;

     constructor(props) {
         super();
         if(props.layoutSet.layoutType) {
            this.layoutType = props.layoutSet.layoutType;
         }
         if(props.layoutSet.gap) {
            this.gap = props.layoutSet.gap;
         }
         if(props.layoutSet.columnCount) {
            this.columnCount = props.layoutSet.columnCount;
         }
         this.toAward = props.toAward;
         this.init();
     }

     private init() {
         this.layout = LayoutFactory.main(this.layoutType, this.gap, this.columnCount);
         let size = LayoutFactory.setGroupSize(this.toAward.length, 240, 240, this.layoutType, this.gap, this.columnCount);
         this.width = size.width;
         this.height = size.height;
         this.createBorderBox();
     }

     private createBorderBox(): void {
         for(let i = 0, len = this.toAward.length; i < len; i++) {
             let img = <eui.Image>UIFactory.createImage(this.toAward[i].url);
             img.width = 240;
             img.height = 240;
             let imgGroup = UIFactory.createGroup(img.width, img.height);
             imgGroup.name = this.toAward[i].id.toString();             
             imgGroup.addChild(img);
             this.addChild(imgGroup);
         }
     }

}