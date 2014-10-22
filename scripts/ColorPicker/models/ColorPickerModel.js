define([
	'backbone',
	'ColorPicker/models/ColorModel',
	'ColorPicker/collections/CollectionColor',
	'ColorPicker/views/ColorSquareView'
], function (Backbone, ColorModel, ColorsCollection, ColorSquareView) {

	var ColorPickerModel = Backbone.Model.extend ({
		defaults: {
			divId: null,
			defaultColorSquare: "#000000",
			defaultColors: ['#654654', '#456456', '#ff00ae'],
			currentColorRgb: "#000000",
			currentColorCmyk: [0, 0, 0, 100],
			colorsCollection: null
		},
		
		initialize: function () {
			var that = this;
			
			this.set('colorsCollection', new ColorsCollection([]));
			
			_.each(this.get('defaultColors'), function (color) {
				that.get('colorsCollection').add([
					{
						rgb: color
					}
				]);				
			});
		},
		
		url: function () {
			return false;
		},
		
		sync: function () {
			return false;
		}
	});
	
	return ColorPickerModel;
})
