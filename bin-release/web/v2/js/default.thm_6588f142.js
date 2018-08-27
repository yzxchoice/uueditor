window.skins={};
                function __extends(d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                        function __() {
                            this.constructor = d;
                        }
                    __.prototype = b.prototype;
                    d.prototype = new __();
                };
                window.generateEUI = {};
                generateEUI.paths = {};
                generateEUI.styles = undefined;
                generateEUI.skins = {"eui.Button":"resource/eui_skins/ButtonSkin.exml","eui.Panel":"resource/eui_skins/PanelSkin.exml","eui.CheckBox":"resource/eui_skins/CheckBoxSkin.exml","eui.ToggleSwitch":"resource/eui_skins/ToggleSwitchSkin.exml","eui.VScrollBar":"resource/eui_skins/VScrollBarSkin.exml"};generateEUI.paths['resource/eui_skins/ButtonSkin.exml'] = window.skins.ButtonSkin = (function (_super) {
	__extends(ButtonSkin, _super);
	function ButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay","iconDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i(),this.iconDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","button_down_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
	}
	var _proto = ButtonSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	return ButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/CheckBoxSkin.exml'] = window.skins.CheckBoxSkin = (function (_super) {
	__extends(CheckBoxSkin, _super);
	function CheckBoxSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_up_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_down_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_disabled_png")
				])
		];
	}
	var _proto = CheckBoxSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "checkbox_unselect_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		return t;
	};
	return CheckBoxSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/HScrollBarSkin.exml'] = window.skins.HScrollBarSkin = (function (_super) {
	__extends(HScrollBarSkin, _super);
	function HScrollBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.thumb_i()];
	}
	var _proto = HScrollBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 8;
		t.scale9Grid = new egret.Rectangle(3,3,2,2);
		t.source = "roundthumb_png";
		t.verticalCenter = 0;
		t.width = 30;
		return t;
	};
	return HScrollBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/HSliderSkin.exml'] = window.skins.HSliderSkin = (function (_super) {
	__extends(HSliderSkin, _super);
	function HSliderSkin() {
		_super.call(this);
		this.skinParts = ["track","thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.track_i(),this.thumb_i()];
	}
	var _proto = HSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.height = 6;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_sb_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.source = "thumb_png";
		t.verticalCenter = 0;
		return t;
	};
	return HSliderSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ItemRendererSkin.exml'] = window.skins.ItemRendererSkin = (function (_super) {
	__extends(ItemRendererSkin, _super);
	function ItemRendererSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","button_down_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data"],[0],this.labelDisplay,"text");
	}
	var _proto = ItemRendererSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.fontFamily = "Tahoma";
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	return ItemRendererSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/PanelSkin.exml'] = window.skins.PanelSkin = (function (_super) {
	__extends(PanelSkin, _super);
	function PanelSkin() {
		_super.call(this);
		this.skinParts = ["titleDisplay","moveArea","closeButton"];
		
		this.minHeight = 230;
		this.minWidth = 450;
		this.elementsContent = [this._Image1_i(),this.moveArea_i(),this.closeButton_i()];
	}
	var _proto = PanelSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(2,2,12,12);
		t.source = "border_png";
		t.top = 0;
		return t;
	};
	_proto.moveArea_i = function () {
		var t = new eui.Group();
		this.moveArea = t;
		t.height = 45;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.elementsContent = [this._Image2_i(),this.titleDisplay_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "header_png";
		t.top = 0;
		return t;
	};
	_proto.titleDisplay_i = function () {
		var t = new eui.Label();
		this.titleDisplay = t;
		t.fontFamily = "Tahoma";
		t.left = 15;
		t.right = 5;
		t.size = 20;
		t.textColor = 0xFFFFFF;
		t.verticalCenter = 0;
		t.wordWrap = false;
		return t;
	};
	_proto.closeButton_i = function () {
		var t = new eui.Button();
		this.closeButton = t;
		t.bottom = 5;
		t.horizontalCenter = 0;
		t.label = "close";
		return t;
	};
	return PanelSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ProgressBarSkin.exml'] = window.skins.ProgressBarSkin = (function (_super) {
	__extends(ProgressBarSkin, _super);
	function ProgressBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb","labelDisplay"];
		
		this.minHeight = 18;
		this.minWidth = 30;
		this.elementsContent = [this._Image1_i(),this.thumb_i(),this.labelDisplay_i()];
	}
	var _proto = ProgressBarSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_pb_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.percentHeight = 100;
		t.source = "thumb_pb_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.horizontalCenter = 0;
		t.size = 15;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		return t;
	};
	return ProgressBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/RadioButtonSkin.exml'] = window.skins.RadioButtonSkin = (function (_super) {
	__extends(RadioButtonSkin, _super);
	function RadioButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_up_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_down_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_disabled_png")
				])
		];
	}
	var _proto = RadioButtonSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "radiobutton_unselect_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		return t;
	};
	return RadioButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ScrollerSkin.exml'] = window.skins.ScrollerSkin = (function (_super) {
	__extends(ScrollerSkin, _super);
	function ScrollerSkin() {
		_super.call(this);
		this.skinParts = ["horizontalScrollBar","verticalScrollBar"];
		
		this.minHeight = 20;
		this.minWidth = 20;
		this.elementsContent = [this.horizontalScrollBar_i(),this.verticalScrollBar_i()];
	}
	var _proto = ScrollerSkin.prototype;

	_proto.horizontalScrollBar_i = function () {
		var t = new eui.HScrollBar();
		this.horizontalScrollBar = t;
		t.bottom = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.verticalScrollBar_i = function () {
		var t = new eui.VScrollBar();
		this.verticalScrollBar = t;
		t.percentHeight = 100;
		t.right = 0;
		t.width = 4;
		return t;
	};
	return ScrollerSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/TextInputSkin.exml'] = window.skins.TextInputSkin = (function (_super) {
	__extends(TextInputSkin, _super);
	function TextInputSkin() {
		_super.call(this);
		this.skinParts = ["textDisplay","promptDisplay"];
		
		this.minHeight = 40;
		this.minWidth = 300;
		this.elementsContent = [this._Image1_i(),this._Rect1_i(),this.textDisplay_i()];
		this.promptDisplay_i();
		
		this.states = [
			new eui.State ("normal",
				[
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("textDisplay","textColor",0xff0000)
				])
			,
			new eui.State ("normalWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
			,
			new eui.State ("disabledWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
		];
	}
	var _proto = TextInputSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xffffff;
		t.percentHeight = 100;
		t.percentWidth = 100;
		return t;
	};
	_proto.textDisplay_i = function () {
		var t = new eui.EditableText();
		this.textDisplay = t;
		t.height = 24;
		t.left = "10";
		t.right = "10";
		t.size = 20;
		t.textColor = 0x000000;
		t.verticalCenter = "0";
		t.percentWidth = 100;
		return t;
	};
	_proto.promptDisplay_i = function () {
		var t = new eui.Label();
		this.promptDisplay = t;
		t.height = 24;
		t.left = 10;
		t.right = 10;
		t.size = 20;
		t.textColor = 0xa9a9a9;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	return TextInputSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ToggleSwitchSkin.exml'] = window.skins.ToggleSwitchSkin = (function (_super) {
	__extends(ToggleSwitchSkin, _super);
	function ToggleSwitchSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.elementsContent = [this._Image1_i(),this._Image2_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
		];
	}
	var _proto = ToggleSwitchSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.source = "on_png";
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.horizontalCenter = -18;
		t.source = "handle_png";
		t.verticalCenter = 0;
		return t;
	};
	return ToggleSwitchSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/VScrollBarSkin.exml'] = window.skins.VScrollBarSkin = (function (_super) {
	__extends(VScrollBarSkin, _super);
	function VScrollBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 20;
		this.minWidth = 8;
		this.elementsContent = [this.thumb_i()];
	}
	var _proto = VScrollBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 100;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(3,3,2,2);
		t.source = "roundthumb_png";
		t.width = 8;
		return t;
	};
	return VScrollBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/VSliderSkin.exml'] = window.skins.VSliderSkin = (function (_super) {
	__extends(VSliderSkin, _super);
	function VSliderSkin() {
		_super.call(this);
		this.skinParts = ["track","thumb"];
		
		this.minHeight = 30;
		this.minWidth = 25;
		this.elementsContent = [this.track_i(),this.thumb_i()];
	}
	var _proto = VSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_png";
		t.width = 7;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.horizontalCenter = 0;
		t.source = "thumb_png";
		return t;
	};
	return VSliderSkin;
})(eui.Skin);generateEUI.paths['resource/skins/ColorSelectBoxSkin.exml'] = window.ColorSelectBoxSkin = (function (_super) {
	__extends(ColorSelectBoxSkin, _super);
	function ColorSelectBoxSkin() {
		_super.call(this);
		this.skinParts = ["gp_box"];
		
		this.height = 135;
		this.width = 212;
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = ColorSelectBoxSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Rect1_i(),this.gp_box_i()];
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xc4bebe;
		t.percentHeight = 100;
		t.strokeColor = 0x070000;
		t.strokeWeight = 1;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.gp_box_i = function () {
		var t = new eui.Group();
		this.gp_box = t;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		t.layout = this._TileLayout1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.columnAlign = "left";
		t.paddingBottom = 5;
		t.paddingLeft = 5;
		t.paddingRight = 5;
		t.paddingTop = 5;
		t.requestedColumnCount = 8;
		t.requestedRowCount = 4;
		t.rowAlign = "top";
		return t;
	};
	return ColorSelectBoxSkin;
})(eui.Skin);generateEUI.paths['resource/skins/EventSet.exml'] = window.SetEvent = (function (_super) {
	__extends(SetEvent, _super);
	function SetEvent() {
		_super.call(this);
		this.skinParts = ["btn_show","btn_hidden","label_title","label_close","input_time"];
		
		this.height = 200;
		this.width = 500;
		this.elementsContent = [this._Rect1_i(),this._Group5_i()];
		this.states = [
			new eui.State ("show",
				[
					new eui.SetProperty("_Rect3","fillColor",0x07e5f9),
					new eui.SetProperty("_Label1","textColor",0xffffff),
					new eui.SetProperty("_Rect4","fillColor",0xffffff),
					new eui.SetProperty("_Label2","textColor",0x0A0000)
				])
			,
			new eui.State ("hidden",
				[
					new eui.SetProperty("_Rect3","fillColor",0xffffff),
					new eui.SetProperty("_Label1","textColor",0x0a0000),
					new eui.SetProperty("_Rect4","fillColor",0x07e5f9),
					new eui.SetProperty("_Label2","textColor",0xffffff)
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.stateObj.targetId"],[0],this.label_title,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.stateObj.delay"],[0],this.input_time,"text");
	}
	var _proto = SetEvent.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xffffff;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Group5_i = function () {
		var t = new eui.Group();
		t.height = 200;
		t.width = 460;
		t.x = 20;
		t.y = 0;
		t.elementsContent = [this._Group2_i(),this._Group4_i()];
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.percentHeight = 50;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Group1_i(),this.label_title_i(),this.label_close_i()];
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 50;
		t.width = 150;
		t.x = 0;
		t.y = 25;
		t.elementsContent = [this._Rect2_i(),this.btn_show_i(),this.btn_hidden_i()];
		return t;
	};
	_proto._Rect2_i = function () {
		var t = new eui.Rect();
		t.fillAlpha = 0;
		t.height = 54;
		t.strokeAlpha = 1;
		t.strokeColor = 0x1bb56c;
		t.strokeWeight = 1;
		t.width = 154;
		t.x = -3;
		t.y = -2;
		return t;
	};
	_proto.btn_show_i = function () {
		var t = new eui.Group();
		this.btn_show = t;
		t.percentHeight = 100;
		t.percentWidth = 50;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Rect3_i(),this._Label1_i()];
		return t;
	};
	_proto._Rect3_i = function () {
		var t = new eui.Rect();
		this._Rect3 = t;
		t.fillColor = 0xfffcfc;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		this._Label1 = t;
		t.left = 0;
		t.size = 26;
		t.text = "显示";
		t.textAlign = "center";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.btn_hidden_i = function () {
		var t = new eui.Group();
		this.btn_hidden = t;
		t.percentHeight = 100;
		t.percentWidth = 50;
		t.x = 75;
		t.y = 0;
		t.elementsContent = [this._Rect4_i(),this._Label2_i()];
		return t;
	};
	_proto._Rect4_i = function () {
		var t = new eui.Rect();
		this._Rect4 = t;
		t.fillColor = 0xfffcfc;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		this._Label2 = t;
		t.left = 0;
		t.size = 26;
		t.text = "隐藏";
		t.textAlign = "center";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.label_title_i = function () {
		var t = new eui.Label();
		this.label_title = t;
		t.horizontalCenter = 0;
		t.size = 26;
		t.textColor = 0x070000;
		t.verticalCenter = 0;
		return t;
	};
	_proto.label_close_i = function () {
		var t = new eui.Label();
		this.label_close = t;
		t.size = 26;
		t.text = "X";
		t.textColor = 0x070000;
		t.x = 426;
		t.y = 33;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.percentHeight = 50;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 100;
		t.elementsContent = [this._Label3_i(),this._Group3_i()];
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		t.size = 26;
		t.text = "延迟时间";
		t.textColor = 0x0c0000;
		t.verticalCenter = 0;
		t.x = 0;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.height = 40;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 200;
		t.elementsContent = [this._Rect5_i(),this.input_time_i()];
		return t;
	};
	_proto._Rect5_i = function () {
		var t = new eui.Rect();
		t.fillAlpha = 0;
		t.height = 43;
		t.strokeWeight = 1;
		t.width = 203;
		t.x = -2;
		t.y = -2;
		return t;
	};
	_proto.input_time_i = function () {
		var t = new eui.TextInput();
		this.input_time = t;
		t.enabled = true;
		t.percentHeight = 100;
		t.skinName = "skins.TextInputSkin";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	return SetEvent;
})(eui.Skin);generateEUI.paths['resource/skins/GameSkin.exml'] = window.GameSkin = (function (_super) {
	__extends(GameSkin, _super);
	function GameSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 1080;
		this.width = 1920;
	}
	var _proto = GameSkin.prototype;

	return GameSkin;
})(eui.Skin);generateEUI.paths['resource/skins/SelectSkin.exml'] = window.SelectSkin = (function (_super) {
	__extends(SelectSkin, _super);
	function SelectSkin() {
		_super.call(this);
		this.skinParts = ["gp_selection_rect","gp_selection","gp_selection_box"];
		
		this.height = 240;
		this.width = 200;
		this.elementsContent = [this._Group1_i()];
		
		eui.Binding.$bindProperties(this, ["hostComponent.stateObj.selectedItem"],[0],this.gp_selection_rect,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.stateObj.selectionVisible"],[0],this.gp_selection_box,"visible");
	}
	var _proto = SelectSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 40;
		t.width = 200;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Rect1_i(),this.gp_selection_rect_i(),this.gp_selection_box_i()];
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.ellipseHeight = 10;
		t.ellipseWidth = 10;
		t.fillColor = 0xfcfffe;
		t.height = 40;
		t.strokeAlpha = 0;
		t.strokeColor = 0xdbd2d2;
		t.strokeWeight = 2;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.gp_selection_rect_i = function () {
		var t = new eui.Label();
		this.gp_selection_rect = t;
		t.height = 40;
		t.name = "gp_selection_rect";
		t.size = 20;
		t.textAlign = "left";
		t.textColor = 0x000000;
		t.verticalAlign = "middle";
		t.percentWidth = 100;
		t.x = 10;
		t.y = 1;
		return t;
	};
	_proto.gp_selection_box_i = function () {
		var t = new eui.Group();
		this.gp_selection_box = t;
		t.height = 160;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 40;
		t.elementsContent = [this._Rect2_i(),this._Scroller1_i()];
		return t;
	};
	_proto._Rect2_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xe2e0e0;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.enabled = true;
		t.percentHeight = 100;
		t.skinName = "skins.ScrollerSkin";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		t.viewport = this.gp_selection_i();
		return t;
	};
	_proto.gp_selection_i = function () {
		var t = new eui.Group();
		this.gp_selection = t;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 0;
		t.horizontalAlign = "left";
		t.paddingLeft = 0;
		t.paddingTop = 5;
		t.verticalAlign = "top";
		return t;
	};
	return SelectSkin;
})(eui.Skin);generateEUI.paths['resource/skins/TabStyleSkin.exml'] = window.TabStyleSkin = (function (_super) {
	__extends(TabStyleSkin, _super);
	function TabStyleSkin() {
		_super.call(this);
		this.skinParts = ["gp_diff","input_width","input_width0","input_width2","input_width1","input_width3","gp_inputContainer","btn_update","gp_eventContainer_style"];
		
		this.height = 680;
		this.width = 500;
		this.elementsContent = [this.gp_eventContainer_style_i()];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.width"],[0],this.input_width,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.height"],[0],this.input_width0,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.x"],[0],this.input_width2,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.y"],[0],this.input_width1,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.rotate"],[0],this.input_width3,"text");
	}
	var _proto = TabStyleSkin.prototype;

	_proto.gp_eventContainer_style_i = function () {
		var t = new eui.Group();
		this.gp_eventContainer_style = t;
		t.height = 680;
		t.width = 500;
		t.x = 0;
		t.y = 0;
		t.layout = this._BasicLayout1_i();
		t.elementsContent = [this._Rect1_i(),this._Group7_i()];
		return t;
	};
	_proto._BasicLayout1_i = function () {
		var t = new eui.BasicLayout();
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xebf4f1;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Group7_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		t.layout = this._VerticalLayout2_i();
		t.elementsContent = [this._Scroller1_i()];
		return t;
	};
	_proto._VerticalLayout2_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 252;
		t.y = 334;
		t.viewport = this._Group6_i();
		return t;
	};
	_proto._Group6_i = function () {
		var t = new eui.Group();
		t.layout = this._VerticalLayout1_i();
		t.elementsContent = [this.gp_diff_i(),this.gp_inputContainer_i(),this.btn_update_i()];
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 0;
		return t;
	};
	_proto.gp_diff_i = function () {
		var t = new eui.Group();
		this.gp_diff = t;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		t.layout = this._HorizontalLayout1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 0;
		t.horizontalAlign = "center";
		return t;
	};
	_proto.gp_inputContainer_i = function () {
		var t = new eui.Group();
		this.gp_inputContainer = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 230;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 500;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Group1_i(),this._Group2_i(),this._Group3_i(),this._Group4_i(),this._Group5_i()];
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetY = 0;
		t.height = 70;
		t.width = 250;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Label1_i(),this.input_width_i()];
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.height = 70;
		t.size = 24;
		t.text = "宽：";
		t.textColor = 0x0a0000;
		t.verticalAlign = "middle";
		t.x = 20;
		t.y = 0;
		return t;
	};
	_proto.input_width_i = function () {
		var t = new eui.TextInput();
		this.input_width = t;
		t.enabled = true;
		t.height = 30;
		t.name = "input_width";
		t.skinName = "skins.TextInputSkin";
		t.textColor = 0x000000;
		t.touchEnabled = true;
		t.verticalCenter = 0;
		t.width = 140;
		t.x = 80;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.anchorOffsetY = 0;
		t.height = 70;
		t.width = 250;
		t.x = 250;
		t.y = 0;
		t.elementsContent = [this._Label2_i(),this.input_width0_i()];
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.height = 70;
		t.size = 24;
		t.text = "高：";
		t.textColor = 0x0A0000;
		t.verticalAlign = "middle";
		t.x = 20;
		t.y = 0;
		return t;
	};
	_proto.input_width0_i = function () {
		var t = new eui.TextInput();
		this.input_width0 = t;
		t.enabled = true;
		t.height = 30;
		t.name = "input_height";
		t.skinName = "skins.TextInputSkin";
		t.textColor = 0x000000;
		t.touchEnabled = true;
		t.verticalCenter = 0;
		t.width = 140;
		t.x = 80;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.anchorOffsetY = 0;
		t.height = 70;
		t.width = 250;
		t.x = 0;
		t.y = 70;
		t.elementsContent = [this._Label3_i(),this.input_width2_i()];
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		t.height = 70;
		t.size = 24;
		t.text = "X：";
		t.textColor = 0x0A0000;
		t.verticalAlign = "middle";
		t.x = 20;
		t.y = 0;
		return t;
	};
	_proto.input_width2_i = function () {
		var t = new eui.TextInput();
		this.input_width2 = t;
		t.enabled = true;
		t.height = 30;
		t.name = "input_x";
		t.skinName = "skins.TextInputSkin";
		t.textColor = 0x000000;
		t.touchEnabled = true;
		t.verticalCenter = 0;
		t.width = 140;
		t.x = 80;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.anchorOffsetY = 0;
		t.height = 70;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 250;
		t.x = 250;
		t.y = 70;
		t.elementsContent = [this._Label4_i(),this.input_width1_i()];
		return t;
	};
	_proto._Label4_i = function () {
		var t = new eui.Label();
		t.height = 70;
		t.size = 24;
		t.text = "Y：";
		t.textColor = 0x0A0000;
		t.verticalAlign = "middle";
		t.x = 20;
		t.y = 0;
		return t;
	};
	_proto.input_width1_i = function () {
		var t = new eui.TextInput();
		this.input_width1 = t;
		t.enabled = true;
		t.height = 30;
		t.name = "input_y";
		t.skinName = "skins.TextInputSkin";
		t.textColor = 0x000000;
		t.touchEnabled = true;
		t.verticalCenter = 0;
		t.width = 140;
		t.x = 80;
		return t;
	};
	_proto._Group5_i = function () {
		var t = new eui.Group();
		t.anchorOffsetY = 0;
		t.height = 70;
		t.width = 250;
		t.x = 0;
		t.y = 140;
		t.elementsContent = [this._Label5_i(),this.input_width3_i()];
		return t;
	};
	_proto._Label5_i = function () {
		var t = new eui.Label();
		t.height = 70;
		t.size = 24;
		t.text = "旋转：";
		t.textColor = 0x0A0000;
		t.verticalAlign = "middle";
		t.x = 20;
		t.y = 0;
		return t;
	};
	_proto.input_width3_i = function () {
		var t = new eui.TextInput();
		this.input_width3 = t;
		t.enabled = true;
		t.height = 30;
		t.name = "input_rotate";
		t.skinName = "skins.TextInputSkin";
		t.textColor = 0x000000;
		t.touchEnabled = true;
		t.verticalCenter = 0;
		t.width = 140;
		t.x = 80;
		return t;
	};
	_proto.btn_update_i = function () {
		var t = new eui.Button();
		this.btn_update = t;
		t.enabled = true;
		t.label = "update";
		t.visible = false;
		t.x = 195.5;
		t.y = 250;
		return t;
	};
	return TabStyleSkin;
})(eui.Skin);generateEUI.paths['resource/skins/TabAnimationSkin.exml'] = window.TabAnimationSkin = (function (_super) {
	__extends(TabAnimationSkin, _super);
	function TabAnimationSkin() {
		_super.call(this);
		this.skinParts = ["gp_eventContainer_animation"];
		
		this.height = 680;
		this.width = 500;
		this.elementsContent = [this.gp_eventContainer_animation_i()];
	}
	var _proto = TabAnimationSkin.prototype;

	_proto.gp_eventContainer_animation_i = function () {
		var t = new eui.Group();
		this.gp_eventContainer_animation = t;
		t.height = 680;
		t.width = 500;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Rect1_i(),this._Label1_i()];
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xebf4f1;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.text = "动画";
		t.textColor = 0x161111;
		t.x = 15;
		t.y = 15;
		return t;
	};
	return TabAnimationSkin;
})(eui.Skin);generateEUI.paths['resource/skins/TabEventSkin.exml'] = window.TabEventSkin = (function (_super) {
	__extends(TabEventSkin, _super);
	function TabEventSkin() {
		_super.call(this);
		this.skinParts = ["label_delete_clickEvent","gp_eventSetContainer","scroller_eventSet","gp_selection_rect","gp_selection","gp_selection_box","gp_eventContainer_event_click","gp_eventContainer_event"];
		
		this.height = 680;
		this.width = 500;
		this.elementsContent = [this.gp_eventContainer_event_i()];
		
		eui.Binding.$bindProperties(this, ["hostComponent.stateObj.selectionVisible"],[0],this.gp_selection_box,"visible");
	}
	var _proto = TabEventSkin.prototype;

	_proto.gp_eventContainer_event_i = function () {
		var t = new eui.Group();
		this.gp_eventContainer_event = t;
		t.height = 680;
		t.width = 500;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Rect1_i(),this.gp_eventContainer_event_click_i()];
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xebf4f1;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.gp_eventContainer_event_click_i = function () {
		var t = new eui.Group();
		this.gp_eventContainer_event_click = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 180;
		t.width = 500;
		t.y = 0;
		t.elementsContent = [this._Group1_i(),this.scroller_eventSet_i(),this._Group3_i()];
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 60;
		t.width = 500;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Rect2_i(),this._Label1_i(),this.label_delete_clickEvent_i()];
		return t;
	};
	_proto._Rect2_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0x73ddd1;
		t.height = 60;
		t.width = 500;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.size = 22;
		t.text = "点击触发";
		t.textColor = 0x050000;
		t.x = 12;
		t.y = 18;
		return t;
	};
	_proto.label_delete_clickEvent_i = function () {
		var t = new eui.Label();
		this.label_delete_clickEvent = t;
		t.size = 24;
		t.text = "x";
		t.textColor = 0x070000;
		t.visible = false;
		t.x = 447;
		t.y = 14;
		return t;
	};
	_proto.scroller_eventSet_i = function () {
		var t = new eui.Scroller();
		this.scroller_eventSet = t;
		t.enabled = true;
		t.height = 500;
		t.skinName = "skins.ScrollerSkin";
		t.visible = true;
		t.width = 500;
		t.x = 0;
		t.y = 180;
		t.viewport = this.gp_eventSetContainer_i();
		return t;
	};
	_proto.gp_eventSetContainer_i = function () {
		var t = new eui.Group();
		this.gp_eventSetContainer = t;
		t.width = 500;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 100;
		t.width = 500;
		t.x = 0;
		t.y = 80;
		t.elementsContent = [this._Rect3_i(),this._Label2_i(),this._Group2_i()];
		return t;
	};
	_proto._Rect3_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xffffff;
		t.height = 100;
		t.width = 500;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.size = 24;
		t.text = "目标对象";
		t.textColor = 0x050000;
		t.x = 36;
		t.y = 38;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.height = 40;
		t.x = 200;
		t.y = 30;
		t.elementsContent = [this._Rect4_i(),this.gp_selection_rect_i(),this.gp_selection_box_i()];
		return t;
	};
	_proto._Rect4_i = function () {
		var t = new eui.Rect();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.ellipseHeight = 10;
		t.ellipseWidth = 10;
		t.fillColor = 0xfcfffe;
		t.height = 40;
		t.strokeColor = 0xdbd2d2;
		t.strokeWeight = 2;
		t.width = 190;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.gp_selection_rect_i = function () {
		var t = new eui.Label();
		this.gp_selection_rect = t;
		t.height = 40;
		t.name = "gp_selection_rect";
		t.size = 20;
		t.text = "选择目标元素";
		t.textAlign = "center";
		t.textColor = 0xccc3c3;
		t.verticalAlign = "middle";
		t.width = 190;
		t.x = 0;
		t.y = 1;
		return t;
	};
	_proto.gp_selection_box_i = function () {
		var t = new eui.Group();
		this.gp_selection_box = t;
		t.height = 200;
		t.width = 190;
		t.x = 0;
		t.y = 40;
		t.elementsContent = [this._Rect5_i(),this._Scroller1_i()];
		return t;
	};
	_proto._Rect5_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xe2e0e0;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.enabled = true;
		t.percentHeight = 100;
		t.skinName = "skins.ScrollerSkin";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		t.viewport = this.gp_selection_i();
		return t;
	};
	_proto.gp_selection_i = function () {
		var t = new eui.Group();
		this.gp_selection = t;
		t.percentHeight = 100;
		t.percentWidth = 100;
		return t;
	};
	return TabEventSkin;
})(eui.Skin);generateEUI.paths['resource/skins/SiderbarSkin.exml'] = window.SiderbarSkin = (function (_super) {
	__extends(SiderbarSkin, _super);
	function SiderbarSkin() {
		_super.call(this);
		this.skinParts = ["gp_tab_layer","gp_tab_page","gp_tab_style","gp_tab_animation","gp_tab_event","gp_tabs","component_layer","component_style","component_animation","component_event","scl_eventContainer","gp_eventContainers","gp_add_click_event","gp_container_addEvent"];
		
		this.currentState = "event";
		this.height = 800;
		this.width = 500;
		this.elementsContent = [this._Rect1_i(),this._Group1_i(),this._Rect2_i(),this.gp_tabs_i(),this.gp_eventContainers_i(),this.gp_container_addEvent_i()];
		this.component_layer_i();
		
		this._TabPage1_i();
		
		this.component_style_i();
		
		this.component_animation_i();
		
		this.component_event_i();
		
		this.states = [
			new eui.State ("layer",
				[
					new eui.AddItems("component_layer","_Group2",0,""),
					new eui.SetProperty("_Label2","textColor",0x009aff),
					new eui.SetProperty("_Rect3","fillColor",0x009aff),
					new eui.SetProperty("gp_tab_style","percentWidth",20),
					new eui.SetProperty("gp_tab_animation","percentWidth",20),
					new eui.SetProperty("gp_tab_event","percentWidth",20),
					new eui.SetProperty("_TileLayout1","horizontalAlign","justify"),
					new eui.SetProperty("_TileLayout1","requestedColumnCount",5),
					new eui.SetProperty("_TileLayout1","columnWidth",100),
					new eui.SetProperty("gp_eventContainers","width",500),
					new eui.SetProperty("gp_eventContainers","height",680)
				])
			,
			new eui.State ("page",
				[
					new eui.AddItems("_TabPage1","_Group2",1,""),
					new eui.SetProperty("_Label3","textColor",0x009aff),
					new eui.SetProperty("_Rect4","fillColor",0x009aff)
				])
			,
			new eui.State ("style",
				[
					new eui.AddItems("component_style","_Group2",1,""),
					new eui.SetProperty("_Label4","textColor",0x009aff),
					new eui.SetProperty("_Rect5","fillColor",0x009aff)
				])
			,
			new eui.State ("animation",
				[
					new eui.AddItems("component_animation","_Group2",1,""),
					new eui.SetProperty("_Label5","textColor",0x009aff),
					new eui.SetProperty("_Rect6","fillColor",0x009aff)
				])
			,
			new eui.State ("event",
				[
					new eui.AddItems("component_event","_Group2",1,""),
					new eui.SetProperty("_Label6","textColor",0x009aff),
					new eui.SetProperty("_Rect7","fillColor",0x009aff)
				])
		];
	}
	var _proto = SiderbarSkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xf9f2f2;
		t.height = 800;
		t.strokeColor = 0xfffcfc;
		t.width = 500;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 60;
		t.width = 500;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Label1_i()];
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.size = 26;
		t.text = "组件设置";
		t.textColor = 0x160f0f;
		t.x = 21.33;
		t.y = 15;
		return t;
	};
	_proto._Rect2_i = function () {
		var t = new eui.Rect();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fillColor = 0xebf4f1;
		t.height = 740;
		t.width = 500;
		t.x = 0;
		t.y = 60;
		return t;
	};
	_proto.gp_tabs_i = function () {
		var t = new eui.Group();
		this.gp_tabs = t;
		t.anchorOffsetX = 0;
		t.height = 60;
		t.width = 500;
		t.x = 0;
		t.y = 60;
		t.layout = this._TileLayout1_i();
		t.elementsContent = [this.gp_tab_layer_i(),this.gp_tab_page_i(),this.gp_tab_style_i(),this.gp_tab_animation_i(),this.gp_tab_event_i()];
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		this._TileLayout1 = t;
		t.columnAlign = "justifyUsingGap";
		t.columnWidth = 100;
		t.horizontalAlign = "justify";
		t.horizontalGap = 0;
		t.orientation = "rows";
		t.requestedColumnCount = 5;
		t.requestedRowCount = 1;
		t.rowAlign = "justifyUsingGap";
		t.verticalAlign = "top";
		t.verticalGap = 0;
		return t;
	};
	_proto.gp_tab_layer_i = function () {
		var t = new eui.Group();
		this.gp_tab_layer = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 60;
		t.name = "layer";
		t.percentWidth = 20;
		t.x = 10;
		t.y = 10;
		t.elementsContent = [this._Label2_i(),this._Rect3_i()];
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		this._Label2 = t;
		t.height = 59;
		t.horizontalCenter = 0;
		t.name = "label";
		t.size = 24;
		t.text = "图层";
		t.textAlign = "center";
		t.textColor = 0x160D0D;
		t.top = 0;
		t.verticalAlign = "middle";
		t.percentWidth = 100;
		return t;
	};
	_proto._Rect3_i = function () {
		var t = new eui.Rect();
		this._Rect3 = t;
		t.fillColor = 0x160D0D;
		t.height = 1;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 59;
		return t;
	};
	_proto.gp_tab_page_i = function () {
		var t = new eui.Group();
		this.gp_tab_page = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 60;
		t.name = "page";
		t.percentWidth = 20;
		t.x = 10;
		t.y = 10;
		t.elementsContent = [this._Label3_i(),this._Rect4_i()];
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		this._Label3 = t;
		t.height = 59;
		t.horizontalCenter = 0;
		t.name = "label";
		t.size = 24;
		t.text = "页面";
		t.textAlign = "center";
		t.textColor = 0x160D0D;
		t.top = 0;
		t.verticalAlign = "middle";
		t.percentWidth = 100;
		return t;
	};
	_proto._Rect4_i = function () {
		var t = new eui.Rect();
		this._Rect4 = t;
		t.fillColor = 0x160D0D;
		t.height = 1;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 59;
		return t;
	};
	_proto.gp_tab_style_i = function () {
		var t = new eui.Group();
		this.gp_tab_style = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 60;
		t.name = "style";
		t.percentWidth = 20;
		t.x = 125;
		t.y = 0;
		t.elementsContent = [this._Label4_i(),this._Rect5_i()];
		return t;
	};
	_proto._Label4_i = function () {
		var t = new eui.Label();
		this._Label4 = t;
		t.height = 59;
		t.horizontalCenter = 0;
		t.name = "label";
		t.size = 24;
		t.text = "样式";
		t.textAlign = "center";
		t.textColor = 0x160d0d;
		t.top = 0;
		t.verticalAlign = "middle";
		t.percentWidth = 100;
		return t;
	};
	_proto._Rect5_i = function () {
		var t = new eui.Rect();
		this._Rect5 = t;
		t.fillColor = 0x160d0d;
		t.height = 1;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 59;
		return t;
	};
	_proto.gp_tab_animation_i = function () {
		var t = new eui.Group();
		this.gp_tab_animation = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 60;
		t.name = "animation";
		t.percentWidth = 20;
		t.x = 250;
		t.y = 0;
		t.elementsContent = [this._Label5_i(),this._Rect6_i()];
		return t;
	};
	_proto._Label5_i = function () {
		var t = new eui.Label();
		this._Label5 = t;
		t.height = 59;
		t.name = "label";
		t.size = 24;
		t.text = "动画";
		t.textAlign = "center";
		t.textColor = 0x160D0D;
		t.top = 0;
		t.verticalAlign = "middle";
		t.percentWidth = 100;
		t.x = 0;
		return t;
	};
	_proto._Rect6_i = function () {
		var t = new eui.Rect();
		this._Rect6 = t;
		t.fillColor = 0x160d0d;
		t.height = 1;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 59;
		return t;
	};
	_proto.gp_tab_event_i = function () {
		var t = new eui.Group();
		this.gp_tab_event = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 60;
		t.name = "event";
		t.percentWidth = 20;
		t.x = 375;
		t.y = 0;
		t.elementsContent = [this._Label6_i(),this._Rect7_i()];
		return t;
	};
	_proto._Label6_i = function () {
		var t = new eui.Label();
		this._Label6 = t;
		t.height = 59;
		t.name = "label";
		t.size = 24;
		t.text = "触发";
		t.textAlign = "center";
		t.textColor = 0x160D0D;
		t.top = 0;
		t.verticalAlign = "middle";
		t.percentWidth = 100;
		t.x = 0;
		return t;
	};
	_proto._Rect7_i = function () {
		var t = new eui.Rect();
		this._Rect7 = t;
		t.fillColor = 0x160d0d;
		t.height = 1;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 59;
		return t;
	};
	_proto.gp_eventContainers_i = function () {
		var t = new eui.Group();
		this.gp_eventContainers = t;
		t.x = 0;
		t.y = 120;
		t.elementsContent = [this.scl_eventContainer_i()];
		return t;
	};
	_proto.scl_eventContainer_i = function () {
		var t = new eui.Scroller();
		this.scl_eventContainer = t;
		t.enabled = true;
		t.height = 680;
		t.skinName = "skins.ScrollerSkin";
		t.width = 500;
		t.x = 0;
		t.y = 0;
		t.viewport = this._Group2_i();
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		this._Group2 = t;
		t.width = 500;
		t.elementsContent = [];
		return t;
	};
	_proto.component_layer_i = function () {
		var t = new TabLayer();
		this.component_layer = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 500;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._TabPage1_i = function () {
		var t = new TabPage();
		this._TabPage1 = t;
		t.height = 680;
		t.width = 500;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.component_style_i = function () {
		var t = new TabStyle();
		this.component_style = t;
		t.percentHeight = 100;
		t.skinName = "TabStyleSkin";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.component_animation_i = function () {
		var t = new TabAnimation();
		this.component_animation = t;
		t.enabled = true;
		t.percentHeight = 100;
		t.skinName = "TabAnimationSkin";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.component_event_i = function () {
		var t = new TabEvent();
		this.component_event = t;
		t.skinName = "TabEventSkin";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.gp_container_addEvent_i = function () {
		var t = new eui.Group();
		this.gp_container_addEvent = t;
		t.height = 680;
		t.visible = false;
		t.width = 500;
		t.x = 0;
		t.y = 120;
		t.elementsContent = [this._Rect8_i(),this._Group3_i(),this._Group4_i()];
		return t;
	};
	_proto._Rect8_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xffffff;
		t.height = 680;
		t.width = 500;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.height = 680;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Rect9_i(),this._Label7_i()];
		return t;
	};
	_proto._Rect9_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xa4f4e0;
		t.height = 60;
		t.strokeColor = 0x72c1e0;
		t.width = 500;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Label7_i = function () {
		var t = new eui.Label();
		t.height = 60;
		t.size = 26;
		t.text = "请选择触发条件";
		t.textAlign = "center";
		t.textColor = 0x0a0000;
		t.verticalAlign = "middle";
		t.width = 500;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.height = 620;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 500;
		t.x = 0;
		t.y = 60.00000000000003;
		t.elementsContent = [this.gp_add_click_event_i()];
		return t;
	};
	_proto.gp_add_click_event_i = function () {
		var t = new eui.Group();
		this.gp_add_click_event = t;
		t.anchorOffsetX = 0;
		t.height = 60;
		t.width = 500;
		t.y = 0;
		t.elementsContent = [this._Label8_i(),this._Rect10_i()];
		return t;
	};
	_proto._Label8_i = function () {
		var t = new eui.Label();
		t.height = 59;
		t.size = 24;
		t.text = "点击";
		t.textAlign = "center";
		t.textColor = 0x070000;
		t.verticalAlign = "middle";
		t.width = 500;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Rect10_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xeae1e1;
		t.height = 1;
		t.width = 500;
		t.x = 0;
		t.y = 59;
		return t;
	};
	return SiderbarSkin;
})(eui.Skin);generateEUI.paths['resource/skins/StartSkin.exml'] = window.Start = (function (_super) {
	__extends(Start, _super);
	function Start() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 1080;
		this.width = 1920;
	}
	var _proto = Start.prototype;

	return Start;
})(eui.Skin);generateEUI.paths['resource/skins/StyleInputSkin.exml'] = window.StyleInputSkin = (function (_super) {
	__extends(StyleInputSkin, _super);
	function StyleInputSkin() {
		_super.call(this);
		this.skinParts = ["textInput_input"];
		
		this.width = 500;
		this.elementsContent = [this._Group1_i()];
		
		eui.Binding.$bindProperties(this, ["hostComponent.stateObj.title"],[0],this._Label1,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.stateObj.content"],[0],this.textInput_input,"text");
	}
	var _proto = StyleInputSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 70;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Label1_i(),this.textInput_input_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 20;
		t.horizontalAlign = "left";
		t.paddingLeft = 20;
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		this._Label1 = t;
		t.fontFamily = "Arial";
		t.size = 24;
		t.textColor = 0x050000;
		t.x = 119;
		t.y = 19;
		return t;
	};
	_proto.textInput_input_i = function () {
		var t = new eui.TextInput();
		this.textInput_input = t;
		t.anchorOffsetX = 0;
		t.enabled = true;
		t.height = 30;
		t.name = "text";
		t.skinName = "skins.TextInputSkin";
		t.width = 300;
		t.x = 342;
		t.y = 20;
		return t;
	};
	return StyleInputSkin;
})(eui.Skin);generateEUI.paths['resource/skins/StyleSelect.exml'] = window.styleFontFamilySkin = (function (_super) {
	__extends(styleFontFamilySkin, _super);
	function styleFontFamilySkin() {
		_super.call(this);
		this.skinParts = ["gp_style_fontFamily_select","gp_style_fontFamily"];
		
		this.width = 500;
		this.elementsContent = [this.gp_style_fontFamily_i()];
		
		eui.Binding.$bindProperties(this, ["hostComponent.stateObj.title"],[0],this._Label1,"text");
	}
	var _proto = styleFontFamilySkin.prototype;

	_proto.gp_style_fontFamily_i = function () {
		var t = new eui.Group();
		this.gp_style_fontFamily = t;
		t.height = 70;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Label1_i(),this.gp_style_fontFamily_select_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 20;
		t.horizontalAlign = "left";
		t.paddingLeft = 20;
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		this._Label1 = t;
		t.size = 24;
		t.textColor = 0x050000;
		t.x = 119;
		t.y = 19;
		return t;
	};
	_proto.gp_style_fontFamily_select_i = function () {
		var t = new eui.Group();
		this.gp_style_fontFamily_select = t;
		t.height = 40;
		t.width = 200;
		t.x = 99;
		t.y = 17;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.horizontalAlign = "left";
		t.verticalAlign = "middle";
		return t;
	};
	return styleFontFamilySkin;
})(eui.Skin);generateEUI.paths['resource/skins/StyleTextColorSkin.exml'] = window.StyleTextColorSkin = (function (_super) {
	__extends(StyleTextColorSkin, _super);
	function StyleTextColorSkin() {
		_super.call(this);
		this.skinParts = ["lb_selectColor"];
		
		this.width = 500;
		this.elementsContent = [this._Group1_i()];
		
		eui.Binding.$bindProperties(this, ["hostComponent.stateObj.title"],[0],this._Label1,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.stateObj.content"],[0],this._TextInput1,"text");
	}
	var _proto = StyleTextColorSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 70;
		t.scaleX = 1;
		t.scaleY = 1;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Label1_i(),this._TextInput1_i(),this.lb_selectColor_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 20;
		t.horizontalAlign = "left";
		t.paddingLeft = 20;
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		this._Label1 = t;
		t.size = 24;
		t.textColor = 0x050000;
		t.x = 119;
		t.y = 19;
		return t;
	};
	_proto._TextInput1_i = function () {
		var t = new eui.TextInput();
		this._TextInput1 = t;
		t.anchorOffsetX = 0;
		t.enabled = true;
		t.height = 30;
		t.name = "textColor";
		t.skinName = "skins.TextInputSkin";
		t.width = 200;
		t.x = 342;
		t.y = 20;
		return t;
	};
	_proto.lb_selectColor_i = function () {
		var t = new eui.Label();
		this.lb_selectColor = t;
		t.size = 16;
		t.text = "选择";
		t.textColor = 0x1593ff;
		t.x = 301;
		t.y = 34;
		return t;
	};
	return StyleTextColorSkin;
})(eui.Skin);generateEUI.paths['resource/skins/StyleTypeSkin.exml'] = window.StyleType1Skin = (function (_super) {
	__extends(StyleType1Skin, _super);
	function StyleType1Skin() {
		_super.call(this);
		this.skinParts = ["gp_styleContainer"];
		
		this.width = 500;
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = StyleType1Skin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		t.layout = this._BasicLayout2_i();
		t.elementsContent = [this._Rect1_i(),this.gp_styleContainer_i()];
		return t;
	};
	_proto._BasicLayout2_i = function () {
		var t = new eui.BasicLayout();
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xebf4f1;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.gp_styleContainer_i = function () {
		var t = new eui.Group();
		this.gp_styleContainer = t;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		t.layout = this._BasicLayout1_i();
		return t;
	};
	_proto._BasicLayout1_i = function () {
		var t = new eui.BasicLayout();
		return t;
	};
	return StyleType1Skin;
})(eui.Skin);