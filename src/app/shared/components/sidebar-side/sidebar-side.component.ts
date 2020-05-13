import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { NavigationService } from "../../../shared/services/navigation.service";
import { ThemeService } from '../../services/theme.service';
import { Subscription } from "rxjs";
import PerfectScrollbar from 'perfect-scrollbar';

@Component({
  selector: 'app-sidebar-side',
  templateUrl: './sidebar-side.component.html'
})
export class SidebarSideComponent implements OnInit, OnDestroy, AfterViewInit {
  private sidebarPS: PerfectScrollbar;
  public menuItems: any[];
  public hasIconTypeMenuItem: boolean;
  public iconTypeMenuTitle: string;
  private menuItemsSub: Subscription;
  name : any;
  constructor(
    private navService: NavigationService,
    public themeService: ThemeService,
  ) { }

  ngOnInit() {
    this.iconTypeMenuTitle = this.navService.iconTypeMenuTitle;
	const usertype = sessionStorage.getItem('typeofloginUser');
	if(usertype=='Admin'){
		this.menuItemsSub = this.navService.adminmenuItems.subscribe(menuItem => {
			// console.log(menuItem);
		  this.menuItems = menuItem;
		  //Checks item list has any icon type.
		  this.hasIconTypeMenuItem = !!this.menuItems.filter(item => item.type === 'icon').length;
		});
	}else if(usertype=='Organization'){
		this.menuItemsSub = this.navService.organizationmenuItems.subscribe(menuItem => {
		  this.menuItems = menuItem;
		  //Checks item list has any icon type.
		  this.hasIconTypeMenuItem = !!this.menuItems.filter(item => item.type === 'icon').length;
		});
	}else if(usertype=='Member'){
		this.menuItemsSub = this.navService.membermenuItems.subscribe(menuItem => {
		  this.menuItems = menuItem;
		  //Checks item list has any icon type.
		  this.hasIconTypeMenuItem = !!this.menuItems.filter(item => item.type === 'icon').length;
		});
	}else if(usertype=='Auditor'){
		this.menuItemsSub = this.navService.auditormenuItems.subscribe(menuItem => {
		  this.menuItems = menuItem;
		  //Checks item list has any icon type.
		  this.hasIconTypeMenuItem = !!this.menuItems.filter(item => item.type === 'icon').length;
		});
	}else{
		this.menuItemsSub = this.navService.menuItems$.subscribe(menuItem => {
		  this.menuItems = menuItem;
		  //Checks item list has any icon type.
		  this.hasIconTypeMenuItem = !!this.menuItems.filter(item => item.type === 'icon').length;
		});
	}
	this.name = sessionStorage.getItem('nameofloginUser');
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.sidebarPS = new PerfectScrollbar('#scroll-area', {
        suppressScrollX: true
      })
    })
  }
  ngOnDestroy() {
    if(this.sidebarPS) {
      this.sidebarPS.destroy();
    }
    if(this.menuItemsSub) {
      this.menuItemsSub.unsubscribe()
    }
  }

}
