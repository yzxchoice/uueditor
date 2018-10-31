
/**
 * 滤镜工厂
 * 1、图片金色滤镜：createGlodFilter
 * 2、文本金色滤镜：createGlodFilterForText
 * 3、暗色滤镜：createShadowFilter
 */
class FilterFactory {
    static createGlodFilter(): egret.GlowFilter {
        var color:number = 0xFFD700;        /// 光晕的颜色，十六进制，不包含透明度
		var alpha:number = 0.8;             /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
		var blurX:number = 100;              /// 水平模糊量。有效值为 0 到 255.0（浮点）
		var blurY:number = 100;              /// 垂直模糊量。有效值为 0 到 255.0（浮点）
		var strength:number = 2;            /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
		var quality:number = egret.BitmapFilterQuality.HIGH;        /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
		var inner:boolean = false;            /// 指定发光是否为内侧发光，暂未实现
		var knockout:boolean = false;            /// 指定对象是否具有挖空效果，暂未实现
		var glowFilter:egret.GlowFilter = new egret.GlowFilter( color, alpha, blurX, blurY,
			strength, quality, inner, knockout );
		let flag = 'add';
		// setInterval(() => {
		// 	if(glowFilter.blurX > 250) {
		// 		flag = 'reduce';
		// 	}
		// 	if(glowFilter.blurX <= 30) {
		// 		flag = 'add';
		// 	}
		// 	if(flag === 'add') {
		// 		glowFilter.blurX += 20;
		// 		glowFilter.blurY += 20;
		// 	}else {
		// 		glowFilter.blurX -= 20;
		// 		glowFilter.blurY -= 20;
		// 	}
			
		// }, 200);

        return glowFilter;
    }

	static createGlodFilterForText(): egret.GlowFilter {
		var color:number = 0xFFD700;        /// 光晕的颜色，十六进制，不包含透明度
		var alpha:number = 0.8;             /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
		var blurX:number = 20;              /// 水平模糊量。有效值为 0 到 255.0（浮点）
		var blurY:number = 20;              /// 垂直模糊量。有效值为 0 到 255.0（浮点）
		var strength:number = 5;            /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
		var quality:number = egret.BitmapFilterQuality.HIGH;        /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
		var inner:boolean = false;            /// 指定发光是否为内侧发光，暂未实现
		var knockout:boolean = false;            /// 指定对象是否具有挖空效果，暂未实现
		var glowFilter:egret.GlowFilter = new egret.GlowFilter( color, alpha, blurX, blurY,
			strength, quality, inner, knockout );
        return glowFilter;
	}

    static createShadowFilter(): egret.ColorMatrixFilter {
        var colorMatrix = [
			0.3,0.6,0,0,0,
			0.3,0.6,0,0,0,
			0.3,0.6,0,0,0,
			0,0,0,1,0
		];
		var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        return colorFlilter;
    }
}