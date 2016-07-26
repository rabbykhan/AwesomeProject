/* @flow */
'use strict';

import React, {Component, Text, View, ScrollView,TouchableOpacity,TextInput,ToastAndroid, Alert,Image} from 'react-native';
import Navbar from '../../widgets/Navbar';
import Loading from '../../widgets/loading';
import AppConfig from '../../../app/config';
import CustomButton from '../../widgets/customButton';
import styles from './style/attendanceStyle';
import headerStyle from './style/pageTitleStyle';
import subtitleStyle from './style/pageSubtitleStyle';
import {Actions} from 'react-native-router-flux';
import AppEventEmitter from '../../services/AppEventEmitter';
import HttpServices from '../../services/HttpServices';
import RightButton from './Buttons/rightButton';
import LeftButton from './Buttons/leftButton';
import StatusButton from './Buttons/statusButton';
import UpdateButton from './Buttons/updateButton';
import languageService from '../../services/languageService';
import numberConversion from '../../services/numberConversion';
import dataManipulation from '../../services/studentData/StudentManipulation';

export default class attendanceList extends Component {
	constructor(props){
    	super(props);
    	this.state = {
	      dataSource:[],
	      date:[],																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																						
	      today:"",
	      todayindex: 0,
	      loaded: false,
	      reason:"",
	      weekend:false,
	      weekendmsg:false,
	      emptydate:false
	    };

    }

	getBatchList(){
		console.log("course id" + this.props.batch_id);
		var batchID=this.props.batch_id;
    	HttpServices.studentAtendances(batchID,function(data){
    		console.log(data);
    		console.log(data.weekend);
    		this.setState({
	          dataSource:data.studentsinfo,
	          dates:data.dates,
	          today:data.today,
	          loaded: true,
	          weekend:data.weekend,
	          emptydate: data.emptydate
	        });
	        if(!this.state.weekend){
		        for(var i=0;i<this.state.dates.length;i++){
		        	if(this.state.dates[i] == this.state.today){
		        		this.setState({
		        			todayindex:i
		        		});
		        		break;
		        	}
		        }
	    	}
    	}.bind(this))
    }

    componentDidMount(){
    	this.getBatchList();
	}

	getDate(indication){
		var index;
		if(indication == "next"){
			index = this.state.todayindex +1;
		}
		else{
			index = this.state.todayindex -1;
		}
		if(!this.state.emptydate){
			//var index = this.state.todayindex +1;
			if(index >= (this.state.dates.length)) index = 0;
			else if(index < 0) index = this.state.dates.length - 1;
			this.setState({ 
				today: this.state.dates[index],
				todayindex: index
			});
		}
		else{
			this.viewEmptyStudentAlert();
		}
		
	}

	showAlert(){
		Alert.alert( '', languageService.getAttendanceContent("confirmationalert"), 
			[ 
				{text: languageService.getAttendanceContent("ok"), onPress: () => this.addStudentData()},
				{text: languageService.getAttendanceContent("cancel"), style: 'cancel'}, 
				
			] );
	}

	addStudentData(){
		var data = this.state.dataSource;
		var datatopass={};
		datatopass.studentinfo = data;
		datatopass.batchID = this.props.batch_id;
		
		datatopass.todayDate = this.state.today;
		datatopass.forenoon = this.state.checkboxForenoon;
		datatopass.Afternoon = this.state.checkboxAfternoon;

		console.log("data 2 pass = ");
		console.log(datatopass);


		HttpServices.addStudentInfo(datatopass,function(callbackdata){
			console.log(callbackdata);
			console.log("inside update callback function");
			Actions.pop();
		}.bind(this))
	}

	updateStudentData(studentid){
		this.setState({
			addOpen: false,
			deleteOpen:false
		});
			
		console.log("dates property not undefined");
		if(this.state.dataSource[studentid].dates[this.state.today].status==="present"){
			console.log("inside second if condition");
			this.state.dataSource[studentid].dates[this.state.today].status = "absent"
			this.state.dataSource[studentid].dates[this.state.today].reason = this.state.reason;
			console.log(this.state.dataSource[studentid].dates[this.state.today].status);
			//this.addStudentData(this.state.dataSource[i]);
			this.setState({
				today:this.state.today,
				todayindex:this.state.todayindex
			});	
			ToastAndroid.show(languageService.getAttendanceContent("absenttoast"), ToastAndroid.SHORT);
		}
		else{
			//define delete action
			console.log("inside delete if action");
			//this.deleteAbsentStatus(this.state.dataSource[i].dates[this.state.today].id);
			this.state.dataSource[studentid].dates[this.state.today].status = "present";
			this.setState({
				today:this.state.today,
				todayindex:this.state.todayindex
			});
			ToastAndroid.show(languageService.getAttendanceContent("presenttoast"), ToastAndroid.SHORT);	
		}

	}

	viewEmptyStudentAlert(){
		alert("Sorry,no data available at this moment");
	}

	getMonth(){
		var today = new Date(this.state.today);
		 var monthNames = [ "JAN", "FEB", "MAR", "APR", "MAY", "JUN", 
                        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC" ];
		return languageService.getAttendanceContent(monthNames[today.getUTCMonth()]);
		
	}

	getFullYear(){
		var today = new Date(this.state.today);
		return numberConversion.convert2BanglaNumber(today.getFullYear());
		//return today.getFullYear();
	}

	getFormattedDate(){
		var today = new Date(this.state.today);
		return numberConversion.convert2BanglaNumber(today.getUTCDate());
		//return  today.getUTCDate();
	}

	getFormattedDay(){
		var today = new Date(this.state.today);
		var dayNames =["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
		return languageService.getAttendanceContent(dayNames[today.getUTCDay()]);
	}	

	
	render() {
		var showmsg = null;
		if (!this.state.loaded) {
		    return (
		    	<View>
					<Loading/>
		    	</View>
		    )
		}
		
		if(this.state.weekend){
			var todayDate = new Date(this.state.today);
			console.log("today date =" + todayDate.getDate());
			for(var i=0;i<this.state.dates.length;i++){
				var currentDate = new Date(this.state.dates[i]);
				console.log("current date = " +  currentDate.getDate());
				if(currentDate.getDate() > todayDate.getDate()){
					this.state.today = this.state.dates[i];
					this.state.todayindex = i;
					this.state.weekend = false;
					this.state.weekendmsg = true;
					break;
				}
			}
		}
		if(this.state.weekendmsg){
			showmsg = <View style={headerStyle.msgContainer}>	 	
				 	<Text style={headerStyle.msgText}>School is closed today. You are viewing other weekdays.</Text>
				</View>
		}
		
		return(
	    	<View style={{flex:1,flexDirection:'column'}}>
	    		{showmsg}
	    		<View style={headerStyle.headerContainer}>
	    			<View style={headerStyle.subheaderContainer}>
				 		<LeftButton onPress={()=>this.getDate("previous")} style={headerStyle.prevBtn} /> 
				 		<View style={headerStyle.dateContainer}>
				 			<View style={headerStyle.monthView}>
					 			<Text style={headerStyle.textStyleMonth}> {this.getMonth()}</Text>
					 		</View>
					 		<View style={headerStyle.dayView}>
					 			<Text style={headerStyle.textStyleDay}> {this.getFormattedDate()}</Text>
					 		</View>
					 		<View style={headerStyle.yearView}>
					 			<Text style={headerStyle.textStyleYear}> {this.getFullYear()}</Text>
					 		</View>
				 		</View>
				 		<RightButton onPress={()=>this.getDate("next")} style={headerStyle.nextBtn}/>
				 	</View>
				 	<Text style={headerStyle.dayContainer}>{this.getFormattedDay()}</Text>
				</View>
				
		    		<View style={styles.removeAttendanceContent}>
		 						<View style={styles.attIDContent}>
		 							<Text style={{textAlign: 'center', color:'#01B050',fontSize: 18}}>{languageService.getAttendanceContent("id")}</Text>
		 						</View>
		 						<View style={styles.attNameContent}>
		 							<Text style={subtitleStyle.nameSubtitle}>{languageService.getAttendanceContent("name")}</Text>
		 						</View>
		 						<View style={styles.dateConten}>
		 							
		 							<Text style={{textAlign: 'center', color:'#01B050',fontSize:18}}>{languageService.getAttendanceContent("status")}</Text>
		 							
		 						</View>
					 </View>
					<ScrollView >
						<View>
	 					{dataManipulation.getStudents().map(data => (
	 						<View key={data.studentinfo.id} style={styles.removeAttendanceContent}>
		 						<View style={styles.attIDContent}>
		 							<Text style={{textAlign: 'center', color:'black',fontSize: 18}}>{numberConversion.convert2BanglaNumber(data.studentinfo.class_roll_no)}</Text>
		 						</View>
		 						<View style={styles.attNameContent}>
		 							<Text style={subtitleStyle.studentNamesubtitle}>
		 							{languageService.getStudentName(data.studentinfo)}
		 							</Text>
		 						</View>
							<StatusButton  
							onPress={()=>this.updateStudentData(data.arrayentry)}
							arrayentry={data.arrayentry}
							color={data.dates[this.state.today].status =="present" ? 'green' : 'red'} 
							style={styles.removeAttendance}
							text={String.fromCharCode(9632) } /> 
					  		</View>
					  	))}
					  	<UpdateButton 
                  			style={{backgroundColor: '#01B050',
        					padding: 10,
        					flexDirection: 'row',
        					height: 60,
        					margin:10,
       						}} 
                  			text={languageService.getAttendanceContent("update")}
                  			onPress={()=>this.showAlert()}

                  			/>
					  	</View>
					</ScrollView>

			</View>
		);
	}

}
