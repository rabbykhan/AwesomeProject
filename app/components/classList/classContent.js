/* @flow */
'use strict';

import React, {Component, Text, View, ScrollView} from 'react-native';
import Navbar from '../../widgets/Navbar';
import styles from './style/classlistStyle';
import ClassList from './classList';


export default class classContent extends Component {
	constructor(props) {
        super(props);
    }
    componentDidMount() {
       
    }

	render() {
		return(
	    	<View style={styles.classlistContent}>
	     		<Navbar title="Class List" />
				<ScrollView style={styles.classListView} >
					<ClassList /> 
				</ScrollView>
			
	        </View>
		);
	}
}
