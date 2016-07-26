/* @flow */
'use strict';

import React, {Component, Text, View, TouchableOpacity, Image, ScrollView, Switch } from 'react-native';
import controlPanel from '../styles/controlPanelStyle';
import Auth from '../services/Auth';
import deviceStore from '../services/DeviceStorage';
import ToggleButton from './toggleButton';
import languageService from '../services/languageService';

import {Actions} from 'react-native-router-flux';

export default class ControlPanel extends Component {
    constructor(props) {

        super(props);
        this.toggleButtonPressed = this.toggleButtonPressed.bind(this);
        
    }

    toggleButtonPressed(value){
        console.log("inside toggle value changed control panel");
        console.log("value = " + value);
       // console.log("state vlaue " + this.state.toggleValue);
        //true -> bangla
        //false -> English
        if(value){
            languageService.setLanguage("Bengali");
        }
        else{
            languageService.setLanguage("English");
        }
        //this.setState({toggleValue: value});
        this.props.togglePress(value);
    }
  
    logOut(){
        Auth.logOut();
        deviceStore.saveData("loginToken",'');
        Actions.login();
    }
    render() {
        console.log("inside control panel render");
        return (
            <View style={controlPanel.sidebar} elevation={10}>
                <ScrollView>
                    <View style={{position:'relative',backgroundColor:'#01B050' ,marginBottom:5}} elevation={5} ></View>
                    <View elevation={10} style={{position:'relative',backgroundColor:'#E0E0E0'}}>
                            <View style={{flexDirection:'row',alignSelf :'flex-end',paddingRight:8,paddingBottom:10}}>
                                <Text style={{fontSize: 50,color:'#01B050',textAlign:'right'}}>আমার</Text>
                                <Text style={{fontSize: 50,color:'red',textAlign:'right'}}>.</Text>
                                <Text style={{fontSize: 50,color:'#01B050',textAlign:'right'}}>স্কুল</Text>
                            </View>
                    </View>
                    <View style={{position: 'relative'}}>
                        <TouchableOpacity 
                            style={controlPanel.link}
                            underlayColor="#2D2D30"
                            onPress={Auth.loggedIn ? Actions.classList : Actions.login()}>
                            <Text style={controlPanel.linkText}>{languageService.getDrawerContent("classlist")}</Text>
                        </TouchableOpacity>                
                    </View>
                 

                    <View style={{position: 'relative'}}>
                        <TouchableOpacity 
                            style={controlPanel.link}
                            underlayColor="#2D2D30"
                            onPress={this.logOut}>
                            <View>
                                <Text style={controlPanel.linkText}>{languageService.getDrawerContent("logout")}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{position: 'relative',flexDirection:'row',alignSelf :'flex-end',paddingRight:8,paddingBottom:10}}>
                        <Text style={controlPanel.toggleText}>EN</Text>
                        <Switch 
                            onValueChange={(value) => this.toggleButtonPressed(value)} 
                             onTintColor="#000000" thumbTintColor="#000000" tintColor="#000000"
                            style={{marginBottom: 10,padding:5}} value={this.props.toggleValue} 
                        /> 
                        <Text style={controlPanel.toggleText}>বাংলা</Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
    
}
