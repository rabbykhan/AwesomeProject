/* @flow */
'use strict';

import React, {Component, Text, View, TouchableHighlight } from 'react-native';

export default class Button extends Component {
    render() {
        return(
            <TouchableHighlight
                style={this.props.style}
                onPress={this.props.onPress}>
                    <Text 
                    style={{
                    	color:'black',
                    	alignSelf: 'flex-start',
						fontSize: 20
                   	}}>{this.props.text}</Text>
            </TouchableHighlight> 
        );
    }    

}