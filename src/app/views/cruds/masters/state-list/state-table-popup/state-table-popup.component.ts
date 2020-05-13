import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup, FormControl,FormArray } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AuthGuard } from '../../../../../shared/services/auth/auth.guard';
import { DataLayerGuard } from '../../../../../shared/services/datalayer.guard';
@Component({
  selector: 'app-state-table-popup',
  templateUrl: './state-table-popup.component.html',
  styleUrls: ['./state-table-popup.component.scss']
})
export class StateTablePopupComponent implements OnInit {
 public itemForm: FormGroup;
  parkingdata: any;
  countries: any;
  item: any;
  countryitem: any;
  selectedcountry: any;
  usertype = sessionStorage.getItem("typeofloginUser");
  selecteduser = '';
 
  selectedrating = '';
  numb = [0,1,2,3,4,5];
  valid:any;
  constructor(
   @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<StateTablePopupComponent>,
    private fb: FormBuilder,
	private authservice:AuthGuard,
	private dataservice: DataLayerGuard
  
  ) { }

  ngOnInit() {
	  this.buildItemForm(this.data.payload)
  }
 buildItemForm(item) {

	  // this.valid = new FormControl(item.user_ID || '');
	  // if(this.usertype == 'Admin'){
		  // this.valid = new FormControl(item.user_ID || '', [Validators.required]);
	  // }
	  // this.selecteduser = item.user_ID;
	
    this.itemForm = new FormGroup({
	  // user_ID: this.valid,
    
      State: new FormControl(item.StateName || '', Validators.required),
      Country: new FormControl(item.CountryID || '', Validators.required),
	   Status: new FormControl(item.Status || ''),
    });
	
	this.dataservice.getallcountries()
	  .subscribe(data => {
			this.countries = JSON.parse(data);
			 
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
