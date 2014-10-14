define(['backbone'], function(Backbone) {
	
	var ColorModel = Backbone.Model.extend({
		defaults: {
			rgb: null,
			cmyk: null
		},
		
		url: function () {
			return false;
		},
		
		sync: function () {
			return false;
		}
	});
	
	return ColorModel;
})
