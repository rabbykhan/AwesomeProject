import Color from 'color';

var color = Color("rgb(255, 255, 255)")
var primary = Color("#ccc");
var background=Color("#f6f6f6");
var layoutColor=Color("#56BC95");

module.exports={
	borderColor:primary.hexString().toString(),
	backgroundColor:background.hexString().toString(),
	layoutColor:layoutColor.hexString().toString()
}