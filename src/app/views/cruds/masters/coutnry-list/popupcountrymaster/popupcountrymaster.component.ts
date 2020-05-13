import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AuthGuard } from '../../../../../shared/services/auth/auth.guard';
import { DataLayerGuard } from '../../../../../shared/services/datalayer.guard';

@Component({
  selector: 'app-popupcountrymaster',
  templateUrl: './popupcountrymaster.component.html',
  styleUrls: ['./popupcountrymaster.component.scss']
})
export class PopupcountrymasterComponent implements OnInit {
	public itemForm: FormGroup;
  constructor(
  @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PopupcountrymasterComponent>,
    private fb: FormBuilder,
	private authservice:AuthGuard,
	private dataservice: DataLayerGuard
  ) { }

  ngOnInit() {
	  this.buildItemForm(this.data.payload)
  }
	
	buildItemForm(item) {
		this.itemForm = new FormGroup({
		  CountryName: new FormControl(item.country || '', Validators.required),
		  Status: new FormControl(item.Status || '', ),
		});
	}
	
	submit() {
		    this.dialogRef.close(this.itemForm.value)
		}
    
}
