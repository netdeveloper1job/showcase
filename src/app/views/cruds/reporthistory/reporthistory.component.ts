import { Component, OnInit, OnDestroy } from '@angular/core';
import { CrudService } from '../crud.service';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { AppConfirmService } from '../../../shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { Subscription } from 'rxjs';
import { egretAnimations } from "../../../shared/animations/egret-animations";
import { DataLayerGuard } from '../../../shared/services/datalayer.guard';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { AuditrequestPopupComponent } from '../auditrequest/auditrequest-popup/auditrequest-popup.component';

@Component({
  selector: 'app-reporthistory',
  templateUrl: './reporthistory.component.html',
  styleUrls: ['./reporthistory.component.scss'],
  animations: egretAnimations
})
export class ReporthistoryComponent implements OnInit {
  public items: any[];
  public responsedata:any;
  random = '';
  chars = '0abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  usertype = sessionStorage.getItem('typeofloginUser');
  constructor(
	private dialog: MatDialog,
    private snack: MatSnackBar,
    private crudService: CrudService,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService,
	private dataservice:DataLayerGuard,
	private router:Router) { }

  ngOnInit() {
	  if(this.usertype=='Auditor'){
		this.snack.open("No Access Allowed", 'Close', { duration: 1000 });
		setTimeout(()=>{
			this.router.navigate(['/dashboard/']);
		},1000);
		return false;
	  }
	  for (let i = 6; i > 0; --i){
		  this.random += this.chars[Math.round(Math.random() * (this.chars.length - 1))];
	  }
	  this.getItems()
  }
  
  getItems() {
    if(this.usertype=='Admin'){
		this.dataservice.allrequesthistory()
		  .subscribe(data => {
				this.responsedata = JSON.parse(data);
				// console.log(data);
				if(this.responsedata.status == 0){
					this.snack.open(this.responsedata.message, 'Close', { duration: 2000 });
					this.items = [];
				}else if(this.responsedata.status == 1){
					this.items = this.responsedata.data;
					// console.log(this.items);
				}else{
					this.snack.open("No data to display", 'Close', { duration: 2000 });
					this.items = [];
				}
		});
	}else{
		this.dataservice.allrequesthistorybyparkingowner(sessionStorage.getItem('idofloginUser'))
		  .subscribe(data => {
				this.responsedata = JSON.parse(data);
				// console.log(data);
				if(this.responsedata.status == 0){
					this.snack.open(this.responsedata.message, 'Close', { duration: 2000 });
					this.items = [];
				}else if(this.responsedata.status == 1){
					this.items = this.responsedata.data;
					// console.log(this.items);
				}else{
					this.snack.open("No data to display", 'Close', { duration: 2000 });
					this.items = [];
				}
		});
	}
  }
  
  // generate(id){
	  // this.router.navigate(['/generate/report/'+btoa(id)]);
  // }
  
  openPopUp(data: any = {}, isNew?) {
    let title = isNew ? '' : 'View Request';
    let dialogRef: MatDialogRef<any> = this.dialog.open(AuditrequestPopupComponent, {
      width: '720px',
      disableClose: true,
      data: { title: title, payload: data }
    })
     dialogRef.afterClosed()
      .subscribe(res => {
        if(!res) {
          // If user press cancel
          return;
        }
        // this.loader.open();
        if (isNew) {
        } else {
        }
      }) 
  }

}
