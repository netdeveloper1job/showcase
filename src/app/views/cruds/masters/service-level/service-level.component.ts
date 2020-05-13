import { Component, OnInit, OnDestroy } from '@angular/core';
import { CrudService } from '../../crud.service';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { AppConfirmService } from '../../../../shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from '../../../../shared/services/app-loader/app-loader.service';
import { Subscription } from 'rxjs';
import { egretAnimations } from "../../../../shared/animations/egret-animations";
import { DataLayerGuard } from '../../../../shared/services/datalayer.guard';
import {ActivatedRoute, Params, Router} from '@angular/router';

import { PopupserviceLevelComponent } from './popupservice-level/popupservice-level.component';
import { Configuration } from '../../../../app.constant';

@Component({
  selector: 'app-service-level',
  templateUrl: './service-level.component.html',
  animations: egretAnimations,
  styleUrls: ['./service-level.component.scss']
})
export class ServiceLevelComponent implements OnInit {
	public items: any;
	public respondstatus: any;
	public ServiceLevelmasterdata: any;
  constructor(
	private dialog: MatDialog,
	private snack: MatSnackBar,
	private crudService: CrudService,
	private confirmService: AppConfirmService,
	private loader: AppLoaderService,
	private dataservice:DataLayerGuard,
	private router:Router,
	private _configuration: Configuration,
  ) { }
	imagepathurl = this._configuration.imagepathurl;
  ngOnInit() {
	   this.getItems();
  }
  
	getItems() {
		this.dataservice.getServiceLeveldata()
			.subscribe(data => {
			 
					this.ServiceLevelmasterdata = JSON.parse(data);
					// console.log(this.parkingdata.status);
					if(this.ServiceLevelmasterdata.status == 0){
						this.snack.open(this.ServiceLevelmasterdata.message, 'Close', { duration: 2000 });
						this.items = [];
					}else if(this.ServiceLevelmasterdata.status == 1){
						this.items = this.ServiceLevelmasterdata.data;
						// console.log(this.items);
					}else{
						this.snack.open("No data to display", 'Close', { duration: 2000 });
						this.items = [];
					}
		});
	}
	
	openPopUp(data: any = {}, isNew?) {
		
    let title = isNew ? 'Add new Service Level' : 'Update Service Level';
    let dialogRef: MatDialogRef<any> = this.dialog.open(PopupserviceLevelComponent, {
      width: '40%',
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
          this.dataservice.addservicelevelmaster(res)
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
			
          this.dataservice.updateserviceLevelmaster(data.ID, res)
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
			
			this.loader.close();
        }
      })
    }
	
	
	deleteItem(row) {
		
    this.confirmService.confirm({message: `Delete ${row.ServiceLevelName}?`})
      .subscribe(res => {
        if (res) {
			// console.log(res);
          this.loader.open();
          this.dataservice.deleteservicelevelmaster(row.ID)
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
