define([
	'backbone',
	'ColorPicker/models/ColorModel',
	'ColorPicker/utility/colorHelper'
], function (Backbone, ColorModel, colorHelper) {
	var CollectionColor = Backbone.Collection.extend({
		model: ColorModel,
		
		initialize: function () {
			this.on("add", this.editColor, this);
		},
		
		editColor: function (model, collection, options) {
			var color = colorHelper.conversionRgb(model.get("rgb"));
		
			model.set("cmyk", color.cmyk);
		}
	});

	return CollectionColor; 
});
