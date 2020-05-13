import { Component, OnInit, OnDestroy } from '@angular/core';
import { CrudService } from '../crud.service';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { AppConfirmService } from '../../../shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { RequestPopupComponent } from './request-popup/request-popup.component';
import { Subscription } from 'rxjs';
import { egretAnimations } from "../../../shared/animations/egret-animations";
import { DataLayerGuard } from '../../../shared/services/datalayer.guard';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {HeaderSideComponent} from '../../../shared/components/header-side/header-side.component';

@Component({
  providers:[HeaderSideComponent],
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  animations: egretAnimations
})
export class RequestsComponent implements OnInit, OnDestroy {
  public items: any[];
  public getItemSub: Subscription;
  public responsedata:any;
  public respondstatus:any;
  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private crudService: CrudService,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService,
	private dataservice:DataLayerGuard,
	private router:Router,
	private headerside:HeaderSideComponent
  ) { }

  ngOnInit() {
	if(sessionStorage.getItem('typeofloginUser')!='Auditor'){
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
    this.dataservice.allnotacceptedrequestswithjoinbyid(sessionStorage.getItem("idofloginUser"), sessionStorage.getItem("orgofloginUser"))
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

  accept(reqid){
	  this.dataservice.acceptrequest(reqid, sessionStorage.getItem("idofloginUser"))
            .subscribe(data => {
              this.respondstatus = JSON.parse(data);
				this.loader.close();
				if(this.respondstatus.status == 0){
					this.snack.open(this.respondstatus.message, 'Close', { duration: 2000 });
				}else if(this.respondstatus.status == 1){
					this.snack.open(this.respondstatus.message, 'Close', { duration: 2000 });
					setTimeout(()=> {
						this.getItems();
						this.headerside.getItems();
					}, 2000);
				}else{
					this.snack.open("Something went wrong", 'Close', { duration: 2000 });
				}
            })
  }
  
  deleteItem(row) {
    this.confirmService.confirm({message: `Delete ${row.Name}?`})
      .subscribe(res => {
        if (res) {
			// console.log(res);
          this.loader.open();
          this.dataservice.deleteparking(row.ID)
		.subscribe(data => {
		  this.respondstatus = JSON.parse(data);
		
			this.loader.close();
			if(this.respondstatus.status == 0){
				this.snack.open(this.respondstatus.message, 'Close', { duration: 2000 });
			}else if(this.respondstatus.status == 1){
				this.snack.open(this.respondstatus.message, 'Close', { duration: 2000 });
				setTimeout(function() {
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
