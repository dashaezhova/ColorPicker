define([
	'backbone',
	'ColorPicker/models/ColorPickerModel',
	'ColorPicker/views/ColorPickerView'
], function (Backbone, ColorPickerModel, ColorPickerView) {

	var ColorPicker = function (params) {
		this.initialize(params);
	};
	
	var p = ColorPicker.prototype;
	
	p.initialize = function (params) {
		this.divId = params.divId;
		this.defaultColor = params.defaultColor;
		
		
		this.colorPickerModel = new ColorPickerModel({
			divId: this.divId,
			defaultColor: this.defaultColor
		});
		
		this.colorPickerView = new ColorPickerView({
			model: this.colorPickerModel,
			el: $('#' + this.divId)
		});
	};


	
	
	p.render = function () {
		//$('#'+this.divId).css({'background-color': this.defaultColor});
		this.colorPickerView.render();
	};
	
	
	
	
	
	
	
	
	
	
	return ColorPicker;
});