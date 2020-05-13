import {Component, OnInit, ViewChild,Input,Output,EventEmitter,ViewEncapsulation } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { ParkingService } from '../../../shared/services/parking.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Configuration } from '../../../app.constant';
import { } from '@types/googlemaps';
import { egretAnimations } from "../../../shared/animations/egret-animations";
import { ImageViewerComponent } from '../image-viewer/image-viewer.component';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
//import { MdRadioChange } from '@angular/material';
declare const MarkerClusterer: any;
declare var google: any;
@Component({
  selector: 'app-filterparkings',
  templateUrl: './filterparkings.component.html',
  styleUrls: ['./filterparkings.component.scss'],
   encapsulation: ViewEncapsulation.Emulated,
   animations: egretAnimations,
})
export class FilterparkingsComponent implements OnInit {
@ViewChild('map') mapElement: any;
map: google.maps.Map;
clusMarker = [];
countryJsonArray:any;
countryArray:any;
servicesArray:any;
serviceJsonArray:any;
bankcardsJsonArray:any;
bankcardsArray:any;
fuelcardsJsonArray:any;
fuelcardsArray:any;
serviceLevelsJsonArray:any;
serviceLevelsArray:any;
gasStationsJsonArray:any;
gasStationsArray:any;
filterParkingJsonArray:any;
filterparkings:any;

filterbyinput:any;
countryidforfilter:any;
serviceids:any;
selectedctedParkingType1:any;
gasstationids:any;
bankcreditids:any;
selectedServices = [];
selectedParkingType=[];
selectedfuelcards = [];
fuelcardids:any;
selectedBankcards = [];
bankcardids:any;
selectedGasStation = [];
GasStationids:any;
selectedServicelevel = [];
Servicelevelids:any;
cityidforfilter:any;
parkingGallery=[];
parkingGalleryJsonArray:any;
 path:any;
pathurl:any;
ID:any;
lat:any;
lng:any;
ps:any;
urlparkingID:any;
starsCount: number;
starRating:any;
hidden:any;
type:any;
bChecked2=false;
bChecked3=false;
Securityrating:any;
selected:any; 
selected1=false;
selected2=false;

  ratingArr = [];

 
 snackBarDuration: number = 2000;
@Input('rating') private rating: number = 3;
@Input('starCount') private starCount: number = 5;
@Input('color') public color: string="accent" ;
@Output() private ratingUpdated = new EventEmitter();

primary='primary';
//public MdRadioChange:any;
  constructor(
   
	private parkingservice:ParkingService,	
	private dialog: MatDialog,
	private snack: MatSnackBar,
	public _Activatedroute:ActivatedRoute,
	private fb: FormBuilder,
	private router:Router,
	private _configuration: Configuration,
	private snackBar: MatSnackBar,
	private loader: AppLoaderService,
	) {
		
		
		
	}

	imagepathurl = this._configuration.imagepathurl;
	
	
	ngOnInit() {
		
		
		//alert(sessionStorage.getItem('radiovalue'));
		if(sessionStorage.getItem('radiovalue') == "2"){
			this.checkState(2);
			this.selected = '2';
			this.selected1=true;
		}else{
		this.checkState(1); 
		this.selected = '1';
		this.selected1=false;
		}
		// this.selected = '1';
		 // if (navigator.geolocation) {
          // navigator.geolocation.getCurrentPosition(position => {
			  // this.ps = +position.coords;
			// this.lat = +position.coords.latitude;
			// this.lng = +position.coords.longitude;
			// console.log(this.lat);
			// console.log(this.lng);
			const mapProperties = {
			center: {lat: 54.5260, lng: 15.2551},
			zoom: 3,
			mapTypeId: google.maps.MapTypeId.ROADMAP
	   };
	   this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
	   // var infowindow = new google.maps.InfoWindow({
		// position: {lat:this.lat, lng:this.lng},
		// content: 'Your Location'
	   // })
	   // infowindow.open(this.map);
		// var marker = new google.maps.Marker({
		// map:this.map,
		// position:{lat:this.lat, lng:this.lng},
		// title: 'Got you!'
		// });
		// this.clusMarker.push(marker);
		// var cityCircle = new google.maps.Circle({
            // strokeColor: '#FF0000',
            // strokeOpacity: 0.8,
            // strokeWeight: 2,
            // fillColor: '#FF0000',
            // fillOpacity: 0.35,
            // map: this.map,
            // center: {lat:this.lat, lng:this.lng},
            // radius: 500
          // });
		  // })
		 // }
		
		this._Activatedroute.paramMap.subscribe(params => {         
			this.urlparkingID = params.get('slug');
		
			if(!this.urlparkingID){
				// this.selected1 = false;
				// this.selected2 = false;
				}else{
				this.selected1 = true;
				this.selected2 = true;  
				}
		});
		
		this.getCountryList();
		
		this.getAllservices();
		this.getAllbankCards();
		this.getAllfuelCards();
		this.getAllserviceslevels();
		this.getAllgasstations();
		this.allserviceswithfilter();
		if(this.urlparkingID){	
		this.GetparkingGallery();
		}
		
		
		
	   //console.log("a "+this.starCount)
       for (let index = 0; index < this.starCount; index++) {
       this.ratingArr.push(index);
          } 
		

	}
	
	
	/** Get all countries **/
	getCountryList(){
		
		this.parkingservice.getAllCountry()
			.subscribe(data => {
				this.countryJsonArray = JSON.parse(data);
				if(this.countryJsonArray.status == 0){
					this.snack.open(this.countryJsonArray.message, 'Close', { duration: 2000 });
					this.countryArray = [];
				}else if(this.countryJsonArray.status == 1){
					this.countryArray = this.countryJsonArray.data;
				}else{
					this.countryArray = [];
				}
			});
	}
	
	/** Get all Services **/
	getAllservices(){
		this.parkingservice.getAllservices()
			.subscribe(data => {
				this.serviceJsonArray = JSON.parse(data);
				if(this.serviceJsonArray.status == 0){
					this.snack.open(this.serviceJsonArray.message, 'Close', { duration: 2000 });
					this.servicesArray = [];
				}else if(this.serviceJsonArray.status == 1){
					this.servicesArray = this.serviceJsonArray.data;
				}else{
					this.servicesArray = [];
				}
			});
	}
	
	/** Get all Bank Cards **/
	getAllbankCards(){
		this.parkingservice.getAllbankCards()
			.subscribe(data => {
				this.bankcardsJsonArray = JSON.parse(data);
				if(this.bankcardsJsonArray.status == 0){
					this.snack.open(this.bankcardsJsonArray.message, 'Close', { duration: 2000 });
					this.bankcardsArray = [];
				}else if(this.bankcardsJsonArray.status == 1){
					this.bankcardsArray = this.bankcardsJsonArray.data;
				}else{
					this.bankcardsArray = [];
				}
			});
	}
	
	/** Get all Fuel Cards **/
	getAllfuelCards(){
		this.parkingservice.getAllfuelCards()
			.subscribe(data => {
				this.fuelcardsJsonArray = JSON.parse(data);

				if(this.fuelcardsJsonArray.status == 0){
					this.snack.open(this.fuelcardsJsonArray.message, 'Close', { duration: 2000 });
					this.fuelcardsArray = [];
				}else if(this.fuelcardsJsonArray.status == 1){
					this.fuelcardsArray = this.fuelcardsJsonArray.data;
				}else{
					this.fuelcardsArray = [];
				}
			});
	}
	
	/** Get all Service Levels **/
	getAllserviceslevels(){
		this.parkingservice.getAllserviceslevels()
			.subscribe(data => {
				this.serviceLevelsJsonArray = JSON.parse(data);
				//console.log(this.serviceLevelsJsonArray);
				if(this.serviceLevelsJsonArray.status == 0){
					this.snack.open(this.serviceLevelsJsonArray.message, 'Close', { duration: 2000 });
					this.serviceLevelsArray = [];
				}else if(this.serviceLevelsJsonArray.status == 1){
					this.serviceLevelsArray = this.serviceLevelsJsonArray.data;
				}else{
					this.serviceLevelsArray = [];
				}
			});
	}
	
	/** Get all Gas stations **/
	getAllgasstations(){
		this.parkingservice.getAllgasstations()
			.subscribe(data => {
				this.gasStationsJsonArray = JSON.parse(data);
				if(this.gasStationsJsonArray.status == 0){
					this.snack.open(this.gasStationsJsonArray.message, 'Close', { duration: 2000 });
					this.gasStationsArray = [];
				}else if(this.gasStationsJsonArray.status == 1){
					this.gasStationsArray = this.gasStationsJsonArray.data;
				}else{
					this.gasStationsArray = [];
				}
			});
	}
	
	filterdatabyservice(color:any){
		if(this.urlparkingID){
		this.router.navigate(['/parkings/filterparking']);
		}
		
		color.colorfill = !color.colorfill;
		let updateItem = this.selectedServices.find(this.findIndexOfServices , color.ID);
		
		let index = this.selectedServices.indexOf(updateItem);    
		if(index > -1){
			this.selectedServices.splice(index, 1);
		}
		else{
			this.selectedServices.push(color);
		}
		this.serviceids = Array.prototype.map.call(this.selectedServices, s => s.ID).toString(); // "A,B,C"
		this.allserviceswithfilter();
	}  
	
	filterdataByparkingType1(event:any){
		if(event.target.value=='Dedicated Truck parking')
		{
			//alert('Dedicated Truck parking');
			this.bChecked2=true;
		}
		if(event.target.value=='Truck Service Station')
		{
			//alert('Truck Service Station');
				this.bChecked3=true;
		}
		
	
		
		this.type=event.target.value;
		if(this.urlparkingID){
		this.router.navigate(['/parkings/filterparking']);
		}
		
		 //color.colorfill = !color.colorfill;
		let updateItem = this.selectedParkingType.find(this.findIndexOfparkingtype1 , this.type);
		
		let index = this.selectedParkingType.indexOf(updateItem);    
		if(index > -1){
			this.selectedParkingType.splice(index, 1);
		}
		else{
			this.selectedParkingType.push(this.type);
		}
		
		this.selectedctedParkingType1 = this.selectedParkingType;
		
		this.allserviceswithfilter(); 
	}  
	
	
	filterdatabyserviceLevel(color:any){
		if(this.urlparkingID){
		this.router.navigate(['/parkings/filterparking']);
		}
		
		color.colorfill = !color.colorfill;
		let updateItem = this.selectedServices.find(this.findIndexOfServices , color.ID);
		
		let index = this.selectedServices.indexOf(updateItem);    
		if(index > -1){
			this.selectedServices.splice(index, 1);
		}
		else{
			this.selectedServices.push(color);
		}
		this.serviceids = Array.prototype.map.call(this.selectedServices, s => s.ID).toString(); // "A,B,C"
		this.allserviceswithfilter();
	}  
	findIndexOfServices(color) {
		
        return color.ID === this;
	}
	findIndexOfparkingtype1(type) {
		
        return type === this;
	}
	
	filterbyfuelcards(color1:any){
		if(this.urlparkingID){
		this.router.navigate(['/parkings/filterparking']);
		}
		color1.colorfill = !color1.colorfill;
		let updateItem = this.selectedfuelcards.find(this.findIndexOfFuels , color1.ID);
		
		let index = this.selectedfuelcards.indexOf(updateItem);   
		
		if(index > -1){
			this.selectedfuelcards.splice(index, 1);
		}
		else{
			this.selectedfuelcards.push(color1);
		}
		this.fuelcardids = Array.prototype.map.call(this.selectedfuelcards, s => s.ID).toString(); // "A,B,C"
		this.allserviceswithfilter();
		
	}
	
	findIndexOfFuels(color) {
		
        return color.ID === this;
	}
	
	addBankCardsToParking(color:any){
		if(this.urlparkingID){
		this.router.navigate(['/parkings/filterparking']);
		}
	
		color.colorfill = !color.colorfill;
		let updateItem = this.selectedBankcards.find(this.findIndexOfBank , color.ID);
		
		let index = this.selectedBankcards.indexOf(updateItem);   
		
		if(index > -1){
			this.selectedBankcards.splice(index, 1);
		}
		else{
			this.selectedBankcards.push(color);
		}
		this.bankcardids = Array.prototype.map.call(this.selectedBankcards, s => s.ID).toString(); // "A,B,C"
		this.allserviceswithfilter();
		
	}
	
	findIndexOfBank(color) {
		
        return color.ID === this;
	}
	
	addGasStationToMatrix(color:any){
		if(this.urlparkingID){
		this.router.navigate(['/parkings/filterparking']);
		}
		color.colorfill = !color.colorfill;
		let updateItem = this.selectedGasStation.find(this.findIndexOfGasStation , color.ID);
		
		let index = this.selectedGasStation.indexOf(updateItem);   
		
		if(index > -1){
			this.selectedGasStation.splice(index, 1);
		}
		else{
			this.selectedGasStation.push(color);
		}
		this.GasStationids = Array.prototype.map.call(this.selectedGasStation, s => s.ID).toString(); // "A,B,C"
		this.allserviceswithfilter();
	}
	
	findIndexOfGasStation(color) {
		
        return color.ID === this;
	}
	
	
	addServiceTomatrix(color:any){
	     //console.log(color);
		if(this.urlparkingID){
		this.router.navigate(['/parkings/filterparking']);
		}
		color.colorfill = !color.colorfill;
		let updateItem = this.selectedServicelevel.find(this.findIndexOfServicelevel , color.ID);
			const mapProperties = {
				center: {lat: 54.5260, lng: 15.2551},
				zoom: 3,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
		   this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
		   this.clusMarker = [];
		let index = this.selectedServicelevel.indexOf(updateItem); 
		if(index > -1){
			this.selectedServicelevel.splice(index, 1);
		}
		else{
			this.selectedServicelevel.push(color);
		}
		this.Servicelevelids = Array.prototype.map.call(this.selectedServicelevel, s => s.ID).toString(); // "A,B,C"
		this.allserviceswithfilter();
	}
	
	findIndexOfServicelevel(color) {
		
        return color.ID === this;
	}
	
	CountryChane(event){
		
		if(this.urlparkingID){
			
		this.router.navigate(['/parkings/filterparking']);
		
		}
		this.countryidforfilter = event.value;
		this.allserviceswithfilter();
	}
	filterparkingby(event){
		if(this.urlparkingID){
		this.router.navigate(['/parkings/filterparking']);
		}
		this.filterbyinput = event.target.value;
		this.allserviceswithfilter();
	}
	CityChane(event){
		if(this.urlparkingID){
		this.router.navigate(['/parkings/filterparking']);
		}
		this.cityidforfilter = event.value;
		this.allserviceswithfilter();
	}
	
	/** Get all Filtered services **/
	allserviceswithfilter(){
		
		const jsonarry = {
			serviceid:this.serviceids,
			countryid:this.countryidforfilter,
			filterbyinput:this.filterbyinput,
			fuelcardids:this.fuelcardids,
			bankcardids:this.bankcardids,
			GasStationids:this.GasStationids,
			Servicelevelids:this.Servicelevelids,
			cityid:this.cityidforfilter,
			parkingType1:this.selectedctedParkingType1,
			starRating:this.starRating,
            Securityrating:this.Securityrating,
			
		}

		this.parkingservice.allserviceswithfilter(jsonarry)
			.subscribe(data => {
				this.filterParkingJsonArray = JSON.parse(data);
				//console.log(this.filterParkingJsonArray);
				if(this.filterParkingJsonArray.status == 0){
					this.snack.open(this.filterParkingJsonArray.message, 'Close', { duration: 2000 });
					this.filterparkings = [];
				}else if(this.filterParkingJsonArray.status == 1){
					//console.log(this.filterParkingJsonArray);
					const mapProperties = {
						center: {lat: 54.5260, lng: 15.2551},
						zoom: 3,
						mapTypeId: google.maps.MapTypeId.ROADMAP
						};
						this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
						this.clusMarker = [];
					this.filterparkings = this.filterParkingJsonArray.data;
					//console.log(this.filterparkings);
					this.filterparkings.forEach(item => {
						if(item.Parking_Type1 == "Dedicated Truck parking" && !item.IDServiceLevel){
							var content = '<p  style="font-size: 20px;margin:0px 0px 5px;font-family: FjallaOne;"><b>'+item.Name+'<img src="assets/images/marker1.png" style="margin-left: 40px;position: relative;top: 10px;"></b></p><p style="font-family: FjallaOne;">Lat : '+item.Lattitude+'<br>Long : '+item.Longitude+'</p><button id="infoWindowButton" value='+item.ID+' class="buttonmap">More Info ></button>';
							
						}else if(item.Parking_Type1 == "Truck Service Station" && !item.IDServiceLevel){
							var content = '<p style="font-size: 20px;margin:0px 0px 5px;font-family: FjallaOne;"><b>'+item.Name+'<img src="assets/images/marker2.png" style="margin-left: 40px;position: relative;top: 10px;"></b></p><p style="font-family: FjallaOne;">Lat : '+item.Lattitude+'<br>Long : '+item.Longitude+'</p><button id="infoWindowButton" value='+item.ID+' class="buttonmap">More Info</button>';
						}else if(item.IDServiceLevel == 1){
							var content = '<p style="font-size: 20px;margin:0px 0px 5px;font-family: FjallaOne;"><b>'+item.Name+'<img src="assets/images/779149855bronze.png" style="margin-left: 40px;position: relative;top: 10px;"></b></p><p style="font-family: FjallaOne;">Lat : '+item.Lattitude+'<br>Long : '+item.Longitude+'</p><button id="infoWindowButton" value='+item.ID+' class="buttonmap">More Info</button>';
						}else if(item.IDServiceLevel == 2){
							var content = '<p style="font-size: 20px;margin:0px 0px 5px;font-family: FjallaOne;"><b>'+item.Name+'<img src="assets/images/534920882SILVER.png" style="margin-left: 40px;position: relative;top: 10px;"></b></p><p style="font-family: FjallaOne;">Lat : '+item.Lattitude+'<br>Long : '+item.Longitude+'</p><button id="infoWindowButton" value='+item.ID+' class="buttonmap">More Info</button>';
						}else if(item.IDServiceLevel == 3){
							var content = '<p style="font-size: 20px;margin:0px 0px 5px;font-family: FjallaOne;"><b>'+item.Name+'<img src="assets/images/1352441924gold.png" style="margin-left: 40px;position: relative;top: 10px;"></b></p><p style="font-family: FjallaOne;">Lat : '+item.Lattitude+'<br>Long : '+item.Longitude+'</p><button id="infoWindowButton" value='+item.ID+' class="buttonmap">More Info</button>';
						}else if(item.IDServiceLevel == 4){
							var content = '<p style="font-size: 20px;margin:0px 0px 5px;font-family: FjallaOne;"><b>'+item.Name+'<img src="assets/images/357362882platinum.png" style="margin-left: 40px;position: relative;top: 10px;"></b></p><p style="font-family: FjallaOne;">Lat : '+item.Lattitude+'<br>Long : '+item.Longitude+'</p><button id="infoWindowButton" value='+item.ID+' class="buttonmap">More Info</button>';
						}
					this.addMarker(item, content);
				});
				var markerCluster = new MarkerClusterer(this.map, this.clusMarker,
				{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'}); 
					// this.filterparkings = this.filterParkingJsonArray.data;
			
				}else{
					this.filterparkings = [];
				}
			});
	}
	
	
	addMarker(data, content){
		
		//console.log(data);
		if(data.Parking_Type1 == "Dedicated Truck parking" && !data.IDServiceLevel){
        var icons = 'assets/images/marker1.png';
		}else if(data.Parking_Type1 == "Truck Service Station" && !data.IDServiceLevel){
			var icons = 'assets/images/marker2.png';
		}else if(data.IDServiceLevel == 1){
			var icons = 'assets/images/779149855bronze.png';  
		}else if(data.IDServiceLevel == 2){
			var icons = 'assets/images/534920882SILVER.png';  
		}else if(data.IDServiceLevel == 3){
			var icons = 'assets/images/1352441924gold.png';  
		}else if(data.IDServiceLevel == 4){
			var icons = 'assets/images/357362882platinum.png';  
		}
    var newMarker = {};
	var prev_infowindow =false; 
	var marker = new google.maps.Marker({
	position:{lat:+data.Lattitude, lng:+data.Longitude},
	icon: icons,
	map:this.map
	});
	this.clusMarker.push(marker);
	if(content){
		var infoWindow = new google.maps.InfoWindow({
		content:content
		});
		
		marker.addListener('click', function(){
		// infoWindow.open(map,marker);
		

		});
	
		google.maps.event.addListener(marker, 'click', function(){
			// if( prev_infowindow ) {
			   // prev_infowindow.close();
			// }

			// prev_infowindow = true;
			infoWindow.open(this.map, marker);
		});
		infoWindow.addListener('domready',()=>{
			document.getElementById("infoWindowButton").addEventListener("click",()=>{
				var mapID=(<HTMLInputElement>document.getElementById("infoWindowButton")).value;
				
				
				this.router.navigate(['/parkings/filterparking/',mapID]);
				
				})
			
		});
	}
  }
	
	
	
	
	clickStarRating = ($event) => {
		if(this.urlparkingID){
		this.router.navigate(['/parkings/filterparking']);
		}
		this.starRating = $event.value;
		this.allserviceswithfilter();
};
	
	 onClick($event) {
		if(this.urlparkingID){
		this.router.navigate(['/parkings/filterparking']);
		}
		this.Securityrating=$event.value;
		this.allserviceswithfilter();
     }
  
	showIcon(index:number) {
		
    if (this.rating >= index + 1) {
      return 'lock';
    } else {
      return 'lock_border';
    }
  } 
  
  checkState(event){
	  
	 sessionStorage.setItem('radiovalue',event.value);
	 if(this.urlparkingID){
		  this.router.navigate(['/parkings/filterparking']);
	 }
	 // if(this.urlparkingID && event.value==1){
		
	
		// this.router.navigate(['/parkings/filterparking']);
		// this.selected1=false;
		// //this.selected = "1";
		// }
		// if(this.urlparkingID && event.value==2){	
	
		// this.router.navigate(['/parkings/filterparking']);
		// this.selected1=true;
		 // this.selected = "2";
		// }
		
	if(event.value==1){
		//console.log(event.value);
		 this.selected1=false;
			 this.selected=event.value;
	   }
	else{
		//console.log(event.value);
		this.selected1=true;
	   this.selected=event.value;
					 
	  }
	  
 // if(event.value==2){
	 // console.log(event.value);
		// this.selected1=true;
	   // this.selected=event.value;
 // }
 // else{
	 // console.log(event.value);
		 // this.selected1=false;
			 // this.selected=event.value;
	 
 // }


  }
  
  GetparkingGallery(){
		
		this.parkingservice.GetparkingGallery(this.urlparkingID)
			.subscribe(data => {
				this.parkingGalleryJsonArray = JSON.parse(data);
				//console.log(this.serviceLevelsJsonArray);
				if(this.parkingGalleryJsonArray.status == 0){
					//this.snack.open(this.parkingGalleryJsonArray.message, 'Close', { duration: 2000 });
					this.parkingGallery = [];
				}else if(this.parkingGalleryJsonArray.status == 1){
					this.parkingGallery = this.parkingGalleryJsonArray.data;
					
				}else{
					this.parkingGallery = [];
				}
			});
	
	}
	
	 openPopUp(data: any = {}, isNew?) {
		 //console.log(data);
	  let dialogRef: MatDialogRef<any> = this.dialog.open(ImageViewerComponent, {
		   width: '50%',
           disableClose: true,
		   data: { payload: data }
		    
	  })
	          //this.loader.open();
			  
		 
	 }
	
  
	
}
