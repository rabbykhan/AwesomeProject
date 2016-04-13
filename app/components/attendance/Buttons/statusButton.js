/* @flow */
'use strict';

import React, {Component, Text, View, TouchableHighlight } from 'react-native';

export default class statusButton extends Component {
    render() {
        return(
            <TouchableHighlight
                style={this.props.style}
                onPress={this.props.onPress}>
                    <View style={{backgroundColor:this.props.color,flex:1,marginLeft:10,marginRight:10}}></View>
            
                   
            </TouchableHighlight> 
        );
    }    

}

