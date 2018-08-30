class StyleCircleSector extends StyleEdit {
	
	public constructor(config, props) {
		super(config, props);
		// 表头字段
		this.headData = ['文本','图片'];
		// 用到的props属性
		this.propsKey = 'awards';
		// 用到的props属性的value值（数组）中每一项obj中属性对应的组件
		this.componenntTypeConfig = {
			text: '',
			url: 'eui.Button'
		}
	}
}
