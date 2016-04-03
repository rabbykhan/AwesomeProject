/* @flow */
'use strict';

import React, {Component, Text, View, TouchableHighlight } from 'react-native';
import styles from '../styles/loadingStyle';

export default class loading extends Component {
    render() {
        return(
            <View style={styles.container}>
		        <Text>
		          Loading data...
		        </Text>
	      	</View> 
        );
    }    

}

