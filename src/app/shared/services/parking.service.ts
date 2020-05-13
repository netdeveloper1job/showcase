import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, RequestOptions, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Configuration } from '../../app.constant';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {

  constructor(private router: Router, private http:Http,private _configuration: Configuration) { }

	options: RequestOptions;  
	dataUrl = this._configuration.ServerWithApiUrl;
	headersforapi = this._configuration.headersfor;
	
	getParkingData(parkingid,jsonArray){
		return this.http.post(this.dataUrl+'getparkingdata/'+parkingid,jsonArray,this.headersforapi)
		.map( response => response.text());
	} 
	getAllCountry(){
		return this.http.get(this.dataUrl+'getcountryList/0',this.headersforapi)
		.map( response => response.text());
	}
	getStates(countryid){
		return this.http.get(this.dataUrl+'getStates/'+countryid,this.headersforapi)
		.map( response => response.text());
	}
	getCityList(stateid){
		return this.http.get(this.dataUrl+'getCityList/'+stateid,this.headersforapi)
		.map( response => response.text());
	}
	getpostCodeList(cityID){
		return this.http.get(this.dataUrl+'getpostCodeList/'+cityID,this.headersforapi)
		.map( response => response.text());
	}
	addServiceTomatrix(formdata){
		return this.http.post(this.dataUrl+'addServiceTomatrix/0',formdata, this.headersforapi)
		.map( response => response.text());
	}
	addFuleCardToMatrix(formdata){
		return this.http.post(this.dataUrl+'addFuleCardToMatrix/0',formdata, this.headersforapi)
		.map( response => response.text());
	}
	addBankCardToMatrix(formdata){
		return this.http.post(this.dataUrl+'addBankCardToMatrix/0',formdata, this.headersforapi)
		.map( response => response.text());
	}
	addGasStationToMatrix(formdata){
		return this.http.post(this.dataUrl+'addGasStationToMatrix/0',formdata, this.headersforapi)
		.map( response => response.text());
	}
	
	addServiceLevelToMatrix(formdata){
		return this.http.post(this.dataUrl+'addServiceLevelToMatrix/0',formdata, this.headersforapi)
		.map( response => response.text());
	}
	updatePrimaryInformation(parkingid,formdata){
		//console.log(formdata);
		return this.http.post(this.dataUrl+'updatePrimaryInformation/0'+parkingid,formdata, this.headersforapi)
		.map( response => response.text());
	}
	
	/* Filter Functions	*/
	getAllservices(){
		return this.http.get(this.dataUrl+'getAllservices/0', this.headersforapi)
		.map( response => response.text());
	}
	getAllbankCards(){
		return this.http.get(this.dataUrl+'getAllbankCards/0', this.headersforapi)
		.map( response => response.text());
	}
	getAllfuelCards(){
		return this.http.get(this.dataUrl+'getAllfuelCards/0', this.headersforapi)
		.map( response => response.text());
	}
	getAllserviceslevels(){
		return this.http.get(this.dataUrl+'getAllserviceslevels/0', this.headersforapi)
		.map( response => response.text());
	}
	getAllgasstations(){
		return this.http.get(this.dataUrl+'getAllgasstations/0', this.headersforapi)
		.map( response => response.text());
	}
	allserviceswithfilter(services){
		return this.http.post(this.dataUrl+'allserviceswithfilter/0',services, this.headersforapi)
		.map( response => response.text());
	}
	
	addGalleryImage(formdata,Pid){
		//console.log(formdata);
		return this.http.post(this.dataUrl+'addGalleryImage/'+Pid,formdata, this.headersforapi)
		.map( response => response.text());
	}
	
	GetparkingGallery(Pid){
		//console.log(formdata);
		return this.http.get(this.dataUrl+'GetparkingGallery/'+Pid, this.headersforapi)
		.map( response => response.text());
	}
	
	GetparkingGalleryById(Iid){
		//console.log(formdata);
		return this.http.get(this.dataUrl+'GetparkingGalleryById/'+Iid, this.headersforapi)
		.map( response => response.text());
	}
	
	updateGridStatus(parkingid){
		//console.log(formdata);
		return this.http.post(this.dataUrl+'updateGridStatus/0',parkingid, this.headersforapi)
		.map( response => response.text());
	}
	  Loginmembersforparking(userId){
	 
	  return this.http.get(this.dataUrl+'Loginmembersforparking/'+userId,this.headersforapi)
	 .map( response => response.text());
  }
	
}
