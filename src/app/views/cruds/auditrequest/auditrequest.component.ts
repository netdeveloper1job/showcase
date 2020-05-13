import { Component, OnInit, OnDestroy } from '@angular/core';
import { CrudService } from '../crud.service';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { AppConfirmService } from '../../../shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { AuditrequestPopupComponent } from './auditrequest-popup/auditrequest-popup.component';
import { AuditresponsePopupComponent } from './auditresponse-popup/auditresponse-popup.component';
import { AddauditrequestPopupComponent } from './addauditrequest-popup/addauditrequest-popup.component';
import { ParkingpopupComponent } from './parkingpopup/parkingpopup.component';
import { Subscription } from 'rxjs';
import { egretAnimations } from "../../../shared/animations/egret-animations";
import { DataLayerGuard } from '../../../shared/services/datalayer.guard';
import { AuthGuard } from '../../../shared/services/auth/auth.guard';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-auditrequest',
  templateUrl: './auditrequest.component.html',
  animations: egretAnimations
})
export class AuditrequestComponent implements OnInit, OnDestroy {
  public items: any[];
  public itemsrespond: any[];
  public getItemSub: Subscription;
  public responsedata:any;
  public respondstatus:any;
  public paq:any;
  public distinct:any[];
  public paqcount = 0;
  public count = 1;
  public submit = false;
  title:any;
  usertype = sessionStorage.getItem('typeofloginUser');
  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private crudService: CrudService,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService,
	private authguardservice:AuthGuard,
	private dataservice:DataLayerGuard,
	private router:Router
  ) { }

  ngOnInit() {
	if(this.usertype=='Auditor'){
		this.snack.open("No Access Allowed", 'Close', { duration: 1000 });
		setTimeout(()=>{
			this.router.navigate(['/dashboard/']);
		},1000);
		return false;
	}
    this.getItems()
  }
  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe()
    }
  }
  getItems() {
    if(this.usertype == 'Admin'){
		this.dataservice.allrequestswithauditor()
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
		this.dataservice.allrequestswithauditorbyparkingowner(sessionStorage.getItem('idofloginUser'))
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
	
	this.dataservice.getdistinctcount()
		  .subscribe(data => {
				this.responsedata = JSON.parse(data);
				// console.log(data);
				if(this.responsedata.status == 1){
					this.distinct = this.responsedata.data;
					// console.log(this.items);
				}
		});
  }
  
  approvejob(row) {
	  // console.log("eefe");
    this.dataservice.approverequest(row.requestID)
		.subscribe(data => {
		  this.respondstatus = JSON.parse(data);
			// console.log(this.respondstatus);
			this.loader.close();
			if(this.respondstatus.status == 0){
				this.snack.open(this.respondstatus.message, 'Close', { duration: 2000 });
			}else if(this.respondstatus.status == 1){
				this.snack.open(this.respondstatus.message, 'Close', { duration: 2000 });
				setTimeout(()=> {
					this.getItems()
				}, 2000);
			}else{
				this.snack.open("Something went wrong", 'Close', { duration: 2000 });
			}
		})
  }
  
 /*  approveparking(row) {
	  // console.log("eefe");
    this.dataservice.approveparking(row.requestID)
		.subscribe(data => {
		  this.respondstatus = JSON.parse(data);
			// console.log(this.respondstatus);
			this.loader.close();
			if(this.respondstatus.status == 0){
				this.snack.open(this.respondstatus.message, 'Close', { duration: 2000 });
			}else if(this.respondstatus.status == 1){
				this.snack.open(this.respondstatus.message, 'Close', { duration: 2000 });
				setTimeout(()=> {
					this.getItems()
				}, 2000);
			}else{
				this.snack.open("Something went wrong", 'Close', { duration: 2000 });
			}
		})
  } */

  approveparking(datasss: any = {}, isNew?) {
    
	this.dataservice.getparkingbyid(datasss.ApprovalparkingID)
	  .subscribe(data => {
			this.responsedata = JSON.parse(data);
			// console.log(data);
			if(this.responsedata.status == 1){
				let title = isNew ? '' : 'Approve Parking';
				let dialogRef: MatDialogRef<any> = this.dialog.open(ParkingpopupComponent, {
				  width: '720px',
				  disableClose: true,
				  data: { title: title, payload: this.responsedata.data[0] }
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
						this.dataservice.approveparking(datasss.requestID)
						.subscribe(data => {
						  this.respondstatus = JSON.parse(data);
							// console.log(this.respondstatus);
							this.loader.close();
							if(this.respondstatus.status == 0){
								this.snack.open(this.respondstatus.message, 'Close', { duration: 2000 });
							}else if(this.respondstatus.status == 1){
								this.snack.open(this.respondstatus.message, 'Close', { duration: 2000 });
								setTimeout(()=> {
									this.getItems()
								}, 2000);
							}else{
								this.snack.open("Something went wrong", 'Close', { duration: 2000 });
							}
						})
					}
				  })
			}
	  });
  }

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

  addrequestPopUp(data: any = {}, isNew?) {
    let title = isNew ? 'Add Request' : '';
    let dialogRef: MatDialogRef<any> = this.dialog.open(AddauditrequestPopupComponent, {
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
			this.dataservice.addrequests(res)
			  .subscribe(data => {
				  // console.log(data);
					this.respondstatus = JSON.parse(data);
					this.loader.close();
					if(this.respondstatus.status == 0){
						this.snack.open(this.respondstatus.message, 'Close', { duration: 2000 });
					}else if(this.respondstatus.status == 1){
						this.snack.open(this.respondstatus.message, 'Close', { duration: 2000 });
						this.getItems()
					}else{
						this.snack.open("Something went wrong", 'Close', { duration: 2000 });
					}
				})
        } else {
        }
      }) 
  }
  
    openrespondPopUp(req: any = {}, isNew?) {
	  this.dataservice.getpaq(req.requestID)
	  .subscribe(data => {
			this.responsedata = JSON.parse(data);
			// console.log(data);
			if(this.responsedata.status == 1){
				this.paq = this.responsedata.data;
				// console.log(this.paq);
				let title = isNew ? '' : 'Auditor Response for Parking '+req.Name+', '+req.Country;
				let dialogRef: MatDialogRef<any> = this.dialog.open(AuditresponsePopupComponent, {
				  width: '675px',
				  height: '750px',
				  disableClose: true,
				  data: { title: title, payload: this.paq }
				})
				 dialogRef.afterClosed()
				  .subscribe(res => {
					if(!res) {
					  // If user press cancel
					  this.count = 1;
					  return;
					}else{
					}
				  }) 
			}
	});
  }
  
  deleteItem(row) {
	  // console.log("eefe");
    this.confirmService.confirm({message: `Delete this request?`})
      .subscribe(res => {
        if (res) {
			// console.log(row);
          this.loader.open();
          this.dataservice.deleterequests(row.requestID)
		.subscribe(data => {
		  this.respondstatus = JSON.parse(data);
			// console.log(this.respondstatus);
			this.loader.close();
			if(this.respondstatus.status == 0){
				this.snack.open(this.respondstatus.message, 'Close', { duration: 2000 });
			}else if(this.respondstatus.status == 1){
				this.snack.open(this.respondstatus.message, 'Close', { duration: 2000 });
				setTimeout(()=> {
					this.getItems()
				}, 2000);
			}else{
				this.snack.open("Something went wrong", 'Close', { duration: 2000 });
			}
		})
        }
      })
  }
}