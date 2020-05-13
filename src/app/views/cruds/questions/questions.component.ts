import { Component, OnInit, OnDestroy } from '@angular/core';
import { CrudService } from '../crud.service';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { AppConfirmService } from '../../../shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { QuestionsPopupComponent } from './questions-popup/questions-popup.component';
import { Subscription } from 'rxjs';
import { egretAnimations } from "../../../shared/animations/egret-animations";
import { DataLayerGuard } from '../../../shared/services/datalayer.guard';
import { AuthGuard } from '../../../shared/services/auth/auth.guard';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  animations: egretAnimations
})
export class QuestionsComponent implements OnInit, OnDestroy {
  public items: any[];
  public questems: any[];
  public getItemSub: Subscription;
  public responsedata:any;
  public respondstatus:any;
  public quescount = 0;
  public count = 1;
  public submit = 'Save';
  public usertype = sessionStorage.getItem("typeofloginUser");
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
	if(sessionStorage.getItem('typeofloginUser')!='Auditor' && sessionStorage.getItem('typeofloginUser')!='Organization'){
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
  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe()
    }
  }
  getItems() {
    if(sessionStorage.getItem('typeofloginUser')=='Auditor'){
		this.dataservice.getquestionsforauditor(sessionStorage.getItem("idofloginUser"))
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
		this.dataservice.getquestionsfororganisation(sessionStorage.getItem("idofloginUser"))
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
	
	this.dataservice.getquestions()
	  .subscribe(data => {
			this.responsedata = JSON.parse(data);
			// console.log(data);
			if(this.responsedata.status == 1){
				this.questems = this.responsedata.data;
				// console.log(this.questems);
			}else{
				// this.snack.open("No data to display", 'Close', { duration: 2000 });
				this.questems = [];
			}
	});
	
	// this.dataservice.allactivequestions()
	  // .subscribe(data => {
			// this.responsedata = JSON.parse(data);
			// console.log(data);
			// if(this.responsedata.status == 1){
				// this.quescount = this.responsedata.data.length;
				// console.log(this.questems);
			// }else{
				// this.snack.open("No data to display", 'Close', { duration: 2000 });
				// this.quescount = 0;
			// }
	// });
  }

  openPopUp(datasss: any = {}, isNew?) {
	  // console.log(questems);
    
	this.dataservice.getparkingbyid(datasss.ParkingID)
	  .subscribe(data => {
			this.responsedata = JSON.parse(data);
			// console.log(data);
			if(this.responsedata.status == 1){
				this.questems = this.responsedata.data;
				let title = isNew ? '' : 'Review Parking';
				let dialogRef: MatDialogRef<any> = this.dialog.open(QuestionsPopupComponent, {
				  width: '200%',
				  height: '750px',
				  disableClose: true,
				  data: { title: title, payload: this.questems[0] }
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
					  this.dataservice.modifyparking(datasss.requestID, datasss.ParkingID, res)
						.subscribe(datas => {
							//console.log(data);
						  this.respondstatus = JSON.parse(datas);
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
						// console.log(data.paqID);
						// console.log(res);
						// this.loader.close();
					}
				  }) 
				// console.log(this.questems);
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

