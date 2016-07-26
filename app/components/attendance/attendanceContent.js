/* @flow */
'use strict';

import React, {Component, Text, View, ScrollView} from 'react-native';
import Navbar from '../../widgets/Navbar';
import styles from './style/attendanceStyle';
import AttendanceList from "./attendanceList"
import languageService from '../../services/languageService';

export default class Attendance extends Component {
	constructor(props) {
        super(props);
        console.log("in attendance component " + this.props);

    }
	render() {
		console.log("course id = " + this.props.batch_id);
		return(
	    	<View style={{flex:1,flexDirection:'column'}}>
				<Navbar title={languageService.getNavbarContent("attendance")} />
					<AttendanceList batch_id={this.props.batch_id}/>
			</View>

		);
	}

}
