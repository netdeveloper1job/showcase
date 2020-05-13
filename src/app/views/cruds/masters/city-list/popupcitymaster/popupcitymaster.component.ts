import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA ,MatSnackBar, MatDialog,} from '@angular/material';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AuthGuard } from '../../../../../shared/services/auth/auth.guard';
import { DataLayerGuard } from '../../../../../shared/services/datalayer.guard';
import { ParkingService } from '../../../../../shared/services/parking.service';

@Component({
  selector: 'app-popupcitymaster',
  templateUrl: './popupcitymaster.component.html',
  styleUrls: ['./popupcitymaster.component.scss']
})
export class PopupcitymasterComponent implements OnInit {
	public itemForm: FormGroup;
	public cityitem:any;
	public States:any;
	public selectedcity:any;
	selecteduser:'';
	countryJsonArray:any;
	countryArray:any;
	stateJSONArray:any;
	stateDataarray:any;
	payloaddata:any;
  constructor(
	@Inject(MAT_DIALOG_DATA) public data: any,
	private snack: MatSnackBar,
	private parkingservice:ParkingService,	
	public dialogRef: MatDialogRef<PopupcitymasterComponent>,
	private fb: FormBuilder,
	private authservice:AuthGuard,
	private dataservice: DataLayerGuard
  ) { }

  ngOnInit() {
	 this.payloaddata= this.data.payload;
	  this.buildItemForm(this.data.payload)
	  this.getCountryList();
	  
  }
  
  buildItemForm(item) {
	 //console.log(item);
		this.itemForm = new FormGroup({
		  CityName: new FormControl(item.CityName || '', Validators.required),
		  SelectState: new FormControl(item.StateID || '', Validators.required),
		  Country: new FormControl( item.Cid || ''),
		  Status: new FormControl(item.Status || '', ),
		});
		
       if(JSON.stringify(item) !== "{}"){
		    this.getStateList(item.Cid );
		}	
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
					//console.log(this.selectedcity);
				}else{
					// this.snack.open("No data to display", 'Close', { duration: 2000 });
					this.cityitem = [];
				}
			});
	}
	
	submit() {
		    this.dialogRef.close(this.itemForm.value)
		}

}
