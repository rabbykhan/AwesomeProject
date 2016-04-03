/* @flow */
'use strict';

import React, {Component, View} from 'react-native';
import Navbar from '../widgets/Navbar';
import {brandPrimary as primary} from '../styles/variable';
import account from '../styles/account';

export default class Account extends Component {
	render() {
		return(
			<View style={account.color}>
				<Navbar
	     		    title="Accounts"
	     		    style={account.toolbar}/>				
			</View>

		);
	}

}
