import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, VERSION } from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { DataLayerGuard } from '../../../../shared/services/datalayer.guard';
import { AuthGuard } from '../../../../shared/services/auth/auth.guard';
import { AppLoaderService } from '../../../../shared/services/app-loader/app-loader.service';
import { Subject } from 'rxjs/Subject';
import { take, takeUntil } from 'rxjs/operators';

declare var $:any;

@Component({
  selector: 'app-auditrequest-popup',
  templateUrl: './addrequest-popup.component.html'
})
export class AddrequestPopupComponent implements OnInit {
	selected='';
	itemsparking:any;
	itemsorg:any[];
	selectedorg:any;
	items:any[];
	itemsauditor:string[];
	response:any;
	itemsauditorlength:any;
	selectedParkings: any;
  public itemForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
	private dataservice:DataLayerGuard,
    private snack: MatSnackBar,
    public dialogRef: MatDialogRef<AddrequestPopupComponent>,
	private authguardservice:AuthGuard,
    private loader: AppLoaderService,
    // private fb: FormBuilder,
  ) { }

  ngOnInit() {
	this.dataservice.getparkingsbyquestion(this.data.payload)
	  .subscribe(data => {
			this.response = JSON.parse(data);
			// console.log(this.response.status);
			if(this.response.status == 0){
				this.snack.open(this.response.message, 'Close', { duration: 2000 });
				this.itemsparking = [];
			}else if(this.response.status == 1){
				this.itemsparking = this.response.data;
				 this.selectedParkings= this.itemsparking
				// console.log(this.items);
			}else{
				this.snack.open("No data to display", 'Close', { duration: 2000 });
				this.itemsparking = [];
			}
	});
	this.authguardservice.getallorganizations()
	  .subscribe(data => {
			this.response = JSON.parse(data);
			// console.log(this.response.status);
			if(this.response.status == 0){
				this.snack.open(this.response.message, 'Close', { duration: 2000 });
				this.itemsorg = [];
			}else if(this.response.status == 1){
				this.itemsorg = this.response.data;
				this.selectedorg = this.itemsorg;
				// console.log(this.itemsorg);
			}else{
				this.snack.open("No data to display", 'Close', { duration: 2000 });
				this.itemsorg = [];
			}
	});
	// alert(this.data.payload);
    this.buildItemForm()
  }  
  
  buildItemForm() {
     this.itemForm = new FormGroup({
      ParkingID: new FormControl('', [Validators.required]),
      //filterParkingID: new FormControl(''),
      AuditquestionID: new FormControl(this.data.payload, [Validators.required]),
      OrganizationUserID: new FormControl('', [Validators.required]),
      AuditorUserID: new FormControl(''),
    })
  }
  
  searchparking(query: string){
    let result = this.selectparkings(query.toLowerCase())
    this.selectedParkings = result;
  }
  
  selectparkings(query: string):string[]{
    let result: string[] = [];
    for(let a of this.itemsparking){
      if(a.Name.toLowerCase().indexOf(query) !== -1){
        result.push(a)
      }else if(a.Country.toLowerCase().indexOf(query) !== -1){
		  result.push(a)
	  }
    }
    return result
  }
  
  searchorg(query: string){
    let result = this.selectorg(query.toLowerCase())
    this.selectedorg = result;
  }
  
  selectorg(query: string):string[]{
    let result: string[] = [];
    for(let a of this.itemsorg){
      if(a.Fname.toLowerCase().indexOf(query) !== -1){
        result.push(a)
      }else if(a.Lname.toLowerCase().indexOf(query) !== -1){
		  result.push(a)
	  }
    }
    return result
  }
  
  /* getquestions(selectvalue){
	  // alert(selectvalue.value);
	  this.loader.open();
	  this.dataservice.getquestionforpark(selectvalue.value)
		  .subscribe(data => {
				this.response = JSON.parse(data);
				// console.log(this.response);
				if(this.response.status == 0){
					// this.snack.open(this.response.message, 'Close', { duration: 2000 });
					this.items = [];
				}else if(this.response.status == 1){
					this.items = this.response.data;
					$("#checkall").show();
					 //alert(this.items);
					// this.items = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
				}else{
					// this.snack.open("No data to display", 'Close', { duration: 2000 });
					this.items = [];
				}
		});
		// this.itemsauditorlength = this.items.length;
		this.loader.close();
		// alert(this.items);
  } */
  
  getauditor(selectvalue){
	  // alert(selectvalue.value);
	  this.loader.open();
	  this.authguardservice.getauditorsbyorg(selectvalue.value)
		  .subscribe(data => {
				this.response = JSON.parse(data);
				// console.log(this.response);
				if(this.response.status == 0){
					// this.snack.open(this.response.message, 'Close', { duration: 2000 });
					this.itemsauditor = [];
				}else if(this.response.status == 1){
					this.itemsauditor = this.response.data;
					$("#checkall").show();
					 //alert(this.itemsauditor);
					// this.itemsauditor = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
				}else{
					// this.snack.open("No data to display", 'Close', { duration: 2000 });
					this.itemsauditor = [];
				}
		});
		// this.itemsauditorlength = this.itemsauditor.length;
		this.loader.close();
		// alert(this.itemsauditor);
  }
  
  selectall(eventcheck){
	  // // console.log(eventcheck.checked);
	  // if(eventcheck.checked) {
		// this.itemsauditor.map((pizza)=>{
			// pizza.checked=true;
		// });
		// // console.log("ys");
	  // } else {
		// this.itemsauditor.map((pizza)=>{
			// pizza.checked=false;
		// });
		// // console.log("no");
	  // }
  }

  submit() {
    this.dialogRef.close(this.itemForm.value)
    // this.itemForm.value
  }
}
