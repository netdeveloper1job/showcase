import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { ParkingService } from '../../../../shared/services/parking.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Configuration } from '../../../../app.constant';
import { AppLoaderService } from '../../../../shared/services/app-loader/app-loader.service';
import { AppConfirmService } from '../../../../shared/services/app-confirm/app-confirm.service';
import { DataLayerGuard } from '../../../../shared/services/datalayer.guard';
import { AuthGuard } from '../../../../shared/services/auth/auth.guard';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
 declare var $: any;
@Component({
  selector: 'app-parking-step-two',
  templateUrl: './parking-step-two.component.html',
  styleUrls: ['./parking-step-two.component.scss']
})
export class ParkingStepTwoComponent implements OnInit {
	
	public Editor=ClassicEditor;
onClickResult:any;
ratingValue : number = 3;
respondstatus:any;
public file: any;
parkingdata: any;
loginmemberID:any;
item: any;
itemByID:any;
usertype = sessionStorage.getItem("typeofloginUser");
public userID = sessionStorage.getItem("idofloginUser");

//public url = 'http://placehold.it/180';	

public urls=[];
	constructor(
	private authservice:AuthGuard,
	private parkingservice:ParkingService,	
	private dataservice:DataLayerGuard,
	private confirmService: AppConfirmService,
	private loader: AppLoaderService,
	private dialog: MatDialog,
	private snack: MatSnackBar,
	public _Activatedroute:ActivatedRoute,
	private fb: FormBuilder,
	private router:Router,
	private _configuration: Configuration,
	
	 //public navCtrl: NavController
	) { 
		 
	}
	imagepathurl = this._configuration.imagepathurl;
	
	public itemForm: FormGroup;
	parkingJSONArray: any;
	parkingservices:any;
	parkingdetails:any;
	parkingfuelcards:any;
	parkingbankcards:any;
	parkinggasStations:any;
	countryJsonArray:any;
	countryArray:any;
	stateJSONArray:any;
	stateDataarray:any;
	cityJSONArray:any;
	cityDataArray:any;
	postcodejsonArray:any;
	PostCodeData:any;
	urlparkingID:any;
	jsonResponse:any;
	parkingservicelevel:any;
	parkingGalleryByID:any;
	securityRatings = [0,1,2,3,4,5];
	starRatings = [0,1,2,3,4,5];
	parkingtypes = ["Self Assessed","Certified","Not Certified"];
    parkingtypes1 = ["Dedicated Truck parking","Truck Service Station"];
	ngOnInit() {		
	
		this._Activatedroute.paramMap.subscribe(params => {         
			this.urlparkingID = params.get('id');
		});
		
		this.getParkingData();	
     this.getCountryList();		
		this.buildItemForm();
	}
	
	/** Building A Form **/
	buildItemForm() {
		this.itemForm = new FormGroup({
			user_ID: new FormControl('', Validators.required),
			parkingname: new FormControl('', Validators.required),
			parkingEmail: new FormControl('', Validators.required),
			website: new FormControl(''),
			telephone: new FormControl('', Validators.required),
			description: new FormControl('', Validators.required),
			fax: new FormControl(''),
			openinghour: new FormControl('', Validators.required),
			ContactPerson: new FormControl('', Validators.required),
			Country: new FormControl('', Validators.required),
			State: new FormControl('', Validators.required),
			City: new FormControl('', Validators.required),
			PIN: new FormControl('', Validators.required),
			RoadName: new FormControl(''),
			highway: new FormControl('', Validators.required),
			exit: new FormControl('', Validators.required),
			AccessDetails: new FormControl(''),
			Latitude: new FormControl(''),
			Longitude: new FormControl(''),
			ParkingType: new FormControl('', Validators.required),
			ParkingType1: new FormControl('', Validators.required),
			CurrencyAccepted: new FormControl('', Validators.required),
			TarrifPerDay: new FormControl('', Validators.required),
			TarrifPerhour: new FormControl('', Validators.required),
			SecurityRating: new FormControl(''),
			StarRating: new FormControl('', Validators.required),
			Status: new FormControl(''),
			file: new FormControl(''),
			Imageupload: new FormControl(),
			fburl: new FormControl('', Validators.required),
			LinkedInurl: new FormControl('', Validators.required),
			twitterrl: new FormControl('', Validators.required),
			instaurl: new FormControl('', Validators.required),
		});
		
		this.authservice.allmembersforparking()
	  .subscribe(data => {
			this.parkingdata = JSON.parse(data);
			// console.log(this.parkingdata.status);
			if(this.parkingdata.status == 0){
				
				this.item = [];
			}else if(this.parkingdata.status == 1){
				this.item = this.parkingdata.data;
				// console.log(this.item);
			}else{
				
				this.item = [];
			}
			
			
	});
	
	this.parkingservice.Loginmembersforparking(this.userID)
	  .subscribe(data => {
			this.loginmemberID = JSON.parse(data);
			// console.log(this.parkingdata.status);
			if(this.loginmemberID.status == 0){
				
				this.itemByID = [];
			}else if(this.loginmemberID.status == 1){
				this.itemByID = this.loginmemberID.data;

			}else{
				
				this.itemByID = [];
			}
	});
	}
	
	CountryChane(event){
		this.getStateList(event.value);
	}
	StateChange(event){
		this.getCityList(event.value);
	}
	CityChange(event){
		this.getpostCodeList(event.value);
	}
	getParkingData() {
		const jsonArray = {
			pagetype:'dashboardparkingdetail'
		}
		this.parkingservice.getParkingData(this.urlparkingID,jsonArray)
			.subscribe(data => {
				
				this.parkingJSONArray = JSON.parse(data);
				//console.log(this.parkingJSONArray);
				if(this.parkingJSONArray.status == 0){
					this.snack.open(this.parkingJSONArray.message, 'Close', { duration: 2000 });
					this.parkingservices = [];
					this.parkingfuelcards = [];
					this.parkingbankcards = [];
					this.parkinggasStations = [];
					this.parkingdetails = [];
					this.parkingservicelevel = [];
					this.parkingGalleryByID =[];
				}else if(this.parkingJSONArray.status == 1){
					this.parkingservices = this.parkingJSONArray.data.services;
					this.parkingfuelcards = this.parkingJSONArray.data.fuelCards;
					this.parkingbankcards = this.parkingJSONArray.data.bankCards;
					this.parkinggasStations = this.parkingJSONArray.data.gasStations;
					this.parkingdetails = this.parkingJSONArray.data.parkingsdata[0];
					this.parkingservicelevel = this.parkingJSONArray.data.serviceLevel;
					this.parkingGalleryByID = this.parkingJSONArray.data.GalleryImgbyID;
				    //this.urls.push(this.imagepathurl.this.parkingGalleryByID.this.ImagePath);
					
					this.itemForm.patchValue({
						user_ID:this.parkingdetails.user_ID,
						parkingname:this.parkingdetails.Name,
						parkingEmail:this.parkingdetails.Email,
						telephone:this.parkingdetails.Telephone,
						description:this.parkingdetails.description,
						fax:this.parkingdetails.fax,
						openinghour:this.parkingdetails.openinghour,
						ContactPerson:this.parkingdetails.ContactPerson,
						website:this.parkingdetails.Website,
						Country:this.parkingdetails.countryid,
						State:this.parkingdetails.stateid,
						City:this.parkingdetails.cityID,
						PIN:this.parkingdetails.PIN,
						RoadName:this.parkingdetails.Road,
						highway:this.parkingdetails.Highway,
						exit:this.parkingdetails.Exits,
						AccessDetails:this.parkingdetails.Access,
						Latitude:this.parkingdetails.Lattitude,
						Longitude:this.parkingdetails.Longitude,
						ParkingType:this.parkingdetails.Parking_Type,
						ParkingType1:this.parkingdetails.Parking_Type1,
						CurrencyAccepted:this.parkingdetails.Currency,
						TarrifPerDay:this.parkingdetails.Tarrif_hour,
						TarrifPerhour:this.parkingdetails.Tarrif_day,
						SecurityRating:this.parkingdetails.Security_rating,
						StarRating:this.parkingdetails.Star_rating,
						Status:this.parkingdetails.Status,
						fburl:this.parkingdetails.Facebook_url,
						LinkedInurl:this.parkingdetails.LinkedIn_url,
						twitterrl:this.parkingdetails.Twitter_url,
						instaurl:this.parkingdetails.Instagram_url,
						
							
					});
					
					this.getCountryList();
					this.getStateList(this.parkingdetails.countryid);
					this.getCityList(this.parkingdetails.stateid);
					this.getpostCodeList(this.parkingdetails.cityID);
					
				}else{
					this.snack.open("No data to display", 'Close', { duration: 2000 });
					this.parkingservices = [];
					this.parkingfuelcards = [];
					this.parkingbankcards = [];
					this.parkinggasStations = [];
					this.parkingdetails = [];
					this.parkingservicelevel = [];
					this.parkingGalleryByID=[];
				}
			});
	}
	
	/** Get all countries **/
	getCountryList(){
		// alert('asdfadsf');
		this.parkingservice.getAllCountry()
			.subscribe(data => {
				this.countryJsonArray = JSON.parse(data);
				if(this.countryJsonArray.status == 0){
					this.snack.open(this.countryJsonArray.message, 'Close', { duration: 2000 });
					this.countryArray = [];
				}else if(this.countryJsonArray.status == 1){
					this.countryArray = this.countryJsonArray.data;
				}else{
					// this.snack.open("No data to display", 'Close', { duration: 2000 });
					this.countryArray = [];
				}
			});
	}
	
	/** Get all states **/
	getStateList(countryidd){
		this.parkingservice.getStates(countryidd)
			.subscribe(data => {
				this.stateJSONArray = JSON.parse(data);
				if(this.stateJSONArray.status == 0){
					this.snack.open(this.stateJSONArray.message, 'Close', { duration: 2000 });
					this.stateDataarray = [];
				}else if(this.stateJSONArray.status == 1){
					this.stateDataarray = this.stateJSONArray.data;
					//console.log(this.stateDataarray);
				}else{
					// this.snack.open("No data to display", 'Close', { duration: 2000 });
					this.stateDataarray = [];
				}
			});
	}
	
	/** Get all cities **/
	getCityList(stateid){
		
		this.parkingservice.getCityList(stateid)
			.subscribe(data => {
				this.cityJSONArray = JSON.parse(data);
				if(this.cityJSONArray.status == 0){
					this.snack.open(this.cityJSONArray.message, 'Close', { duration: 2000 });
					this.cityDataArray = [];
				}else if(this.cityJSONArray.status == 1){
					this.cityDataArray = this.cityJSONArray.data;
				}else{
					// this.snack.open("No data to display", 'Close', { duration: 2000 });
					this.cityDataArray = [];
				}
			});
	}
	
	/** Get all postcodes **/
	getpostCodeList(cityID){
		
		this.parkingservice.getpostCodeList(cityID)
			.subscribe(data => {
				this.postcodejsonArray = JSON.parse(data);
				if(this.postcodejsonArray.status == 0){
					this.snack.open(this.postcodejsonArray.message, 'Close', { duration: 2000 });
					this.PostCodeData = [];
				}else if(this.postcodejsonArray.status == 1){
					this.PostCodeData = this.postcodejsonArray.data;
					
				}else{
					// this.snack.open("No data to display", 'Close', { duration: 2000 });
					this.PostCodeData = [];
				}
			});
	}
	
	/** Update Primary Information **/
	saveData(){
		this.itemForm.patchValue({
			StarRating:this.onClickResult,
		})
		
		this.parkingservice.updatePrimaryInformation(this.urlparkingID,this.itemForm.value)
			.subscribe(data => {
				this.jsonResponse = JSON.parse(data);
				if(this.jsonResponse.status == 0){
					this.snack.open(this.jsonResponse.message, 'Close', { duration: 2000 });
				}else if(this.jsonResponse.status == 1){
					this.snack.open(this.jsonResponse.message, 'Close', { duration: 2000 });
				}else{
					this.snack.open("No data to display", 'Close', { duration: 2000 });
				}
			});
	}
	
	/** Service Updates With Parkings **/
	addServiceTomatrix(color:any){
		color.colorfill = !color.colorfill;
		const jsonarry = {
			parkingid:this.urlparkingID,
			serviceid:color.servicemasterID,
			checked:color.colorfill
		}
		this.parkingservice.addServiceTomatrix(jsonarry)
			.subscribe(data => {
				this.jsonResponse = JSON.parse(data);
				if(this.jsonResponse.status == 0){
					this.snack.open(this.jsonResponse.message, 'Close', { duration: 2000 });
				}else if(this.jsonResponse.status == 1){
					this.snack.open(this.jsonResponse.message, 'Close', { duration: 2000 });
				}else{
					this.snack.open("No data to display", 'Close', { duration: 2000 });
				}
			});
	}
	
	/** Fuel Cards Updates With Parkings **/
	addFuelCardsToParking(color:any){
		color.colorfill = !color.colorfill;
		const jsonarry = {
			parkingid:this.urlparkingID,
			fulecardID:color.fuelcardId,
			checked:color.colorfill
		}
		this.parkingservice.addFuleCardToMatrix(jsonarry)
			.subscribe(data => {
				this.jsonResponse = JSON.parse(data);
				if(this.jsonResponse.status == 0){
					this.snack.open(this.jsonResponse.message, 'Close', { duration: 2000 });
				}else if(this.jsonResponse.status == 1){
					this.snack.open(this.jsonResponse.message, 'Close', { duration: 2000 });
				}else{
					this.snack.open("No data to display", 'Close', { duration: 2000 });
				}
			});
	}
	
	/** Bank Cards Updates With Parkings **/
	addBankCardsToParking(color:any){
		color.colorfill = !color.colorfill;
		const jsonarry = {
			parkingid:this.urlparkingID,
			bankcardid:color.ID,
			checked:color.colorfill
		}
		this.parkingservice.addBankCardToMatrix(jsonarry)
			.subscribe(data => {
				this.jsonResponse = JSON.parse(data);
				if(this.jsonResponse.status == 0){
					this.snack.open(this.jsonResponse.message, 'Close', { duration: 2000 });
				}else if(this.jsonResponse.status == 1){
					this.snack.open(this.jsonResponse.message, 'Close', { duration: 2000 });
				}else{
					this.snack.open("No data to display", 'Close', { duration: 2000 });
				}
			});
	}
	
	/** Gas Stations Updates With Parkings **/
	addGasStationToMatrix(color:any){
		color.colorfill = !color.colorfill;
		const jsonarry = {
			parkingid:this.urlparkingID,
			gasstationids:color.ID,
			checked:color.colorfill
		}
		this.parkingservice.addGasStationToMatrix(jsonarry)
			.subscribe(data => {
				this.jsonResponse = JSON.parse(data);
				if(this.jsonResponse.status == 0){
					this.snack.open(this.jsonResponse.message, 'Close', { duration: 2000 });
				}else if(this.jsonResponse.status == 1){
					this.snack.open(this.jsonResponse.message, 'Close', { duration: 2000 });
				}else{
					this.snack.open("No data to display", 'Close', { duration: 2000 });
				}
			});
	}
	
	
	addServiceLevelToMatrix(color:any){
		color.colorfill = !color.colorfill;
		const jsonarry = {
			parkingid:this.urlparkingID,
			serviceLevelids:color.ID,
			checked:color.colorfill
		}
		this.parkingservice.addServiceLevelToMatrix(jsonarry)
			.subscribe(data => {
				this.jsonResponse = JSON.parse(data);
				if(this.jsonResponse.status == 0){
					this.snack.open(this.jsonResponse.message, 'Close', { duration: 2000 });
				}else if(this.jsonResponse.status == 1){
					this.snack.open(this.jsonResponse.message, 'Close', { duration: 2000 });
				}else{
					this.snack.open("No data to display", 'Close', { duration: 2000 });
				}
			});
	}
	
	 clickStarRating = ($event) => {
		
        // console.log('onClick $event: ', $event);
        this.onClickResult = $event.rating;
		
		
    };
	 logRatingChange(rating){
        // console.log("changed rating: ",rating);
        this.ratingValue = rating;
        //do your stuff
    }
	
	
	fileselect(){
		$('#Imageupload').click();
        };
	
	
	onSelectFile(event){
		this.file = event.target.files[0];
		// console.log(this.file);
		this.itemForm.patchValue({
	  file : this.file
	  });
	  
	  this.itemForm.get('file').updateValueAndValidity();
		var fileName = event.target.value.split('\\')[event.target.value.split('\\').length - 1];
		//console.log(fileName);
            $("#spnFilePath").html("<b>Selected File: </b>" + fileName);
			
		 if (event.target.files && event.target.files[0]) {
			  var filesAmount = event.target.files.length;
			   for (let i = 0; i < filesAmount; i++) {
				         var reader = new FileReader();
				   //reader.readAsDataURL(event.target.files[0]); 
     
             reader.onload = (event:any) => { 
			   this.urls.push(event.target.result); 
        //this.url = reader.result;
               }
			    reader.readAsDataURL(event.target.files[i]);
		   }
		 }
	
	
	let formData = new FormData();
		let file = this.file;
		if(file){
		formData.append('imgInp', file, file.name);
		}
		
		formData.append('Imageupload', this.itemForm.get('Imageupload').value);
		
		//console.log(formData);
		this.parkingservice.addGalleryImage(formData,this.urlparkingID)
			.subscribe(data => {
				this.jsonResponse = JSON.parse(data);
				if(this.jsonResponse.status == 0){
					this.snack.open(this.jsonResponse.message, 'Close', { duration: 2000 });
				}else if(this.jsonResponse.status == 1){
					this.snack.open(this.jsonResponse.message, 'Close', { duration: 2000 });
				}else{
					this.snack.open("No data to display", 'Close', { duration: 2000 });
				}
			});
	
	
	
	}
	
	deleteimg(row){
		 //this.confirmService.confirm({message: `Are you ok to delete the record ? `})
      
        if (row) {
			// console.log(res);
          this.loader.open();
          this.dataservice.deleteGalleryByID(row.ID)
		.subscribe(data => {
		  this.respondstatus = JSON.parse(data);
			
			this.loader.close();
			if(this.respondstatus.status == 0){
				this.snack.open(this.respondstatus.message, 'Close', { duration: 2000 });
			}else if(this.respondstatus.status == 1){
				this.snack.open(this.respondstatus.message, 'Close', { duration: 2000 });
				 setTimeout(()=> {
					 this.getParkingData()
				 }, 1000);
			}else{
				this.snack.open("Something went wrong", 'Close', { duration: 2000 });
			}
		})
        }
     
	}
	
	
}
