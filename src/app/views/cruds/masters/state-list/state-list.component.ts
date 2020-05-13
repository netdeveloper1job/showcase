import { Component, OnInit, OnDestroy } from '@angular/core';
import { CrudService } from '../../crud.service';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { AppConfirmService } from '../../../../shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from '../../../../shared/services/app-loader/app-loader.service';

import { StateTablePopupComponent } from './state-table-popup/state-table-popup.component';
import { Subscription } from 'rxjs';
import { egretAnimations } from "../../../../shared/animations/egret-animations";
import { DataLayerGuard } from '../../../../shared/services/datalayer.guard';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-state-list',
  templateUrl: './state-list.component.html',
   animations: egretAnimations
})
export class StateListComponent implements OnInit {
 public items: any[];
  public getItemSub: Subscription;
  public statedata:any;
  public respondstatus:any;
  
  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private crudService: CrudService,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService,
	private dataservice:DataLayerGuard,
	private router:Router
  
  ) { }

  ngOnInit() {
	  if(sessionStorage.getItem('typeofloginUser')=='Auditor'){
		this.snack.open("No Access Allowed", 'Close', { duration: 1000 });
		setTimeout(()=>{
			this.router.navigate(['/dashboard/']);
		},1000);
		return false;
	}else{
		this.getItems()
	}
  }
  
ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe()
    }
  }
  
   getItems() {
  
		this.dataservice.getstates()
		  .subscribe(data => {
				
				this.statedata = JSON.parse(data);
				// console.log(this.parkingdata.status);
				if(this.statedata.status == 0){
					
					this.snack.open(this.statedata.message, 'Close', { duration: 2000 });
					this.items = [];
				}else if(this.statedata.status == 1){
					
					this.items = this.statedata.data;
					// console.log(this.items);
				}else{
					this.snack.open("No data to display", 'Close', { duration: 2000 });
					this.items = [];
				}
		});
	
  }
  
     openPopUp(data: any = {}, isNew?) {
		
    let title = isNew ? 'Add new State' : 'Update State';
    let dialogRef: MatDialogRef<any> = this.dialog.open(StateTablePopupComponent, {
      width: '200%',
      disableClose: true,
      data: { title: title, payload: data }
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        if(!res) {
          // If user press cancel
          return;
        }
        this.loader.open();
        if (isNew) {
		
          this.dataservice.addState(res)
		
		  .subscribe(data => {
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
		// console.log(res);
        } else {
			
          this.dataservice.updateStatus(data.ID, res)
		  
            .subscribe(data => {
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
			// console.log(data.ID);
			// console.log(res);
			this.loader.close();
        }
      })
   }
   deleteItem(row) {
	
     this.confirmService.confirm({message: `Delete ${row.StateName}?`})
       .subscribe(res => {
        if (res) {
			
          this.loader.open();
          this.dataservice.deleteState(row.ID)
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
