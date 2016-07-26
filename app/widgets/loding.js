/* @flow */
'use strict';

import React, {Component, Text, View} from 'react-native';
import styles from '../styles/loading';
import languageService from '../services/languageService';
export default class loading extends Component {
    render() {
        return(
            <View style={styles.container}>
		        <Text style={styles.lodingText}>
		        {languageService.getAttendanceContent("loading")}
		        </Text>
	      	</View> 
        );
    }    

}

