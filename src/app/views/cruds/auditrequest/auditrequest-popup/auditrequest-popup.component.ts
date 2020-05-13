import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { DataLayerGuard } from '../../../../shared/services/datalayer.guard';
import { AuthGuard } from '../../../../shared/services/auth/auth.guard';
import { AppLoaderService } from '../../../../shared/services/app-loader/app-loader.service';

declare var $:any;

@Component({
  selector: 'app-auditrequest-popup',
  templateUrl: './auditrequest-popup.component.html'
})
export class AuditrequestPopupComponent implements OnInit {
	items:any[];
	response:any;
	auditor = '';
  public itemForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
	private dataservice:DataLayerGuard,
    private snack: MatSnackBar,
    public dialogRef: MatDialogRef<AuditrequestPopupComponent>,
	private authguardservice:AuthGuard,
    private loader: AppLoaderService,
    // private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.buildItemForm()
  }
  buildItemForm() {
	  this.dataservice.getparkingsbyidwithjoin(this.data.payload)
		  .subscribe(data => {
			  // console.log(data);
				this.response = JSON.parse(data);
				// console.log(this.response.status);
				if(this.response.status == 1){
					this.items = this.response.data;
					// console.log(this.items);
					if(this.items[0].Fname!=null && this.items[0].Lname!=null){
						this.auditor = this.items[0].Fname+' '+this.items[0].Lname;
					}
					this.itemForm.patchValue({
					  AuditquestionID: this.items[0].Question,
					  ParkingID: this.items[0].Name+' - '+this.items[0].Country,
					  OrganizationUserID: this.items[0].orgFname+' '+this.items[0].orgLname,
					  AuditorUserID: this.auditor
				    });
				}else{
					this.items = [];
				}
		});
	  
     this.itemForm = new FormGroup({
      // AuditquestionID: new FormControl(),
      ParkingID: new FormControl(),
      OrganizationUserID: new FormControl(),
      AuditorUserID: new FormControl()
    })
  }
}
