import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DataLayerGuard } from '../../../../shared/services/datalayer.guard';
@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  
})
export class PopUpComponent implements OnInit {
	selected='';
	ParkingData:any;
	itemsparking:any;
	questiondata:any;
	items:any;
 public itemForm: FormGroup;
  constructor( 
   @Inject(MAT_DIALOG_DATA) 
    public data: any,
    public dialogRef: MatDialogRef<PopUpComponent>,
    private fb: FormBuilder,
	private dataservice:DataLayerGuard,
  ) { }

  ngOnInit() {
	      this.getItems();
	      this.buildItemForm(this.data.payload)
 }
 buildItemForm(item) {
	 
    this.itemForm = this.fb.group({
       ParkingID: [item.ParkingID || '', Validators.required],
      
      AuditquestionID: [item.AuditquestionID || '', Validators.required],
    })
  }
  getItems() {
    this.dataservice.getparkings()
	  .subscribe(data => {
			this.ParkingData = JSON.parse(data);
			// console.log(this.questiondata.status);
			if(this.ParkingData.status == 0){
				this.itemsparking = [];
			}else if(this.ParkingData.status == 1){
				this.itemsparking = this.ParkingData.data;
				
			}else{
				this.itemsparking = [];
			}
	});
	
    this.dataservice.allquestions()
	  .subscribe(data => {
			this.questiondata = JSON.parse(data);
			// console.log(this.questiondata.status);
			if(this.questiondata.status == 0){
				this.items = [];
			}else if(this.questiondata.status == 1){
				this.items = this.questiondata.data;
				
			}else{
				this.items = [];
			}
	});
  }
  // changeusertype(selectvalue){
	  // console.log(selectvalue.value);
	  // if(selectvalue.value == 'Auditor'){
		  // this.itemForm.removeControl('Refferal');
		  // this.itemForm.addControl('Refferal', new FormControl('', Validators.required));
	  // }else{
		  // this.itemForm.removeControl('Refferal');
		  // this.itemForm.addControl('Refferal', new FormControl(''));
	  // }
  // }
submit() {
    this.dialogRef.close(this.itemForm.value)
    // this.itemForm.value 
  }
}
