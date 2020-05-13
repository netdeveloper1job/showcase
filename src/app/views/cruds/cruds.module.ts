import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StarRatingModule } from 'angular-star-rating';
import{ CKEditorModule} from '@ckeditor/ckeditor5-angular';

import { 
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatCardModule,
  MatMenuModule,
  MatButtonModule,
  MatChipsModule,
  MatListModule,
  MatTooltipModule,
  MatDialogModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatSlideToggleModule,
  MatTableModule,
  MatTabsModule,
  MatExpansionModule
 } from '@angular/material';
 import {MatSelectModule} from '@angular/material/select'
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../../shared/shared.module';

import { CrudsRoutes } from './cruds.routing';
import { CrudService } from './crud.service';

import * as $ from 'jquery';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxDatatableModule,
    MatInputModule,
	MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
	MatCheckboxModule,
    MatChipsModule,
    MatListModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSlideToggleModule,
	MatSelectModule,
	MatAutocompleteModule,
	MatSelectSearchModule,
	MatTableModule,
    MatTabsModule,
    MatExpansionModule,
    SharedModule,
	FormsModule,
	StarRatingModule,
    CKEditorModule,
    RouterModule.forChild(CrudsRoutes)
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [],
  providers: [CrudService],
  entryComponents: []
})
export class CrudsModule { }
