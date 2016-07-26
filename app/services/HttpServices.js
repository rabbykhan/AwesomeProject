import AppConfig from '../../app/config';
import Auth from './Auth';
import Student from './studentData/Students';

module.exports = {
	headerContent(methodType,postObjct=null){
		console.log("token = " + Auth.getToken().trim());
		return({
			method:methodType,
	   		headers: {
	   		'authToken':Auth.getToken().trim(),
	    	'Accept': 'application/json',
	        'Content-Type': 'application/json',
	    	},
	    	body:postObjct

		})
	},
	studentAtendances(ID,callback){
		fetch(AppConfig.apiSiteUrl+'student_attendances?batch_id='+ID,this.headerContent('GET'))
			.then((data) => data.json())
			.then((data) => {
				var dataList = Student.createObject(data);
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
		console.log(data);

		var attendanceList = [];
		var attendances={
			attendance:[],
			commit:"add"
		}
		console.log("length = " + data.studentinfo.length);
		for(var i=0;i<data.studentinfo.length;i++){
			var attendance={
				"attendance":{
					student_id : "",
					month_date : "",
					batch_id : "",
					reason:"unknown",
					forenoon:0,
					afternoon:0
				},
				status:"",
				absent_id:""
			}
			attendance.attendance.student_id = data.studentinfo[i].studentinfo.id;
			attendance.attendance.month_date = data.todayDate;
			attendance.attendance.batch_id = data.batchID;
			attendance.status = data.studentinfo[i].dates[data.todayDate].status
			if(data.studentinfo[i].dates[data.todayDate].hasOwnProperty('id')){
				attendance.absent_id = data.studentinfo[i].dates[data.todayDate].id;
			}
			else{
				attendance.absent_id = "";
			}
			attendanceList.push(attendance);
		}

		attendances.attendance = attendanceList;

		console.log(attendances)

		fetch(AppConfig.apiSiteUrl+'attendances',this.headerContent('POST',
          JSON.stringify({
          	attendances
          })
      	)).then((data) => data.json())
      .then((data) =>{
      	console.log("printing return data");
        console.log(data);
      	callback(data);
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

