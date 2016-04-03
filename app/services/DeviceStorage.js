import React, {AsyncStorage} from 'react-native';
module.exports = {
	saveData(key,data){
        console.log("inside savedata");
        try { 
            //await AsyncStorage.setItem(STORAGE_KEY, selectedValue);
            console.log("trying to save "); 
            AsyncStorage.setItem(key, ""+data);
            console.log();
            //this._appendMessage('Saved selection to disk: ' + selectedValue); 
        } 
        catch (error) { 
            //this._appendMessage('AsyncStorage error: ' + error.message); 
            console.log("saving error = " + error.message)
        }
    },
    fetchData(key,callback){
    	AsyncStorage.getItem(key).then((value)=>{
       	callback(value)
    	}).done();
    }
}