define(['backbone'], function (Backbone) {
	var colorHelper = (function () {
	
		// PRIVATE
		
		var hexDec = function (hex) {
			var m = hex.slice(1).match(/.{2}/g);
			
			m[0] = parseInt(m[0], 16);
			m[1] = parseInt(m[1], 16);
			m[2] = parseInt(m[2], 16);
		
			return m;
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
				
				rgb = hexDec(color);
				
				c = (255 - rgb[0]) / 255;
				m = (255 - rgb[1]) / 255;
				y = (255 - rgb[2]) / 255;
				k = Math.min(c, m, y);
				
				if (k !== 1) {
					arr[0] = ((c - k)/(1 - k)).toFixed(2) * 100;
					arr[1] = ((m - k)/(1 - k)).toFixed(2) * 100;
					arr[2] = Math.round(((y - k)/(1 - k)).toFixed(2) * 100);
					arr[3] = k.toFixed(2) * 100;
				}
				
				return colorObj = {
						rgbHex: color,
						rgb: rgb,
						cmyk: arr
					}
			}
		};	
	})();
	
	return colorHelper;
});
