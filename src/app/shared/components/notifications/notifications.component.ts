import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';
import { DataLayerGuard } from '../../services/datalayer.guard';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html'
})
export class NotificationsComponent implements OnInit {
  @Input() notificPanel;
  public responsedata:any;
  items:any[];
  length = false;
  // Dummy notifications
  notifications = [{
    message: 'New contact added',
    icon: 'assignment_ind',
    time: '1 min ago',
    route: '/inbox',
    color: 'primary'
  }, {
    message: 'New message',
    icon: 'chat',
    time: '4 min ago',
    route: '/chat',
    color: 'accent'
  }, {
    message: 'Server rebooted',
    icon: 'settings_backup_restore',
    time: '12 min ago',
    route: '/charts',
    color: 'warn'
  }]

  constructor(private router: Router,
	private dataservice:DataLayerGuard,) {}

  ngOnInit() {
    this.getItems();
	this.router.events.subscribe((routeChange) => {
        if (routeChange instanceof NavigationEnd) {
          this.notificPanel.close();
        }
    });
  }
  
  getItems() {
	let session = sessionStorage.getItem("typeofloginUser");
	if(session == 'Auditor'){
		this.dataservice.requestbyauditor(sessionStorage.getItem("idofloginUser"), sessionStorage.getItem("orgofloginUser"))
		  .subscribe(data => {
				this.responsedata = JSON.parse(data);
				// console.log(this.responsedata);
				if(this.responsedata.status == 0){
					this.items = [];
				}else if(this.responsedata.status == 1){
					this.items = this.responsedata.data;
					if(this.items.length > 0){
						this.length = true;
					}
					//this.message = this.responsedata.message;
					// console.log(this.items);
				}else{
					this.items = [];
				}
		});
	}else{
		this.items = [];
	}
  }
  
  clearAll(e) {
    e.preventDefault();
    this.notifications = [];
  }
}
