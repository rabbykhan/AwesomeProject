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
                        flex: 1,
                    	color:'white',
                    	alignSelf: 'center',
                        textAlign: 'center',
						fontSize: 20
                   	}}>{this.props.text}</Text>
            </TouchableHighlight> 
        );
    }    

}