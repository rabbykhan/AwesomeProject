import Color from 'color';

var color = Color("rgb(255, 255, 255)")
var toolbarBackground = Color("#00B14E");
var background=Color("#FFFFFF");

module.exports={
	toolbarBackground:toolbarBackground.hexString().toString(),
	backgroundColor:background.hexString().toString(),
}