import { Component, OnInit, OnDestroy } from '@angular/core';
import { CrudService } from '../crud.service';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { AppConfirmService } from '../../../shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { AuditquestionformPopupComponent } from './auditquestionform-popup/auditquestionform-popup.component';
import { AddrequestPopupComponent } from './addrequest-popup/addrequest-popup.component';
import { Subscription } from 'rxjs';
import { egretAnimations } from "../../../shared/animations/egret-animations";
import { DataLayerGuard } from '../../../shared/services/datalayer.guard';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { QuestioneditPopupComponent } from './questionedit-popup/questionedit-popup.component';

@Component({
  selector: 'app-auditquestion',
  templateUrl: './auditquestion.component.html',
  animations: egretAnimations
})
export class AuditquestionComponent implements OnInit, OnDestroy {
  public items: any[];
  public itemstitle: any[];
  public getItemSub: Subscription;
  public questiondata:any;
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
	}
    this.getItems()
  }
  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe()
    }
  }
  getItems() {
    this.dataservice.allquestions()
	  .subscribe(data => {
			this.questiondata = JSON.parse(data);
			// console.log(this.questiondata.status);
			if(this.questiondata.status == 0){
				this.snack.open(this.questiondata.message, 'Close', { duration: 2000 });
				this.items = [];
			}else if(this.questiondata.status == 1){
				this.items = this.questiondata.data;
				// console.log(this.items);
			}else{
				this.snack.open("No data to display", 'Close', { duration: 2000 });
				this.items = [];
			}
	});
	this.dataservice.allquestiontitle()
	  .subscribe(data => {
			this.questiondata = JSON.parse(data);
			// console.log(this.questiondata.status);
			if(this.questiondata.status == 0){
				this.snack.open(this.questiondata.message, 'Close', { duration: 2000 });
				this.itemstitle = [];
			}else if(this.questiondata.status == 1){
				this.itemstitle = this.questiondata.data;
				// console.log(this.items);
			}else{
				this.snack.open("No data to display", 'Close', { duration: 2000 });
				this.itemstitle = [];
			}
	});
  }

  openPopUp(data: any = {}, isNew?) {
    let title = isNew ? 'Add new Question' : 'Update Question';
    let dialogRef: MatDialogRef<any> = this.dialog.open(AuditquestionformPopupComponent, {
      width: '750px',
      disableClose: true,
      data: { title: title, payload: data, type: this.itemstitle }
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        if(!res) {
          // If user press cancel
          return;
        }
        //this.loader.open();
        if (isNew) {
          this.dataservice.addquestion(res)
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
		// console.log(res);
        } else {
			this.dataservice.updatequestion(data.ID, res)
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
  
  openrequestPopUp(data: any = {}, isNew?) {
    let title = isNew ? '' : 'Add new request';
    let dialogRef: MatDialogRef<any> = this.dialog.open(AddrequestPopupComponent, {
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
        this.loader.open();
        if (isNew) {
		// console.log(res);
        } else {
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
			this.loader.close();
        }
      })
  }
  
  openeditPopUp(data: any = {}, isNew?) {
    this.dataservice.levelsbyid(data.ID)
	.subscribe(datas => {
	  this.respondstatus = JSON.parse(datas);
		if(this.respondstatus.status == 1){
			let title = isNew ? '' : 'Edit Question';
			let dialogRef: MatDialogRef<any> = this.dialog.open(QuestioneditPopupComponent, {
			  width: '720px',
			  disableClose: true,
			  data: { title: title, payload: data, levels: this.respondstatus.data }
			})
			dialogRef.afterClosed()
			  .subscribe(res => {
				if(!res) {
				  // If user press cancel
				  return;
				}
				this.loader.open();
				if (isNew) {
				// console.log(res);
				} else {
				  this.dataservice.updatequestion(data.ID, res)
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
					this.loader.close();
				}
			  })
		}else{
			this.snack.open("Something went wrong", 'Close', { duration: 2000 });
		}
	});
  }
  
  deleteItem(row) {
    this.confirmService.confirm({message: `Delete this question`})
      .subscribe(res => {
        if (res) {
			// console.log(res);
          this.loader.open();
          this.dataservice.deletequestion(row.ID)
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