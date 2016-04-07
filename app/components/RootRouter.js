'use strict';

import React, {Component, Navigator, Text, View} from 'react-native';
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

export default class RootRouter extends Component {
	
	constructor(props) {
        super(props);
        this.state = {
        	loggedIn : false,
        	acceptPan:false
        };
        
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
			this.refs.drawer.close();
			console.log("inside close control panel");
			if(Auth.loggedIn()==false){
			//if(!this.state.loggedIn){
				console.log("inside not logged in ");
				if(Actions.currentRouter.currentRoute.name!='login'){
					Actions.login();
				}	
			}
			else{
				this.setState({acceptPan:true});
			}
		}
	}

	openControlPanel() {
	   this.refs.drawer.open();
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
        		this.setState({loggedIn:true,acceptPan:true});
        		Actions.classList();
        	}
        	
        	//this.setState({checkboxAfternoon:false});
    	}.bind(this))
    
	}

    render() {
        return(
       		 <Drawer
       		 	diabled={true}
        		style={{marginBottom: 20}}
				ref="drawer"
				type="overlay"
				acceptPan={this.state.acceptPan}				
  				tapToClose={true}
				openDrawerOffset={0.2}
				panCloseMask={0.2}
				content={<ControlPanel/>}
				>
					<View style={layout.layout}>
			            <Router  hideNavBar={true} dispatch={this.closeControlPanel.bind(this)} onEnter={this.isloggedIn()}>
			                <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/> 
			                <Route  name="login" component={Login} title="login" />
			                <Route name="classList" component={classList}  title="classList"   />               
			                <Route name="attendance"  component={Attendance} title="Attendance"   />               
			            </Router>
		            </View>
            </Drawer>
		       
        );
    }
}