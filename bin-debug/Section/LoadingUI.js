//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.createView();
        return _this;
    }
    LoadingUI.prototype.createView = function () {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 400;
        this.textField.x = (1920 - 480) / 2;
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.textAlign = "center";
        this.textField.textColor = 0x999999;
        var bg = new egret.Shape();
        bg.height = 30;
        bg.width = 480;
        bg.x = (1920 - 480) / 2;
        bg.y = 350;
        bg.graphics.beginFill(0xffffff, 1);
        bg.graphics.drawRoundRect(0, 0, 480, 30, 30);
        bg.graphics.endFill();
        this.addChild(bg);
        this.progressBar = new egret.Shape();
        this.progressBar.x = (1920 - 480) / 2;
        this.progressBar.y = 350;
        this.addChild(this.progressBar);
        var mask = new egret.Shape();
        mask.height = 30;
        mask.width = 480;
        mask.x = (1920 - 480) / 2;
        mask.y = 350;
        mask.graphics.beginFill(0xcccccc, 1);
        mask.graphics.drawRoundRect(0, 0, 480, 30, 30);
        mask.graphics.endFill();
        this.addChild(mask);
        this.progressBar.mask = mask;
    };
    LoadingUI.prototype.onProgress = function (current, total) {
        this.textField.text = "Loading..." + current + "/" + total;
        // this.progressBar.value = Math.floor(current / total * 100);
        this.progressBar.graphics.beginFill(0x3fb0f5, 1);
        this.progressBar.graphics.drawRoundRect(0, 0, 480 * current / total, 30, 30);
        this.progressBar.graphics.endFill();
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI", ["RES.PromiseTaskReporter"]);