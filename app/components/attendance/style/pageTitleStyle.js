import React,{StyleSheet} from 'react-native';
import Prefixes from './prefixes';

var styles = StyleSheet.create({

	nextBtn:{
        flex: 0.3,
        borderColor:'#f6f6f6',
       	backgroundColor: '#B2BEB5'
  },
  prevBtn:{
        flex: 0.3,
        borderColor:'#f6f6f6',
       backgroundColor: '#B2BEB5'
  },
  textStyle:{
  	flex:0.5,
  	fontSize: 20,
  	alignSelf: 'center',
  	textAlign:'center',
  	fontWeight: 'bold',
  	color:'black'
  },
  msgText:{
  	flex:0.5,
  	color:'red',
  	fontWeight: 'bold',
  	alignSelf: 'center',
  	textAlign:'center'
  },
  headerContainer:{
        backgroundColor: 'white',
        flexDirection:'row',
        height: 50,
        borderColor:'#f6f6f6',
        marginTop:5
  }
});

module.exports= styles;