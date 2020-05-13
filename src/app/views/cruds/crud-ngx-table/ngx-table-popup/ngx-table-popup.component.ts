import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { DataLayerGuard } from '../../../../shared/services/datalayer.guard';
import {ActivatedRoute, Params, Router} from '@angular/router';
@Component({
  selector: 'app-ngx-table-popup',
  templateUrl: './ngx-table-popup.component.html'
})
export class NgxTablePopupComponent implements OnInit {
	selected='';
	pass:any;
	usertype:any;
	countries: any;
	countryitem: any;
	selectedcountry: any;
	memberurl:any;
	url:any;
	
  public itemForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NgxTablePopupComponent>,
	private dataservice: DataLayerGuard,
	private router:Router,
    // private fb: FormBuilder,
  ) { }

  ngOnInit() {
	  this.usertype = sessionStorage.getItem('typeofloginUser');
    this.buildItemForm(this.data.payload)
	
	this.memberurl=this.router.url;
	    if(this.memberurl=='/manage/auditor')
	  {
		   this.url='Auditor';
	  }
	  if(this.memberurl=='/manage/organization'){
		  
		  this.url='Organization';
	  }
  }
  buildItemForm(item) {
	 
	//console.log(item);
	  this.pass = new FormControl(item.Password || '', [Validators.required]);
	  if(item.ID){
		  this.pass = new FormControl(item.Password || '');
	  }
	  this.selected = item.Usertype;
     this.itemForm = new FormGroup({
		Refferal: new FormControl( item.GUID|| ''),
      Fname: new FormControl(item.Fname || '', [Validators.required]),
      Username: new FormControl(item.Username || ''),
      Lname: new FormControl(item.Lname || '', [Validators.required]),
      Email: new FormControl(item.Email || '', [Validators.required]),
      Password: this.pass,
      Usertype: new FormControl(item.Usertype || ''),
	  GUID:new FormControl( item.orgGUID|| ''),
	
     
      Address: new FormControl(item.Address || '', [Validators.required]),
      City: new FormControl(item.City || '', [Validators.required]),
      State: new FormControl(item.State || '', [Validators.required]),
      Country: new FormControl(item.Country || '', [Validators.required]),
      PIN: new FormControl(item.PIN || '', [Validators.required]),
      Status: new FormControl(item.Status || ''),
	   
    })
	
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
  
  changeusertype(selectvalue){
	  
	  // console.log(selectvalue.value);
	  if(selectvalue.value == 'Auditor'){
		  this.itemForm.removeControl('Refferal');
		  this.itemForm.addControl('Refferal', new FormControl('', Validators.required));
	  }else{
		  this.itemForm.removeControl('Refferal');
		  this.itemForm.addControl('Refferal', new FormControl(''));
	  }
  }

  submit() {
	 
    this.dialogRef.close(this.itemForm.value)
  // console.log(this.itemForm.value);
  }
}
