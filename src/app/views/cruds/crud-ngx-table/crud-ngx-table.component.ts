import { Component, OnInit, OnDestroy } from '@angular/core';
import { CrudService } from '../crud.service';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { AppConfirmService } from '../../../shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { NgxTablePopupComponent } from './ngx-table-popup/ngx-table-popup.component';
import { Subscription } from 'rxjs';
import { egretAnimations } from "../../../shared/animations/egret-animations";
import { AuthGuard } from '../../../shared/services/auth/auth.guard';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-crud-ngx-table',
  templateUrl: './crud-ngx-table.component.html',
  animations: egretAnimations
})
export class CrudNgxTableComponent implements OnInit, OnDestroy {
  public items: any[];
  public getItemSub: Subscription;
  public userdata:any;
  public respondstatus:any;
  public usertype = sessionStorage.getItem('typeofloginUser');
  public memberurl:any;
  title:any;
   url:any;
   addtitle:any;
   
  
   
  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private crudService: CrudService,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService,
	private authguardservice:AuthGuard,
	private router:Router,
	public _Activatedroute:ActivatedRoute,
  ) { }

  ngOnInit() {
	if(sessionStorage.getItem('typeofloginUser')=='Auditor'){
		this.snack.open("No Access Allowed", 'Close', { duration: 1000 });
		setTimeout(()=>{
			this.router.navigate(['/dashboard/']);
		},1000);
		return false;
	}
   
	
	 this.router.events.subscribe((url:any) => url);
      this.memberurl=this.router.url;  // to print only path eg:"/login"
	  
	 
	  if(this.memberurl=='/manage/members')
	  {
		this.url='Member';
		this.addtitle='Add Members';
	  }
	   if(this.memberurl=='/manage/organization')
	  {
		 this.url='Organization';
		 this.addtitle='Add Organization';
	  }
	   if(this.memberurl=='/manage/auditor')
	  {
		   this.url='Auditor';
		   this.addtitle='Add Auditor';
	  }
	   this.getItems()
	 
  }
 
  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe();
    }
  }
  getItems() {
	
	  if(sessionStorage.getItem("typeofloginUser") == 'Admin'){
		this.authguardservice.getallusers(this.url)
		  .subscribe(data => {
				this.userdata = JSON.parse(data);
				  //console.log(this.userdata.data[0]);
				if(this.userdata.status == 0){
					this.snack.open(this.userdata.message, 'Close', { duration: 2000 });
					this.items = [];
					
				}else if(this.userdata.status == 1){
					
				
					
						this.items = this.userdata.data;
					//console.log(this.items);
				}else{
					this.snack.open("No data to display", 'Close', { duration: 2000 });
					this.items = [];
					
				}
		});
	}else if(sessionStorage.getItem("typeofloginUser") == 'Organization'){
		this.authguardservice.getauditorsbyorg(sessionStorage.getItem("idofloginUser"))
		  .subscribe(data => {
			  
				this.userdata = JSON.parse(data);
				if(this.userdata.status == 0){
					this.snack.open(this.userdata.message, 'Close', { duration: 2000 });
					this.items = [];
					
					
				}else if(this.userdata.status == 1){
					this.items = this.userdata.data;
					 //console.log(this.items);
				}else{
					this.snack.open("No data to display", 'Close', { duration: 2000 });
					this.items = [];
				}
		});
	}
  }

  openPopUp(data: any = {} ,isNew? ) {
	
	  if(this.url=='Member'){
		  
		  this.title = isNew ? 'Add New Member' : 'Update Member';
	  }
	   if(this.url=='Organization'){
		    
		  this.title = isNew ? 'Add New Organization' : 'Update Organization';
	  }
	   if(this.url=='Auditor'){
		  
		  this.title = isNew ? 'Add New Auditor' : 'Update Auditor';
	  }
	 
    let dialogRef: MatDialogRef<any> = this.dialog.open(NgxTablePopupComponent, {
      width: '720px',
      disableClose: true,
      data: { title: this.title, payload: data}
    })
	
    dialogRef.afterClosed()
      .subscribe(res => {
        if(!res) {
          // If user press cancel
          return;
        }
        this.loader.open();
        if (isNew) {
          this.authguardservice.addUser(res,this.url)
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
          this.authguardservice.editUser(data.ID, res)
            .subscribe(data => {
              this.respondstatus = JSON.parse(data);
				// console.log(this.userdata.status);
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
    this.confirmService.confirm({message: `Delete ${row.Fname+" "+row.Lname}?`})
      .subscribe(res => {
        if (res) {
			this.authguardservice.deleteuser(row.ID)
			.subscribe(data => {
			  this.respondstatus = JSON.parse(data);
				// console.log(this.userdata.status);
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
	  // console.log(row);
	  }
    })
  }
}