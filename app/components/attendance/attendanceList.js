/* @flow */
'use strict';

import React, {Component, Text, View, ScrollView,TouchableOpacity,TextInput,Image} from 'react-native';
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
import Button from '../../widgets/Button';
import Dialogue from './dialogue';
import Modal from 'react-native-simple-modal';
import CheckBox from 'react-native-checkbox';
import RightButton from './Buttons/rightButton';
import LeftButton from './Buttons/leftButton';
import StatusButton from './Buttons/statusButton'


export default class attendanceList extends Component {
	constructor(props){
    	super(props);
    	this.state = {
	      dataSource:[],
	      date:[],
	      today:"",
	      todayindex: 0,
	      loaded: false,
	      showDialogue:false,
	      addOpen:false,
	      deleteOpen:false,
	      checkboxForenoon:true,
	      checkboxAfternoon:true,
	      currentStudentID:"",
	      reason:"",
	      weekend:false,
	      weekendmsg:false,
	      emptydate:false
	    };

	    this.handleTextChange = this.handleTextChange.bind(this);

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
    	
    	//alert('studentID remove  ' + studentId);
    }
    removeAttendance(studentId){
    	console.log("inside showing dialogue");
    	this.setState({
    		showDialogue:true
    	});

    }
    componentDidMount(){
    	//need to add this functoin to service page
    	this.getBatchList();
    	AppEventEmitter.addListener('removeAt', this.removeAttendance.bind(this));
	}

    componentWillUnMount() {
    	AppEventEmitter.removeListener('removeAt');
    }

	getNextDate(){
		if(!this.state.emptydate){
			var index = this.state.todayindex +1;
			if(index >= (this.state.dates.length)) index = 0;
			this.setState({ 
				today: this.state.dates[index],
				todayindex: index
			});
		}
		else{
			this.viewEmptyStudentAlert();
		}
		
	}

	getPreviousDate(){
		if(!this.state.emptydate){
			var index = this.state.todayindex - 1;
			if(index < 0) index = this.state.dates.length - 1;
			this.setState({ 
				today: this.state.dates[index],
				todayindex: index
			});
		}
		else{
			this.viewEmptyStudentAlert();
		}
		
	}

	checkboxForenoonAction(){
		if(this.state.checkboxForenoon){
			this.setState({checkboxForenoon:false});
		}
		else{
			this.setState({checkboxForenoon:true});
		}
	}

	checkboxAfternoonAction(){
		if(this.state.checkboxAfternoon){
			this.setState({checkboxAfternoon:false});
		}
		else{
			this.setState({checkboxAfternoon:true});
		}
	}

	presentAbsentAction(studentid,status){
		this.setState({
			currentStudentID: studentid,
			open:true
		});
		if(status == "present"){
			this.setState({
				addOpen:true,
				deleteOpen:false
			});
		}
		else{
			this.setState({
				addOpen:false,
				deleteOpen:true
			});
		}
		
	}
	addStudentData(data){
		var datatopass={};
		datatopass.studentinfo = data.studentinfo;
		datatopass.batchID = this.props.batch_id;
		datatopass.dateinfo = data.dates[this.state.today];
		datatopass.todayDate = this.state.today;
		datatopass.forenoon = this.state.checkboxForenoon;
		datatopass.Afternoon = this.state.checkboxAfternoon;


		HttpServices.addStudentInfo(datatopass,function(callbackdata){
			console.log(callbackdata);
		}.bind(this))
	}

	deleteAbsentStatus(data){
		HttpServices.deleteAbsent(data,function(callbackdata){
			console.log(callbackdata);
		}.bind(this))
	}
	updateStudentData(){
		this.setState({
			addOpen: false,
			deleteOpen:false
		});
		for(var i=0;i<this.state.dataSource.length;i++){
			console.log(this.state.currentStudentID);
			console.log(this.state.dataSource[i].studentinfo.id);
			if(this.state.currentStudentID === this.state.dataSource[i].studentinfo.id){
				console.log("inside if condition");
				console.log(this.state.dataSource[i].dates[this.state.today].status);
				if(this.state.dataSource[i].dates[this.state.today].status==="present"){
					console.log("inside second if condition");
					this.state.dataSource[i].dates[this.state.today].status = "absent"
					this.state.dataSource[i].dates[this.state.today].reason = this.state.reason;
					console.log(this.state.dataSource[i].dates[this.state.today].status);
					this.addStudentData(this.state.dataSource[i]);
					this.setState({
						today:this.state.today,
						todayindex:this.state.todayindex
					});	
				}
				else{
						//define delete action
						console.log("inside delete if action");
						this.deleteAbsentStatus(this.state.dataSource[i].dates[this.state.today].id);
						this.state.dataSource[i].dates[this.state.today].status = "present";
						this.setState({
							today:this.state.today,
							todayindex:this.state.todayindex
						});	
				}	
				break;
			}
		}
	}
	handleTextChange(event)	{
				//	log	statements	are	viewable	in	Xcode,
				//	or	the	Chrome	debug	tools
				console.log(event.nativeEvent.text);
				this.setState({
						reason:	event.nativeEvent.text
				});
	}

	viewEmptyStudentAlert(){
		alert("Sorry,no data available at this moment");
	}

	getMonth(){
		var today = new Date(this.state.today);
		 var monthNames = [ "January", "February", "March", "April", "May", "June", 
                        "July", "August", "September", "October", "November", "December" ];
		return ""+ monthNames[today.getUTCMonth()] + " " + today.getFullYear() + "";
		
	}

	getFormattedDate(){
		var today = new Date(this.state.today);
		return " " + today.getUTCDate();
	}

	getFormattedDay(){
		var today = new Date(this.state.today);
		var dayNames =["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
		return "" + dayNames[today.getUTCDay()];
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
			showmsg = <View style={headerStyle.headerContainer}>	 	
				 	<Text style={headerStyle.msgText}>School is closed today. You are viewing other weekdays.</Text>
				</View>
		}
		
		return(
	    	<View>
	    		{showmsg}
	    		<View style={headerStyle.headerContainer}>

				 	<LeftButton onPress={()=>this.getPreviousDate()} style={headerStyle.prevBtn} /> 
				 	<Text style={headerStyle.textStyle}> {this.getMonth()}</Text>
				 	<RightButton onPress={()=>this.getNextDate()} style={headerStyle.nextBtn}/>
				</View>
	    		<View style={styles.removeAttendanceContent}>
	 						<View style={styles.attIDContent}>
	 							<Text>ID</Text>
	 						</View>
	 						<View style={styles.attNameContent}>
	 							<Text style={subtitleStyle.nameSubtitle}>Name</Text>
	 						</View>
	 						<View style={styles.dateConten}>
	 							<View style={subtitleStyle.dateContainer}>
	 							<View style={{backgroundColor:"#E0E0E0"}}>
	 							<Text style={subtitleStyle.dayContainer}>{this.getFormattedDay()}</Text>
	 							</View>
	 							<Text style={subtitleStyle.numDateContainer}>{this.getFormattedDate()}</Text>
	 							</View>
	 						</View>
				 </View>
				<ScrollView>
					
 					{this.state.dataSource.map(data => (
 						<View key={data.studentinfo.id} style={styles.removeAttendanceContent}>
	 						<View style={styles.attIDContent}>
	 							<Text>{data.studentinfo.id}</Text>
	 						</View>
	 						<View style={styles.attNameContent}>
	 							<Text style={{alignSelf: 'center',color:'black'}}>{data.studentinfo.name}</Text>
	 						</View>
						<StatusButton  
						onPress={()=>this.presentAbsentAction(data.studentinfo.id,data.dates[this.state.today].status)} 
						style={styles.removeAttendance} 
						text={data.dates[this.state.today].status =="present" ? String.fromCharCode(10003) : 'X'} /> 
				  		</View>
				  	))}
				</ScrollView>

				<Modal
						               offset={this.state.offset}
						               open={ this.state.addOpen}
						               modalDidOpen={() => console.log('modal did open')}
						               modalDidClose={() => this.setState({addOpen: false})}
						               style={{alignItems: 'center'}}>
						               <View>
						               		<Text style={{fontSize: 20, marginBottom: 10, justifyContent: 'center', alignItems: 'center'}}>Student Attendance</Text>
		                  					<TextInput
		                        				style={styles.textInput}
		                        				text="Reason"
		                        				placeholder = "Reason"
		                        				placeholderTextColor = "red"
		                        				onSubmitEditing={this.handleTextChange}
		                   					/>
						                  
						                  <CheckBox
                    						style={{margin: 5,marginBottom:10}}
                    						label='Forenoon'
                    						labelStyle ={{margin: 5,padding:5}}
                    						checked={this.state.checkboxForenoon}
                    						onChange={(checked) => this.checkboxForenoonAction()}
                  						  />
						                  <CheckBox
                    						style={{margin: 5,marginBottom:10}}
                    						label='Afternoon'
                    						labelStyle ={{margin: 5,padding:5}}
                    						checked={this.state.checkboxAfternoon}
                    						onChange={(checked) => this.checkboxAfternoonAction()}
                  						  />

                  						  <CustomButton 
                  						  style={{backgroundColor: '#1E90FF',
	                  						  margin:10,
	        									padding: 10,
	        									flex: 0.4,
	        									borderColor:'#f6f6f6'}} 
                  						  text="Add"
                  						  onPress={()=>this.updateStudentData()}	
                  						  />
						                  <TouchableOpacity
						                     style={{margin: 15,
						                     	padding: 10,
        										borderColor: 'transparent',
        										borderWidth:2,
        										alignSelf: 'center',
        										borderRadius: 2,
       											width: 200,
        										height: 50,
        										
        										backgroundColor: '#B2BEB5'}}
						                     onPress={() => this.setState({addOpen: false})}>
						                     <Text 
						                     style={{fontSize: 20,
						                     	alignSelf: 'center'}}>
						                     	Close
						                     </Text>
						                  </TouchableOpacity>
						               </View>
				</Modal> 
				<Modal
						               offset={this.state.offset}
						               open={ this.state.deleteOpen}
						               modalDidOpen={() => console.log('modal did open')}
						               modalDidClose={() => this.setState({deleteOpen: false})}
						               style={{alignItems: 'center'}}>
						               <View>
						               		<Text style={{fontSize: 20, marginBottom: 10, justifyContent: 'center', alignItems: 'center'}}>Student Attendance</Text>
						                 <TextInput
		                        				style={styles.textInput}
		                        				onSubmitEditing={this.handleTextChange}
		                   					/>
		                   					<CheckBox
                    						style={{margin: 5,marginBottom:10}}
                    						label='Forenoon'
                    						labelStyle ={{margin: 5,padding:5}}
                    						checked={this.state.checkboxForenoon}
                    						onChange={(checked) => this.checkboxForenoonAction()}
                  						  />
						                  <CheckBox
                    						style={{margin: 5,marginBottom:10}}
                    						label='Afternoon'
                    						labelStyle ={{margin: 5,padding:5}}
                    						checked={this.state.checkboxAfternoon}
                    						onChange={(checked) => this.checkboxAfternoonAction()}
                  						  />
						                 <View style={{flexDirection:'row',alignSelf: 'center'}}>
	                  						  <CustomButton 
	                  						  style={{backgroundColor: '#1E90FF',
	                  						  margin:10,
	        									padding: 10,
	        									flex: 0.4,
	        									borderColor:'#f6f6f6'}} 
	                  						  text="Update"
	                  						  onPress={()=>this.updateStudentData()}	
	                  						  />
	                  						  <CustomButton 
	                  						  style={{backgroundColor: '#191919',
	                  						  margin:10,
	        									padding: 10,
	        									flex: 0.4,
	        									borderColor:'#f6f6f6'}} 
	                  						  text="Delete"
	                  						  onPress={()=>this.updateStudentData()}	
	                  						  />
                  						  </View>

						                  <TouchableOpacity
						                      style={{margin: 15,
						                     	padding: 10,
        										borderColor: 'transparent',
        										borderWidth:2,
        										alignSelf: 'center',
        										borderRadius: 2,
       											width: 200,
        										height: 50,
        										
        										backgroundColor: '#B2BEB5'}}
						                     onPress={() => this.setState({deleteOpen: false})}>
						                     <Text style={{fontSize: 20,
						                     alignSelf: 'center'}}>Close</Text>
						                  </TouchableOpacity>
						               </View>
				</Modal>   	  	

			</View>
		);
	}

}
