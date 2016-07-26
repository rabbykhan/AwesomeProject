import languageService from './languageService';
import BanglaNumber from '../languages/BanglaNumber.json';

module.exports = {
	convert2BanglaNumber(number){
		console.log("inside number conversion")
		console.log("number = " + number);
		number  = number.toString();
		var banglanumber="";
		if(languageService.getLanguage() != "English"){
			console.log("inside bangla language numbers");
			for(var i=0;i<number.length;i++){
				banglanumber +=  BanglaNumber[number[i]];
			}
		}
		else{
			console.log("inside english language number")
			banglanumber = number;
		}

		return banglanumber;
	}
}