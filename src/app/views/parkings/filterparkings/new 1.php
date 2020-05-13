


<!-- <p style="text-align:center;"><img src="assets/images/smallLogo.png"></p> -->
<!-- <h3 style="text-align:center;margin-top: -20px;">Filter Parkings</h3> -->
<div style="height: 100%;" >
  <!-- <mat-toolbar color="primary"> -->
    <!-- <mat-toolbar-row class="toolbarhere"> -->
      <!-- <button mat-icon-button (click)="sidenav.toggle()" fxShow="true" fxHide.gt-sm> -->
        <!-- <mat-icon>menu</mat-icon> -->
      <!-- </button> -->
      <!-- <img src="assets/images/smallLogo.png"> -->
      <!-- <span class="menu-spacer"></span> -->
      <!-- <div fxShow="true" fxHide.lt-md> -->
        <!-- <a routerLink="/sessions/signin" mat-button>Login</a> -->
        <!-- <a routerLink="/sessions/signup" mat-button>Register</a> -->
        <!-- <a routerLink="/parkings/filterparking" mat-button>Filter Parkings</a> -->
      <!-- </div> -->
    <!-- </mat-toolbar-row> -->
  <!-- </mat-toolbar> -->
<div class="main-wraper" style="background-image:url(background1366x768.jpg);background-size:100%;background-repeat:no-repeat; background-attachment: fixed;
background-position: center;
-webkit-background-size: cover;
-moz-background-size: cover;
-o-background-size: cover;
background-size: cover;
z-index: -1;">
  <mat-sidenav-container fxFlexFill>
    <mat-sidenav #sidenav>
      <mat-nav-list>
        <a (click)="sidenav.toggle()" href="" mat-list-item>Close</a>
        <a routerLink="/sessions/signin" mat-button>Login</a>
        <a routerLink="/sessions/signup" mat-button>Register</a>
        <a routerLink="/parkings/filterparking" mat-button>Filter Parkings</a>
      </mat-nav-list>
    </mat-sidenav>
    <mat-sidenav-content fxFlexFill >
	
	<div fxLayout="row" fxLayout.lt-sm="column" fxLayoutWrap="wrap" class="max-w" >
	<div fxFlex="30" style=" background:#fff">
	<img class="img-src" src="assets/images/esp1.png">
	</div>
	<div fxFlex="70" class="sidebartopright">
	</div>
	</div>
	<div fxLayout="row" fxLayout.lt-sm="column" fxLayoutWrap="wrap" class="max-w">
	<div fxFlex="30">
		<mat-card class="p-0" style="margin-top:5px;" >
				<div class="Filter">FIND PARKING </div>
				</mat-card>
				<div fxLayout="row" fxLayout.lt-sm="column" fxLayoutWrap="wrap" class="mt-1" style="margin-top: 0px !important;margin-bottom: 5px !important;">
				 <div fxFlex="99.9" class="mat-bg-primary m-0" style="margin-bottom: 1rem !important;">
					<mat-accordion>
					  <mat-expansion-panel>
						<mat-expansion-panel-header class="mat-bg-primary sidebarservice bc-color">
						  <mat-panel-title class="sidebarservice">Certified Truck Parking</mat-panel-title>
						</mat-expansion-panel-header>
						<div class="sidebartitle">EU PARKING STANDARD</div>
						
							 <div fxLayout="row" fxLayoutWrap="wrap" class="mt-1 text-center">
							 
							       <div fxFlex="100" fxFlex.gt-xs="19.98" *ngFor="let servicelevels of serviceLevelsArray; let i = index" class='services_img'>
							
									<input type="checkbox" [id]="'servicelevels'+i" (change)="addServiceTomatrix(servicelevels)" [checked]="servicelevels.colorfill"/>
									
									<label [for]="'servicelevels'+i"><img [src]="imagepathurl+servicelevels.ServiceLevelLogo" /><small>{{servicelevels.ServiceLevelName}} </small></label>			
						</div>
						<div class="sidebartitle" style="margin-right:154px;">ESPORG PARKING STANDARD</div>
						<div class="sidebartitle" style="display:flex;">
						<div style="padding-right:57px;" ><label>Security level </label>
						
						<button class="SecurityLock" mat-icon-button [color]="color" *ngFor="let ratingId of ratingArr;index as i" [id]="'star_'+i" (click)="onClick(i)"   >
								<mat-icon>
								{{showIcon(i)}}
							  </mat-icon>
                                </button>
					<!-- <img  src="assets/images/securitylock.png"> -->
						</div>
						<div><label>Service level</label>
					<star-rating-comp [starType]="'svg'" [staticColor]="'ok'" (onClick)="clickStarRating($event)"></star-rating-comp>
						
						</div>
						
						</div>
											
							</div> 
						</mat-expansion-panel> 
					</mat-accordion>					
					</div>
				 <div fxFlex="99.9" class="mat-bg-primary m-0">
					<mat-accordion>
					  <mat-expansion-panel style="padding-bottom:0px; !important">
						<mat-expansion-panel-header class="mat-bg-primary sidebarservice bc-color">
						  <mat-panel-title class="sidebarservice"> Non Certified Truck Parking</mat-panel-title>
						</mat-expansion-panel-header>
							<div fxLayout="row" fxLayoutWrap="wrap" class="mt-1 text-center">
							
								<div fxFlex="100" fxFlex.gt-xs="99.98"  class='services_img' style="display:flex;"  >
			       <div fxFlex="100" fxFlex.gt-xs="50.0"  class='services_img'>
				        <label class="sidebartitle" style="width:100%;display:inline-block !important;">DEDICATED TRUCK PARKING</label>
				   <label>
				        <input type="checkbox" id="chk3 " [(ngModel)]="bChecked2" checked="checked" id="img2"  value="Dedicated Truck parking" (change)="filterdataByparkingType1($event)"/>
								
						<label for="img2"><img class="img-src1"  style="width:30%" src="assets/images/esplogo.png" ></label></label>
				   
				   </div>
				   
				    <div fxFlex="100" fxFlex.gt-xs="50.0"  class='services_img'>
					     <label class="sidebartitle" style="width:100%;display: inline-block;">TRUCK SERVICE STATION
					     </label>
					    <input type="checkbox" id="chk4 " [(ngModel)]="bChecked3" checked="checked" id="img3"  value="Truck Service Station" (change)="filterdataByparkingType1($event)"/>
	                          
						<label for="img3"><img class="img-src1" style="width:30%" src="assets/images/servicestation.png" ></label>
					</div>
										
								</div> 								
							</div>
						</mat-expansion-panel> 
					</mat-accordion>					
					</div>
				
				</div>
				
					 <mat-card class="p-0">
					
						<div class="Filter">FILTER LIST BY </div>
						
						 </mat-card>
					<div fxLayout="row" fxLayout.lt-sm="column" fxLayoutWrap="wrap" class="mt-1" style="margin-top: 0px !important;">
					 <div fxFlex="99.9" class="mat-bg-primary m-0">
					<mat-accordion>
					  <mat-expansion-panel>
						<mat-expansion-panel-header class="mat-bg-primary sidebarservice bc-color">
						  <mat-panel-title class="sidebarservice">Service</mat-panel-title>
						</mat-expansion-panel-header>
							<div fxLayout="row" fxLayoutWrap="wrap" class="mt-1 text-center">
								<div fxFlex="100" fxFlex.gt-xs="19.98" *ngFor="let services of servicesArray; let i = index" class='services_img'>
									<input type="checkbox" [id]="i" (change)="filterdatabyservice(services)" [checked]="services.colorfill"/>
									<label [for]="i"><img [src]="imagepathurl+services.ServiceLogo" /><small>{{services.ServiceName}} </small></label>								
								</div> 								
							</div>
						</mat-expansion-panel> 
					</mat-accordion>					
					</div>
					<div fxFlex="99.9" class="mat-bg-primary  mt-1">
					<mat-accordion>
					  <mat-expansion-panel>
						<mat-expansion-panel-header class="mat-bg-primary bc-color" style="color: white !important;height: 29px !important;">
						  <mat-panel-title class="sidebarservice">Fuel cards</mat-panel-title>
						</mat-expansion-panel-header>
							<div fxFlex="100" fxFlex.gt-xs="100">
								<mat-card-content>		
									<div fxLayout="row" fxLayoutWrap="wrap" class="mt-1 text-center">
										<div fxFlex="100" fxFlex.gt-xs="19.98" *ngFor="let fuelcards of fuelcardsArray; let i = index" class='services_img'>
											<input type="checkbox" [id]="'fuelcards'+i" (change)="filterbyfuelcards(fuelcards)" [checked]="fuelcards.colorfill"/>
											<label [for]="'fuelcards'+i"><img [src]="imagepathurl+fuelcards.FuelCardLogo" /><small>{{fuelcards.FuelCardName}} </small></label>									
										</div> 
									</div>
								</mat-card-content>
							</div>
						</mat-expansion-panel> 
					</mat-accordion>					
					</div>
					<div fxFlex="99.9" class="mat-bg-primary  mt-1">
					<mat-accordion>
					  <mat-expansion-panel>
						<mat-expansion-panel-header class="mat-bg-primary bc-color" style="color: white !important;height: 29px !important;">
						  <mat-panel-title class="sidebarservice">Bank and credit cards</mat-panel-title>
						</mat-expansion-panel-header>
							<div fxLayout="row" fxLayoutWrap="wrap" class="mt-1 text-center">
								<div fxFlex="100" fxFlex.gt-xs="19.98" *ngFor="let bankcards of bankcardsArray; let i = index" class='services_img'>
									<input type="checkbox" [id]="'bankcards'+i" (change)="addBankCardsToParking(bankcards)" [checked]="bankcards.colorfill"/>
									<label [for]="'bankcards'+i"><img [src]="imagepathurl+bankcards.BankCardLogo" /><small>{{bankcards.BankCardName}} </small></label>								
								</div> 								
							</div>
						</mat-expansion-panel> 
					</mat-accordion>					
					</div>
					<div fxFlex="99.9" class="mat-bg-primary mt-1">
					<mat-accordion>
					  <mat-expansion-panel>
						<mat-expansion-panel-header class="mat-bg-primary bc-color" style="color: white !important;height: 29px !important;">
						  <mat-panel-title class="sidebarservice">Gas station</mat-panel-title>
						</mat-expansion-panel-header>
							<div fxLayout="row" fxLayoutWrap="wrap" class="mt-1 text-center">
								<div fxFlex="100" fxFlex.gt-xs="19.98" *ngFor="let gasstations of gasStationsArray; let i = index" class='services_img'>
									<input type="checkbox" [id]="'gasstations'+i" (change)="addGasStationToMatrix(gasstations)" [checked]="gasstations.colorfill"/>
									<label [for]="'gasstations'+i"><img [src]="imagepathurl+gasstations.Logo" /><small>{{gasstations.Name}} </small></label>								
								</div> 								
							</div>
						</mat-expansion-panel> 
					</mat-accordion>					
					</div>
					<div fxFlex="99.9" class="mat-bg-primary  mt-1">
					<mat-accordion>
					  <mat-expansion-panel>
						<mat-expansion-panel-header class="mat-bg-primary bc-color" style="color: white !important;height: 29px !important;">
						  <mat-panel-title class="sidebarservice">Service Level</mat-panel-title>
						</mat-expansion-panel-header>
							<div fxLayout="row" fxLayoutWrap="wrap" class="mt-1 text-center">
								<div fxFlex="100" fxFlex.gt-xs="19.98" *ngFor="let servicelevels of serviceLevelsArray; let i = index" class='services_img'>
									<input type="checkbox" [id]="'servicelevels'+i" (change)="addServiceTomatrix(servicelevels)" [checked]="servicelevels.colorfill"/>
									<label [for]="'servicelevels'+i"><img [src]="imagepathurl+servicelevels.ServiceLevelLogo" /><small>{{servicelevels.ServiceLevelName}} </small></label>								
								</div> 								
							</div>
						</mat-expansion-panel> 
					</mat-accordion>					
					</div>
					<!-- <div fxFlex="99.9" class="mat-bg-primary  mt-1">
					<mat-accordion>
					  <mat-expansion-panel>
						<mat-expansion-panel-header class="mat-bg-primary" style="color: white !important;height: 29px !important;">
						  <mat-panel-title>Security level ( bronze , silver, gold , platinumm</mat-panel-title>
						</mat-expansion-panel-header>
							<div fxLayout="row" fxLayoutWrap="wrap" class="mt-1 text-center">
								<div fxFlex="100" fxFlex.gt-xs="25">
									<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png" />						
								</div> 
								<div fxFlex="100" fxFlex.gt-xs="25">
									<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png" />						
								</div> 
								<div fxFlex="100" fxFlex.gt-xs="25">
									<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png" />						
								</div> 
								<div fxFlex="100" fxFlex.gt-xs="25">
									<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png" />						
								</div> 
								<div fxFlex="100" fxFlex.gt-xs="25">
									<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png" />						
								</div> 
								<div fxFlex="100" fxFlex.gt-xs="25">
									<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png" />						
								</div> 
							</div>
						</mat-expansion-panel> 
					</mat-accordion>					
					</div> -->
				</div>
			<!--</mat-card-content>
		</mat-card>-->
		<mat-card class="p-0" style="margin-top:0px;" >
		
						<mat-card-content class="cartcon1 m-1 ">
				<div fxLayout="row" fxLayout.lt-sm="column" fxLayoutWrap="wrap" class="mt-1" style="margin-top:0px;">
					<mat-form-field  class="full-width searchnaction"  >
					<div class="flex" style="display:flex; margin-top:0px;height: 22px; ">
							<input
							matInput
							type="text"
							name="website"
							placeholder="Search Parking Place"
							(input)="filterparkingby($event)"
							>
							<mat-icon aria-hidden="false" aria-label="Example search icon">search</mat-icon>
							</div>
							
								</mat-form-field>
					
						
					<div fxFlex="99.9"  class="pr-1">
						<mat-form-field class="full-width">
						
							<mat-label>Select Country</mat-label>									 
							<mat-select name="Country" (selectionChange)="CountryChane($event)">
								<mat-option value="allselected">All Country</mat-option>
								<mat-option *ngFor="let country of countryArray" value="{{country.ID}}">
									{{country.country}}
								</mat-option>
							</mat-select>
							
						</mat-form-field>
					</div>	
					<!-- <div fxFlex="99.9"  class="pr-1">
						<mat-form-field class="full-width">
						  <mat-label>Order By</mat-label>									 
							<mat-select name="Country" (selectionChange)="CityChane($event)">
								<mat-option value="city">City </mat-option>
								<mat-option value="Highway"> Highway</mat-option>
								<mat-option value="Exit"> Exit</mat-option>
							</mat-select>
						</mat-form-field>
					</div> -->
					</div>
					</mat-card-content>
					</mat-card >
			
	</div>	
	
	<div fxFlex="70"  *ngIf="!urlparkingID" >
	<!-- <div fxFlex="100" fxFlex.gt-xs="75" *ngIf="router.url === '/parkings/filterparking' "> -->
		
		<h5 class="heading-text">Truckpakinglots in Germany Ordered by: Roadnumber - Exit</h5>
			
			
				
				
				<div fxLayout="row" fxLayout.lt-sm="column" fxLayoutWrap="wrap" class="mt-1">
			
			<ngx-datatable style="width:100% ; "
				   class="material ml-0 mr-0 "
				  [rows]="filterparkings"
				  [columnMode]="'flex'"
				  [headerHeight]="28"
				  [footerHeight]="50"
				  [limit]="10"
				
				  [rowHeight]="'auto'">

			<ngx-datatable-column   name="Parking Name" [flexGrow]="2" >
	
				<ng-template class="rowdata" let-row="row" ngx-datatable-cell-template >
				
				<a style routerLink="/parkings/filterparking/{{row?.ID}}" >{{ row?.Name }}</a>
			
					<!-- <a routerLink="/parkings/filterparking/{{row?.ID}}" style="color:blue">{{ row?.Name }}</a> -->
				</ng-template>
			</ngx-datatable-column> 
			
			 <ngx-datatable-column name="Postcode" [flexGrow]="1"> 
            <ng-template let-row="row" ngx-datatable-cell-template > 
		
               {{row?.PostCode}}
			  
             </ng-template> 
           </ngx-datatable-column>
		   
			 <ngx-datatable-column name="City" [flexGrow]="1"> 
            <ng-template let-row="row" ngx-datatable-cell-template > 
                {{row?.CityName}} 
             </ng-template> 
           </ngx-datatable-column>  
 
			  <ngx-datatable-column name="Highway " [flexGrow]="1"> 
            <ng-template let-row="row" ngx-datatable-cell-template > 
               {{row?.Highway}} 
             </ng-template> 
           </ngx-datatable-column>  
			<ngx-datatable-column name="Exit " [flexGrow]="1"> 
            <ng-template let-row="row" ngx-datatable-cell-template > 
                {{row?.Exits}} 
             </ng-template> 
           </ngx-datatable-column>	

		   
          <!-- <ngx-datatable-column name="Actions" [flexGrow]="1">
            <ng-template let-row="row" ngx-datatable-cell-template>
              <button mat-icon-button mat-sm-button color="primary" class="mr-1" (click)="openPopUp(row)" matTooltip="Edit"><mat-icon>edit</mat-icon></button>
              <button mat-icon-button mat-sm-button color="warn" (click)="deleteItem(row)" matTooltip="Delete"><mat-icon>delete</mat-icon></button>
            </ng-template>
          </ngx-datatable-column> -->
		 	
        </ngx-datatable>
	 
				</div>
				<!-- <mat-paginator [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons></mat-paginator> -->
			
	
	</div>
	
	
	<div  fxFlex="50" *ngIf="urlparkingID">
	<app-parking-details></app-parking-details>
	</div>
	<div fxFlex="20" *ngIf="urlparkingID">
	<!-- <mat-card class="p-0"> -->
			<mat-card-content class="m-1 mp">
			<img class="sideimg1 img-h" src="assets/images/sidetop.jpg">
			<img class="sideimg1" src="assets/images/designMAP-pdf.jpg">
			<img class="sideimg1 pos1" src="assets/images/side2.jpg">
			<img class="sideimg1 pos2" src="assets/images/side3.jpg">
			<img class="sideimg1 pos3" src="assets/images/side4.jpg">
			</mat-card-content>
	<!-- </mat-card> -->
	</div>
	
</div>
	
	</mat-sidenav-content>
  </mat-sidenav-container>
</div></div>
