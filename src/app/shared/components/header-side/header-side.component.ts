import { Component, OnInit, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { LayoutService } from '../../services/layout.service';
import { TranslateService } from '@ngx-translate/core';
import { DataLayerGuard } from '../../services/datalayer.guard';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-header-side',
  templateUrl: './header-side.template.html'
})
export class HeaderSideComponent implements OnInit {
  @Input() notificPanel;
  currentLang = 'en';
  public responsedata:any;
  message:any;
  public availableLangs = [{
    name: 'English',
    code: 'en',
  }, {
    name: 'Spanish',
    code: 'es',
  }]
  public egretThemes;
  public layoutConf:any;
  constructor(
    private themeService: ThemeService,
    private layout: LayoutService,
    public translate: TranslateService,
    private renderer: Renderer2,
	private dataservice:DataLayerGuard,
	private router:Router
  ) {}
  ngOnInit() {
	  this.getItems();
    this.egretThemes = this.themeService.egretThemes;
    this.layoutConf = this.layout.layoutConf;
    this.translate.use(this.currentLang);
  }
  
  getItems() {
	  // console.log("hitted");
	let session = sessionStorage.getItem("typeofloginUser");
	if(session == 'Auditor'){
		this.dataservice.requestbyauditor(sessionStorage.getItem("idofloginUser"), sessionStorage.getItem("orgofloginUser"))
		  .subscribe(data => {
				this.responsedata = JSON.parse(data);
				// console.log(this.responsedata);
				if(this.responsedata.status == 0){
					this.message = 0;
				}else if(this.responsedata.status == 1){
					this.message = this.responsedata.message;
					// console.log(this.items);
				}else{
					this.message = 0;
				}
		});
	}else{
		this.message = 0;
	}
  }
  
  logout(){
	sessionStorage.removeItem('nameofloginUser');
	sessionStorage.removeItem('idofloginUser');
	sessionStorage.removeItem('orgofloginUser');
	sessionStorage.removeItem('typeofloginUser');
	this.router.navigate(['/sessions/signin']);	
  }
  
  setLang(e) {
    console.log(e)
    this.translate.use(this.currentLang);
  }
  changeTheme(theme) {
    this.themeService.changeTheme(this.renderer, theme);
  }
  toggleNotific() {
    this.notificPanel.toggle();
  }
  toggleSidenav() {
    if(this.layoutConf.sidebarStyle === 'closed') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full'
      })
    }
    this.layout.publishLayoutChange({
      sidebarStyle: 'closed'
    })
  }

  toggleCollapse() {
    // compact --> full
    if(this.layoutConf.sidebarStyle === 'compact') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full'
      }, {transitionClass: true})
    }

    // * --> compact
    this.layout.publishLayoutChange({
      sidebarStyle: 'compact'
    }, {transitionClass: true})

  }
}