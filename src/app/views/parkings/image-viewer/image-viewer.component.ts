import { Component, OnInit ,Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Configuration } from '../../../app.constant';
import { ParkingService } from '../../../shared/services/parking.service';
@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent implements OnInit {
imageId:any;
parkingGalleryJsonArray:any;
parkingGallery=[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ImageViewerComponent>,
	private _configuration: Configuration,
	private parkingservice:ParkingService) { }

imagepathurl = this._configuration.imagepathurl;

  ngOnInit() {
	 this.imageId=this.data.payload.ID;
	 this.GetparkingGalleryById();
  }
  
  GetparkingGalleryById(){
		
		this.parkingservice.GetparkingGalleryById(this.imageId)
			.subscribe(data => {
				this.parkingGalleryJsonArray = JSON.parse(data);
				//console.log(this.serviceLevelsJsonArray);
				if(this.parkingGalleryJsonArray.status == 0){
					//this.snack.open(this.parkingGalleryJsonArray.message, 'Close', { duration: 2000 });
					this.parkingGallery = [];
				}else if(this.parkingGalleryJsonArray.status == 1){
					this.parkingGallery = this.parkingGalleryJsonArray.data;
					console.log(this.parkingGallery);
				}else{
					this.parkingGallery = [];
				}
			});
	
	}

}
