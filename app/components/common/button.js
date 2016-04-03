/* @flow */
'use strict';

import React, {Component, Text, TouchableHighlight } from 'react-native';
import styles from '../../styles/style';

export default class Button extends Component {
    render() {
        return(
            <TouchableHighlight
                style={styles.button}
                underlayColor="#B5B5B5"
                onPress={this.props.onPress}>
                    <Text style={styles.buttonText}>{this.props.text}</Text>
            </TouchableHighlight> 
        );
    }    

}

