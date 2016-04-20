import AppConfig from '../../app/config';
module.exports = {
  token:'',
  headerContent:function(methodType,postObjct){
    return({
      method:methodType,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body:postObjct
    })
  },
  login:function(userName, pass,calback) {
    console.log(JSON.stringify({
          userName: userName,
          pass: pass,
        }));
    fetch(AppConfig.apiSiteUrl+'login',this.headerContent('POST',
          JSON.stringify({
          userName: userName,
          pass: pass,
        })
      )).then((data) => data.json())
      .then((data) =>{
        console.log("data");
        console.log(data);
        console.log('token',data.token);
        this.setToken(data.token);
        calback(data)
      
      })
      .catch((error) => {
        alert('error')  
      });    
  },
  setToken:function(token){
    // need to more work
    this.token=token;
    return 'remove token'
  },
  getToken:function() {
    // if need more work to get token 
    var token=this.token;
    return token;
  },
  logOut:function() {
    this.setToken('');
    return true
  },
  loggedIn:function() {
    console.log("loggedin function = " + this.getToken())
    if(this.getToken()==''){
      return false;
    }else{
      return true;
    }
  },

}

