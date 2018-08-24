// TypeScript file
class Fetch {
    static start (url = '', data = {}, type = 'GET', resType = 'JSON') {
        return new Promise( (resolve, reject) => {

            let dataStr = ''; //数据拼接字符串
            if (type == 'GET') {
                
                Object.keys(data).forEach(key => {
                    dataStr += key + '=' + data[key] + '&';
                })

                if (dataStr !== '') {
                    dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
                    url = url + '?' + dataStr;
                }
            }
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.open(url,type);
            request.send(data);
            request.addEventListener(egret.Event.COMPLETE,onPostComplete,this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR,onPostIOError,this);
            request.addEventListener(egret.ProgressEvent.PROGRESS,onPostProgress,this);

            function onPostComplete(event:egret.Event):void {
                var request = <egret.HttpRequest>event.currentTarget;
                // egret.log("post data : ",request.response);
                resolve(JSON.parse(request.response));
            }

            function onPostIOError(event:egret.IOErrorEvent):void {
                egret.log("post error : " + event);
                reject(event);
            }

            function onPostProgress(event:egret.ProgressEvent):void {
                egret.log("post progress : " + Math.floor(100*event.bytesLoaded/event.bytesTotal) + "%");
            }
        })
    }
}