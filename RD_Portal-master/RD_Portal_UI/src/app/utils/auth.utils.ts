import {HttpHeaders} from '@angular/common/http';

export const getHeader = ():any=>{
    let headers = new HttpHeaders({
        'content-type':'application/json',
        'Authorization': "Bearer " + localStorage.getItem('TOKEN')
    })
    return {headers};
}

export const getHeaderForUpload = ():any =>{
    let headers = new HttpHeaders({
        'Authorization': "Bearer " + localStorage.getItem('TOKEN')
    })
    return {headers};
}

export const getHeaderForDownload = ():any =>{
    let headers = new HttpHeaders({
        'content-type':'application/json',
        'Authorization': "Bearer " + localStorage.getItem('TOKEN'),
    })
    return {'responseType':"blob",headers};
}
export const getHeaderForgotpass = (userId):any=>{
    let headers = new HttpHeaders({
        'content-type':'application/json',
        'Authorization': "Bearer " + userId
    })
    return {headers};
}