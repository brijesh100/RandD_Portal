import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from "./../../environments/environment";
import {getHeader, getHeaderForUpload, getHeaderForDownload} from '../utils/auth.utils';

@Injectable({
  providedIn: 'root'
})

export class ApiClientService {
  host:string = environment.apiURL;
  header:any;
  constructor( private http:HttpClient) {
   }

  throwError(err):string{
    let message:string = err.error.errorMessage;
    throw message || "Please try later";
  }

  //any should be replaced by respective model

  /*===============DEPARTMENT================= */
  getDepartments():Observable<any>{
    return this.http.get<any>(`${this.host}/department/all-departments`);
  }

  getDepartmentSnapshot():Observable<any>{
    return this.http.get<any>(`${this.host}/department/snapshot`);
  }

  getOverAllSnapshot():Observable<any>{
    return this.http.get<any>(`${this.host}/department/over-all-snapshot`);
  }

  createDepartment(departmentDetail):Observable<any>{
    return this.http.post<any>(`${this.host}/department/create-department`,departmentDetail, getHeader())
    .pipe( catchError(err => this.throwError(err)) );
  }

  createResearchLab(researchLabDetail, departmentId):Observable<any>{
    return this.http.put<any>(`${this.host}/department/create-research-lab/${departmentId}`,researchLabDetail, getHeader())
    .pipe( catchError(err => this.throwError(err)) );
  }
  getallarchived(deptId):Observable<any>{
    return this.http.get<any>(`${this.host}/department/allArchived/${deptId.departmentId}`);
  }
  getProjectSnapshot():Observable<any>{
    return this.http.get<any>(`${this.host}/department/project-snapshot`);
  }

  /*===============PROJECT================= */
  getAllProjectsSummary():Observable<any>{
    return this.http.get<any>(`${this.host}/project/all-summary`, getHeader());
  }
  getApprovalProjects():Observable<any>{
    return this.http.get<any>(`${this.host}/project/approval-summary`, getHeader());
  }
  getProjectsByLabId(researchLabId:string):Observable<any>{
    return this.http.get<any>(`${this.host}/project/lab/${researchLabId}`, getHeader());
  }

  getProjectById(projectId:string):Observable<any>{
    return this.http.get<any>(`${this.host}/project/overview/${projectId}`, getHeader());
  }

  createNewProject(projectDetails:any):Observable<any>{
    return this.http.post<any>(`${this.host}/project/create-new`, projectDetails, getHeader())
    .pipe( catchError(err => this.throwError(err)) );
  }

  updateProject(projectDetails:any, projectId:string):Observable<any>{
    return this.http.put<any>(`${this.host}/project/update/${projectId}`, projectDetails, getHeader())
    .pipe( catchError(err => this.throwError(err)) );
  }

  getMatchingProject(searchText:string):Observable<any>{
    return this.http.get<any>(`${this.host}/project/search-project/${searchText}`, getHeader());
  }
  approveProject(projectId:string):Observable<any>{
    return this.http.get<any>(`${this.host}/project/approve/${projectId}`, getHeader());
  }

  addRemarks(remarks:any, projectId:string):Observable<any>{
    return this.http.put<any>(`${this.host}/project/remark/${projectId}`, remarks, getHeader())
    .pipe( catchError(err => this.throwError(err)) );
  }
  reviewProject(projectId:string):Observable<any>{
    return this.http.get<any>(`${this.host}/project/review/${projectId}`, getHeader());
  }
  addReviewRemarks(projectId:string,remarks:any,):Observable<any>{
    return this.http.put<any>(`${this.host}/project/reviewRemark/${projectId}`, remarks, getHeader())
    .pipe( catchError(err => this.throwError(err)) );
  }

  uploadFileProject(formData:any, projectId:string):Observable<any>{
    return this.http.put<any>(`${this.host}/project/file-upload/${projectId}`, formData, getHeaderForUpload())
    .pipe( catchError(err => this.throwError(err)) );
  }

  uploadDetailFileProject(formData:any, projectId:string):Observable<any>{
    return this.http.put<any>(`${this.host}/project/detail-file-upload/${projectId}`, formData, getHeaderForUpload())
    .pipe( catchError(err => this.throwError(err)) );
  }

  downloadProjectDoc(path:any):Observable<any>{
    return this.http.post<any>(`${this.host}/project/download`,path, getHeaderForDownload())
    .pipe( catchError(err => this.throwError(err)) );
  }
  archiveProject(projectId:string):Observable<any>{
    return this.http.get<any>(`${this.host}/project/archive/${projectId}`, getHeader());
  }
  restoreProject(projectId:string):Observable<any>{
    return this.http.get<any>(`${this.host}/project/restore/${projectId}`, getHeader());
  }
  lockproject(projectId:string):Observable<any>{
    return this.http.get<any>(`${this.host}/project/lock/${projectId}`, getHeader());
  }
  unlockproject(projectId:string):Observable<any>{
    return this.http.get<any>(`${this.host}/project/unlock/${projectId}`, getHeader());
  }
  getKeywordProject(keyword:string):Observable<any>{
    return this.http.get<any>(`${this.host}/project/keyword/${keyword}`, getHeader());
  }
  linkPublication(publication:any, projectId:string):Observable<any>{
    return this.http.put<any>(`${this.host}/project/linkpublication/${projectId}`, publication, getHeader())
    .pipe( catchError(err => this.throwError(err)) );
  }
  // Priority Projects
  getPriorityProjects():Observable<any>{
    return this.http.get<any>(`${this.host}/project/all-priority`, getHeader())
    .pipe( catchError(err => this.throwError(err)) );
  }

  /*===============PUBLICATION================= */
  getAllPublicationsSummary():Observable<any>{
    return this.http.get<any>(`${this.host}/publication/all-summary`, getHeader());
  }

  createNewPublication(publicationDetails:any):Observable<any>{
    return this.http.post<any>(`${this.host}/publication/create-new`, publicationDetails, getHeader())
    .pipe( catchError(err => this.throwError(err)) );
  }

  uploadPublicationFile(formData:any, publicationId:string):Observable<any>{
    return this.http.put<any>(`${this.host}/publication/file-upload/${publicationId}`, formData, getHeaderForUpload())
    .pipe( catchError(err => this.throwError(err)) );
  }

  downloadPublicationDoc(path:any):Observable<any>{
    return this.http.post<any>(`${this.host}/publication/download`,path, getHeaderForDownload())
    .pipe( catchError(err => this.throwError(err)) );
  }

  getPublicationDetailsbyId(publicationId:string):Observable<any>{
    return this.http.get<any>(`${this.host}/publication/overview/${publicationId}`, getHeader());
  }

  approvePublication(publicationId:string):Observable<any>{
    return this.http.get<any>(`${this.host}/publication/approve/${publicationId}`, getHeader());
  }

  getApprovalPublication():Observable<any>{
    return this.http.get<any>(`${this.host}/publication/approval-summary`, getHeader());
  }

  updatePublication(publicationId,publicationDetails:any):Observable<any>{
    return this.http.put<any>(`${this.host}/publication/update/${publicationId}`, publicationDetails, getHeader())
    .pipe( catchError(err => this.throwError(err)) );
  }
  archivePublication(publicationId:string):Observable<any>{
    return this.http.get<any>(`${this.host}/publication/archive/${publicationId}`, getHeader());
  }
  restorePublication(publicationId:string):Observable<any>{
    return this.http.get<any>(`${this.host}/publication/restore/${publicationId}`, getHeader());
  }
  lockPublication(publicationId:string):Observable<any>{
    return this.http.get<any>(`${this.host}/publication/lock/${publicationId}`, getHeader());
  }
  unlockPublication(publicationId:string):Observable<any>{
    return this.http.get<any>(`${this.host}/publication/unlock/${publicationId}`, getHeader());
  }
  addPublicationRemarks(remarks:any, publicationId:string):Observable<any>{
    return this.http.put<any>(`${this.host}/publication/remark/${publicationId}`, remarks, getHeader())
    .pipe( catchError(err => this.throwError(err)) );
  }
  getMatchingPublication(title:string):Observable<any>{
    return this.http.get<any>(`${this.host}/publication/match-publication/${title}`, getHeader())
      .pipe( catchError(err => this.throwError(err)) );
  }
  /*===============FUNDING================= */


  getAllFundingsSummary():Observable<any>{
    return this.http.get<any>(`${this.host}/funding/all-summary`, getHeader());
  }

  createNewFunding(fundingDetails:any):Observable<any>{
    return this.http.post<any>(`${this.host}/funding/create-new`, fundingDetails, getHeader())
    .pipe( catchError(err => this.throwError(err)) );
  }

  getfundingDetailsById(fundingId:string):Observable<any>{
    return this.http.get<any>(`${this.host}/funding/detail/${fundingId}`, getHeader());
  }

  updateFunding(fundingDetails:any, fundingId:string):Observable<any>{
    return this.http.put<any>(`${this.host}/funding/update/${fundingId}`, fundingDetails, getHeader())
    .pipe( catchError(err => this.throwError(err)) );
  }


  /*========Grants=======*/

  createNewGrant(grantDetails:any):Observable<any>{
    return this.http.post<any>(`${this.host}/grant/create-new`, grantDetails, getHeader())
    .pipe( catchError(err => this.throwError(err)) );
  }


  /*========FUNDING-PROJECT=======*/
  archiveFundingProject(fundingProjectId:string):Observable<any>{

    return this.http.get<any>(`${this.host}/funding/archive/${fundingProjectId}`, getHeader());
  }
  restoreFundingProject(fundingProjectId:string):Observable<any>{
    return this.http.get<any>(`${this.host}/funding/restore/${fundingProjectId}`, getHeader());
  }
  getapprovalFunding():Observable<any>{
    return this.http.get<any>(`${this.host}/funding/approval-summary`, getHeader());
  }
  getfundingProjectById(fundingProjectId:string):Observable<any>{
    return this.http.get<any>(`${this.host}/funding/funding-project/detail/${fundingProjectId}`, getHeader());
  }

  getFundingsByProjectId(projectId:string):Observable<any>{
    return this.http.get<any>(`${this.host}/funding/funding-project/project/${projectId}`, getHeader());
  }

  addRecievedFundingProject(fundingProjectDetails:any):Observable<any>{
    return this.http.post<any>(`${this.host}/funding/funding-project/create`, fundingProjectDetails, getHeader())
    .pipe( catchError(err => this.throwError(err)) );
  }

  updateReceivedFundingProject(fundingProjectDetails:any, fundingProjectId:string):Observable<any>{
    return this.http.put<any>(`${this.host}/funding/funding-project/update/${fundingProjectId}`, fundingProjectDetails, getHeader())
    .pipe( catchError(err => this.throwError(err)) );
  }

  uploadFilledApplication(formData:any, fundingProjectId:string):Observable<any>{
    return this.http.put<any>(`${this.host}/funding/funding-project/filled-uplaod/${fundingProjectId}`, formData, getHeaderForUpload())
    .pipe( catchError(err => this.throwError(err)) );
  }

  uploadFpAck(formData:any, fundingProjectId:string):Observable<any>{
    return this.http.put<any>(`${this.host}/funding/funding-project/ack-uplaod/${fundingProjectId}`, formData, getHeaderForUpload())
    .pipe( catchError(err => this.throwError(err)) );
  }

  downloadFundingProjectDoc(path:any):Observable<any>{
    return this.http.post<any>(`${this.host}/funding/funding-project/download`,path, getHeaderForDownload())
    .pipe( catchError(err => this.throwError(err)) );
  }
  approveFunding(fundingProjectId:string):Observable<any>{
    return this.http.get<any>(`${this.host}/funding/funding-project/approve/${fundingProjectId}`, getHeader());
  }
  fpaddRemarks(remarks:any, fundingProjectId:string):Observable<any>{
    return this.http.put<any>(`${this.host}/funding/funding-project/remark/${fundingProjectId}`, remarks, getHeader())
    .pipe( catchError(err => this.throwError(err)) );
  }
  /*===============USER================= */

  getAllUser():Observable<any>{
    return this.http.get<any>(`${this.host}/user/profile/all`, getHeader())
    .pipe( catchError(err => this.throwError(err)) );
  }

  getUserById(userId:string):Observable<any>{
    return this.http.get<any>(`${this.host}/user/profile/${userId}`, getHeader())
    .pipe( catchError(err => this.throwError(err)) );
  }

  loginUser(loginDetails:any):Observable<any>{
    return this.http.post<any>(`${this.host}/user/login`, loginDetails)
      .pipe( catchError(err => this.throwError(err)) );
  }

  getProjectByUserId(userId:string):Observable<any>{
    return this.http.get<any>(`${this.host}/user/projects/${userId}`, getHeader());
  }

  getPublicationsByUserId(userId:string):Observable<any>{
    return this.http.get<any>(`${this.host}/user/publications/${userId}`, getHeader());
  }

  getFundingProjectByUserId(userId:string):Observable<any>{
    return this.http.get<any>(`${this.host}/user/funding-project/${userId}`, getHeader());
  }

  getConsultancyByUserId(userId:string):Observable<any>{
    return this.http.get<any>(`${this.host}/user/consultancy/${userId}`, getHeader());
  }

  getPatentByUserId(userId:string):Observable<any>{
    return this.http.get<any>(`${this.host}/user/patent/${userId}`, getHeader());
  }

  getMatchingUserId(userId:string):Observable<any>{
    return this.http.get<any>(`${this.host}/user/match-userId/${userId}`, getHeader())
      .pipe( catchError(err => this.throwError(err)) );
  }

  createUser(userDetails):Observable<any>{
    return this.http.post<any>(`${this.host}/user/create`, userDetails, getHeader())
    .pipe( catchError(err => this.throwError(err)) );
  }
  editUser(userDetails,userId):Observable<any>{
    return this.http.put<any>(`${this.host}/user/edit/${userId}`, userDetails, getHeader())
    .pipe( catchError(err => this.throwError(err)) );
  }

  updatePassword(passwords, userId):Observable<any>{
    return this.http.put<any>(`${this.host}/user/update-password/${userId}`, passwords, getHeader())
    .pipe( catchError(err => this.throwError(err)) );
  }
  FupdatePassword(passwords, userId):Observable<any>{
    return this.http.put<any>(`${this.host}/user/fupdate-password/${userId}`, passwords)
    .pipe( catchError(err => this.throwError(err)) );
  }
  getDepartmentUsers(deptId):Observable<any>{
    return this.http.get<any>(`${this.host}/user/department-users/${deptId}`, getHeader())
    .pipe( catchError(err => this.throwError(err)) );
  }
  archiveUser(userId):Observable<any>{
    return this.http.get<any>(`${this.host}/user/archive/${userId}`, getHeader());
  }
  restoreUser(userId):Observable<any>{
    return this.http.get<any>(`${this.host}/user/restore/${userId}`, getHeader());
  }
  addContact(userData,userId):Observable<any>{
    return this.http.put<any>(`${this.host}/user/contact/${userId}`, userData, getHeader())
    .pipe( catchError(err => this.throwError(err)) );
  }
  enabledark(userId):Observable<any>{
    return this.http.get<any>(`${this.host}/user/theme/dark/${userId}`, getHeader());
  }
  disabledark(userId):Observable<any>{
    return this.http.get<any>(`${this.host}/user/theme/light/${userId}`, getHeader());
  }
  adduserkeywords(keywords, userId):Observable<any>{
    return this.http.put<any>(`${this.host}/user/keywords/${userId}`, keywords, getHeader())
    .pipe( catchError(err => this.throwError(err)) );
  }
  keywordusers(keywords):Observable<any>{
    return this.http.put<any>(`${this.host}/user/matchkeywords/`, keywords, getHeader())
    .pipe( catchError(err => this.throwError(err)) );
  }
  setlastseen(userId):Observable<any>{
    return this.http.get<any>(`${this.host}/user/lastseen/${userId}` , getHeader())
    .pipe( catchError(err => this.throwError(err)) );
  }
  forgotPassword(userId:string):Observable<any>{
    return this.http.get<any>(`${this.host}/user/forgotpassword/${userId}`)
    .pipe( catchError(err => this.throwError(err)) );
  }
  checkOTP(userId:String, otp:any):Observable<any>{
    return this.http.put<any>(`${this.host}/user/checkotp/${userId}`, otp)
    .pipe( catchError(err => this.throwError(err)) );
  }
  setDefaultPass(userId:string):Observable<any>{
    return this.http.get<any>(`${this.host}/user/defaultpass/${userId}`)
    .pipe( catchError(err => this.throwError(err)) );
  }
  getUserPublicationOverview(userId:string):Observable<any>{
    return this.http.get<any>(`${this.host}/user/publication-overview/${userId}`, getHeader())
    .pipe( catchError(err => this.throwError(err)) );
  }
  /*===============Notification================= */

  addMessage(messageDetails):Observable<any>{
    return this.http.post<any>(`${this.host}/notification/add-message`, messageDetails, getHeader())
    .pipe( catchError(err => this.throwError(err)) );
  }
  getUserNotifications(userId:string):Observable<any>{
    return this.http.get<any>(`${this.host}/notification/get-message/${userId}`, getHeader())
    .pipe( catchError(err => this.throwError(err)) );
  }
  readUserNotifications(msgId:string):Observable<any>{
    return this.http.get<any>(`${this.host}/notification/read-message/${msgId}`, getHeader())
    .pipe( catchError(err => this.throwError(err)) );
  }

    /*===============PATENTS================= */

    getAllPatentsSummary():Observable<any>{
      return this.http.get<any>(`${this.host}/patent/all-summary/`, getHeader())
      .pipe( catchError(err => this.throwError(err)) );
    }

    addPatent(patentDetails):Observable<any>{
      return this.http.post<any>(`${this.host}/patent/add-patent`, patentDetails, getHeader())
      .pipe( catchError(err => this.throwError(err)) );
    }

    getallPatents():Observable<any>{
      return this.http.get<any>(`${this.host}/patent/get-patent/`, getHeader())
      .pipe( catchError(err => this.throwError(err)) );
    }

    getPatentById(patentId:string):Observable<any>{
      return this.http.get<any>(`${this.host}/patent/overview/${patentId}`, getHeader());
    }
    updatePatent(patentId,patentDetails:any):Observable<any>{
      return this.http.put<any>(`${this.host}/patent/update/${patentId}`, patentDetails, getHeader())
      .pipe( catchError(err => this.throwError(err)) );
    }


/*===============CONSULTANCY================= */

  addConsultancy(consultancyDetails):Observable<any>{
    return this.http.post<any>(`${this.host}/consultancy/add-consultancy`, consultancyDetails, getHeader())
    .pipe( catchError(err => this.throwError(err)) );
  }

  getConsultancyById(consultancyId:string):Observable<any>{
    return this.http.get<any>(`${this.host}/consultancy/overview/${consultancyId}`, getHeader());
  }

}


