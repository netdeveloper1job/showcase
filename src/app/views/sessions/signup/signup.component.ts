import { Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressBar, MatButton, MatSnackBar } from '@angular/material';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AuthGuard } from '../../../shared/services/auth/auth.guard';
import { Subscription } from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;
  selected='';
  signupForm: FormGroup
  signupsuccessdata: any;
  constructor(private authguardservice:AuthGuard, private router:Router,public snackBar: MatSnackBar) {}

  ngOnInit() {
    const password = new FormControl('', Validators.required);
    const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

    this.signupForm = new FormGroup({
      Email: new FormControl('', [Validators.required, Validators.email]),
      Fname: new FormControl('', [Validators.required]),
      Lname: new FormControl('', [Validators.required]),
      Usertype: new FormControl('', [Validators.required]),
      Refferal: new FormControl(''),
      password: password,
      confirmPassword: confirmPassword,
      agreed: new FormControl('', (control: FormControl) => {
        const agreed = control.value;
        if(!agreed) {
          return { agreed: true }
        }
        return null;
      })
    })
  }

  signup() {
    const signupData = this.signupForm.value;
    this.submitButton.disabled = true;
    this.progressBar.mode = 'indeterminate';
	// console.log(signupData);
	this.authguardservice.SignUpUser(signupData)
	.subscribe(data => {
		
		this.signupsuccessdata = JSON.parse(data);
		
				if(this.signupsuccessdata.status == 0){
					this.snackBar.open(this.signupsuccessdata.message, 'close', { duration: 2000 });
					this.submitButton.disabled = false;
				} else if(this.signupsuccessdata.status == 1){
					this.snackBar.open(this.signupsuccessdata.message, 'close', { duration: 2000 });
					this.router.navigate(['/sessions/signup']);			
				} else {
					this.snackBar.open('Something went wrong', 'close', { duration: 2000 });
				}
	});    
  }
  
  changeusertype(selectvalue){
	  // console.log(selectvalue.value);
	  // const password = new FormControl('', Validators.required);
	  // const confirmPassword = new FormControl('', CustomValidators.equalTo(password));
	  if(selectvalue.value == 'Auditor'){
		  this.signupForm.removeControl('Refferal');
		  this.signupForm.addControl('Refferal', new FormControl('', Validators.required));
	  }else{
		  this.signupForm.removeControl('Refferal');
		  this.signupForm.addControl('Refferal', new FormControl(''));
	  }
  }

}
