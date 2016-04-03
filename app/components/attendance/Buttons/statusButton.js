/* @flow */
'use strict';

import React, {Component, Text, View, TouchableHighlight } from 'react-native';

export default class statusButton extends Component {
    render() {
        return(
            <TouchableHighlight
                style={this.props.style}
                onPress={this.props.onPress}>
                    <Text 
                    style={{color: 'red',
						alignSelf: 'center',
						fontSize: 18}}
					>
					{this.props.text}
					</Text>
            </TouchableHighlight> 
        );
    }    

}

