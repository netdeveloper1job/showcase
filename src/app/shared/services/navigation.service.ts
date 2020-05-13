import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface IMenuItem {
  type: string,       // Possible values: link/dropDown/icon/separator/extLink
  name?: string,      // Used as display text for item and title for separator type
  state?: string,     // Router state
  icon?: string,      // Material icon name
  tooltip?: string,   // Tooltip text 
  disabled?: boolean, // If true, item will not be appeared in sidenav.
  sub?: IChildItem[], // Dropdown items
  badges?: IBadge[]
}
interface IChildItem {
  type?: string,
  name: string,       // Display text
  state?: string,     // Router state
  icon?: string,
  sub?: IChildItem[]
}

interface IBadge {
  color: string;      // primary/accent/warn/hex color codes(#fff000)
  value: string;      // Display text
}

@Injectable()
export class NavigationService {
  constructor() { }

   defaultMenu: IMenuItem[] = []
   separatorMenu: IMenuItem[] = []
   iconMenu: IMenuItem[] = []
   adminmenu: IMenuItem[] = [
    {
      name: 'HOME',
      type: 'icon',
      tooltip: 'Home',
      icon: 'home',
      state: 'dashboard'
    },
    {
      name: 'PROFILE',
      type: 'icon',
      tooltip: 'Profile',
      icon: 'person',
      state: 'profile/settings'
    },
    {
      name: 'Front Site',
      type: 'icon',
      tooltip: 'Front Site',
      icon: 'first_page',
      state: 'parkings'
    },
    {
      type: 'separator',
      name: 'Main Items'
    },
    {
      name: 'DASHBOARD',
      type: 'link',
      tooltip: 'Dashboard',
      icon: 'dashboard',
      state: 'dashboard',
      badges: [{ color: 'accent', value: 'Manage' }],
    },
	{
      name: 'Masters',
      type: 'dropDown',
      tooltip: 'Dialogs',
      icon: 'filter_none',
      sub: [
		{
		  name: 'Services',
		  type: 'link',
		  icon: 'history',
		  state: 'manage/services',
		},
		{
		  name: 'Bank Card',
		  type: 'link',
		  icon: 'history',
		  state: 'manage/bank-cards',
		},
		{
		  name: 'Fuel Card',
		  type: 'link',
		  icon: 'history',
		  state: 'manage/fuel-cards',
		},
		{
		  name: 'Gas Stations',
		  type: 'link',
		  icon: 'history',
		  state: 'manage/gas-stations',
		},
		{
		  name: 'Country',
		  type: 'link',
		  icon: 'history',
		  state: 'manage/country',
		},
		{
		  name: 'State',
		  type: 'link',
		  icon: 'history',
		  state: 'manage/state',
		},
		{
		  name: 'City',
		  type: 'link',
		  icon: 'history',
		  state: 'manage/city',
		},
		{
		  name: 'Postcode',
		  type: 'link',
		  icon: 'history',
		  state: 'manage/postcode',
		},
		  {
		  name: 'Service Level ( EU )',
		  type: 'link',
		  icon: 'history',
		  state: 'manage/Service_Level',
		},
        
      ]
    },
    {
      name: 'Members',
      type: 'link',
      tooltip: 'Manage Members',
      icon: 'person',
      state: 'manage/members',
      badges: [{ color: 'accent', value: 'Manage' }],
    },
	  {
      name: 'Organization',
      type: 'link',
      tooltip: 'Manage Organization',
      icon: 'person',
      state: 'manage/organization',
      badges: [{ color: 'accent', value: 'Manage' }],
    },
	  {
      name: 'Auditor',
      type: 'link',
      tooltip: 'Manage Auditor',
      icon: 'person',
      state: 'manage/auditor',
      badges: [{ color: 'accent', value: 'Manage' }],
    },
    {
      name: 'Parkings',
      type: 'link',
      tooltip: 'Manage Parkings',
      icon: 'directions_car',
      state: 'manage/parkings',
      badges: [{ color: 'accent', value: 'Manage' }],
    },
    {
      name: 'Audit Questions',
      type: 'link',
      tooltip: 'Manage Questions',
      icon: 'question_answer',
      state: 'manage/auditquestions',
    },
    {
      name: 'Audit Request',
      type: 'link',
      tooltip: 'Manage Request',
      icon: 'insert_drive_file',
      state: 'manage/auditrequests',
    },
    {
      name: 'Report History',
      type: 'link',
      tooltip: 'Report Histories',
      icon: 'history',
      state: 'manage/history',
    }	
  ]
  
  organizationmenu: IMenuItem[] = [
    {
      name: 'HOME',
      type: 'icon',
      tooltip: 'Home',
      icon: 'home',
      state: 'dashboard'
    },
    {
      name: 'PROFILE',
      type: 'icon',
      tooltip: 'Profile',
      icon: 'person',
      state: 'profile/settings'
    },
    {
      name: 'Front Site',
      type: 'icon',
      tooltip: 'Front Site',
      icon: 'first_page',
      state: 'parkings'
    },
    {
      type: 'separator',
      name: 'Main Items'
    },
    {
      name: 'DASHBOARD',
      type: 'link',
      tooltip: 'Dashboard',
      icon: 'dashboard',
      state: 'dashboard',
      badges: [{ color: 'accent', value: 'Manage' }],
    },
    {
      name: 'Members',
      type: 'link',
      tooltip: 'Manage Members',
      icon: 'person',
      state: 'manage/members',
      badges: [{ color: 'accent', value: 'Manage' }],
    },
    {
      name: 'Audits',
      type: 'link',
      tooltip: 'Questions',
      icon: 'question_answer',
      state: 'manage/audits',
      badges: [{ color: 'accent', value: 'Manage' }],
    }
  ]
  
  auditormenu: IMenuItem[] = [
    {
      name: 'HOME',
      type: 'icon',
      tooltip: 'Home',
      icon: 'home',
      state: 'dashboard'
    },
    {
      name: 'PROFILE',
      type: 'icon',
      tooltip: 'Profile',
      icon: 'person',
      state: 'profile/settings'
    },
    {
      name: 'Front Site',
      type: 'icon',
      tooltip: 'Front Site',
      icon: 'first_page',
      state: 'parkings'
    },
    {
      type: 'separator',
      name: 'Main Items'
    },
    {
      name: 'DASHBOARD',
      type: 'link',
      tooltip: 'Dashboard',
      icon: 'dashboard',
      state: 'dashboard',
      badges: [{ color: 'accent', value: 'Manage' }],
    },
    {
      name: 'Requests',
      type: 'link',
      tooltip: 'Requests',
      icon: 'insert_drive_file',
      state: 'manage/requests',
      badges: [{ color: 'accent', value: 'Manage' }],
    },
    {
      name: 'Audits',
      type: 'link',
      tooltip: 'Questions',
      icon: 'question_answer',
      state: 'manage/audits',
      badges: [{ color: 'accent', value: 'Manage' }],
    },
    {
      name: 'Responses',
      type: 'link',
      tooltip: 'Responses',
      icon: 'loupe',
      state: 'manage/responses',
      badges: [{ color: 'accent', value: 'View' }],
    }
  ]
  
  membermenu: IMenuItem[] = [
    {
      name: 'HOME',
      type: 'icon',
      tooltip: 'Home',
      icon: 'home',
      state: 'dashboard'
    },
    {
      name: 'PROFILE',
      type: 'icon',
      tooltip: 'Profile',
      icon: 'person',
      state: 'profile/settings'
    },
    {
      name: 'Front Site',
      type: 'icon',
      tooltip: 'Front Site',
      icon: 'first_page',
      state: 'parkings'
    },
    {
      type: 'separator',
      name: 'Main Items'
    },
    {
      name: 'DASHBOARD',
      type: 'link',
      tooltip: 'Dashboard',
      icon: 'dashboard',
      state: 'dashboard',
      badges: [{ color: 'accent', value: 'Manage' }],
    },
    {
      name: 'Parkings',
      type: 'link',
      tooltip: 'Manage Parkings',
      icon: 'directions_car',
      state: 'manage/parkings',
      badges: [{ color: 'accent', value: 'Manage' }],
    },
	{
      name: 'Audit Request',
      type: 'link',
      tooltip: 'Manage Request',
      icon: 'insert_drive_file',
      state: 'manage/auditrequests',
    },
    {
      name: 'Report History',
      type: 'link',
      tooltip: 'Report Histories',
      icon: 'history',
      state: 'manage/history',
    }
  ]

  // Icon menu TITLE at the very top of navigation.
  // This title will appear if any icon type item is present in menu.
  iconTypeMenuTitle: string = 'Your Section';
  // sets iconMenu as default;
  menuItems = new BehaviorSubject<IMenuItem[]>(this.iconMenu);
  auditormenuItems = new BehaviorSubject<IMenuItem[]>(this.auditormenu);
  adminmenuItems = new BehaviorSubject<IMenuItem[]>(this.adminmenu);
  organizationmenuItems = new BehaviorSubject<IMenuItem[]>(this.organizationmenu);
 membermenuItems = new BehaviorSubject<IMenuItem[]>(this.membermenu);
  // navigation component has subscribed to this Observable
  menuItems$ = this.menuItems.asObservable();

  // Customizer component uses this method to change menu.
  // You can remove this method and customizer component.
  // Or you can customize this method to supply different menu for
  // different user type.
  publishNavigationChange(menuType: string) {
    switch (menuType) {
      case 'separator-menu':
        this.menuItems.next(this.separatorMenu);
        break;
      case 'icon-menu':
        this.menuItems.next(this.iconMenu);
        break;
      default:
        this.menuItems.next(this.defaultMenu);
    }
  }
}