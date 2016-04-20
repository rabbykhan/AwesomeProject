/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

'use strict';

import React, {
    AppRegistry,
    Component
} from 'react-native';
import RootRouter from './app/components/RootRouter';

class AmrSchool extends Component {
	
    render() {
        return (
            <RootRouter />
        );
    }
}


AppRegistry.registerComponent('AwesomeProject', () => AmrSchool);
