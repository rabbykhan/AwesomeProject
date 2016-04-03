'use strict';
import React from 'react-native';
import Modal from 'react-native-simple-modal';
import CheckBox from 'react-native-checkbox';

const {
   Component,
   StyleSheet,
   Text,
   TextInput,
   TouchableOpacity,
   View
} = React;

export default class Dialogue extends Component{
	constructor(props){
    	super(props);
    	this.state = {
         open: false
      };
    }
    changeProps(){
    	this.props.open = false;
    }
    render() {
    	console.log("inside Dialogue Component");
    	console.log("props = " + this.props.open);
    	if(this.props.open){
		      return (
		      	<Modal
						               offset={this.state.offset}
						               open={ this.props.open}
						               modalDidOpen={() => console.log('modal did open')}
						               modalDidClose={() => console.log('modal did close')}
						               style={{alignItems: 'center'}}>
						               <View>
						               		<Text style={{fontSize: 20, marginBottom: 10, justifyContent: 'center', alignItems: 'center'}}>Student Attendance</Text>
		                  					<TextInput
		                        				style={styles.textInput}
		                        				onSubmitEditing={this._handleTextChange}
		                   					/>
						                  
						                  <TouchableOpacity
						                     style={{margin: 5}}
						                     onPress={() => this.setState({offset: -100})}>
						                     <Text>Move modal up</Text>
						                  </TouchableOpacity>
						                  <TouchableOpacity
						                     style={{margin: 5}}
						                     onPress={() => this.setState({offset: 0})}>
						                     <Text>Reset modal position</Text>
						                  </TouchableOpacity>
						                  <TouchableOpacity
						                     style={{margin: 5}}
						                     onPress={() => this.setState({open: false})}>
						                     <Text>Close modal</Text>
						                  </TouchableOpacity>
						               </View>
						            </Modal>    
		      );
  		}
  	}


}

var styles  = StyleSheet.create({

	container:{
		flex: 1, justifyContent: 'center', alignItems: 'center'
	},
	modalStyle:{
		alignItems: 'center'
	},

  	textInput:  {
        fontSize: 20,
        borderWidth:  2,
        height: 40
        }
});