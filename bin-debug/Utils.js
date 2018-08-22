var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Utils = (function () {
    function Utils() {
    }
    Utils.trans = function (arr) {
        var obj = {
            "groups": [
                {
                    "keys": "data_json",
                    "name": "preloadpic"
                }
            ],
            "resources": [
                {
                    "url": Main.id + "/data.json",
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
    return Utils;
}());
__reflect(Utils.prototype, "Utils");
