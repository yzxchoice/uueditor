var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Utils2 = (function () {
    function Utils2() {
    }
    Utils2.getComs = function () {
        return [UULabel, UUImage, UUContainer, SoundButton, CircleSector, UUBackground, Slideshow, SlotMachine, CardAlert];
    };
    Utils2.getTexture = function (url) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            RES.getResByUrl(url, function (texture) {
                resolve(texture);
            }, _this, RES.ResourceItem.TYPE_IMAGE);
        });
    };
    Utils2.getSound = function (url) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var sound = new egret.Sound();
            sound.addEventListener(egret.Event.COMPLETE, function (event) {
                resolve(event.target);
            }, _this);
            sound.load(url);
        });
    };
    // static getScript (arr: Array<string>) {
    // 	return new Promise( (resolve, reject) => {
    // 		loadScript(arr, () => {
    // 			resolve();
    // 		});
    // 	})
    // }
    Utils2.trans = function (arr, templateId) {
        var obj = {
            "groups": [
                {
                    "keys": "data_json",
                    "name": "preloadpic"
                }
            ],
            "resources": [
                {
                    "url": templateId + "/data.json",
                    "type": "json",
                    "name": "data_json"
                }
            ]
        };
        arr.forEach(function (item, index) {
            item.elements.forEach(function (elem) {
                if (elem.hasOwnProperty('src') && elem.src != '') {
                    var n = elem.src.substring(elem.src.lastIndexOf("/") + 1).replace('.', '_');
                    obj.resources.push({
                        url: elem.src,
                        type: 'image',
                        name: n
                    });
                    obj.groups[0].keys = obj.groups[0].keys == '' ? n : obj.groups[0].keys + ',' + n;
                }
            });
        });
        return obj;
    };
    return Utils2;
}());
__reflect(Utils2.prototype, "Utils2");
