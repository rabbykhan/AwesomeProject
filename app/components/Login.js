/* @flow */
'use strict';

import React, {Component, TextInput, View, Image,BackAndroid} from 'react-native';
import styles from '../styles/style';
import login from '../styles/login';
import ButtonRounded from '../widgets/ButtonRounded';
import {Actions} from 'react-native-router-flux';
import Navbar from '../widgets/Navbar';


BackAndroid.addEventListener('hardwareBackPress', function() {
    Actions.pop(); 
    return true;

});
export default class Login extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };

    }

    render() {
        return(
            <View style={login.color}>
            <ButtonRounded
                            onPress={()=>Actions.home({data:this.state.value })}
                            text="Login" />
            </View>
        );
    }
}
