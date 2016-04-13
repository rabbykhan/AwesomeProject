import AppConfig from '../../app/config';
import Auth from './Auth';
module.exports = {
	headerContent(methodType){
		return({
			method:methodType,
	   		headers: {
	   		'authenticity_token':Auth.getToken().trim(),
	    	'Accept': 'application/json',
	        'Content-Type': 'application/json',
	    	}
		})
	},
	studentAtendances(ID,callback){
		fetch(AppConfig.apiSiteUrl+'student_attendances?batch_id='+ID,this.headerContent('GET'))
			.then((data) => data.json())
			.then((data) => {
				console.log(data);
				//for sorting "it should return from backend "
				var dataList={
					studentsinfo:[],
					dates:[],
					today:""
				};

				var studentsinfo = [];
				var dateinfo={
				  dates:{}
				};

				data.dates.map(function(data){

				  dateinfo.dates[data] = {
				    status: "present"
				  }; 

				})
				
				data.students.map(function(studentdata){
					//dataList.push(studentdata.student); //previous data array we are passing to the callback

					var student={
    					studentinfo:{},
  					};
					student.studentinfo = studentdata.student;

					student.dates = (JSON.parse(JSON.stringify(dateinfo.dates))); // cloning object , normal use of "=" will refer to the original

					var absentdate = Object.keys(data.leaves[student.studentinfo.id]);
					console.log(absentdate);
					for(var i=0;i<absentdate.length;i++){
					    
					    student.dates[absentdate[i]].status = "absent";
					    student.dates[absentdate[i]].id = data.leaves[student.studentinfo.id][absentdate[i]];
					}

  					studentsinfo.push(student); //this will be the new array we will pass to the callback
				})
				function compare(a,b) {
  					if (a.studentinfo.id < b.studentinfo.id)
    					return -1;
  					else if (a.studentinfo.id > b.studentinfo.id)
    					return 1;
  					else 
    					return 0;
				}

				studentsinfo.sort(compare);
				
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
				callback(dataList)
		 	})
		.catch((error) => {
		  console.warn(error);
		});
	},
	batchList(callback){

		fetch(AppConfig.apiSiteUrl+'all_batch.json',this.headerContent('GET'))
		.then((data) => data.json())
		.then((data) => {
			console.log(data);
			//for sorting "it should return from backend "
			var dataList=[];
			data.batches.map(function(data){
				dataList.push(data.batch)
			})
	 		callback(dataList);
 		})
		.catch((error) => {
		  console.warn(error);
		});
	},
	addStudentInfo(data,callback){
		var attendances={
			attendance:{
			student_id : data.studentinfo.id,
			month_date : data.todayDate,
			batch_id : data.batchID,
			reason:data.dateinfo.reason,
			forenoon:0,
			afternoon:0
			},
			commit:"add"
		}
		if(data.forenoon && data.afternoon){
			attendances.attendance.forenoon = 1;
			attendances.attendance.afternoon = 1;
		}
		else if(!data.forenoon && !data.afternoon){
			attendances.attendance.forenoon = 0;
			attendances.attendance.afternoon = 0;
		}
		if(!data.forenoon && data.afternoon){
			attendances.attendance.forenoon = 0;
			attendances.attendance.afternoon = 1;
		}
		if(data.forenoon && !data.afternoon){
			attendances.attendance.forenoon = 1;
			attendances.attendance.afternoon = 0;
		}
		
		console.log(attendances);
		fetch(AppConfig.apiSiteUrl+'attendances',this.headerContent('POST',
          JSON.stringify({
          	attendances
        })
      )).then((data) => data.json())
      .then((data) =>{
        console.log('token',data.token);
        this.setToken(data.token);
        calback(data)
      
      })
      .catch((error) => {
        alert('error')  
      });  
	},

	deleteAbsent(data,callback){
		console.log("inside delete POST");
		fetch(AppConfig.apiSiteUrl+'attendances/'+data,this.headerContent('POST',
          JSON.stringify({
          _method:"delete"
        })
      )).then((data) => data.json())
      .then((data) =>{
        console.log('token',data.token);
        this.setToken(data.token);
        calback(data)
      
      })
      .catch((error) => {
        alert('error')  
      });
	}


}

