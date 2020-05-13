import { Component, OnInit, OnDestroy } from '@angular/core';
import { CrudService } from '../crud.service';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { AppConfirmService } from '../../../shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { TablePopupComponent } from './table-popup/table-popup.component';
import { Subscription } from 'rxjs';
import { egretAnimations } from "../../../shared/animations/egret-animations";
import { DataLayerGuard } from '../../../shared/services/datalayer.guard';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { ParkingService } from '../../../shared/services/parking.service';
@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  animations: egretAnimations
})
export class ParkingComponent implements OnInit, OnDestroy {
statusparking:any;	
PID:any;
style:any;
color:any;
status1:any;
jsonResponse:any;
	agent = { 
    "_id": "5bf7e1be80c05307d06423c2", 
    "agentId": "awais", 
    "attributes": [ 
      { "name": "Marketing", "type": "Boolean", "value": "true", }, 
     
      ], 
      "__v": 0 
      };
	  setValue(row , e){
		  
		 this.PID= row.ID;
		
    if(e.checked){
		
		this.statusparking='true'
		
	
      //this.agent.attributes[i].value = 'true'
    }else{
		this.statusparking='false'
	
      //this.agent.attributes[i].value = 'false'
    }
    //console.log(this.agent.attributes[i].value)
	
	const jsonarry = {
			
			statusparking:this.statusparking,
            parkingID:this.PID,
			
		}
	this.parkingservice.updateGridStatus(jsonarry)
			.subscribe(data => {
				this.jsonResponse = JSON.parse(data);
				if(this.jsonResponse.status == 0){
					this.snack.open(this.jsonResponse.message, 'Close', { duration: 2000 });
				}else if(this.jsonResponse.status == 1){
					this.snack.open(this.jsonResponse.message, 'Close', { duration: 2000 });
				}else{
					this.snack.open("No data to display", 'Close', { duration: 2000 });
				}
			});
		
  }
  public items: any[];
  public itemsarray: any[];
  public getItemSub: Subscription;
  public parkingdata:any;
  public respondstatus:any;
  
  constructor(
    private parkingservice:ParkingService,
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
    if(sessionStorage.getItem('typeofloginUser')=='Admin'){
		this.dataservice.getparkings()
		  .subscribe(data => {
				
				this.parkingdata = JSON.parse(data);
			
				
				if(this.parkingdata.status == 0){
					this.snack.open(this.parkingdata.message, 'Close', { duration: 2000 });
					this.items = [];
					//this.color="warn";
				}else if(this.parkingdata.status == 1)
				{
				
					this.items = this.parkingdata.data;
					this.itemsarray = this.parkingdata.data;
		
					
			
				}
				else{
					this.snack.open("No data to display", 'Close', { duration: 2000 });
					this.items = [];
				}
		});
	}else{
		this.dataservice.getparkingsbyuserid(sessionStorage.getItem('idofloginUser'))
		  .subscribe(data => {
				this.parkingdata = JSON.parse(data);
				// console.log(this.parkingdata.status);
				if(this.parkingdata.status == 0){
					this.snack.open(this.parkingdata.message, 'Close', { duration: 2000 });
					this.items = [];
				}else if(this.parkingdata.status == 1){
					this.items = this.parkingdata.data;
					this.itemsarray = this.parkingdata.data;
					// alert(this.items.status);
				}else{
					this.snack.open("No data to display", 'Close', { duration: 2000 });
					this.items = [];
				}
		});
	}
  }

  openPopUp(data: any = {}, isNew?) {
    let title = isNew ? 'Add new parking' : 'Update parking';
    let dialogRef: MatDialogRef<any> = this.dialog.open(TablePopupComponent, {
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
          this.dataservice.addparking(res)
		  .subscribe(data => {
				this.respondstatus = JSON.parse(data);
				// console.log(this.respondstatus);
				this.loader.close();
				if(this.respondstatus.status == 0){
					this.snack.open(this.respondstatus.message, 'Close', { duration: 2000 });
				}else if(this.respondstatus.status == 1){
					this.snack.open(this.respondstatus.message, 'Close', { duration: 2000 });
					this.router.navigate(['/manage/manage-details/'+this.respondstatus.data]);
					this.getItems()
				}else{
					this.snack.open("Something went wrong", 'Close', { duration: 2000 });
				}
		})
		// console.log(res);
        } else {
          this.dataservice.updateparking(data.ID, res)
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
  
  updateFilter(filterValue) {
    const lowerValue = filterValue.toLowerCase();

    this.items = this.itemsarray.filter(item => item.Name.toLowerCase().indexOf(lowerValue) !== -1 || !lowerValue);
  }
}