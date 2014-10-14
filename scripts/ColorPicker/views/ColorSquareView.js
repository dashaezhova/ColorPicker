define([
	'backbone',
	'ColorPicker/models/ColorModel',
], function(Backbone, ColorModel) {
	
	var ColorSquareView = Backbone.View.extend({
		initialize: function (params) {
			this.view = params;
		},
		
		render: function () {
			$(this.el).css({
				"background-color": this.model.get("rgb")
			});
			
			return this;
		},
		
		events: {
			"mouseover": "onMouseOver",
			"mouseout": "onMouseOut",
			"click": "onMouseClick"
		},
		
		onMouseOver: function () {
			var cmyk = this.model.get("cmyk");
			var rgb = this.model.get("rgb");
			
			this.view.parentView.trigger("updateInput", cmyk, rgb);
		
		},
		
		onMouseOut: function () {
			this.view.parentView.trigger("setValueModel");
		
		},
		
		onMouseClick: function () {
			var cmyk = this.model.get("cmyk");
			var rgb = this.model.get("rgb");
			
			this.view.parentView.trigger("setNewValueModel", cmyk, rgb);
		}
	})
	
	return ColorSquareView;
});
