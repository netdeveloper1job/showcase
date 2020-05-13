import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, RequestOptions, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Configuration } from '../../../app.constant';
@Injectable()
export class AuthGuard implements CanActivate {
  public authToken;
  public isAuthenticated:any; // Set this value dynamically
  
  constructor(private router: Router, private http:Http,private _configuration: Configuration) {}
	options: RequestOptions;  
	dataUrl = this._configuration.ServerWithApiUrl;
	headersforapi = this._configuration.headersfor;
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.isAuthenticated) {
      return true
    }
    this.router.navigate(['/sessions/signin']);
    return false;
  }
  
//------------------------------- User Functions -----------------------------//
  loginUser(signinData){
	return this.http.post(this.dataUrl+'login',signinData,this.headersforapi)
	 .map( response => response.text());
  }  
  
  SignUpUser(formdata){	  
	return this.http.post(this.dataUrl+'register',formdata,this.headersforapi)
	 .map( response => response.text());
  }
  
  addUser(formdata,url){
	  
	return this.http.post(this.dataUrl+'adduser/'+url,formdata,this.headersforapi)
	 .map( response => response.text());
  }
  
  loginUserdata(id){	  
	return this.http.get(this.dataUrl+'userbyid/'+id,this.headersforapi)
	 .map( response => response.text());
  }
  
  editprofile(id, formdata){	  
	return this.http.post(this.dataUrl+'editprofile/'+id,formdata,this.headersforapi)
	 .map( response => response.text());
  }
  
  updatepassword(id, formdata){	  
	return this.http.post(this.dataUrl+'updatepassword/'+id,formdata,this.headersforapi)
	 .map( response => response.text());
  }
  
  forgotpassword(formdata){	  
	return this.http.post(this.dataUrl+'forgotpassword',formdata,this.headersforapi)
	 .map( response => response.text());
  }
  
  editUser(id, formdata){	  
	return this.http.post(this.dataUrl+'edituser/'+id,formdata,this.headersforapi)
	 .map( response => response.text());
  }
  
  getallusers(url){
	
	return this.http.get(this.dataUrl+'allusers/'+url,this.headersforapi)
	 .map( response => response.text());
  }
  
  getallusersdash(){
	return this.http.get(this.dataUrl+'alluserscount',this.headersforapi)
	 .map( response => response.text());
  }
  
  getallorganizations(){
	return this.http.get(this.dataUrl+'getallorganizations',this.headersforapi)
	 .map( response => response.text());
  }
  
  getauditorsbyorg(id){
	return this.http.get(this.dataUrl+'getauditorsbyorg/'+id,this.headersforapi)
	 .map( response => response.text());
  }
  
  deleteuser(id){
	return this.http.post(this.dataUrl+'deleteuser/'+id,id,this.headersforapi)
	 .map( response => response.text());
  }
  
  allmembersforparking(){
	  return this.http.get(this.dataUrl+'allmembersforparking',this.headersforapi)
	 .map( response => response.text());
  }
   
    
}