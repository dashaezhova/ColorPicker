define([
	'backbone',
	'text!ColorPicker/templates/mainTemplate.html',
	'text!ColorPicker/templates/inputTemplate.html',
	'text!ColorPicker/templates/squareTemplate.html'
], function (Backbone, MainTemplate, InputTemplate, SquareTemplate) {

	var allTemplates = SquareTemplate + InputTemplate + MainTemplate;
	var ColorPickerView = Backbone.View.extend((function () {
	
		// PRIVATE
		
		var setColorParams = function (context, rgb, cmyk) {
			context.$('#rgb input[type=text]').val(rgb);
			
			context.$('#cmyk-input-c').val(cmyk[0]);
			context.$('#cmyk-input-m').val(cmyk[1]);
			context.$('#cmyk-input-y').val(cmyk[2]);
			context.$('#cmyk-input-k').val(cmyk[3]);
			
			context.$("#square").css({"background-color" : rgb});
		};
		
		// PUBLIC
	
		return {
			initialize: function () {
				this.on("updateInput", this.updateInput, this);
				this.on("setValueModel", this.setValueModel, this);
				this.on("setNewValueModel", this.setNewValueModel, this);
			},
			
			template: _.template(allTemplates),
			
			render: function () {
				this.$el.html(this.template(this.model.toJSON()));
				
				return this;
			},
			
			updateInput: function (cmyk, rgb) {
				var colorBigSquare = this.model.get("defaultColorSquare");
				var that = this;
				
				setColorParams(that, rgb, cmyk);
			},
			
			setValueModel: function () {
				var cmyk = this.model.get('currentColorCmyk');
				var rgb = this.model.get('currentColorRgb');
				var that = this;
				
				setColorParams(that, rgb, cmyk);
			},
			
			setNewValueModel: function (cmyk, rgb) {
				this.model.set("currentColorCmyk", cmyk);
				this.model.set("currentColorRgb", rgb);
			}
		};
	})());
	
	return ColorPickerView;
})
