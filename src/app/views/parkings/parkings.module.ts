import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StarRatingModule } from 'angular-star-rating';

import { 
  MatInputModule,
  MatCheckboxModule,
  MatIconModule,
  MatCardModule,
  MatMenuModule,
  MatProgressBarModule,
  MatButtonModule,
  MatChipsModule,
  MatListModule,
  MatGridListModule,
  MatExpansionModule,
  MatTableModule,
  MatPaginatorModule,
  MatTooltipModule,
  MatToolbarModule,
  MatSidenavModule,
  
  

 } from '@angular/material';

 import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select'
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../../shared/shared.module';

import { ParkingsComponent } from './parkings.component';
import { ParkingsRoutes } from "./parkings.routing";
import { FilterparkingsComponent } from './filterparkings/filterparkings.component';
import { ParkingDetailsComponent } from './parking-details/parking-details.component';
import { HeaderComponent } from './header/header.component';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';

@NgModule({
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'Your google map key here'
    }),
	CommonModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatProgressBarModule,
    MatButtonModule,
    MatChipsModule,
    MatListModule,
    MatGridListModule,
    FlexLayoutModule,
    ChartsModule,
    NgxDatatableModule,
    SharedModule,
	MatInputModule,
	MatCheckboxModule,
	MatSelectModule,
	MatExpansionModule,
	MatTableModule,
	MatPaginatorModule,
	ReactiveFormsModule,
	FormsModule,
	MatTooltipModule,
	MatToolbarModule,
	MatSidenavModule,
	StarRatingModule,
	MatRadioModule,
   
    RouterModule.forChild(ParkingsRoutes)
  ],
  declarations: [ParkingsComponent, FilterparkingsComponent, ParkingDetailsComponent, HeaderComponent, ImageViewerComponent],
   entryComponents:[ImageViewerComponent],
  exports: [MatRadioModule]
})
export class ParkingsModule {

}
