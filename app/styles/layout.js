/* @flow */
'use strict';

var React = require('react-native');
var layoutColor = require('./variable').brandPrimary;

var {
  StyleSheet
} = React;

module.exports = StyleSheet.create({
	layout: {
		position: 'absolute', 
		top:0, 
		left:0, 
		right: 0, 
		bottom: 0,
  		backgroundColor: layoutColor
	} 
});