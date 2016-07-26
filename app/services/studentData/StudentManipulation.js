import StudentObject from './Students'

var studentData = StudentObject.getStudentObject();

var dataSource = [];

var dates = [];

var today;

var weekend ;
var emptydate ;


var populateData = function(){
	dataSource = studentData.studentsinfo;
	dates = studentData.dates;
	today = studentData.today;
	weekend = studentData.weekend;
	emptydate =  studentData.emptydate;
}

module.exports = {
	getStudents:function(){
		populateData();
		console.log("inside data manipulation");
		console.log(dataSource);
		return dataSource;
	},
	updateStudentData:function(studentid){
			
		console.log("dates property not undefined");
		if(dataSource[studentid].dates[today].status==="present"){
			console.log("inside second if condition");
			dataSource[studentid].dates[today].status = "absent"
			dataSource[studentid].dates[today].reason = "unknown";
			console.log(dataSource[studentid].dates[today].status);
			return 'red'; // representing absent status
		}
		else{
			dataSource[studentid].dates[today].status = "present";
			return 'green'; //representing present status	
		}

	},
	getStatusColor:function(arrayentry){
		if(dataSource[arrayentry].dates[today].status==="present"){
			return 'green';
		}
		else{
			return 'red';
		}
	}
}