import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AuthGuard } from '../../../../shared/services/auth/auth.guard';
import { DataLayerGuard } from '../../../../shared/services/datalayer.guard';

@Component({
  selector: 'app-parkingpopup',
  templateUrl: './parkingpopup.component.html',
  styleUrls: ['./parkingpopup.component.scss']
})
export class ParkingpopupComponent implements OnInit {
  public itemForm: FormGroup;
  parkingdata: any;
  countries: any;
  item: any;
  countryitem: any;
  selectedcountry: any;
  selecteduser = '';
  selectedsecurity = '';
  selectedrating = '';
  numb = [0,1,2,3,4,5];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ParkingpopupComponent>,
    private fb: FormBuilder,
	private authservice:AuthGuard,
	private dataservice: DataLayerGuard
  ) { }

  ngOnInit() {
    this.buildItemForm(this.data.payload)
  }
  buildItemForm(item) {
	  this.selectedsecurity = item.Security_rating;
	  this.selectedrating = item.Star_rating;
    this.itemForm = new FormGroup({
      Name: new FormControl(item.Name),
      Lattitude: new FormControl(item.Lattitude),
      Longitude: new FormControl(item.Longitude),
      Address: new FormControl(item.Address),
      City: new FormControl(item.City),
      State: new FormControl(item.State),
      Country: new FormControl(item.Country),
      PIN: new FormControl(item.PIN),
	  Road: new FormControl(item.Road),
	  Access: new FormControl(item.Access),
	  Security_rating: new FormControl(item.Security_rating),
	  Star_rating: new FormControl(item.Star_rating),
	  Parking_Type: new FormControl(item.Parking_Type),
	  Guard: new FormControl(item.Guard),
	  Fences: new FormControl(item.Fences),
	  Video: new FormControl(item.Video),
	  Flood: new FormControl(item.Flood),
	  Fuel: new FormControl(item.Fuel),
	  Electric: new FormControl(item.Electric),
	  Dangerous: new FormControl(item.Dangerous),
	  Restro: new FormControl(item.Restro),
	  Hotel: new FormControl(item.Hotel),
	  Sanitary: new FormControl(item.Sanitary),
	  Veh_wash: new FormControl(item.Veh_wash),
	  Veh_repair: new FormControl(item.Veh_repair),
	  Medical: new FormControl(item.Medical),
	  Tarrif_day: new FormControl(item.Tarrif_day),
	  Tarrif_hour: new FormControl(item.Tarrif_hour),
	  Currency: new FormControl(item.Currency),
	  Company: new FormControl(item.Company),
	  Email: new FormControl(item.Email),
      Website: new FormControl(item.Website),
      Telephone: new FormControl(item.Telephone),
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
		  this.dialogRef.close(this.itemForm.value)
  }

}
