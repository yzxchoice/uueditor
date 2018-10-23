// 滤镜工厂
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var FilterFactory = (function () {
    function FilterFactory() {
    }
    FilterFactory.createGlodFilter = function () {
        var color = 0xFFD700; /// 光晕的颜色，十六进制，不包含透明度
        var alpha = 0.8; /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
        var blurX = 100; /// 水平模糊量。有效值为 0 到 255.0（浮点）
        var blurY = 100; /// 垂直模糊量。有效值为 0 到 255.0（浮点）
        var strength = 2; /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
        var quality = 3 /* HIGH */; /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
        var inner = false; /// 指定发光是否为内侧发光，暂未实现
        var knockout = false; /// 指定对象是否具有挖空效果，暂未实现
        var glowFilter = new egret.GlowFilter(color, alpha, blurX, blurY, strength, quality, inner, knockout);
        var flag = 'add';
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
    };
    FilterFactory.createGlodFilterForText = function () {
        var color = 0xFFD700; /// 光晕的颜色，十六进制，不包含透明度
        var alpha = 0.8; /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
        var blurX = 20; /// 水平模糊量。有效值为 0 到 255.0（浮点）
        var blurY = 20; /// 垂直模糊量。有效值为 0 到 255.0（浮点）
        var strength = 5; /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
        var quality = 3 /* HIGH */; /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
        var inner = false; /// 指定发光是否为内侧发光，暂未实现
        var knockout = false; /// 指定对象是否具有挖空效果，暂未实现
        var glowFilter = new egret.GlowFilter(color, alpha, blurX, blurY, strength, quality, inner, knockout);
        return glowFilter;
    };
    FilterFactory.createShadowFilter = function () {
        var colorMatrix = [
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0, 0, 0, 1, 0
        ];
        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        return colorFlilter;
    };
    return FilterFactory;
}());
__reflect(FilterFactory.prototype, "FilterFactory");
