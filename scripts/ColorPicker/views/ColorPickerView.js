define([
	'backbone',
	'text!ColorPicker/templates/mainTemplate.html',
	'text!ColorPicker/templates/inputTemplate.html',
	'text!ColorPicker/templates/squareTemplate.html',
	'ColorPicker/utility/colorHelper'
], function (Backbone, MainTemplate, InputTemplate, SquareTemplate, colorHelper) {

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
			
			events: {
				"change .radio-button": "makeActive",
				"focus #input-rgb": "validationRgb",
				"focus #cmyk input[type=text]": "validationCmyk",
				"click #submit": "setNewcolor",
				"click #square": "openOrClosePicker"
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
			/*
			asd: function () {
				obj: {
					odlCmyk:this.model.get("currentColorCmyk") 
				}
				return obj;
				//	oldRgb = this.model.get("currentColorRgb");
			},
			*/
			setValueModel: function () {
				var cmyk = this.model.get('currentColorCmyk');
				var rgb = this.model.get('currentColorRgb');
				var that = this;
				
				setColorParams(that, rgb, cmyk);
			},
			
			setNewValueModel: function (cmyk, rgb) {
				this.model.set("currentColorCmyk", cmyk);
				this.model.set("currentColorRgb", rgb);
				this.model.set("defaultColorSquare", rgb);
				alert("добавилось");
			},
			
			makeActive: function (event) {
				this.$(".text-input").attr("disabled", "disabled");
				$(event.currentTarget).parent().find(".text-input").removeAttr("disabled");
			},
			/*
			openOrClosePicker: function () {
				console.log($("#color-palette").css("display"));
				console.log(this.asd.oldCmyk);

			},
			*/
			testCorrectColorRgb: function (str) {
				var colorObj;
				var i;
				var reg = /[A-Fa-f0-9]/;
				var strLength;
			
				if (str.charAt(0) === '#') {
					str = str.substring(1);
				}

				strLength = str.length;
				
				if (strLength === 3 || strLength === 6) {
					for (i = 0; i < strLength; i++) {
						if (!reg.test(str[i])) {
							return false;
						}
					}
					
					return true;
				}
				
				return false;			
			},
			
			testCorrectColorCmyk: function (cmyk) {
				var i;
			
				for (i = 0; i < cmyk.length; i++) {
					if (isNaN(cmyk[i]) || cmyk[i] > 100 || cmyk[i].length < 1) {
					
						return false;
					}
				}
				
				return true;
			},
			
			validationCmyk: function (event) {
				var mainThis = this;
				var that = this.$(event.currentTarget);
				
				return that.keydown(function() {
					return setTimeout(function () {
						var colorObj;
						var rgbHex;
						var valueInput;
						
						valueInput = [
							this.$('#cmyk-input-c').val(),
							this.$('#cmyk-input-m').val(),
							this.$('#cmyk-input-y').val(),
							this.$('#cmyk-input-k').val()
						];
						
						if (!mainThis.testCorrectColorCmyk(valueInput)) {
						
							this.$("#square").css({"background-color" : mainThis.model.get("defaultColorSquare")});
							this.$("#rgb input[type=text]").val(mainThis.model.get("currentColorRgb"));

							return false;
						}

						colorObj = colorHelper.conversionCmyk(valueInput);
						rgbHex = "#" + colorObj.rgbHex[0] + colorObj.rgbHex[1] + colorObj.rgbHex[2];
						
						if (valueInput[3] === "100") {
							this.$("#rgb input[type=text]").val("#000000");
							this.$("#square").css({"background-color" : "#000000"});
						} else {
							this.$("#rgb input[type=text]").val(rgbHex);
							this.$("#square").css({"background-color" : rgbHex});
						}		
						
					}, 10);
				});
			},
			
			validationRgb: function (event) {
				var mainThis = this;
				var that = this.$(event.currentTarget);
				
				return that.keydown(function() {
					return setTimeout(function () {
						var colorObj;
						var defaultCmyk = mainThis.model.get("currentColorCmyk");;
						var valueInput;
						
						valueInput = that.val();
					
						if (!(valueInput.charAt(0) === '#')) {
							valueInput = "#" + valueInput;
						}

						if (mainThis.testCorrectColorRgb(valueInput)) {
							
							colorObj = colorHelper.conversionRgb(valueInput);

							setColorParams(this, colorObj.rgbHex, colorObj.cmyk);
							this.$('#rgb input[type=text]').val(valueInput);

							return true;
						} else {
							this.$("#square").css({"background-color" : mainThis.model.get("defaultColorSquare")});
							
							this.$("#cmyk-input-c").val(defaultCmyk[0]);
							this.$("#cmyk-input-m").val(defaultCmyk[1]);
							this.$("#cmyk-input-y").val(defaultCmyk[2]);
							this.$("#cmyk-input-k").val(defaultCmyk[3]);
						}
						
					}, 10);
				});
			},
			
			setNewcolor: function () {
				// закрыть палетку
				var cmyk;
				var rgb = this.$("#rgb input[type=text]").val();
				
				cmyk = [
					this.$('#cmyk-input-c').val(),
					this.$('#cmyk-input-m').val(),
					this.$('#cmyk-input-y').val(),
					this.$('#cmyk-input-k').val()
				];
				
				if (this.testCorrectColorCmyk(cmyk) && this.testCorrectColorRgb(rgb)) {
					this.setNewValueModel(cmyk, rgb);
				}
			}
		};
	})());
	
	return ColorPickerView;
})
