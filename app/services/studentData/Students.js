var dataList={
	studentsinfo:[],
	dates:[],
	today:""
};

module.exports = {
	createObject:function(data){
		console.log("inside data manipulation");
		console.log(data);

		var studentsinfo = [];
		var dateinfo={
			dates:{}
		};

		data.dates.map(function(data){
			dateinfo.dates[data] = {
				status: "present"
			}; 
		})		

		var null_roll = false;

		data.students.map(function(studentdata){
			//dataList.push(studentdata.student); //previous data array we are passing to the callback
			var student={
    			studentinfo:{},
    			arrayentry: 0
  			};
			student.studentinfo = studentdata.student;

			student.dates = (JSON.parse(JSON.stringify(dateinfo.dates))); // cloning object , normal use of "=" will refer to the original

			var absentdate = Object.keys(data.leaves[student.studentinfo.id]);
			console.log(absentdate);
			for(var i=0;i<absentdate.length;i++){				    
				student.dates[absentdate[i]].status = "absent";
				student.dates[absentdate[i]].id = data.leaves[student.studentinfo.id][absentdate[i]];
			}

			console.log("BEFORE PUSHING");
			if(student.studentinfo.class_roll_no == null)student.studentinfo.class_roll_no = 0;
			console.log(student);
  			studentsinfo.push(student); //this will be the new array we will pass to the callback

		})

		console.log(studentsinfo)

	
			studentsinfo.sort(function(a, b) {
	        		return a.studentinfo.class_roll_no - b.studentinfo.class_roll_no
	    	});
		

		//console.log("before adding array entry studentsinfo");
		//console.log(studentsinfo);
		for(var i=0;i<studentsinfo.length;i++){
			studentsinfo[i].arrayentry = i;
		}
		console.log("printing student info ");
		console.log(studentsinfo);
		dataList.studentsinfo = studentsinfo;
		dataList.today = data.today;
		dataList.dates = data.dates;
		
		if(data.dates.length == 0){
			dataList.emptydate = true;
		}else{
			dataList.emptydate = false;
		}
		
		var weekend = true;
		for(var i=0;i<data.dates.length;i++){
			if(dataList.today == data.dates[i]){
				weekend = false;
				console.log("weekday found");	
			}
		}
		if(weekend) console.log("today is weekend");
		dataList.weekend = weekend;
		console.log(dataList);
		return dataList;
	},

	getStudentObject:function(){
		return dataList;
	}
}