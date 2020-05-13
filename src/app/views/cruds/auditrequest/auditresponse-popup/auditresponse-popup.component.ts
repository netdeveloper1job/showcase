import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AppLoaderService } from '../../../../shared/services/app-loader/app-loader.service';
import { ImageresponsePopupComponent } from './imageresponse-popup/imageresponse-popup.component';

@Component({
  selector: 'app-auditresponse-popup',
  templateUrl: './auditresponse-popup.component.html',
  styleUrls: ['./auditresponse-popup.component.scss']
})
export class AuditresponsePopupComponent implements OnInit {
  public itemForm: FormGroup;
  image1:any;
  image2:any;
  image3:any;
  image4:any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
	private dialog: MatDialog,
    private snack: MatSnackBar,
    public dialogRef: MatDialogRef<AuditresponsePopupComponent>,
    private loader: AppLoaderService,
    // private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.buildItemForm(this.data.payload);
	// console.log(this.data.payload);
  }
  
  buildItemForm(item) {
	 this.itemForm = new FormGroup({
      extra: new FormControl('')
    })
  }
  
  openimage(image,num){
	  let title = 'File'+num+' Uploaded by '+this.data.payload[num-1].Fname+' '+this.data.payload[num-1].Lname;
	  let dialogRefnew: MatDialogRef<any> = this.dialog.open(ImageresponsePopupComponent, {
      width: '500px',
      disableClose: true,
      data: {title: title, payload: image }
    })
  }

  submit() {
    this.dialogRef.close(this.itemForm.value)
  }
}
