/* @flow */
'use strict';

import React, {Component, Text, View, TouchableHighlight } from 'react-native';
import styles from '../styles/loadingStyle';
import languageService from '../services/languageService';

export default class loading extends Component {
    render() {
        return(
            <View style={styles.container}>
		        <Text>
		          {languageService.getAttendanceContent("loading")}
		        </Text>
	      	</View> 
        );
    }    

}

