import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AppLoaderService } from '../../../../shared/services/app-loader/app-loader.service';
import { ImagepopUpComponent } from './imagepop-up/imagepop-up.component';

declare var $:any;

@Component({
  selector: 'app-auditanswers-popup',
  templateUrl: './auditanswers-popup.component.html',
  styleUrls: ['./auditanswers-popup.component.scss']
})
export class AuditanswersPopupComponent implements OnInit {
  public itemForm: FormGroup;
  image1:any;
  image2:any;
  image3:any;
  image4:any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
	private dialog: MatDialog,
    private snack: MatSnackBar,
    public dialogRef: MatDialogRef<AuditanswersPopupComponent>,
    private loader: AppLoaderService,
    // private fb: FormBuilder,
  ) { }

  ngOnInit() {
	  // console.log(this.data.submit);
    this.buildItemForm()
	// this.image1 = this.data.payload.FileURL+this.data.payload.FileUpload1;
	// this.image2 = this.data.payload.FileURL+this.data.payload.FileUpload2;
	// this.image3 = this.data.payload.FileURL+this.data.payload.FileUpload3;
	// this.image4 = this.data.payload.FileURL+this.data.payload.FileUpload4;
	// console.log(this.data.payload);
  }
  
  buildItemForm() {
	 this.itemForm = new FormGroup({
      extra: new FormControl('')
    })
  }
  
  openimage(image,num){
	  let title = 'File'+num+' Uploaded by '+this.data.payload[num-1].Fname+' '+this.data.payload[num-1].Lname;
	  let dialogRefnew: MatDialogRef<any> = this.dialog.open(ImagepopUpComponent, {
      width: '500px',
      disableClose: true,
      data: {title: title, payload: image }
    })
  }

  submit() {
    this.dialogRef.close(this.itemForm.value)
  }
}


