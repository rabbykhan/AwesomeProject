/* @flow */
'use strict';

var React = require('react-native');
var sidebar = require('./variable').brandSidebar

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
	sidebar: {
        paddingRight: 0,	        
        paddingTop: 60,
 		backgroundColor: sidebar,
 		flex: 1,     		
    },
    controlPanelText: {
     	color:'white'
    },
    linkText: {
     	fontSize: 25,
     	color: '#fff',
        left: 15,
        textAlign:'right',
        marginRight:25,
    },    
    link: {    
        position: 'relative',
    	borderWidth: 1,
        paddingTop: 14,
        height: 70,        
    	borderTopColor: 'transparent',
    	borderLeftColor: 'transparent',
    	borderRightColor: 'transparent',
        borderBottomColor: '#7CB342'
    },
    close: {
        marginTop: 15
    }
});
