import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AuthGuard } from '../../../../../shared/services/auth/auth.guard';
import { DataLayerGuard } from '../../../../../shared/services/datalayer.guard';
import { Configuration } from '../../../../../app.constant';
declare var $: any;

@Component({
  selector: 'app-popupfuelcardmaster',
  templateUrl: './popupfuelcardmaster.component.html',
  styleUrls: ['./popupfuelcardmaster.component.scss']
})
export class PopupfuelcardmasterComponent implements OnInit {
		public itemForm: FormGroup;
		public file: any;
		public url = 'http://placehold.it/180';	
  constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		public dialogRef: MatDialogRef<PopupfuelcardmasterComponent>,
		private fb: FormBuilder,
		private authservice:AuthGuard,
		private dataservice: DataLayerGuard,
		private _configuration: Configuration,
  ) { }
		imagepathurl = this._configuration.imagepathurl;
  ngOnInit() {
	  this.buildItemForm(this.data.payload)
  }
  
  buildItemForm(item) {
	
		if(item.FuelCardLogo){
		this.url = this.imagepathurl+item.FuelCardLogo;
		}else{
			this.url = this.imagepathurl+'public/ServiceLogo/service.png';
		}
		this.itemForm = new FormGroup({
		  FuelCardName: new FormControl(item.FuelCardName || '', Validators.required),
		  Imageupload: new FormControl(),
		  Status: new FormControl(item.Status || '', ),
		  file: new FormControl(''),
		});
		
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
            $("#spnFilePath").html("<b>Selected File: </b>" + fileName);
		 if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); 
		
      reader.onload = (event) => { 
        this.url = reader.result;
      }
    }
	}
	
	submit() {
	let formData = new FormData();
		let file = this.file;
		if(file){
		formData.append('imgInp', file, file.name);
		}
		formData.append('Status', this.itemForm.get('Status').value);
		formData.append('FuelCardName', this.itemForm.get('FuelCardName').value);
		formData.append('Imageupload', this.itemForm.get('Imageupload').value);
		    this.dialogRef.close(formData);

		}

}
