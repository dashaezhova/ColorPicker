require.config({
	paths: {
		"jquery": "libs/jquery",
		"underscore": "libs/underscore",
		"backbone": "libs/backbone",
		"text": "libs/text"
	}
})

require(["ColorPicker/app"], function (ColorPicker) {
	var colorPicker1 = new ColorPicker({
		divId: 'test_block',
		defaultColor: '#645654'
	});
	colorPicker1.render();
});