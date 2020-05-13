import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, RequestOptions, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Configuration } from '../../app.constant';
@Injectable()
export class DataLayerGuard implements CanActivate {
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

//------------------------------- Parking Functions -----------------------------//
  getparkings(){
	return this.http.get(this.dataUrl+'allparkings',this.headersforapi)
	 .map( response => response.text());
  } 
  
  allparkingswithoutstatus(){
	return this.http.get(this.dataUrl+'allparkingswithoutstatus',this.headersforapi)
	 .map( response => response.text());
  } 
  
  getallcountries(){
	return this.http.get(this.dataUrl+'getallcountries',this.headersforapi)
	 .map( response => response.text());
  }
  
  getparkingsbyquestion(questionid){
	return this.http.get(this.dataUrl+'getparkingsbyquestion/'+questionid,this.headersforapi)
	 .map( response => response.text());
  }
  
  getparkingscount(){
	return this.http.get(this.dataUrl+'allparkingscount',this.headersforapi)
	 .map( response => response.text());
  }
  
  getparkingbyid(id){
	return this.http.get(this.dataUrl+'parkingbyid/'+id,this.headersforapi)
	 .map( response => response.text());
  }
  
  parkingbyrequestid(id){
	return this.http.get(this.dataUrl+'parkingbyrequestid/'+id,this.headersforapi)
	 .map( response => response.text());
  }
  
  deleteparking(id){
	return this.http.post(this.dataUrl+'deleteparking/'+id,id,this.headersforapi)
	 .map( response => response.text());
  }
  
  addparking(formdata){
	return this.http.post(this.dataUrl+'addparking',formdata,this.headersforapi)
	 .map( response => response.text());
  }
  
  updateparking(id, formdata){
	return this.http.post(this.dataUrl+'updateparking/'+id,formdata,this.headersforapi)
	 .map( response => response.text());
  }
  
  modifyparking(reqid, id, formdata){
	return this.http.post(this.dataUrl+'modifyparking/'+reqid+'/'+id,formdata,this.headersforapi)
	 .map( response => response.text());
  }
  
  getparkingsbyuserid(id){
	  return this.http.get(this.dataUrl+'parkingbyuserid/'+id,this.headersforapi)
	 .map( response => response.text());
  }
  
  getparkingscountbyuserid(id){
	  return this.http.get(this.dataUrl+'parkingcountbyuserid/'+id,this.headersforapi)
	 .map( response => response.text());
  }
  
//------------------------------- Audit Question Functions -----------------------------//
	allquestions(){
		return this.http.get(this.dataUrl+'allquestions',this.headersforapi)
		.map( response => response.text());
	}
	
	allquestiontitle(){
		return this.http.get(this.dataUrl+'allquestiontitle',this.headersforapi)
		.map( response => response.text());
	}
	
	getquestionbylevel(id){
		return this.http.get(this.dataUrl+'getquestionbylevel/'+id,this.headersforapi)
		.map( response => response.text());
	}
	
	levelsbyid(id){
		return this.http.get(this.dataUrl+'levelsbyid/'+id,this.headersforapi)
		.map( response => response.text());
	}
	
	getquestionforpark(parkid){
		return this.http.get(this.dataUrl+'getquestionforpark/'+parkid,this.headersforapi)
		.map( response => response.text());
	}
	
	allactivequestions(){
		return this.http.get(this.dataUrl+'allactivequestions',this.headersforapi)
		.map( response => response.text());
	}
	
	getquestions(){
		return this.http.get(this.dataUrl+'getquestions',this.headersforapi)
		.map( response => response.text());
	}
	
	getnextquestion(id, reqid){
		return this.http.get(this.dataUrl+'getnextquestion/'+id+'/'+reqid,this.headersforapi)
		.map( response => response.text());
	}
	
	checkreport(value, id){
		return this.http.get(this.dataUrl+'checkreport/'+value+'/'+id,this.headersforapi)
		.map( response => response.text());
	}
	
	checklevel(value, pvalue, id){
		return this.http.get(this.dataUrl+'checklevel/'+value+'/'+pvalue+'/'+id,this.headersforapi)
		.map( response => response.text());
	}
	
	addquestion(formdata){
		return this.http.post(this.dataUrl+'addquestion',formdata,this.headersforapi)
		.map( response => response.text());
	}
	
	updatequestion(id, formdata){
		return this.http.post(this.dataUrl+'updatequestion/'+id,formdata,this.headersforapi)
		.map( response => response.text());
	}
	
	deletequestion(id){
		return this.http.post(this.dataUrl+'deletequestion/'+id,id,this.headersforapi)
		.map( response => response.text());
	}
  
//------------------------------- Audit Request Functions -----------------------------//
	allnotacceptedrequests(){
		return this.http.get(this.dataUrl+'allnotacceptedrequestswithjoin',this.headersforapi)
		.map( response => response.text());
	}
	
	allrequestswithauditor(){
		return this.http.get(this.dataUrl+'allrequestswithauditor',this.headersforapi)
		.map( response => response.text());
	}
	
	allrequestswithauditorbyparkingowner(id){
		return this.http.get(this.dataUrl+'allrequestswithauditorbyparkingowner/'+id,this.headersforapi)
		.map( response => response.text());
	}
	
	getparkingsbyidwithjoin(id){
		return this.http.get(this.dataUrl+'getparkingsbyidwithjoin/'+id,this.headersforapi)
		.map( response => response.text());
	}
	
	allnotacceptedrequestswithjoinbyid(id, orgid){
		return this.http.get(this.dataUrl+'allnotacceptedrequestswithjoinbyid/'+id+'/'+orgid,this.headersforapi)
		.map( response => response.text());
	}
	
	acceptrequest(reqid, userid){
		return this.http.post(this.dataUrl+'acceptrequest/'+reqid+'/'+userid,'',this.headersforapi)
		.map( response => response.text());
	}
	
	requestbyauditor(id, orgid){
		return this.http.get(this.dataUrl+'requestbyauditor/'+id+'/'+orgid,this.headersforapi)
		.map( response => response.text());
	}
	
	addrequests(formdata){
		return this.http.post(this.dataUrl+'addrequest',formdata,this.headersforapi)
		.map( response => response.text());
	}
	
	updaterequests(id, formdata){
		return this.http.post(this.dataUrl+'updatequestion/'+id,formdata,this.headersforapi)
		.map( response => response.text());
	}
	
	deleterequests(id){
		return this.http.post(this.dataUrl+'deleterequests/'+id,id,this.headersforapi)
		.map( response => response.text());
	}
	
	approverequest(id){
		return this.http.get(this.dataUrl+'approverequest/'+id,this.headersforapi)
		.map( response => response.text());
	}
	
	approveparking(id){
		return this.http.get(this.dataUrl+'approveparking/'+id,this.headersforapi)
		.map( response => response.text());
	}
	
	//----------------------------Audit Mapping Functions---------------------------------//
	allmapping(){
		return this.http.get(this.dataUrl+'allmapping',this.headersforapi)
		.map( response => response.text());
	}
	addpaqdetails(formdata){
		return this.http.post(this.dataUrl+'addpaqdetails',formdata,this.headersforapi)
		.map( response => response.text());
	}
	
	updatemapping(id, formdata){
		return this.http.post(this.dataUrl+'updatemapping/'+id,formdata,this.headersforapi)
		.map( response => response.text());
	}
	deletemapping(id){
		return this.http.post(this.dataUrl+'deletemapping/'+id,id,this.headersforapi)
		.map( response => response.text());
	}
	
	//-------------------------------- Question-Answer Functions----------------------------//
	getquestionsforauditor(id){
		return this.http.get(this.dataUrl+'getquestionsforauditor/'+id,this.headersforapi)
		.map( response => response.text());
	}
	
	getquestionsfororganisation(id){
		return this.http.get(this.dataUrl+'getquestionsfororganisation/'+id,this.headersforapi)
		.map( response => response.text());
	}
	
	getquestionsforauditorbyid(userid, id){
		return this.http.get(this.dataUrl+'getquestionsforauditorbyid/'+userid+'/'+id,this.headersforapi)
		.map( response => response.text());
	}
	
	saveanswer(id, data){
		return this.http.post(this.dataUrl+'saveanswer/'+id,data,this.headersforapi)
		.map( response => response.text());
	}
	
	alldoneanswersbyids(parkiid, quesid){
		return this.http.get(this.dataUrl+'alldoneanswersbyids/'+parkiid+'/'+quesid,this.headersforapi)
		.map( response => response.text());
	}
	
	getdistinctcount(){
		return this.http.get(this.dataUrl+'getdistinctcount',this.headersforapi)
		.map( response => response.text());
	}
	
	alldoneanswers(){
		return this.http.get(this.dataUrl+'alldoneanswers',this.headersforapi)
		.map( response => response.text());
	}
	
	responsebyauditor(id){
		return this.http.get(this.dataUrl+'responsebyauditor/'+id,this.headersforapi)
		.map( response => response.text());
	}
	
	getpaq(reqid){
		return this.http.get(this.dataUrl+'getpaq/'+reqid,this.headersforapi)
		.map( response => response.text());
	}
	
	reportquestions(reqid){
		return this.http.get(this.dataUrl+'reportquestions/'+reqid,this.headersforapi)
		.map( response => response.text());
	}
	
	// =========================== request history ============================//
	
	allrequesthistory(){
		return this.http.get(this.dataUrl+'allrequesthistory',this.headersforapi)
		.map( response => response.text());
	}
	
	allrequesthistorybyparkingowner(id){
		return this.http.get(this.dataUrl+'allrequesthistorybyparkingowner/'+id,this.headersforapi)
		.map( response => response.text());
	}
	
	
	// =========================== Country Master ============================//
	
	getcountryforcountrymaster(){
		return this.http.get(this.dataUrl+'getcountryforcountrymaster',this.headersforapi)
		.map( response => response.text());
	}
	
	addcountry(formdata){
		return this.http.post(this.dataUrl+'addcountry',formdata,this.headersforapi)
		.map( response => response.text());
	}
	
	deleteCountryofcountrymaster(id){
		return this.http.post(this.dataUrl+'deleteCountryofcountrymaster/'+id,id,this.headersforapi)
		.map( response => response.text());
	}
	
	updateCountrymaster(id, formdata){
		return this.http.post(this.dataUrl+'updateCountrymaster/'+id,formdata,this.headersforapi)
		.map( response => response.text());
	}
	
	// =========================== Service Master ============================//
	
	getServicedata(){
		return this.http.get(this.dataUrl+'getServicedata',this.headersforapi)
		.map( response => response.text());
	}
	
	addservicemaster(formdata){
		return this.http.post(this.dataUrl+'addservicemaster',formdata,this.headersforapi)
		.map( response => response.text());
	}
	
	updateservicemaster(id, formdata){
		return this.http.post(this.dataUrl+'updateservicemaster/'+id,formdata,this.headersforapi)
		.map( response => response.text());
	}
	
	deleteservicemaster(id){
		return this.http.post(this.dataUrl+'deleteservicemaster/'+id,id,this.headersforapi)
		.map( response => response.text());
	}
	
	
	// =========================== City Master ============================//
	
	getcitymaster(){
		return this.http.get(this.dataUrl+'getcitymaster',this.headersforapi)
		.map( response => response.text());
	}
	
	getallstateforstatemaster(){
		return this.http.get(this.dataUrl+'getallstateforstatemaster',this.headersforapi)
		.map( response => response.text());
	}
	
	addcityformaster(formdata){
		return this.http.post(this.dataUrl+'addcityformaster',formdata,this.headersforapi)
		.map( response => response.text());
	}
	
	updatecityformaster(id, formdata){
		return this.http.post(this.dataUrl+'updatecityformaster/'+id,formdata,this.headersforapi)
		.map( response => response.text());
	}
	
	deletecityofcountrymaster(id){
		return this.http.post(this.dataUrl+'deletecityofcountrymaster/'+id,id,this.headersforapi)
		.map( response => response.text());
	}
		
	//------------------------------- State Functions -----------------------------//
 
	getstates(){	
		return this.http.get(this.dataUrl+'allstates',this.headersforapi)
		 .map( response => response.text());
	} 
  
	addState(formdata){  
		return this.http.post(this.dataUrl+'addState',formdata,this.headersforapi)
		.map( response => response.text());
	}
  
	deleteState(id){ 
		return this.http.post(this.dataUrl+'deleteState/'+id,id,this.headersforapi)
		.map( response => response.text());
	}
  
	updateStatus(id, formdata){	 
		return this.http.post(this.dataUrl+'updateStatus/'+id,formdata,this.headersforapi)
		.map( response => response.text());
	}
	
	// =========================== postcode Master ============================//
	
	getpostcodemaster(){
		return this.http.get(this.dataUrl+'getpostcodemaster',this.headersforapi)
		.map( response => response.text());
	}
	
	getallcityforcitymaster(){
		return this.http.get(this.dataUrl+'getallcityforcitymaster',this.headersforapi)
		.map( response => response.text());
	}
	
	addpostcodemaster(formdata){
		return this.http.post(this.dataUrl+'addpostcodemaster',formdata,this.headersforapi)
		.map( response => response.text());
	}
	
	updatepostcodemaster(id, formdata){
		
		return this.http.post(this.dataUrl+'updatepostcodemaster/'+id,formdata,this.headersforapi)
		.map( response => response.text());
	}
	
	deletepostcodeofpostcodemaster(id){
		return this.http.post(this.dataUrl+'deletepostcodeofpostcodemaster/'+id,id,this.headersforapi)
		.map( response => response.text());
	}
	
	// =========================== Bank card Master ============================//
	
	getbankcarddata(){
		return this.http.get(this.dataUrl+'getbankcarddata',this.headersforapi)
		.map( response => response.text());
	}
	
	addbankcrudmaster(formdata){
		return this.http.post(this.dataUrl+'addbankcrudmaster',formdata,this.headersforapi)
		.map( response => response.text());
	}
	
	updatebankcardmaster(id, formdata){
		
		return this.http.post(this.dataUrl+'updatebankcardmaster/'+id,formdata,this.headersforapi)
		.map( response => response.text());
	}
	
	deletebankcardmaster(id){
		return this.http.post(this.dataUrl+'deletebankcardmaster/'+id,id,this.headersforapi)
		.map( response => response.text());
	}
	
	// =========================== fuel card Master ============================//
	
	getfuelcarddata(){
		return this.http.get(this.dataUrl+'getfuelcarddata',this.headersforapi)
		.map( response => response.text());
	}
	
	addfuelcrudmaster(formdata){
		return this.http.post(this.dataUrl+'addfuelcrudmaster',formdata,this.headersforapi)
		.map( response => response.text());
	}
	
	updatefuelcardmaster(id, formdata){
		return this.http.post(this.dataUrl+'updatefuelcardmaster/'+id,formdata,this.headersforapi)
		.map( response => response.text());
	}
	
	deletefuelcardmaster(id){
		return this.http.post(this.dataUrl+'deletefuelcardmaster/'+id,id,this.headersforapi)
		.map( response => response.text());
	}
	
	// ===================== Gass Stations Master ============================//
	
	getgasstationsdata(){
		return this.http.get(this.dataUrl+'getgasstationsdata',this.headersforapi)
		.map( response => response.text());
	}
	
	addgasstations(formdata){
		return this.http.post(this.dataUrl+'addgasstations',formdata,this.headersforapi)
		.map( response => response.text());
	}
	
	updategasstations(id, formdata){
		return this.http.post(this.dataUrl+'updategasstations/'+id,formdata,this.headersforapi)
		.map( response => response.text());
	}
	
	deletegasstations(id){
		return this.http.post(this.dataUrl+'deletegasstations/'+id,id,this.headersforapi)
		.map( response => response.text());
	}
	
	// =========================== Service_Level Master ============================//
	
	getServiceLeveldata(){
		return this.http.get(this.dataUrl+'getServiceLeveldata',this.headersforapi)
		.map( response => response.text());
	}
	addservicelevelmaster(formdata){
		
		return this.http.post(this.dataUrl+'addservicelevelmaster',formdata,this.headersforapi)
		.map( response => response.text());
	}
	deleteservicelevelmaster(id){
		return this.http.post(this.dataUrl+'deleteservicelevelmaster/'+id,id,this.headersforapi)
		.map( response => response.text());
	}
	
	updateserviceLevelmaster(id, formdata){
		
		return this.http.post(this.dataUrl+'updateserviceLevelmaster/'+id,formdata,this.headersforapi)
		.map( response => response.text());
	}
	
	deleteGalleryByID(Did){
	return this.http.post(this.dataUrl+'deleteGalleryByID/'+Did,Did,this.headersforapi)
	 .map( response => response.text());
  }
	
	
}