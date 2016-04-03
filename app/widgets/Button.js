/* @flow */
'use strict';

import React, {Component, Text, View, TouchableHighlight } from 'react-native';
import styles from '../styles/buttonStyle';

export default class Button extends Component {
    render() {
        return(
            <TouchableHighlight
                style={styles.button}
                onPress={this.props.onPress}>
                    <Text style={styles.buttonText}>{this.props.text}</Text>
            </TouchableHighlight> 
        );
    }    

}

