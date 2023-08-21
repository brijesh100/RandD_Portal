import { Router } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { Injectable, NgZone } from '@angular/core';
import { ApiClientService } from "../service/api-client.service";
import { GlobalStoreService } from '../service/global-store.service';
const MINUTES_UNITL_AUTO_LOGOUT = 10 // in Minutes
const CHECK_INTERVALL = 1000 // in ms
const STORE_KEY = 'lastAction';

@Injectable({
    providedIn: 'root'
  })
export class AutoLogoutService {

  constructor(
    private auth: AuthGuardService,
    private router: Router,
    private ngZone: NgZone,
    private service: ApiClientService,
    private globalStore: GlobalStoreService
  ) {
    this.check();
    this.initListener();
    this.initInterval();
  }

  get lastAction() {
    return parseInt(localStorage.getItem(STORE_KEY));
  }
  set lastAction(value) {
    localStorage.setItem(STORE_KEY,value.toString() );
  }

  initListener() {
    this.ngZone.runOutsideAngular(() => {
      document.body.addEventListener('click', () => this.reset());
    });
  }

  initInterval() {
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        this.check();
      }, CHECK_INTERVALL);
    })
  }

  reset() {
    this.lastAction = Date.now();
  }

  check() {
    const now = Date.now();
    const timeleft = this.lastAction + MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
    const diff = timeleft - now;
    const isTimeout = diff < 0;
    const {userId}=this.globalStore.getGlobalStore();
    this.ngZone.run(() => {
      if (isTimeout ) {
        let a=false;
        this.service.setlastseen(userId).subscribe(res=>{
          localStorage.clear();
          this.router.navigate(['auth/login']);
        })
        
      }
    });
  }
  
}