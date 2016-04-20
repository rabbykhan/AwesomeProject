import React,{StyleSheet} from 'react-native';
import Prefixes from './prefixes';

var styles = StyleSheet.create({

	nextBtn:{
        flex: 0.1,
        paddingRight:5,
        paddingLeft:5,
       	backgroundColor: '#FFFFFF'
  },
  prevBtn:{
      flex: 0.1,
      paddingLeft:5,
      paddingRight:5,
       backgroundColor: '#FFFFFF'
  },
  monthView:{
    backgroundColor: '#FFFFFF',
    alignItems:'center',
    flexDirection:'row',
    padding:5,
    flex:0.3,
    marginRight:2.5,
    marginLeft:5
  },
  textStyleMonth:{
    flex:1,
    fontSize: 25,
    textAlign: 'center',
    color:'#686868'
  },
  dayView:{
    backgroundColor: '#FFFFFF',
    alignItems:'center',
    flexDirection:'row',
    padding:5,
    flex:0.2,
    marginRight:2.5,
    marginLeft:2.5
  },
  textStyleDay:{
    flex:1,
    fontSize: 25,
    textAlign: 'center',
    color:'#686868'
  },
  yearView:{
    backgroundColor: '#FFFFFF',
    alignItems:'center',
    flexDirection:'row',
    padding:5,
    flex:0.3,
    marginRight:5,
    marginLeft:2.5
  },
  textStyleYear:{
    flex:1,
    fontSize: 25,
    textAlign: 'center',
    color:'#686868'
  },
  msgText:{
  	flex:0.5,
  	color:'red',
  	fontWeight: 'bold',
  	alignSelf: 'center',
  	textAlign:'center'
  },
  headerContainer:{
        backgroundColor: '#01B050',
        flexDirection:'column',
        height: 100,
        borderColor:'#f6f6f6',
        margin:5
  },
  subheaderContainer:{
    flexDirection:'row',
    padding:10,
    paddingBottom:0,
    flex:0.2
  },
  dayContainer:{
    flex:0.1,
    color:"#FFFFFF",
    alignSelf: 'center',
    textAlign:'center',
    fontSize: 25,
    fontWeight:'bold',
    padding:10
  },
  dateContainer:{
    flex:0.7,
    flexDirection:'row'

  },
  msgContainer:{
    backgroundColor: 'white',
        flexDirection:'row',
        height: 50,
        borderColor:'#f6f6f6',
        marginTop:5
  }
});

module.exports= styles;