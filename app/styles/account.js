/* @flow */
'use strict';

var React = require('react-native');
var primary = require('./variable').brandPrimary;

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        width: null,
        height: null
    },
    color: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: primary
    },
    toolbar: {
        height: 80,
        backgroundColor: '#322A2A',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 15,
        paddingTop: 30
    }
});
