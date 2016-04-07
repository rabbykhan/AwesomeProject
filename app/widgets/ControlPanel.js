/* @flow */
'use strict';

import React, {Component, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import controlPanel from '../styles/controlPanelStyle';
import Auth from '../services/Auth';
import deviceStore from '../services/DeviceStorage';

import {Actions} from 'react-native-router-flux';

export default class ControlPanel extends Component {
  
    logOut(){
        Auth.logOut();
        deviceStore.saveData("loginToken",'');
        Actions.login();
    }
    render() {
        return (
            <View style={controlPanel.sidebar}>
                <ScrollView>
                    <View style={{position: 'relative'}}>
                        <TouchableOpacity 
                            style={controlPanel.link}
                            underlayColor="#2D2D30"
                            onPress={Auth.loggedIn ? Actions.classList : Actions.login()}>
                            <Text style={controlPanel.linkText}>Class List</Text>
                        </TouchableOpacity>                
                    </View>
                 

                    <View style={{position: 'relative'}}>
                        <TouchableOpacity 
                            style={controlPanel.link}
                            underlayColor="#2D2D30"
                            onPress={this.logOut}>
                            <View>
                                <Text style={controlPanel.linkText}>Logout</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
    
}
