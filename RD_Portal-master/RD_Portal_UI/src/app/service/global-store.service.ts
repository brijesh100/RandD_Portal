import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GlobalStoreService {
    constructor(){

    }
    getGlobalStore(){
        return {
            userId:   localStorage.getItem('USERID'),
            userName:localStorage.getItem('USERNAME'),
            userDesignationCode:localStorage.getItem('USERDESIGNATIONCODE'),
            userDepartmentId:localStorage.getItem('USERDEPARTMENTID'),
            userDesignation:localStorage.getItem('USERDESIGNATION'),
            darktheme:localStorage.getItem('darktheme')
        }
    }
    setGlobalStore(globalData){
        localStorage.setItem('USERID',globalData.userId);
        localStorage.setItem('USERNAME',globalData.userName);
        localStorage.setItem('USERDESIGNATIONCODE',globalData.userDesignationCode);
        localStorage.setItem('USERDEPARTMENTID',globalData.userDepartmentId);
        localStorage.setItem('USERDESIGNATION',globalData.userDesignation);
        localStorage.setItem('lastAction',Date.now().toString());
        localStorage.setItem('darktheme',globalData.theme)
    }
    clearGlobalStore(){
       localStorage.clear();
    }
    settheme(isdark){
        localStorage.setItem('darktheme',isdark)
    }

}