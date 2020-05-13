import { Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressBar, MatButton } from '@angular/material';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { AuthGuard } from '../../../shared/services/auth/auth.guard';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { Validators, FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  response:any;
  public itemForm: FormGroup;
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;
  constructor(
    private loader: AppLoaderService,
	private authguardservice:AuthGuard,
	private router:Router,
    private snackBar: MatSnackBar,) { }

  ngOnInit() {
	  this.itemForm = new FormGroup({
      Email: new FormControl('', [Validators.required])
    })
  }
  submitEmail() {
	  const formdata = this.itemForm.value;
	  // console.log(formdata);
    this.submitButton.disabled = true;
    this.progressBar.mode = 'indeterminate';
	this.authguardservice.forgotpassword(formdata)
	.subscribe(data => {
		// console.log(data);
		this.response = JSON.parse(data);
		if(this.response.status == 0){
			this.snackBar.open(this.response.message, 'close', { duration: 2000 });
			this.submitButton.disabled = false;
		} else if(this.response.status == 1){
			this.snackBar.open(this.response.message, 'close', { duration: 2000 });	
			this.router.navigate(['/sessions/signin']);
		} else {
			this.snackBar.open('Something went wrong', 'close', { duration: 2000 });
		}
	});  
	
  }
}
