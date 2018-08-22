var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// TypeScript file
var Fetch = (function () {
    function Fetch() {
    }
    Fetch.start = function (url, data, type, resType) {
        var _this = this;
        if (url === void 0) { url = ''; }
        if (data === void 0) { data = {}; }
        if (type === void 0) { type = 'GET'; }
        if (resType === void 0) { resType = 'JSON'; }
        return new Promise(function (resolve, reject) {
            var dataStr = ''; //数据拼接字符串
            if (type == 'GET') {
                Object.keys(data).forEach(function (key) {
                    dataStr += key + '=' + data[key] + '&';
                });
                if (dataStr !== '') {
                    dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
                    url = url + '?' + dataStr;
                }
            }
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.open(url, type);
            request.send(data);
            request.addEventListener(egret.Event.COMPLETE, onPostComplete, _this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, onPostIOError, _this);
            request.addEventListener(egret.ProgressEvent.PROGRESS, onPostProgress, _this);
            function onPostComplete(event) {
                var request = event.currentTarget;
                egret.log("post data : ", request.response);
                resolve(JSON.parse(request.response));
            }
            function onPostIOError(event) {
                egret.log("post error : " + event);
                reject(event);
            }
            function onPostProgress(event) {
                egret.log("post progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
            }
        });
    };
    return Fetch;
}());
__reflect(Fetch.prototype, "Fetch");
//# sourceMappingURL=Fetch.js.map