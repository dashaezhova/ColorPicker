define([
	'backbone',
	'ColorPicker/models/ColorPickerModel',
	'ColorPicker/views/ColorPickerView',
	'ColorPicker/collections/CollectionColor',
	'ColorPicker/views/ColorSquareView',
	'ColorPicker/models/ColorModel'
], function (Backbone, ColorPickerModel, ColorPickerView, CollectionColor, ColorSquareView, ColorModel) {

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
		var that = this;
		
		this.colorPickerView.render();
				
		this.colorPickerModel.get('colorsCollection').each(function (color) {
			var thisViewColor = new ColorSquareView({
				model: color,
				parentView: that.colorPickerView
			});		
			
			$('#colors-wrapper').append(thisViewColor.render().el);
		});
	};
	
	return ColorPicker;
});
