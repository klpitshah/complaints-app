import { Injectable } from '@angular/core';
import { Http , Headers, ResponseContentType } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  product: any;
  reqProduct : any;
  getset: any;
  

  constructor(private http : Http) { }

  sendEmails(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:4000/users/email', email , {headers:headers}).map(res=>res.json());
  }

  getNumberComplain(){
    return this.http.get('http://localhost:4000/users/getNumbers');

  }
  progComplainBar(obj , id){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:4000/users/progressOfComplain/' + id , obj , {headers:headers}).map(res=>res.json());
  }  

  assignWorkerToComplain(obj){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:4000/users/assignComplainToWorker', obj , {headers:headers}).map(res=>res.json());
  }

  getWorkersComplain(wid){
    return this.http.get('http://localhost:4000/users/getAsscomplains/' + wid);
  }

  registerUser(user){
    let headers = new Headers();
    // console.log("register");
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:4000/users/register',user , {headers:headers}).map(res=>res.json());
  }

  viewMyComplains(name_){
    // console.log("your name from auth " + name_);
    return this.http.get('http://localhost:4000/users/viewComplains/'+ name_);
  }

  viewComplainById(id){
    return this.http.get('http://localhost:4000/users/viewComplainById/'+ id);
  }

  
  addComplain(complain){
    let headers = new Headers();
    // console.log("register");
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:4000/users/addComplain',complain , {headers:headers}).map(res=>res.json());
  }

  changePassword(newp){
    let headers = new Headers();
    // console.log("register");
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:4000/users/changePassword',newp , {headers:headers}).map(res=>res.json());
  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:4000/users/authentication', user , {headers:headers}).map(res=>res.json());
  }
 
  getAllUsers(){
    return this.http.get('http://localhost:4000/users/getUsers');
  }

  getAllComplains(){
    return this.http.get('http://localhost:4000/users/viewComplains');
  }



  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization',this.authToken);
    //headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:4000/users/profile' , {headers:headers}).map(res=>res.json());
    
  }

  storeUserData(token ,user){

    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken= token;
    this.user = user;
  }

loadToken(){
  const token = localStorage.getItem('id_token');
  // console.log("token "+ token);
  // console.log("token 2 : "+ localStorage.getItem('user'));
  this.authToken = token;
}

checkToken(){
  if(localStorage.getItem('user') == null){ 
    //console.log("returning null..."); 
    return null;}
  else{
  let user1 = localStorage.getItem('user').toString();
  var obj = JSON.parse(user1);
  //console.log(obj + " "+ obj.name);
  return obj ;
  }
}

loggedIn() {
    //console.log("logged in");
    return tokenNotExpired('id_token');
}

  logout(){
    this.authToken=null;
    this.user=null;
    localStorage.clear();
    //console.log("clear memory !!");
  }
}
