'use strict';

import React, {Component, Text, View, TouchableHighlight,Image } from 'react-native';
import styles from '../../../styles/buttonStyle';

export default class RightButton extends Component {
    render() {
        return(
            <TouchableHighlight
                style={this.props.style}
                onPress={this.props.onPress}>
                <Image 
                source={require('./Image/rightarrow.png')} 
                resizeMode = "contain"
                style={{
                	padding:10,
                	margin:5,
                	width: 40, 
                	height: 40,
                	alignSelf: 'center'
                	}}
                />
                    
            </TouchableHighlight> 
        );
    }    

}
