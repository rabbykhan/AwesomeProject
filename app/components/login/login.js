/* @flow */
'use strict';

import React, {Component, TextInput, View, Image,BackAndroid,Text,AsyncStorage} from 'react-native';
var Icon = require('react-native-vector-icons/Ionicons');

import styles from './style/loginStyle';
import Button from '../../widgets/Button';
import AppConfig from '../../../app/config';
import {Scene,Actions} from 'react-native-router-flux';
import AppEventEmitter from '../../services/AppEventEmitter';
import Auth from '../../services/Auth';
import languageService from '../../services/languageService';
import deviceStore from '../../services/DeviceStorage';
import Loading from '../../widgets/loading';

var login = false;

BackAndroid.addEventListener('backButton', function() {

    console.log(Scene);
    deviceStore.fetchData("currentPage",function(data){
        console.log("currentPage "  + data);
        setData(data);
    })
    var returnData=true;
    function setData(data){
        console.log(data);
        if(data!="0"){
            var currentPage = Number(data) - 1;
            deviceStore.saveData("currentPage",currentPage);
            Actions.pop();
            returnData =true;
        }
        else{
            //alert("Are you sure you want to exit the app");
            deviceStore.saveData("currentPage",'0');
            BackAndroid.exitApp();
            returnData ='';

        }
    }
    
    //console.log()
   return returnData;       
    

});
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: 'admin',
            password:'A.S@1',
            loding:false,
            login:false
        };
    }

    componentDidMount() {
        AppEventEmitter.addListener('login.click', this.login.bind(this));
    }

    login(){
        this.setState({
              loaded: true,
            }); 
        Auth.login(this.state.userName,this.state.password,function(data){
            console.log("login =" );
            if(data.login=="true"){
                console.log("login true");
                deviceStore.saveData("currentPage",0);
                deviceStore.saveData("loginToken",data.token);
                Actions.classList();
            }else{
                alert('Invalid username or password');
            }
        }.bind(this))
    }

    isAlreadyloggedIn(){
        if(Auth.loggedIn()==false){
            console.log("not logged in ");
           return false; 
        }
        else{
            console.log("logged in");
            return true;
        }
    }

    render() {

        if (this.isAlreadyloggedIn()) {
            return (
                 <View style={styles.container}>
                    <View style={styles.header} >
                      <Text style={styles.logo}>{AppConfig.projectName}</Text>
                    </View>
                    <View>
                        <Loading/>
                    </View>
                </View>    
                )
        }else{
            return(
            <View style={styles.container}>
                <View style={styles.header} >
                  <Text style={styles.logo}>
                            <Text style={{color:'#01B050',textAlign:'center'}}>আমার</Text>
                            <Text style={{color:'red',textAlign:'center'}}>.</Text>
                            <Text style={{color:'#01B050',textAlign:'center'}}>স্কুল</Text>
                    </Text>
                </View>
                <View style={styles.loginContent}>
                    <TextInput
                        style={styles.textInput}
                        placeholder={'User Name'}
                        placeholderTextColor={'rgba(255, 255, 255, 0.7'} 
                        onChangeText={(userName) => this.setState({userName})}
                        value={this.state.userName} />
                        
                    <TextInput secureTextEntry={true} 
                        style={styles.textInput}
                        placeholder={'PASSWORD'}
                        placeholderTextColor={'rgba(255, 255, 255, 0.7'} 
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password} />
                        
                    <Button
                            onPress={()=>this.login()}
                            text={languageService.getLoginText()} />   
                </View>  
            </View>
            
        );
        }
    }
}
