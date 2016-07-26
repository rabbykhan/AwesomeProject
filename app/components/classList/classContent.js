/* @flow */
'use strict';

import React, {Component, Text, View, ScrollView} from 'react-native';
import Navbar from '../../widgets/Navbar';
import styles from './style/classlistStyle';
import ClassList from './classList';
import languageService from '../../services/languageService';


export default class classContent extends Component {
	constructor(props) {
        super(props);
    }
    componentDidMount() {
       
    }

	render() {
		console.log("class content render");
		return(
	    	<View style={styles.classlistContent}>
	     		<Navbar title={languageService.getNavbarContent("classlist")} />
				<ScrollView style={styles.classListView} >
					<ClassList /> 
				</ScrollView>
			
	        </View>
		);
	}
}
