define(['backbone'], function (Backbone) {
	var colorHelper = (function () {
	
		// PRIVATE

		var decHex;
		var hexDec;
		
		hexDec = function (hex) {
			var m = hex.slice(1).match(/.{2}/g);
			
			m[0] = parseInt(m[0], 16);
			m[1] = parseInt(m[1], 16);
			m[2] = parseInt(m[2], 16);
		
			return m;
		};
		
		decHex = function (dec) {
			var arr;
			var i;

			arr = [
				(dec[0]).toString(16),
				(dec[1]).toString(16),
				(dec[2]).toString(16)
			]
			
			for (i = 0; i < arr.length; i++) {
				if (arr[i].length === 1) {
					arr[i] = "0" + arr[i];
				}			
			}
		
			return arr;
		};
		
		// PUBLIC
	
		return {
			conversionRgb: function (color) {
				var arr = [0,0,0,1];
				var c;
				var k;
				var m;
				var rgb;
				var y;
				
				if (color.length === 4) {
					color = "#" + color[1] + color[1] + color[2] + color[2] + color[3] + color[3];
				}

				rgb = hexDec(color);
				
				c = (255 - rgb[0]) / 255;
				m = (255 - rgb[1]) / 255;
				y = (255 - rgb[2]) / 255;
				k = Math.min(c, m, y);
				
				if (k !== 1) {
					arr[0] = Math.round(((c - k)/(1 - k)).toFixed(2) * 100);
					arr[1] = Math.round(((m - k)/(1 - k)).toFixed(2) * 100);
					arr[2] = Math.round(((y - k)/(1 - k)).toFixed(2) * 100);
					arr[3] = Math.round(k.toFixed(2) * 100);
				}
				
				return colorObj = {
						rgbHex: color,
						rgb: rgb,
						cmyk: arr
					}
			},
			
			conversionCmyk: function (color) {
				var rgb;
				var rgbHex;
				
				rgb = [
					Math.round((100 - color[0]) * 2.55),
					Math.round((100 - color[1]) * 2.55),
					Math.round((100 - color[2]) * 2.55)
				];

				rgbHex = decHex(rgb);
				
				return colorObj = {
					rgb: rgb,
					rgbHex: rgbHex
				}
			}
		};	
	})();
	
	return colorHelper;
});
