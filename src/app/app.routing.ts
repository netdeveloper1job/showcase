import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { AuthGuard } from './shared/services/auth/auth.guard';

export const rootRouterConfig: Routes = [
 
  { 
    path: '', 
    redirectTo: 'parkings/filterparking', 
    pathMatch: 'full' 
  },
   { 
    path: '', 
    redirectTo: 'parkingsmap', 
    pathMatch: 'full' 
  },
  {
    path: '', 
    component: AuthLayoutComponent,
    children: [
      { 
        path: 'sessions', 
        loadChildren: './views/sessions/sessions.module#SessionsModule',
        data: { title: 'Session'} 
      }
    ]
  },
   { 
	path: 'parkings',
	loadChildren: './views/parkings/parkings.module#ParkingsModule', 
	data: { title: 'Parkings', breadcrumb: 'PARKING'}
   },
  {		
    path: '', 
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dialogs', 
        loadChildren: './views/app-dialogs/app-dialogs.module#AppDialogsModule', 
        data: { title: 'Dialogs', breadcrumb: 'DIALOGS'}
      },
      {
        path: 'manage', 
        loadChildren: './views/cruds/cruds.module#CrudsModule', 
        //data: { title: 'CRUDs', breadcrumb: 'CRUDs'}
      },
      {
        path: 'icons', 
        loadChildren: './views/mat-icons/mat-icons.module#MatIconsModule', 
        data: { title: 'Icons', breadcrumb: 'MATICONS'}
      }
    ]
  },
  { 
    path: '**', 
    redirectTo: 'sessions/404'
  }
];

