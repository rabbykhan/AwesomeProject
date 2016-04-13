var Color = require("color")
var primary = Color("#F1F8E9");
var secondary = Color("#607D8B");
var sidebar = Color("#01B050");
var toolbar=Color("#01B050");
var darken = primary.darken(0.2).hexString().toString();

module.exports = {
	brandPrimary : primary.hexString().toString(),
	darker: darken,
	brandSecondary: secondary.hexString().toString(),
	brandSidebar: sidebar.hexString().toString(),
	toolbarColor:toolbar.hexString().toString()
}