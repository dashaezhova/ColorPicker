define([
	'backbone',
	'text!ColorPicker/templates/mainTemplate.html'
], function (Backbone, MainTemplate) {

	var ColorPickerView = Backbone.View.extend({
		initialize: function () {
			alert("создался вид");
		},
		
		template: _.template(MainTemplate),
		
		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
		}
	})
	
	return ColorPickerView;
})
