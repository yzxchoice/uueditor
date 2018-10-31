/**
 * 滤镜工厂
 * 1、图片金色滤镜：createGlodFilter
 * 2、文本金色滤镜：createGlodFilterForText
 * 3、暗色滤镜：createShadowFilter
 */
declare class FilterFactory {
    static createGlodFilter(): egret.GlowFilter;
    static createGlodFilterForText(): egret.GlowFilter;
    static createShadowFilter(): egret.ColorMatrixFilter;
}
