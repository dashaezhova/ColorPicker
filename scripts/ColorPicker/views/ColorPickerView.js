define([
	'backbone',
	'text!ColorPicker/templates/mainTemplate.html',
	'text!ColorPicker/templates/inputTemplate.html',
	'text!ColorPicker/templates/squareTemplate.html'
], function (Backbone, MainTemplate, InputTemplate, SquareTemplate) {

	var allTemplates = SquareTemplate + InputTemplate + MainTemplate;
	var ColorPickerView = Backbone.View.extend({
		initialize: function () {
		},
		template: _.template(allTemplates),
		
		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
		}
	})
	
	return ColorPickerView;
})
