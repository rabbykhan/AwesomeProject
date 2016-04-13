var React = require('react-native');
var toolbarColor = require('./variable').toolbarColor;

var {
    StyleSheet
}= React;

var styles = StyleSheet.create({
    toolbarContent:{
      	height: 60,
		backgroundColor: toolbarColor,
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		padding: 15,
		position:'relative',
		top:0
    }
});

module.exports= styles;