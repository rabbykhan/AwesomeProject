/* @flow */
'use strict';

import React, {Component, Text, View, TouchableHighlight } from 'react-native';
import styles from '../styles/button';
import {brandPrimary as primary} from '../styles/variable';

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

