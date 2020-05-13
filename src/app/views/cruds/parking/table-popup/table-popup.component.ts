import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AuthGuard } from '../../../../shared/services/auth/auth.guard';
import { DataLayerGuard } from '../../../../shared/services/datalayer.guard';
import { ParkingService } from '../../../../shared/services/parking.service';
@Component({
  selector: 'app-table-popup',
  templateUrl: './table-popup.component.html',
})
export class TablePopupComponent implements OnInit {
  public itemForm: FormGroup;
  parkingdata: any;
  loginmemberID:any;
  countries: any;
  item: any;
  itemByID:any;
  countryitem: any;
  selectedcountry: any;
 
  usertype = sessionStorage.getItem("typeofloginUser");
  public userID = sessionStorage.getItem("idofloginUser");
  selecteduser = '';
  selectedsecurity = '';
  selectedrating = '';
  numb = [0,1,2,3,4,5];
  valid:any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<TablePopupComponent>,
    private fb: FormBuilder,
	private authservice:AuthGuard,
	private dataservice: DataLayerGuard,
	 private parkingservice:ParkingService,
  ) { }

  ngOnInit() {
	  // 
    this.buildItemForm(this.data.payload)
  }
  buildItemForm(item) {
	  this.valid = new FormControl(item.user_ID || '');
	  if(this.usertype == 'Admin'){
		  this.valid = new FormControl(item.user_ID || '', [Validators.required]);
	  }
	  this.selecteduser = item.user_ID;
	  this.selectedsecurity = item.Security_rating;
	  this.selectedrating = item.Star_rating;
    this.itemForm = new FormGroup({
	  user_ID: this.valid,
      Name: new FormControl(item.Name || '', Validators.required),
      // Lattitude: new FormControl(item.Lattitude || '', Validators.required),
      // Longitude: new FormControl(item.Longitude || '', Validators.required),
      ContactPerson: new FormControl(item.ContactPerson || '', Validators.required),
      // City: new FormControl(item.City || '', Validators.required),
      // State: new FormControl(item.State || '', Validators.required),
      // Country: new FormControl(item.Country || '', Validators.required),
      // PIN: new FormControl(item.PIN || '', Validators.required),
	  // Road: new FormControl(item.Road || '', Validators.required),
	  // Access: new FormControl(item.Access || '', Validators.required),
	  // Security_rating: new FormControl(item.Security_rating || ''),
	  // Star_rating: new FormControl(item.Star_rating || ''),
	  // Parking_Type: new FormControl(item.Parking_Type || ''),
	 /*  Guard: new FormControl(item.Guard || ''),
	  Fences: new FormControl(item.Fences || ''),
	  Video: new FormControl(item.Video || ''),
	  Flood: new FormControl(item.Flood || ''),
	  Fuel: new FormControl(item.Fuel || ''),
	  Electric: new FormControl(item.Electric || ''),
	  Dangerous: new FormControl(item.Dangerous || ''),
	  Restro: new FormControl(item.Restro || ''),
	  Hotel: new FormControl(item.Hotel || ''),
	  Sanitary: new FormControl(item.Sanitary || ''),
	  Veh_wash: new FormControl(item.Veh_wash || ''),
	  Veh_repair: new FormControl(item.Veh_repair || ''),
	  Medical: new FormControl(item.Medical || ''), */
	  // Tarrif_day: new FormControl(item.Tarrif_day || ''),
	  // Tarrif_hour: new FormControl(item.Tarrif_hour || ''),
	  // Currency: new FormControl(item.Currency || '', Validators.required),
	  Company: new FormControl(item.Company || '', Validators.required),
	  Email: new FormControl(item.Email || '', Validators.required),
      // Website: new FormControl(item.Website || '', Validators.required),
      Telephone: new FormControl(item.Telephone || '', Validators.required),
    });
	
	this.dataservice.getallcountries()
	  .subscribe(data => {
			this.countries = JSON.parse(data);
			// console.log(this.countries.status);
			if(this.countries.status == 0){
				this.countryitem = [];
			}else if(this.countries.status == 1){
				this.countryitem = this.countries.data;
				this.selectedcountry = this.countryitem;
				// console.log(this.item);
			}else{
				this.countryitem = [];
			}
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
				// console.log(this.itemByID);
			}else{
				
				this.itemByID = [];
			}
	});
	
	
	
  }
  
  searchcountry(query: string){
    let result = this.selectcountry(query.toLowerCase())
    this.selectedcountry = result;
  }
  
  selectcountry(query: string):string[]{
    let result: string[] = [];
    for(let a of this.countryitem){
      if(a.Name.toLowerCase().indexOf(query) !== -1){
        result.push(a)
      }else if(a.country.toLowerCase().indexOf(query) !== -1){
		  result.push(a)
	  }
    }
    return result
  }

  submit() {
	  if(this.usertype == 'Admin'){
		  this.dialogRef.close(this.itemForm.value)
	  }else{
		  this.itemForm.patchValue({
			  user_ID: sessionStorage.getItem("idofloginUser")
		  });
		  this.dialogRef.close(this.itemForm.value)
	  }
  }
}
