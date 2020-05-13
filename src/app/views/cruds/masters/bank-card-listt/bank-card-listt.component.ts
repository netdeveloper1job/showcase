import { Component, OnInit, OnDestroy } from '@angular/core';
import { CrudService } from '../../crud.service';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { AppConfirmService } from '../../../../shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from '../../../../shared/services/app-loader/app-loader.service';
import { Subscription } from 'rxjs';
import { egretAnimations } from "../../../../shared/animations/egret-animations";
import { DataLayerGuard } from '../../../../shared/services/datalayer.guard';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { PopupbankcardmasterComponent } from './popupbankcardmaster/popupbankcardmaster.component';
import { Configuration } from '../../../../app.constant';


@Component({
  selector: 'app-bank-card-listt',
  templateUrl: './bank-card-listt.component.html',
  animations: egretAnimations,
  styleUrls: ['./bank-card-listt.component.scss']
})
export class BankCardListtComponent implements OnInit, OnDestroy {
	public items: any;
	public Bankcardmasterdata: any;
	public respondstatus: any;
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
   ngOnDestroy() {
  }
  
  getItems() {
	  this.dataservice.getbankcarddata()
		  .subscribe(data => {
				
				this.Bankcardmasterdata = JSON.parse(data);
				
				if(this.Bankcardmasterdata.status == 0){
					this.snack.open(this.Bankcardmasterdata.message, 'Close', { duration: 2000 });
					this.items = [];
				}else if(this.Bankcardmasterdata.status == 1){
					this.items = this.Bankcardmasterdata.data;
					
				}else{
					this.snack.open("No data to display", 'Close', { duration: 2000 });
					this.items = [];
				}
		});
	}
	
	openPopUp(data: any = {}, isNew?) {
    let title = isNew ? 'Add new Service' : 'Update Service';
    let dialogRef: MatDialogRef<any> = this.dialog.open(PopupbankcardmasterComponent, {
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
          this.dataservice.addbankcrudmaster(res)
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
          this.dataservice.updatebankcardmaster(data.ID, res)
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
		
    this.confirmService.confirm({message: `Delete ${row.BankCardName}?`})
      .subscribe(res => {
        if (res) {
			// console.log(res);
          this.loader.open();
          this.dataservice.deletebankcardmaster(row.ID)
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
