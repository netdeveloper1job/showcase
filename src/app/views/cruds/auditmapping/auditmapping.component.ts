import { Component, OnInit, OnDestroy } from '@angular/core';
import { CrudService } from '../crud.service';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { AppConfirmService } from '../../../shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { PopUpComponent } from './pop-up/pop-up.component';
import { Subscription } from 'rxjs';
import { egretAnimations } from "../../../shared/animations/egret-animations";
import { DataLayerGuard } from '../../../shared/services/datalayer.guard';
import { AuthGuard } from '../../../shared/services/auth/auth.guard';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-auditmapping',
  templateUrl: './auditmapping.component.html',
  styleUrls: ['./auditmapping.component.scss'],
  animations: egretAnimations
})
export class AuditmappingComponent implements OnInit, OnDestroy {

  public items: any[];
  public getItemSub: Subscription;
  public mappingdata:any;
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
    this.getItems()
  }
  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe()
    }
  }
  getItems() {
    this.dataservice.allmapping()
	  .subscribe(data => {
			this.mappingdata = JSON.parse(data);
			// console.log(this.questiondata.status);
			if(this.mappingdata.status == 0){
				this.snack.open(this.mappingdata.message, 'Close', { duration: 2000 });
				this.items = [];
			}else if(this.mappingdata.status == 1){
				this.items = this.mappingdata.data;
				// console.log(this.items);
			}else{
				this.snack.open("No data to display", 'Close', { duration: 2000 });
				this.items = [];
			}
	});
  }

  openPopUp(data: any = {}, isNew?) {
    let title = isNew ? 'Add new Mapping' : 'Update Mapping';
    let dialogRef: MatDialogRef<any> = this.dialog.open(PopUpComponent, {
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
        //this.loader.open();
        if (isNew) {
          this.dataservice.addpaqdetails(res)
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
		
        } else {
          this.dataservice.updatemapping(data.ID, res)
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
			// this.loader.close();
        }
      })
  }
  
  deleteItem(row) {
    this.confirmService.confirm({message: `Delete ${row.Question}?`})
      .subscribe(res => {
        if (res) {
			// console.log(res);
          this.loader.open();
          this.dataservice.deletemapping(row.ID)
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