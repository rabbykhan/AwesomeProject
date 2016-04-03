import Color from 'color';

var color = Color("rgb(255, 255, 255)")
var toolbarBackground = Color("#00B14E");
var background=Color("#E0E0E0");

module.exports={
	toolbarBackground:toolbarBackground.hexString().toString(),
	backgroundColor:background.hexString().toString(),
}