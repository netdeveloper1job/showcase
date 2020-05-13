import { Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressBar, MatButton, MatSnackBar } from '@angular/material';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthGuard } from '../../../shared/services/auth/auth.guard';
import { Subscription } from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
@ViewChild(MatProgressBar) progressBar: MatProgressBar;
@ViewChild(MatButton) submitButton: MatButton;

loginData:any;
signinForm: FormGroup;

  constructor(private authguardservice:AuthGuard, private router:Router,public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.signinForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(false)
    })
  }
  signin() {
	this.submitButton.disabled = true;
    this.progressBar.mode = 'indeterminate';	  
    const signinData = this.signinForm.value; 
// console.log(signinData);	
	this.authguardservice.loginUser(signinData)
	.subscribe(data => {
		this.loginData = JSON.parse(data);
				if(this.loginData.status == 0){
					this.snackBar.open(this.loginData.message, 'close', { duration: 2000 });
					this.submitButton.disabled = false;
					// this.progressBar.mode = '';
				} else if(this.loginData.status == 1){
					this.snackBar.open(this.loginData.message, 'close', { duration: 2000 });
					this.submitButton.disabled = false;
					this.authguardservice.isAuthenticated = true;
					sessionStorage.setItem('nameofloginUser', this.loginData.data[0].Fname);
					sessionStorage.setItem('idofloginUser', this.loginData.data[0].ID);
					sessionStorage.setItem('orgofloginUser', this.loginData.data[0].RefferalID);
					sessionStorage.setItem('typeofloginUser', this.loginData.data[0].Usertype);
					this.router.navigate(['/dashboard/']);					
				} else {
					this.snackBar.open('Something went wrong', 'close', { duration: 2000 });
				}
	});    
  }

}
