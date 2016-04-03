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
            <ToolbarAndroid   
                actions={[{title: ' ',icon: require('../img/menu.png'),show: 'always'}]}
                title={this.props.title}
                titleColor="#000"
                style={styles.toolbarContent}
                onActionSelected={this.open}
                />            
        );
    }
}
