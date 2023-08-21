const departmentModel = require('../model/department.model');
const projectModel = require('../model/project.model');
const projectService = require('../service/project.service');
const fundingModel = require('../model/funding.model');
const userModel = require('../model/user.model');
const patentModel = require('../model/patent.model');
const { ApiError } = require('../objectCreator/objectCreator');
const publicationModel = require('../model/publication.model');
const { getFPHistoryById } = require('../model/funding.model');
const departmentService = {};
var date=new Date;
var d=new Date;
function academicYear(dataYear,iterator){
    if(dataYear.getFullYear()==date.getFullYear()-iterator+1 && dataYear.getMonth()<6)
    {
        return true;}
    else if(dataYear.getFullYear()==date.getFullYear()-iterator && dataYear.getMonth()>5)
    {
        return true;}
    else
    {return false;}
};
departmentService.insertScript = () => {
    return departmentModel.deleteAllDepartments()
        .then( response => {
            if(response.deletedCount === 0) throw new ApiError("No departments deleted", 404);
            return;
        })
        .then(() => departmentModel.insertSampleDepartments())
        .then(response => {
            if (response.length > 0) return response.length
            throw new ApiError("Can't insert projects",500);
        })
};

departmentService.getAllDepartments = () => {
    return departmentModel.getAllDepartments()
        .then(response => {
            if(response) return response;
            throw new ApiError("Departments not found", 404);
        });
};

departmentService.getDepartmentSnapshot = () => {
    return departmentModel.getAllDepartments()
        .then(response => {
            if(response){
               
               return response.map( dept => ({departmentId:dept.departmentId, departmentName:dept.departmentName}) );
            }
            throw new ApiError("Departments not found", 404);
        })
        .then(departments =>{
            
            return projectModel.getCountByStatus('01').then( ongoingProjects =>{
                return departments.map(dept => {

                    return {onGoingCount : ongoingProjects.filter(proj => proj.projectDepartment[0] === dept.departmentId).length,
                            ...dept}  
                    
                })
            });
        })
        .then(departments =>{
            return projectModel.getCountByStatus('02').then( completedProjects =>{
                return departments.map(dept => {
                    return {completedCount : completedProjects.filter(proj => proj.projectDepartment[0] === dept.departmentId).length,
                            ...dept}  
                }) 
            });
        })
        .then(departments =>{
            return projectModel.getAllProjects().then( approvalProjects =>{
                return departments.map(dept => {
                    totalprocount={}
                    barchartdata=[0,0,0,0,0,0]
                    procountarray=[]
                    for(i=0;i<3;i++)
                    {
                        project=approvalProjects.filter(project=>{
                                var d=new Date(project.start);
                                // if(project.projectDepartment.includes(dept.departmentId)){return d.getFullYear()==date.getFullYear()-i}})//this can be used for projects with multiple departments
                                if(project.projectDepartment[0]===dept.departmentId){return academicYear(d,i)}})
                        totalprocount[date.getFullYear()-i]=project.length;
                        procountarray[2-i]=project.length;
                    }
                    barchartdata[2]=totalprocount[date.getFullYear()-1]
                    barchartdata[3]=totalprocount[date.getFullYear()]
                    return {approvalProjectsCount : approvalProjects.filter(proj => proj.projectDepartment[0] === dept.departmentId && proj.isarchived!==true && proj.approved==false && proj.review==false).length,
                            totalprocount,
                            procountarray,
                            barchartdata,
                            ...dept}  
                }) 
            });
        })
        .then(departments =>{
            return publicationModel.getAllPublications().then( approvalPublications =>{
                return departments.map(dept => {
                    totalpubcount={}
                    pubcountarray=[]
                    publications=approvalPublications.filter(pub => pub.Department[0] === dept.departmentId && pub.isarchived!==true)
                    for(i=0;i<3;i++)
                    {publication=publications.filter(publication=>academicYear(publication.yearOfPublication,i))
                    totalpubcount[date.getFullYear()-i]=publication.length;
                    pubcountarray[2-i]=publication.length;
                    }
                    dept.barchartdata[4]=totalpubcount[date.getFullYear()-1]
                    dept.barchartdata[5]=totalpubcount[date.getFullYear()]
                    return {approvalPublicationsCount : publications.filter(proj=>proj.approved==false).length,
                            totalpubcount,
                            pubcountarray,
                            ...dept}  
                }) 
            });
        })
        .then(departments => {
            return userModel.getAllUser().then(users => {
                return departments.map(dept => {
                    var userpubratio=[];
                    user=users.filter(user=>user.userDepartmentId === dept.departmentId && user.isarchived===false).length
                    for(i=0;i<3;i++)
                    {
                    userpubratio[i]=user===0?0:dept.pubcountarray[i]/user;
                    }
                return {userpubratio,...dept}
                })
            })
        })
        .then(departments =>{
            return fundingModel.getAllFundingProjects().then( approvalFundings =>{
                return departments.map(dept => {
                    yearwiseratio={};
                    totalfuncount={};
                    funcountarray=[]
                    for(i=0;i<3 ;i++)
                    {
                        fund=approvalFundings.filter(fund=>{
                            if(fund.fundDates && fund.fundDates.applied)
                            {var d=new Date(fund.fundDates.applied)
                            fund.fundDates.applied=d }
                            else if(fund.fundDates && fund.fundDates.received)
                            {var d=new Date(fund.fundDates.received)
                            fund.fundDates.applied=d}
                            return fund});
                        fund=fund.filter(fun => fun.Department[0] === dept.departmentId && fun.isarchived!==true)
                        fund=fund.filter(funding=>funding.fundDates && funding.fundDates.applied && academicYear(funding.fundDates.applied))
                        // console.log(fund.length)
                        yearwiseratio[date.getFullYear()-i]=fund.length?parseInt(fund.filter(fund=>fund.status=="08").length)/parseInt(fund.length)*100:0;
                        totalfuncount[date.getFullYear()-i]=fund.length;
                        funcountarray[2-i]=fund.length;
                    }
                    dept.barchartdata[0]=totalfuncount[date.getFullYear()-1]
                    dept.barchartdata[1]=totalfuncount[date.getFullYear()]
                    return {approvalFundingsCount : approvalFundings.filter(fun => fun.Department[0] === dept.departmentId && fun.isarchived!==true && fun.approved==false).length,
                            receivedCount:approvalFundings.filter(funding=>funding.status==='08').length,
                            appliedCount:approvalFundings.filter(funding=>funding.status<'07').length,
                            yearwiseRatio:yearwiseratio,
                            funcountarray,
                            yearwiseCount:totalfuncount,
                            appliedAmount : approvalFundings.filter(fun => fun.Department[0] === dept.departmentId && fun.isarchived!==true).reduce((sum,current)=>{
                                if(current.fundingAmount)
                                {if(current.fundingAmount.applied)
                                    {return sum+parseInt(current.fundingAmount.applied)}
                                    return sum
                                }
                                return sum
                            },0),
                            receivedAmount : approvalFundings.filter(fun => fun.Department[0] === dept.departmentId && fun.isarchived!==true).reduce((sum,current)=>{
                                if(current.fundingAmount)
                                {if(current.fundingAmount.received)
                                    {return sum+parseInt(current.fundingAmount.received)}
                                    return sum
                                }
                                return sum
                            },0),
                            ...dept}  
                }) 
            });
        })
        .then(departments =>{
            return projectModel.getTeams().then( projectTeams =>{
                return departments.map(dept => {
                   let departmentProjects =  [...projectTeams.filter(proj =>proj.projectDepartment[0] === dept.departmentId)]; 
                   let uniqueContributors = new Set([].concat(...[...departmentProjects.map(proj => proj.team )]));
                    return {contributors : [...uniqueContributors].length, ...dept}  
                });
            });
        });
};

departmentService.getOverAllSnapshot = () => {
    let res={
    }
    return projectModel.getCountByStatus('01')
        .then(ongoingProjects => {
            projects={onGoingCount : ongoingProjects.length}
            // projects=ongoingProjects.filter(pro => academicYear(Date(pro.start),0))
            return projects
        })
        .then( projects =>{
            return projectModel.getCountByStatus('02').then(completedProjects =>{
                projects.completedCount = completedProjects.length;
                return projects;
            })
        })
        .then( projects =>{
            return projectModel.getCountByStatus('00').then(underReviewProjects =>{
                projects.underReview = underReviewProjects.length
                return projects
            })
        })
        .then( projects =>{
            return projectModel.getCountByStatus('03').then(inactiveProjects =>{
                projects.inactive = inactiveProjects.length
                return projects
            })
        })
        .then( projects =>{
            return projectService.getPriorityProjects().then(priorityProjects =>{
                projects.priorityCount = priorityProjects.length;
                return projects;
            })
        })
        .then( projects =>{
            return projectModel.getAllProjects().then(allProjects =>{
                allProjects = allProjects.filter(proj => proj.isarchived==false && (proj.isPriority==false || proj.isPriority==undefined))
                projects.researchProjects = allProjects.length;
                return projects;
            })
        })
        .then( projects =>{
            return projectModel.getAllProjects().then(allprojects =>{
                pro={
                    startedcount:{},
                    completedcount:{},
                    totalcount:{},
                    startedcountAY:{},
                    completedcountAY:{},
                    totalcountAY:{}
                }
                allprojects = allprojects.filter(project=>project.isarchived!=true && project.start);
                for(i=0;i<5;i++)
                {
                    //Basic Year Filter
                    project=allprojects.filter(project=>{
                        var start=new Date(project.start);
                        var end=new Date(project.end);
                        if(project.end){
                            return start.getFullYear()<=date.getFullYear()-i && end.getFullYear()>=date.getFullYear()-i;
                        }
                        return start.getFullYear()<=date.getFullYear()-i;
                    })
                    pro.startedcount[date.getFullYear()-i]=project.filter(project=>project.status==='01').length;
                    pro.completedcount[date.getFullYear()-i]=project.filter(project=>project.status==='02').length;
                    pro.totalcount[date.getFullYear()-i]=project.length;

                    //Academic Year Filter
                    //eg AY 2020-21 is mapped as 2020
                    project=allprojects.filter(project=>{
                        var start=new Date(project.start);
                        var flag1=true;
                        if(start.getMonth()<6){
                            flag1 = start.getFullYear()-1<=date.getFullYear()-i;
                        }
                        else{
                            flag1 = start.getFullYear()<=date.getFullYear()-i;
                        }
                        
                        if(flag1){
                            if(project.end!==""){
                                var end=new Date(project.end);
                                if(end.getMonth()<6){
                                    return end.getFullYear()>=date.getFullYear()-i;
                                }
                                else{
                                    return end.getFullYear()+1>=date.getFullYear()-i;
                                }
                            }
                            else{
                                return true;
                            }
                        }
                    })
                    pro.startedcountAY[date.getFullYear()-i]=project.filter(project=>project.status==='01').length;
                    pro.completedcountAY[date.getFullYear()-i]=project.filter(project=>project.status==='02').length;
                    pro.totalcountAY[date.getFullYear()-i]=project.length;
                }
                projects.pro=pro;
                return projects;
            })
        })
        .then( projects=>{ 
            return projectModel.getTeams().then(projectTeams =>{
                let uniqueContributors = new Set([].concat(...[...projectTeams.map(proj => proj.team)]))
                projects.contributors = [...uniqueContributors].length;
                return projects;
            })
        })
        .then( projects => {
            return departmentModel.getAllDepartments().then( departments =>{
                projects.researchLabs = [].concat(...[...departments.map( dept => dept.researchLab)]).length;
                res.projects=projects
                return res;
            })
        })
        .then( res => {
            return fundingModel.getAllFundingProjects().then( fundingproject =>{
                res.funding={
                    yearwiseRatio:{}
                }
                fundingproject = fundingproject.filter(funding=>funding.isarchived!==true)
                res.funding.receivedcount=fundingproject.filter(funding=>funding.status==='08').length;
                res.funding.appliedcount=fundingproject.filter(funding=>funding.status<'07').length;
                res.funding.totalratio=res.funding.receivedcount/fundingproject.length*100;
                for(i=0;i<5;i++)
                {
                    fund=fundingproject.filter(fund=>{
                        if(fund.fundDates && fund.fundDates.applied)
                        {var d=new Date(fund.fundDates.applied)
                        fund.fundDates.applied=d }
                        else if(fund.fundDates && fund.fundDates.received)
                        {var d=new Date(fund.fundDates.received)
                        fund.fundDates.applied=d}
                        return fund});
                    fund=fund.filter(funding=>funding.fundDates && funding.fundDates.applied && academicYear(funding.fundDates.applied))
                    res.funding.yearwiseRatio[date.getFullYear()-i]=fund.length?parseInt(fund.filter(fund=>fund.status=="08").length)/parseInt(fund.length)*100:0;
                }
                res.funding.appliedamount=fundingproject.filter(funding=>funding.isarchived==false && funding.status!=='07').reduce((sum,current)=>{
                    if(current.fundingAmount)
                    {
                        if(current.fundingAmount.applied)
                        {
                            return sum+parseInt(current.fundingAmount.applied)
                        }
                        return sum
                    }
                    return sum
                },0)
                res.funding.receivedamount=fundingproject.filter(funding=>funding.isarchived==false).reduce((sum,current)=>{
                    if(current.fundingAmount)
                    {
                        if(current.fundingAmount.received)
                        {
                            return sum+parseInt(current.fundingAmount.received)
                        }
                        return sum
                    }
                    return sum
                },0)
                // console.log(amount)
                return res ;
            })
        })
        .then(res=>{
            return publicationModel.getAllPublications().then(publication=>{
                res.publication={
                    scicount:{},
                    scopuscount:{},
                    ugccount:{},
                    othercount:{},
                    totalcount:{},
                }
                res.publication.totalpublishers = [...new Set(publication.map(item => item.publisherId[0]))].length
                // let publishers = new Map();
                // publication.forEach(publication=>{
                //     if(publishers.get(publication.publisherId[0])==undefined){
                //         publishers.set(publication.publisherId[0],1);
                //     }
                //     else{
                //         publishers.set(publication.publisherId[0],publishers.get(publication.publisherId[0])+1);
                //     }
                // })
                // res.totalpublisher= Object.fromEntries(publishers);
                publications=publication.filter(publication=> (publication.isarchived!=true || publication.isarchived==undefined) )
                for(i=0;i<5;i++)
                {publication=publications.filter(publication=> academicYear(publication.yearOfPublication,i))
                res.publication.scicount[date.getFullYear()-i]=publication.filter(publication=>publication.indexing=="SCI").length;
                res.publication.scopuscount[date.getFullYear()-i]=publication.filter(publication=>publication.indexing=="SCOPUS").length;
                res.publication.othercount[date.getFullYear()-i]=publication.length-res.publication.scopuscount[date.getFullYear()-i]-res.publication.scicount[date.getFullYear()-i];
                res.publication.totalcount[date.getFullYear()-i]=publication.length;
                }
                res.publication.scicount[0]=publications.filter(publication=>publication.indexing=="SCI").length;
                res.publication.scopuscount[0]=publications.filter(publication=>publication.indexing=="SCOPUS").length;
                res.publication.ugccount[0]=publications.filter(publication=>publication.indexing=="UGC").length;
                res.publication.othercount[0]=publications.length-res.publication.scopuscount[0]-res.publication.scicount[0]-res.publication.ugccount[0];
                
                return res
            })
        })
        .then(res=>{
            return patentModel.getallPatent().then(patent =>{
                patents = patent.filter(patent=>patent.isarchived!=true)
                let prev = patent.filter(p => p.patentYear== date.getFullYear()-1).length
                let cur = patent.filter(p => p.patentYear== date.getFullYear()).length
                res.patent = {
                    totalcount:{},
                    grantedpat:{},
                    pubpat:{},
                    ferSub:{},
                    "totalCount":patent.length,
                    "prevYear":prev,
                    "curYear":cur,
                }

                for(i=0;i<5;i++)
                {
                 patent=patents.filter(patent=> academicYear(patent.createdAt,i))
                res.patent.grantedpat[date.getFullYear()-i]=patent.filter(patent=>patent.patentStatus=="Granted").length;
                res.patent.pubpat[date.getFullYear()-i]=patent.filter(patent=>patent.patentStatus=="Published").length;
                res.patent.ferSub[date.getFullYear()-i]=patent.filter(patent=>patent.patentStatus=="FER Submitted").length;


                }
                
                res.patent.grantedpat[0]=patents.filter(patent=>patent.patentStatus=="Granted").length;
                res.patent.pubpat[0]=patents.filter(patent=>patent.patentStatus=="Published").length;
                res.patent.ferSub[0]=patents.filter(patent=>patent.patentStatus=="FER Submitted").length;



                return res
            })
        })
};


departmentService.createDepartment = departmentDetail => {
    return departmentModel.createDepartment(departmentDetail)
        .then(response => {
            if(response) return {message: `department #${response.departmentId} created successfully`};
            throw new ApiError("Department not created", 500);
        });
};

departmentService.createResearchLab = (researchLabDetail, departmentId) => {
    return departmentModel.createResearchLab(researchLabDetail, departmentId)
        .then(response => {
            if(response) {
                return {message: `Research lab created successfully`};
            }
            throw new ApiError("Research lab not created", 500);
        });
};
departmentService.getallArchived=(departmentId) =>{
    let res={
        projects:'',
        publications:'',
        fundingprojects:''
    }
    return projectModel.getAllProjects()
    .then(projects =>{
        res.projects=projects.filter(fil=> fil.isarchived==true && fil.projectDepartment[0] === departmentId)
        return res
    })
    .then(res =>{
        return fundingModel.getAllFundingProjects()
            .then(fundingprojects => {
                res.fundingprojects=fundingprojects.filter(fil=> fil.isarchived==true && fil.project.department.includes(departmentId))
                return res
            })
    })
    .then(res =>{
        return publicationModel.getAllPublications()
            .then(publications => {
                res.publications= publications.filter(fil=> fil.isarchived==true && fil.Department[0] === departmentId)
                return res
            })
    })
    .then(res=>{
        return userModel.getDepartmentUsers(departmentId)
        .then(users=>{
            res.users=users.filter(fil=>fil.isarchived==true)
            return res
        })

    })
}
departmentService.getProjectSnapshots = () =>{
    return departmentModel.getAllDepartments()
        .then(response => {
            if(response){
               
               return response.map( dept => ({departmentId:dept.departmentId, departmentName:dept.departmentName}) );
            }
            throw new ApiError("Departments not found", 404);
        })
        .then(departments =>{
            
            return projectModel.getCountByStatus('01').then( ongoingProjects =>{
                return departments.map(dept => {

                    return {onGoingCount : ongoingProjects.filter(proj => proj.projectDepartment[0] === dept.departmentId).length,
                            ...dept}  
                    
                })
            });
        })
        .then(departments =>{
            return projectModel.getCountByStatus('02').then( completedProjects =>{
                return departments.map(dept => {
                    return {completedCount : completedProjects.filter(proj => proj.projectDepartment[0] === dept.departmentId).length,
                            ...dept}  
                }) 
            });
        })
        .then(departments =>{
            return projectModel.getAllProjects().then( approvalProjects =>{
                return departments.map(dept => {
                    totalprocount={}
                    barchartdata=[0,0,0,0,0,0]
                    for(i=0;i<3;i++)
                    {
                        project=approvalProjects.filter(project=>{
                                var d=new Date(project.start);
                                // if(project.projectDepartment.includes(dept.departmentId)){return d.getFullYear()==date.getFullYear()-i}})//this can be used for projects with multiple departments
                                if(project.projectDepartment[0]===dept.departmentId){return d.getFullYear()==date.getFullYear()-i}})
                            barchartdata[2*i]=project.filter(project=>project.status==='01').length;
                            barchartdata[2*i+1]=project.filter(project=>project.status==='02').length;
                            totalprocount[date.getFullYear()-i]=project.length;
                    }
                    return {approvalProjectsCount : approvalProjects.filter(proj => proj.projectDepartment[0] === dept.departmentId && proj.isarchived!==true).length,
                            totalprocount,
                            barchartdata,
                            ...dept}  
                }) 
            });
        })

}

module.exports = departmentService;