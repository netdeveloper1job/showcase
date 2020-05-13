import { Component, OnInit,ViewChild } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { ParkingService } from '../../../shared/services/parking.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Configuration } from '../../../app.constant';
import { } from '@types/googlemaps';

declare const MarkerClusterer: any;
declare var google: any;
@Component({
  selector: 'app-parking-details',
  templateUrl: './parking-details.component.html',
  styleUrls: ['./parking-details.component.scss']
})
export class ParkingDetailsComponent implements OnInit {
	@ViewChild('map') mapElement: any;
	map: google.maps.Map;
	public id:any;
	imagepathurl = this._configuration.imagepathurl;
	parkingJSONArray: any;
	parkingservices:any;
	parkingdetails:any;
	parkingfuelcards:any;
	parkingbankcards:any;
	parkinggasStations:any;
	urlparkingID:any;
	parkingservicelevel:any;
	lat:any;
	lng:any;
	fburl:any;
	linkedurl:any;
	twitteurl:any;
	instaurl:any;
  constructor(
 
	private parkingservice:ParkingService,	
	private dialog: MatDialog,
	private snack: MatSnackBar,
	public _Activatedroute:ActivatedRoute,
	private fb: FormBuilder,
	private router:Router,
	private _configuration: Configuration,
	) { }
	
	onmedia(){
		this.fburl=window.location.href="http://"+this.parkingdetails.Facebook_url + '/'+this.parkingdetails.Name;
		this.linkedurl=window.location.href="http://"+this.parkingdetails.LinkedIn_url + '/'+this.parkingdetails.Name;
		this.twitteurl=window.location.href="http://"+this.parkingdetails.Twitter_url + '/'+this.parkingdetails.Name;
		this.instaurl=window.location.href="http://"+this.parkingdetails.Instagram_url + '/'+this.parkingdetails.Name;
	}
	ngOnInit() {
		//this.location.go(this.urlparkingID);
		const mapProperties = {
				center: {lat: 28.33, lng: 79.333},
				maxZoom: 18,
				zoom: 3,
				mapTypeId: google.maps.MapTypeId.ROADMAP
		   };
	    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
		
		this._Activatedroute.paramMap.subscribe(params => {         
			this.urlparkingID = params.get('slug');
		});
		this.getParkingData();
		
	}

	getParkingData() {

		const jsonArray = {
			pagetype:'forntEndDetail'
		}
		this.parkingservice.getParkingData(this.urlparkingID,jsonArray)
			.subscribe(data => {
				this.parkingJSONArray = JSON.parse(data);
				if(this.parkingJSONArray.status == 0){
					this.snack.open(this.parkingJSONArray.message, 'Close', { duration: 2000 });
					this.parkingservices = [];
					this.parkingfuelcards = [];
					this.parkingbankcards = [];
					this.parkinggasStations = [];
					this.parkingdetails = [];
					this.parkingservicelevel = [];
					
				}else if(this.parkingJSONArray.status == 1){
					this.lat = this.parkingJSONArray.data.parkingsdata[0].Lattitude;
					this.lng = this.parkingJSONArray.data.parkingsdata[0].Longitude;
					this.initMap(this.lat,this.lng);
					this.parkingservices = this.parkingJSONArray.data.services;
					this.parkingfuelcards = this.parkingJSONArray.data.fuelCards;
					this.parkingbankcards = this.parkingJSONArray.data.bankCards;
					this.parkinggasStations = this.parkingJSONArray.data.gasStations;
					this.parkingdetails = this.parkingJSONArray.data.parkingsdata[0];
					this.parkingservicelevel = this.parkingJSONArray.data.serviceLevel[0];
					//console.log(this.parkingdetails);
					//console.log(JSON.stringify(this.parkingdetails.description));

					
				}
				
				else{
					this.snack.open("No data to display", 'Close', { duration: 2000 });
					this.parkingservices = [];
					this.parkingfuelcards = [];
					this.parkingbankcards = [];
					this.parkinggasStations = [];
					this.parkingdetails = [];
					this.parkingservicelevel = [];
				}
				//console.log(this.parkingdetails);
			});
	}
	
	initMap(lat,lng) {
        var infoWindow = new google.maps.InfoWindow;
            var pos = {
              lat: lat,
              lng: lng
            };
            // infoWindow.setPosition({lat:+lat,lng:+lng});
            // infoWindow.setContent('Location found.');
            infoWindow.open(this.map);
            this.map.setCenter({lat:+lat,lng:+lng});
			var marker = new google.maps.Marker({
			position:{lat:+lat, lng:+lng},
			map:this.map
			});
      }
}
