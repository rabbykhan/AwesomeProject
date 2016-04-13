/* @flow */
'use strict';

import React, {Component, Text, View} from 'react-native';
import ToolbarAndroid from 'ToolbarAndroid';
import styles from '../styles/toolbarStyle';
import AppEventEmitter from '../services/AppEventEmitter';

export default class Navbar extends Component {
    open () {
        AppEventEmitter.emit('amarschool.click');
        console.log('nothing');
    }
    render() {
        return(
            <View style={{backgroundColor:'#01B050'}} elevation={10} >
                <ToolbarAndroid   
                    actions={[{title: ' ',icon: require('../img/menu.png'),show: 'always'}]}
                    title={this.props.title}
                    titleColor="#FFF"
                    style={styles.toolbarContent}
                    onActionSelected={this.open}
                    />
            </View>                  
        );
    }
}
