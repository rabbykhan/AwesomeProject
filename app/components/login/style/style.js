import React,{StyleSheet} from 'react-native';
import Prefixes from './prefixes';


var styles = StyleSheet.create({
   container: {
    flex:1,
    backgroundColor:"#E0E0E0"
  },
  header:{
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop:50,
    backgroundColor:'#EEEEEE',
    padding:10,
    borderWidth:1,
    borderColor:"#00AF4F"
  },
  
  logo:{
    color:'#00AF4F',
    fontSize:35,
  },
  inputTitle:{
    color:'#00AF4F',
    fontSize:20,
  },
  footerText:{
    color:'#666',
    fontSize:10,
  },
  textInput: {
    height: 40, 
    borderWidth:1,
    borderColor:'#666',
    backgroundColor: '#f1f1f1',
    borderColor:"#000",
    color: '#000',
    borderWidth:5,
    paddingLeft: 10,
    marginBottom:10
  }, 
 
  loginContent:{
    position:'relative',
    marginTop:50,
    marginLeft:20,
    marginRight:20


  }


});

module.exports= styles;