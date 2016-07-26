/* @flow */
'use strict';

import React, {Component, Text, View, TouchableHighlight } from 'react-native';
import dataManipulation from '../../../services/studentData/StudentManipulation';
export default class statusButton extends Component {
	constructor(props){
    	super(props);
    	console.log("inside status button = " + this.props.arrayentry);
    	this.state = {
	      	color: dataManipulation.getStatusColor(this.props.arrayentry)
	    };

    }

	buttonPressed(){
		this.setState({
			color:dataManipulation.updateStudentData(this.props.arrayentry)
		});
	}

    render() {
        return(
            <TouchableHighlight
                style={this.props.style}
                onPress={this.props.onPress}>																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																		
                    <View style={{backgroundColor:this.props.color,flex:1,marginLeft:10,marginRight:10}}></View>
            
                   
            </TouchableHighlight> 
        );
    }    

}

