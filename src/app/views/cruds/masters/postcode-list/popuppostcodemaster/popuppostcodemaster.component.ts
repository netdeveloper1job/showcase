import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA ,MatSnackBar,MatDialog} from '@angular/material';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AuthGuard } from '../../../../../shared/services/auth/auth.guard';
import { DataLayerGuard } from '../../../../../shared/services/datalayer.guard';
import { ParkingService } from '../../../../../shared/services/parking.service';
@Component({
  selector: 'app-popuppostcodemaster',
  templateUrl: './popuppostcodemaster.component.html',
  styleUrls: ['./popuppostcodemaster.component.scss']
})
export class PopuppostcodemasterComponent implements OnInit {
	public itemForm: FormGroup;
	public cityitem:any;
	public city:any;
	public selectedcity:any;
	
	selecteduser:any;
	States:any;
	
	countryJsonArray:any;
	countryArray:any;
	cityDataArray:any;
	cityitem1:any;
  constructor(
	@Inject(MAT_DIALOG_DATA) public data: any,
	public dialogRef: MatDialogRef<PopuppostcodemasterComponent>,
	private parkingservice:ParkingService,
	private fb: FormBuilder,
	private dialog: MatDialog,
	private snack: MatSnackBar,
	private authservice:AuthGuard,
	private dataservice: DataLayerGuard
  ) { }

  ngOnInit() {
	  this.buildItemForm(this.data.payload)
	  this.getCountryList();
  }
  
  buildItemForm(item) {
	  
		this.itemForm = new FormGroup({
			
		  Country: new FormControl(item.Cid || ''),
		  SelectState: new FormControl(item.stateID || ''),
		  PostCode: new FormControl(item.PostCode || '', Validators.required),
		  SelectCity: new FormControl(item.CityID || '', Validators.required),
		  Status: new FormControl(item.Status || '', ),
		});
		
	    if(JSON.stringify(item) !== "{}"){
		  this.getStateList(item.Cid );
		  this.getCityList(item.stateID);
		 }
	}
	
	searchcity(query: string){
    let result = this.cityDataArray(query.toLowerCase())
    this.cityDataArray = result;
  }
  
  selectcity(query: string):string[]{
    let result: string[] = [];
    for(let a of this.cityitem){
      if(a.StateName.toLowerCase().indexOf(query) !== -1){
        result.push(a)
      }else if(a.StateName.toLowerCase().indexOf(query) !== -1){
		  result.push(a)
	  }
    }
    return result
  }
	
	
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
		
  CountryChane(event){
	this.getStateList(event.value);
	}
	
	StateChange(event){
		this.getCityList(event.value);
	}
	
	getStateList(countryidd){
		
		this.parkingservice.getStates(countryidd)
			.subscribe(data => {
				this.States = JSON.parse(data);
				if(this.States.status == 0){
					//this.snack.open(this.stateJSONArray.message, 'Close', { duration: 2000 });
					this.cityitem = [];
				}else if(this.States.status == 1){
					this.cityitem = this.States.data;
				
					this.selectedcity = this.cityitem;
					
				}else{
					// this.snack.open("No data to display", 'Close', { duration: 2000 });
					this.cityitem = [];
				}
			});
	}
	
	searchstate(query: string){
    let result = this.selectstate(query.toLowerCase())
    this.selectedcity = result;
  }
  
  selectstate(query: string):string[]{
    let result: string[] = [];
    for(let a of this.cityitem){
      if(a.StateName.toLowerCase().indexOf(query) !== -1){
        result.push(a)
      }else if(a.StateName.toLowerCase().indexOf(query) !== -1){
		  result.push(a)
	  }
    }
    return result
  }
  
 getCityList(stateid){
  this.parkingservice.getCityList(stateid)
	  .subscribe(data => {
			this.city = JSON.parse(data);
			// console.log(this.countries.status);
			if(this.city.status == 0){
				//this.snack.open(this.cityJSONArray.message, 'Close', { duration: 2000 });
				this.cityitem1 = [];
			}else if(this.city.status == 1){
				this.cityitem1 = this.city.data;
				this.cityDataArray = this.cityitem1;
				
				// console.log(this.item);
			}else{
				this.cityitem1 = [];
			}
	});
 }
 
 submit() {
		    this.dialogRef.close(this.itemForm.value)
			
		}

}
