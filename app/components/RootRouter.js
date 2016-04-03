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


export default class RootRouter extends Component {
	
	constructor(props) {
        super(props);
        
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
			if(Auth.loggedIn()==false){
				if(Actions.currentRouter.currentRoute.name!='login'){
					Actions.login();
				}	
			}
		}
	}

	openControlPanel() {
	   this.refs.drawer.open();
	}

	isloggedIn(){
 		Actions.login;
	}

    render() {
        return(
       		 <Drawer
        		style={{marginBottom: 20}}
				ref="drawer"
				type="overlay"				
  				tapToClose={true}
				openDrawerOffset={0.2}
				panCloseMask={0.2}
				content={<ControlPanel />}
				>
					<View style={layout.layout}>
			            <Router  hideNavBar={true} dispatch={this.closeControlPanel.bind(this)} onEnter={this.isloggedIn()}>
			                <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/> 
			                <Route  name="login" component={Login} title="login" initial={true} />
			                <Route name="classList" component={classList}  title="classList"   />               
			                <Route name="attendance"  component={Attendance} title="Attendance"   />               
			            </Router>
		            </View>
            </Drawer>
		       
        );
    }
}