import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-imageresponse-popup',
  templateUrl: './imageresponse-popup.component.html',
  styleUrls: ['./imageresponse-popup.component.scss']
})
export class ImageresponsePopupComponent implements OnInit {

  constructor(
	@Inject(MAT_DIALOG_DATA) public data: any,
    private snack: MatSnackBar,
    public dialogRefimage: MatDialogRef<ImageresponsePopupComponent>) { }

  ngOnInit() {
  }

}
