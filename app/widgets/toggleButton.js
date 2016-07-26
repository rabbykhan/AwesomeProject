/* @flow */
'use strict';

import React, { Component,View,Switch } from 'react-native';
import deviceStore from '../services/DeviceStorage';
import languageService from '../services/languageService';

export default class ToggleButton extends Component {
	constructor(props) {

        super(props);
        this.state = { 
        	falseSwitchIsOn: false
        };
        
    }
    toggleChange(togglevalue){
    	//false -> English
    	//true ->Bengali 
    	console.log("inside togglevalue change ");
    	console.log(togglevalue);
    	if(togglevalue){
    		languageService.setLanguage("Bengali");
    	}
    	else{
    		languageService.setLanguage("English");
    	}
    	//this.setState({falseSwitchIsOn: togglevalue});
    	console.log("props value = " + this.props.value);
    	this.props.onPress(togglevalue);
    	//languageService.getDrawerContent("classlist");
    	//(value) => this.setState({falseSwitchIsOn: value})
    }
	render() { 
		return ( 
			<View> 
				<Switch 
					onValueChange={(value) => this.toggleChange(value)} 
					style={{marginBottom: 10,padding:5}} value={this.props.value} 
				/> 
			</View> 
		); 
	}

}