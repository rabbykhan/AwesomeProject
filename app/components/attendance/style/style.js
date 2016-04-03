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
  list: {
    color: '#000',
    fontSize: 20,
    marginTop: 20,
    flex: 1,
    alignSelf: 'center'
  },
  customButton:{
        backgroundColor: '#558B2F',
        padding: 10,
        borderColor: 'transparent',
        borderWidth:2,
        borderRadius: 2,
        flexDirection: 'row',
        height: 50,
        marginBottom:5,
        paddingLeft:30,
        borderColor:'#f6f6f6',
         marginLeft:15,
         marginRight:15,


  },
  classListView:{
       marginTop:8,

  }
});


module.exports= styles;