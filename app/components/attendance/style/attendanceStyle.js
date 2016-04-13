import React,{StyleSheet} from 'react-native';
import Prefixes from './prefixes';

var styles = StyleSheet.create({
 
  classlistContent: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor:Prefixes.backgroundColor
  },
  listContainer: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0.6,
    marginLeft: 22,
    marginRight: 22,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  attIDContent: {
      backgroundColor: 'white',
      padding: 10,
      flex: 0.2,
      height: 50
  },
  attNameContent: {
      backgroundColor: 'white',
        padding: 10,
        marginLeft:2,
        flex: 0.8,
        height: 50,
        
  },
  dateConten:{
      backgroundColor: 'white',
        padding: 10,
        marginLeft:2,
        flex: 0.4,
        height: 50
        
  },
  removeAttendance:{
        backgroundColor: 'white',
        padding: 10,
        marginLeft:2,
        flex: 0.4
    
       
  },
   removeAttendanceContent:{
        flexDirection:'row',
        height: 50,
        paddingLeft:5,
        paddingRight:5,
        borderColor:'#f6f6f6',
        marginTop:5
       
  },
  nextPreContent:{
        backgroundColor: '#558B2F',
        flexDirection:'row',
        height: 50,
        borderColor:'#f6f6f6',
        marginTop:5
  },
  nextBtn:{
        backgroundColor: 'red',
        padding: 10,
        flex: 0.4,
        borderColor:'#f6f6f6',
       
  },
  prevBtn:{
        backgroundColor: 'blue',
        padding: 10,
        flex: 0.4,
        borderColor:'#f6f6f6',
       
  },
  classListView:{
       marginTop:8,

  },
  textInput:  {
        fontSize: 20,
        borderWidth:5,
        height: 40,
        height: 40, 
        marginBottom:10,
         padding: 4
        },
  listParentContainer :{
    backgroundColor: "#C5DFC5",
    paddingBottom: 80,
    paddingLeft:5,
    paddingRight:5,
    marginLeft:5,
    marginRight:5
  }     
});


module.exports= styles;