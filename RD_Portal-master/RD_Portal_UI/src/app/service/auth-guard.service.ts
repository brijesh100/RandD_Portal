import { Injectable } from '@angular/core';
import { Router, CanActivateChild, CanActivate } from '@angular/router';

import { GlobalStoreService } from './global-store.service';

import {getCreateProjectAccess, isUserWithProfile, hasAdminAccess, getCreatePublicationAccess, getCreateFundingAccess} from "../utils/project.utils";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivateChild, CanActivate{
  constructor(private route: Router) { }
  canActivate():boolean{
    if(localStorage.getItem("TOKEN") === null ) return true;
    this.route.navigate(['/home']);
    return false; 
  }
  canActivateChild():boolean{
    if(localStorage.getItem("TOKEN") !== null )return true;
    this.route.navigate(['/auth/login']);
    return false; 
  }
}

@Injectable({
  providedIn: 'root'
})
export class ProjectCreateGuardService implements CanActivate{
  constructor(private route: Router, private globalStore: GlobalStoreService) { }
  canActivate():boolean{
    const {userDesignationCode} = this.globalStore.getGlobalStore();
    if(getCreateProjectAccess(userDesignationCode)) return true; 
    this.route.navigate(['/home']);
    return false; 
  }
}

@Injectable({
  providedIn: 'root'
})
export class PublicationCreateGuardService implements CanActivate{
  constructor(private route: Router, private globalStore: GlobalStoreService) { }
  canActivate():boolean{
    const {userDesignationCode} = this.globalStore.getGlobalStore();
    if(getCreatePublicationAccess(userDesignationCode)) return true; 
    this.route.navigate(['/home']);
    return false; 
  }
}
@Injectable({
  providedIn: 'root'
})
export class ConsultancyCreateGuardService implements CanActivate{
  constructor(private route: Router, private globalStore: GlobalStoreService) { }
  canActivate():boolean{
    const {userDesignationCode} = this.globalStore.getGlobalStore();
    if(getCreateProjectAccess(userDesignationCode)) return true; 
    this.route.navigate(['/home']);
    return false; 
  }
}

@Injectable({
  providedIn: 'root'
})
export class FundingCreateGuardService implements CanActivate{
  constructor(private route: Router, private globalStore: GlobalStoreService) { }
  canActivate():boolean{
    const {userDesignationCode} = this.globalStore.getGlobalStore();
    if(getCreateFundingAccess(userDesignationCode)) return true; 
    this.route.navigate(['/home']);
    return false; 
  }
}

@Injectable({
  providedIn: 'root'
})
export class OwnProfileGuardService implements CanActivate{
  constructor(private route: Router, private globalStore: GlobalStoreService) { }
  canActivate():boolean{
    const {userDesignationCode} = this.globalStore.getGlobalStore();
    if(isUserWithProfile(userDesignationCode)) return true; 
    this.route.navigate(['/home']);
    return false; 
  }
}

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate{
  constructor(private route: Router, private globalStore: GlobalStoreService) { }
  canActivate():boolean{
    const {userDesignationCode} = this.globalStore.getGlobalStore();
    if(hasAdminAccess(userDesignationCode)) return true; 
    this.route.navigate(['/home']);
    return false; 
  }
}