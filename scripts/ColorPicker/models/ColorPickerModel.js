define(['backbone'], function() {

	var ColorPickerModel = Backbone.Model.extend ({	// model
		defaults: {
			divId: null,
			defaultColor: "#000000"
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