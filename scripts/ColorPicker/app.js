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
		this.colorPickerView.render();
				
		$('#miniSquare > div').hover(function () {
			var thisColor = $(this).attr('data-color-rgb');
			
			$('#square').css({
				'background-color': thisColor
			});
			$('#rgb input[type=text]').val(thisColor);
		}, function () {
			var defaultColor = $('#square').attr('data-color');
			
			$('#square').css({
				'background-color': defaultColor
			});
			$('#rgb input[type=text]').val(defaultColor);
		});
		
	};
	
	return ColorPicker;
});
