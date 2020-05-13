import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-imagepop-up',
  templateUrl: './imagepop-up.component.html',
  styleUrls: ['./imagepop-up.component.scss']
})
export class ImagepopUpComponent implements OnInit {

  constructor(
	@Inject(MAT_DIALOG_DATA) public data: any,
    private snack: MatSnackBar,
    public dialogRefimage: MatDialogRef<ImagepopUpComponent>) { }

  ngOnInit() {
	  // alert(this.data.payload);
  }

}
