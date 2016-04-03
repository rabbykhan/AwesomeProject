/* @flow */
'use strict';

import React, {Component, Text, View} from 'react-native';
import styles from '../styles/loading';

export default class loading extends Component {
    render() {
        return(
            <View style={styles.container}>
		        <Text style={styles.lodingText}>
		          Loading data...
		        </Text>
	      	</View> 
        );
    }    

}

