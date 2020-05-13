import { Routes } from '@angular/router';

import { ParkingsComponent } from './parkings.component';
import { FilterparkingsComponent } from './filterparkings/filterparkings.component';
import { ParkingDetailsComponent } from './parking-details/parking-details.component';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
export const ParkingsRoutes: Routes = [

 { path: 'filterparking', component: FilterparkingsComponent, data: { title: 'Parkings' } },
  { path: 'parkingsmap', component: ParkingsComponent, data: { title: 'Parkings' } },
 
  { path: 'parking-detail/:slug', component: ParkingDetailsComponent, data: { title: 'Parkings' } },
  { path: 'filterparking/:slug', component: FilterparkingsComponent, data: { title: 'Parkings' } }
];




