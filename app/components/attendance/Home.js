/* @flow */
'use strict';

import React, {Component, Text, View, ScrollView} from 'react-native';
import styles from '../styles/style';
import Navbar from '../widgets/Navbar';
import home from '../styles/home';
import ButtonRounded from '../widgets/ButtonRounded';
import {Actions} from 'react-native-router-flux';


export default class Home extends Component {
	
	render() {
		return(
	    	<View style={home.color}>
	     		<Navbar
	     		    title="Home"
	     		    style={home.toolbar}    
	     		/>
				<ScrollView >
					<View style={home.listContainer}>
			     		<Text style={home.list}>
			     			Welcome!
			 			</Text>
			 		</View>
			 		<View style={home.listContainer}>
			 			<Text style={home.list}>
			     			আমার.স্কুল
			 			</Text>
		 			</View>
		 			<View style={home.breakline}>
		 			</View>
		 			<View>
			 			<ButtonRounded
			                onPress={Actions.login}
			            	text="Logout" />
			        </View>
				</ScrollView>
	        </View>
		);
	}
}
