/* @flow */
'use strict';

import React, {Component, Text, View, ScrollView,ListView} from 'react-native';
import Navbar from '../../widgets/Navbar';
import styles from './style/classlistStyle';
import CustomButton from '../../widgets/customButton';
import {Actions} from 'react-native-router-flux';
import AppConfig from '../../../app/config';
import Loading from '../../widgets/loading';
import HttpServices from '../../services/HttpServices';
import deviceStore from '../../services/DeviceStorage';

export default class ClassList extends Component {
    constructor(props){
    	super(props);
    	this.state = {
	      dataSource:[],
	      loaded: false,
	    };
    }
   
    getBatchList(){
    	HttpServices.batchList(function(data){
    		console.log(data[0].id);
    		this.setState({
	          dataSource:data,
	          loaded: true,
	        });	

    	}.bind(this))
    }
    componentDidMount(){
    	this.getBatchList();
    }

    loadNextPage(batchID){
    	deviceStore.fetchData("currentPage",function(data){
        	var currentPage = Number(data) + 1;
        	console.log("currentPage " + currentPage);
        	deviceStore.saveData("currentPage",currentPage);
    	})
    	Actions.attendance({batch_id:batchID})
    }

	render() {
		console.log("batch data source" +this.state.dataSource);
		if (!this.state.loaded) {
		    return (
		    		<View>
						<Loading/>
		    		</View>
		    	)
		}
		return(
	    	<View>
	    		
 					{this.state.dataSource.map(data => (
 						
						<CustomButton  onPress={()=>this.loadNextPage(data.course_id)} key={data.id} style={styles.customButton} text={data.name} /> 
				  	))}
			 		
		    </View>
		);
	}


}
