import { Component, OnInit, OnDestroy } from '@angular/core';
import { CrudService } from '../../crud.service';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { AppConfirmService } from '../../../../shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from '../../../../shared/services/app-loader/app-loader.service';
import { Subscription } from 'rxjs';
import { egretAnimations } from "../../../../shared/animations/egret-animations";
import { DataLayerGuard } from '../../../../shared/services/datalayer.guard';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { PopupcountrymasterComponent } from './popupcountrymaster/popupcountrymaster.component';


@Component({
  selector: 'app-coutnry-list',
  templateUrl: './coutnry-list.component.html',
  animations: egretAnimations,
  styleUrls: ['./coutnry-list.component.scss']
})
export class CoutnryListComponent implements OnInit, OnDestroy {
	public items: any;
	public countrymasterdata: any;
	public respondstatus: any;
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
	  this.getItems();
  }
  ngOnDestroy() {
  }
  
  getItems() {
	  this.dataservice.getcountryforcountrymaster()
		  .subscribe(data => {
				// console.log(data);
				this.countrymasterdata = JSON.parse(data);
				// console.log(this.parkingdata.status);
				if(this.countrymasterdata.status == 0){
					this.snack.open(this.countrymasterdata.message, 'Close', { duration: 2000 });
					this.items = [];
				}else if(this.countrymasterdata.status == 1){
					this.items = this.countrymasterdata.data;
					// console.log(this.items);
				}else{
					this.snack.open("No data to display", 'Close', { duration: 2000 });
					this.items = [];
				}
		});
	}
	
	
	openPopUp(data: any = {}, isNew?) {
    let title = isNew ? 'Add new Country' : 'Update Country';
    let dialogRef: MatDialogRef<any> = this.dialog.open(PopupcountrymasterComponent, {
      width: '50%',
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
          this.dataservice.addcountry(res)
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
          this.dataservice.updateCountrymaster(data.ID, res)
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
			
			// this.loader.close();
        }
      })
    }
	
	deleteItem(row) {
    this.confirmService.confirm({message: `Delete ${row.country}?`})
      .subscribe(res => {
        if (res) {
			// console.log(res);
          this.loader.open();
          this.dataservice.deleteCountryofcountrymaster(row.ID)
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
