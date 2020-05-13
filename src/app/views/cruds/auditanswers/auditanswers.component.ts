import { Component, OnInit, OnDestroy } from '@angular/core';
import { CrudService } from '../crud.service';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { AppConfirmService } from '../../../shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { AuditanswersPopupComponent } from './auditanswers-popup/auditanswers-popup.component';
import { Subscription } from 'rxjs';
import { egretAnimations } from "../../../shared/animations/egret-animations";
import { DataLayerGuard } from '../../../shared/services/datalayer.guard';
import { AuthGuard } from '../../../shared/services/auth/auth.guard';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-auditanswers',
  templateUrl: './auditanswers.component.html',
  animations: egretAnimations
})
export class AuditanswersComponent implements OnInit, OnDestroy {
  public items: any[];
  public getItemSub: Subscription;
  public responsedata:any;
  public respondstatus:any;
  public paq:any;
  public reqID:any;
  public distinct:any[];
  public paqcount = 0;
  public count = 1;
  public submit = false;
  random = '';
  chars = '0abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
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
    for (let i = 6; i > 0; --i){
		  this.random += this.chars[Math.round(Math.random() * (this.chars.length - 1))];
	  }
	this.getItems()
  }
  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe()
    }
  }
  getItems() {
	  // this.dataservice.getdistinctcount()
		  // .subscribe(data => {
				// this.responsedata = JSON.parse(data);
				// console.log(data);
				// if(this.responsedata.status == 1){
					// this.distinct = this.responsedata.data;
					// console.log(this.items);
				// }
		// });
		
	  if(sessionStorage.getItem("typeofloginUser")=='Auditor'){
		this.dataservice.responsebyauditor(sessionStorage.getItem("idofloginUser"))
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
		  this.dataservice.alldoneanswers()
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

  openPopUp(req: any = {}, isNew?) {
	  this.dataservice.getpaq(req.requestID)
	  .subscribe(data => {
			this.responsedata = JSON.parse(data);
			// console.log(data);
			if(this.responsedata.status == 1){
				this.paq = this.responsedata.data;
				// console.log(this.paq);
				let title = isNew ? '' : 'Auditor Response for Parking '+req.Name+', '+req.Country;
				let dialogRef: MatDialogRef<any> = this.dialog.open(AuditanswersPopupComponent, {
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
