import deviceStore from './DeviceStorage';
import English from '../languages/English.json';
import Bangla from '../languages/Bangla.json';

var globallanguage = "";
deviceStore.fetchData("language",function(data){
		console.log("language "  + data);
		setData(data);
    })
    var globallanguage="English";
    function setData(data){
	    console.log(data);
	    if(data==null){
		           
		            //deviceStore.saveData("currentPage",currentPage);
		    console.log("inside language if" + data);
		    deviceStore.saveData("language","English");
		    globallanguage = "English";
	    }
	    else{
		    //alert("Are you sure you want to exit the app");
		    //deviceStore.saveData("language","English");
		    console.log("inside language else " + data)
		    globallanguage =data;
	    }
    }

module.exports = {
		
		setLanguage:function(language){
			deviceStore.saveData("language",language);
			globallanguage = language;
		},
		getLanguage:function(){
			if(globallanguage == ""){
				globallanguage = "English";
			}
			return globallanguage;
		},
		getToggleValue:function(){
			console.log("language = " + globallanguage);
			if(globallanguage == "English"){
				console.log("inside english toggle value");
				return false;
			}
			else if(globallanguage == "Bengali"){
				console.log("inside bangla toggle value");
				return true;
			}
			else{
				console.log("inside null language toggle value");
				return false;
			}
		},
		getDrawerContent:function(contentname){
			var language;
			
			if(globallanguage == ""){
				language = "English";
				globallanguage = "English";
			}else{
				language = globallanguage;
			}
			
			var returnContent = "";
			console.log("language = " +  language);
			
			if(language == "English"){
				console.log("inside if condition");
				returnContent = English.drawer[contentname];
			}
			else{
				console.log("inside else condition");
				returnContent = Bangla.drawer[contentname];
			
			}
			return returnContent;
		},
		getNavbarContent:function(contentname){
			var language;
			
			if(globallanguage == ""){
				language = "English";
				globallanguage = "English";
			}else{
				language = globallanguage;
			}
			
			var returnContent = "";
			console.log("language = " +  language);
			
			if(language == "English"){
				console.log("inside if condition");
				returnContent = English.navbar[contentname];
			}
			else{
				console.log("inside else condition");
				returnContent = Bangla.navbar[contentname];
			}
			return returnContent;
		},
		getAttendanceContent:function(contentname){
			var language;
			
			if(globallanguage == ""){
				language = "English";
				globallanguage = "English";
			}else{
				language = globallanguage;
			}
			
			var returnContent = "";
			console.log("content = " + English.attendance[contentname]);
			
			if(language == "English"){
				console.log("inside if condition");
				returnContent = English.attendance[contentname];
			}
			else{
				console.log("inside else condition");
				returnContent = Bangla.attendance[contentname];
			}
			return returnContent;
		},
		getLoginText:function(){
			var language;
			
			if(globallanguage == ""){
				language = "English";
				globallanguage = "English";
			}else{
				language = globallanguage;
			}
			
			var returnContent = "";

			if(language == "English"){
				returnContent = English.login;
			}
			else{
				returnContent = Bangla.login;
			}
			return returnContent;

		},
		getStudentName:function(studentInfo){
			var language;
			
			if(globallanguage == ""){
				language = "English";
				globallanguage = "English";
			}else{
				language = globallanguage;
			}
			var returnContent = "";

			console.log(studentInfo.full_name_in_lc);

			if(language == "English"){
				returnContent = studentInfo.name;
			}
			else{
				if(studentInfo.full_name_in_lc != null){
					returnContent = studentInfo.full_name_in_lc;
				}
				else{
					returnContent = studentInfo.name;
				}
			}

			return returnContent;
		}

}