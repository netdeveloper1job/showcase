import { Component, OnInit, ViewChild  } from '@angular/core';
import { egretAnimations } from "../../shared/animations/egret-animations";
import {ActivatedRoute, Params, Router} from '@angular/router';
import { Counter } from './counter.service';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { DataLayerGuard } from '../../shared/services/datalayer.guard';
import { } from '@types/googlemaps';
declare var google: any;
declare const MarkerClusterer: any;
@Component({
  selector: 'app-parkings',
  templateUrl: './parkings.component.html',
  styleUrls: ['./parkings.component.scss'],
  animations: egretAnimations
})
export class ParkingsComponent implements OnInit {
  @ViewChild('map') mapElement: any;
  map: google.maps.Map;
  responsedata:any;
  clusMarker = [];
  
  constructor(
	public timerCounter: Counter, 
	private router : Router, 
	private dataservice: DataLayerGuard
  ) { }
  ngOnInit() {
	  const mapProperties = {
			center: {lat:38.977655, lng:-25.805002},
			zoom: 3,
			mapTypeId: google.maps.MapTypeId.ROADMAP
	   };
	   this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
   
	  this.dataservice.getparkings()
	  .subscribe(data => {
			this.responsedata = JSON.parse(data);
			// console.log(data);
			if(this.responsedata.status == 1){
				// this.items = this.responsedata.data;
				this.responsedata.data.forEach(item => {
					let content = '<p><b>'+item.Name+'</b></p><p>Lat : '+item.Lattitude+'</p><p>Long : '+item.Longitude+'</p>';
					this.addMarker(item, content);
				});
				var markerCluster = new MarkerClusterer(this.map, this.clusMarker,
				{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'}); 
				}
	});
  }
  
  addMarker(data, content){
    var newMarker = {};
	var prev_infowindow =false; 
	var marker = new google.maps.Marker({
	position:{lat:+data.Lattitude, lng:+data.Longitude},
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
	}
  }
  
  login(){
	  this.router.navigate(['/sessions/signin/']);
  }
  
  register(){
	  this.router.navigate(['/sessions/signup/']);
  }

}

