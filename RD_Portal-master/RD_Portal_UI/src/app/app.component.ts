import { Component,OnInit } from '@angular/core';
import { GlobalStoreService } from './service/global-store.service';
import { ThemeService } from './theme.service';
import { AutoLogoutService } from 'src/app/service/auto-logout';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { UrlService } from './utils/url.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  constructor(
    private globalStore: GlobalStoreService,
    private themeService: ThemeService,
    private autoLogout: AutoLogoutService,
    private router: Router,
    private urlService: UrlService
  ){}

  darktheme: any;
  previousUrl: string = null;
  currentUrl: string = null;
  ngOnInit(): void {
    // THEME TOGGLE FUNCTION
    const {darktheme} = this.globalStore.getGlobalStore();
    this.darktheme=darktheme
    if (darktheme=='true') {
      this.themeService.toggleDark();
    }
    else if(darktheme!='false') {
      this.themeService.toggleLight();
    }
    // Previous Url configuration
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.previousUrl = this.currentUrl;
      this.currentUrl = event.url;
      this.urlService.setPreviousUrl(this.previousUrl);
    });
  }
}
