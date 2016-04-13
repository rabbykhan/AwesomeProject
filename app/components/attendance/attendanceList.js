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
import StatusButton from './Buttons/statusButton';
import CheckboxButton from './Buttons/checkboxButton';
import CrossButton from './Buttons/crossButton'
import UpdateButton from './Buttons/updateButton';
import CheckboxStyle from './style/checkboxstyle';


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
	updateStudentData(studentid){
		this.setState({
			addOpen: false,
			deleteOpen:false
		});
		
		
		/*for(var i=0;i<this.state.dataSource.length;i++){
			console.log(this.state.currentStudentID);
			console.log(this.state.dataSource[i].studentinfo.id);
			if(studentid === this.state.dataSource[i].studentinfo.id){
				console.log("inside if condition");
				console.log(this.state.dataSource[i].dates[this.state.today].status);*/
				if(this.state.dataSource[studentid-1].dates[this.state.today].status==="present"){
					console.log("inside second if condition");
					this.state.dataSource[studentid-1].dates[this.state.today].status = "absent"
					this.state.dataSource[studentid-1].dates[this.state.today].reason = this.state.reason;
					console.log(this.state.dataSource[studentid-1].dates[this.state.today].status);
					//this.addStudentData(this.state.dataSource[i]);
					this.setState({
						today:this.state.today,
						todayindex:this.state.todayindex
					});	
				}
				else{
						//define delete action
						console.log("inside delete if action");
						//this.deleteAbsentStatus(this.state.dataSource[i].dates[this.state.today].id);
						this.state.dataSource[studentid-1].dates[this.state.today].status = "present";
						this.setState({
							today:this.state.today,
							todayindex:this.state.todayindex
						});	
				}	
				//break;
			//}
		//}
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
		 var monthNames = [ "JAN", "FEB", "MAR", "APR", "MAY", "JUN", 
                        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC" ];
		return ""+ monthNames[today.getUTCMonth()];
		
	}

	getFullYear(){
		var today = new Date(this.state.today);
		return ""+ today.getFullYear();
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
			showmsg = <View style={headerStyle.msgContainer}>	 	
				 	<Text style={headerStyle.msgText}>School is closed today. You are viewing other weekdays.</Text>
				</View>
		}
		
		return(
	    	<View style={{flex:1,flexDirection:'column'}}>
	    		{showmsg}
	    		<View style={headerStyle.headerContainer}>
	    			<View style={headerStyle.subheaderContainer}>
				 		<LeftButton onPress={()=>this.getPreviousDate()} style={headerStyle.prevBtn} /> 
				 		<View style={headerStyle.dateContainer}>
					 		<Text style={headerStyle.textStyleMonth}> {this.getMonth()}</Text>
					 		<Text style={headerStyle.textStyleDay}> {this.getFormattedDate()}</Text>
					 		<Text style={headerStyle.textStyleYear}> {this.getFullYear()}</Text>
				 		</View>
				 		<RightButton onPress={()=>this.getNextDate()} style={headerStyle.nextBtn}/>
				 	</View>
				 	<Text style={headerStyle.dayContainer}>{this.getFormattedDay()}</Text>
				</View>
				
		    		<View style={styles.removeAttendanceContent}>
		 						<View style={styles.attIDContent}>
		 							<Text style={{textAlign: 'center', color:'#01B050',fontSize: 18}}>ID</Text>
		 						</View>
		 						<View style={styles.attNameContent}>
		 							<Text style={subtitleStyle.nameSubtitle}>Name</Text>
		 						</View>
		 						<View style={styles.dateConten}>
		 							
		 							<Text style={{textAlign: 'center', color:'#01B050',fontSize:18}}>STATUS</Text>
		 							
		 						</View>
					 </View>
					<ScrollView >
						<View>
	 					{this.state.dataSource.map(data => (
	 						<View key={data.studentinfo.id} style={styles.removeAttendanceContent}>
		 						<View style={styles.attIDContent}>
		 							<Text style={{textAlign: 'center', color:'black',fontSize: 18}}>{data.studentinfo.id}</Text>
		 						</View>
		 						<View style={styles.attNameContent}>
		 							<Text style={subtitleStyle.studentNamesubtitle}>{data.studentinfo.name}</Text>
		 						</View>
							<StatusButton  
							onPress={()=>this.updateStudentData(data.studentinfo.id)}
							style={styles.removeAttendance}
							color={data.dates[this.state.today].status =="present" ? 'green' : 'red'} 
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
                  			text="Update"
                  				
                  			/>
					  	</View>
					</ScrollView>
				
				<Modal
						               offset={this.state.offset}
						               open={ this.state.addOpen}
						               modalDidOpen={() => console.log('modal did open')}
						               modalDidClose={() => this.setState({addOpen: false})}
						               style={{backgroundColor: "#C5DFC5"}}>
						               <View style={{
						               	flexDirection:'column',backgroundColor: "#FFFFFF"
						               }}>
						               		<View style={{flexDirection:'row',alignSelf: 'flex-end'}}>
						               			<CrossButton onPress={() => this.setState({addOpen: false})}>
						               			</CrossButton>
						               		</View>
		                  					<View style={{flexDirection:'row',marginLeft:10 }}>
		                  						<Text style={this.state.checkboxForenoon ? CheckboxStyle.checkboxGreen : CheckboxStyle.checkboxRed}>
		                  						{String.fromCharCode(9632)}
		                  						</Text>
		                  						<CheckboxButton text="Forenoon" style={{
	                  						  margin:10,
	        									padding: 10,
	        									flex: 0.4,
	        								}} 
	        								onPress={()=>this.checkboxForenoonAction()}>
		                  						
		                  						</CheckboxButton>
		                  					</View>

		                  					<View style={{flexDirection:'row',marginLeft:10}}>
		                  						<Text style={this.state.checkboxAfternoon ? CheckboxStyle.checkboxGreen : CheckboxStyle.checkboxRed}>
		                  						{String.fromCharCode(9632)}</Text>
		                  						<CheckboxButton text="Afternoon" style={{
	                  						  margin:10,
	        									padding: 10,
	        									flex: 0.4,
	        								}} 
	        								onPress={()=>this.checkboxAfternoonAction()}>
		                  						
		                  						</CheckboxButton>
		                  					</View>
		                  					
                  						  <UpdateButton 
                  						  style={{backgroundColor: '#C5DFC5',
	                  						  margin:10,
	        									padding: 10,
	        									width: 200,
	        									flex: 0.4,
	        									alignSelf: 'center',
	        									borderColor:'#f6f6f6'}} 
                  						  text="Update"
                  						  onPress={()=>this.updateStudentData()}	
                  						  />
						               </View>
				</Modal> 
				<Modal
						               offset={this.state.offset}
						               open={ this.state.deleteOpen}
						               modalDidOpen={() => console.log('modal did open')}
						               modalDidClose={() => this.setState({addOpen: false})}
						               style={{backgroundColor: "#C5DFC5"}}>
						               <View style={{
						               	flexDirection:'column',backgroundColor: "#FFFFFF"
						               }}>
						               		<View style={{flexDirection:'row',alignSelf: 'flex-end'}}>
						               			<CrossButton onPress={() => this.setState({addOpen: false})}>
						               			</CrossButton>
						               		</View>
		                  					<View style={{flexDirection:'row',marginLeft:10 }}>
		                  						<Text style={this.state.checkboxForenoon ? CheckboxStyle.checkboxGreen : CheckboxStyle.checkboxRed}>
		                  						{String.fromCharCode(9632)}
		                  						</Text>
		                  						<CheckboxButton text="Forenoon" style={{
	                  						  margin:10,
	        									padding: 10,
	        									flex: 0.4,
	        								}} 
	        								onPress={()=>this.checkboxForenoonAction()}>
		                  						
		                  						</CheckboxButton>
		                  					</View>

		                  					<View style={{flexDirection:'row',marginLeft:10}}>
		                  						<Text style={this.state.checkboxAfternoon ? CheckboxStyle.checkboxGreen : CheckboxStyle.checkboxRed}>
		                  						{String.fromCharCode(9632)}</Text>
		                  						<CheckboxButton text="Afternoon" style={{
	                  						  margin:10,
	        									padding: 10,
	        									flex: 0.4,
	        								}} 
	        								onPress={()=>this.checkboxAfternoonAction()}>
		                  						
		                  						</CheckboxButton>
		                  					</View>
		                  					
                  						  <UpdateButton 
                  						  style={{backgroundColor: '#C5DFC5',
	                  						  margin:10,
	        									padding: 10,
	        									width: 200,
	        									flex: 0.4,
	        									alignSelf: 'center',
	        									borderColor:'#f6f6f6'}} 
                  						  text="Delete"
                  						  onPress={()=>this.updateStudentData()}	
                  						  />
						               </View>
				</Modal>  	

			</View>
		);
	}

}
