'use strict';

import React, {Component, Navigator, Text, View,DrawerLayoutAndroid} from 'react-native';
import {Router, Route, Schema,Actions} from 'react-native-router-flux';
import EventEmitter from 'EventEmitter';
import Drawer from 'react-native-drawer'
import ControlPanel from '../widgets/ControlPanel';
import Login from './login/login.js';
import classList from './classList/classContent';
import Attendance from './attendance/attendanceContent';
import layout from '../styles/layoutStyle';
import AppEventEmitter from '../services/AppEventEmitter';
import Auth from '../services/Auth';
import deviceStore from '../services/DeviceStorage';
import Navbar from '../widgets/Navbar';
import languageData from '../languages/language.json';
import Dimensions from 'Dimensions';
import languageService from '../services/languageService';

export default class RootRouter extends Component {
	
	//var languageData = require('../languages/language.json');

	constructor(props) {

        super(props);
        this.state = {
        	loggedIn : false,
        	lockstatus:'locked-closed',
        	transparency:false,
        	toggleValue:false
        };
        this.toggleButtonPressed = this.toggleButtonPressed.bind(this);
        
    }
    componentWillMount(){
    	this.isAlreadyloggedIn();
    }
	componentDidMount() {	   
		AppEventEmitter.addListener('amarschool.click', this.openControlPanel.bind(this));
		
    }
    componentWillUnMount() {
    	AppEventEmitter.removeListener('amarschool.click');
    }
	closeControlPanel(navigation) {
		if(navigation.type == 'AFTER_ROUTER_ROUTE') {
			// need to more work for "before route"
			this.refs.drawer.closeDrawer();
			console.log("inside close control panel");
			if(Auth.loggedIn()==false){
			//if(!this.state.loggedIn){
				console.log("inside not logged in ");
				if(Actions.currentRouter.currentRoute.name!='login'){
					Actions.login();
				}	
			}
			else{
				deviceStore.saveData("currentPage",'0');
				//this.setState({lockstatus:'unlocked'});
			}
		}
		
	}

	openControlPanel() {
	   this.refs.drawer.openDrawer();   
	}

	isloggedIn(){
		console.log("inside is logged in function");
 		Actions.login;
	}

	isAlreadyloggedIn(){
		deviceStore.fetchData("loginToken",function(data){
        	console.log("loginToken "  + data);
        	if(data!= null){
        		Auth.setToken(data);
        		this.setState({loggedIn:true,lockstatus:'unlocked',toggleValue:languageService.getToggleValue()});
        		Actions.classList();
        	}
        	else{
        		this.setState({toggleValue:languageService.getToggleValue(),lockstatus:'locked-closed'});
        		
        	}
    	}.bind(this))
    
	}

	toggleButtonPressed(value){
		this.setState({toggleValue: value});
	}

    render() {
    	var navigationView=(<ControlPanel toggleValue={this.state.toggleValue} togglePress={this.toggleButtonPressed}/>);
    	var deviceheight = Dimensions.get('window').height;
		var sideDrawerwidth = Dimensions.get('window').width * 70 /100;
		console.log(DrawerLayoutAndroid.props);
        return(
			<DrawerLayoutAndroid
			  	
              drawerWidth={sideDrawerwidth}
              drawerHeight={200}
              ref={'drawer'}
              drawerPosition={DrawerLayoutAndroid.positions.Left}
              renderNavigationView={() => navigationView}>
					<View style={layout.layout}>
				        <Router  hideNavBar={true} dispatch={this.closeControlPanel.bind(this)} onEnter={this.isloggedIn()}>
				            <Route  name="login" component={Login} title="login" />
				            <Route name="classList" component={classList}  title="classList"   />               
				            <Route name="attendance"  component={Attendance} title="Attendance"   />               
				        </Router>
			        </View>
			        
            </DrawerLayoutAndroid>
		       
        );
    }
}