const fundingModel = require('../model/funding.model');
const serviceUtils = require('../utils/service.util');
const projectModel = require('../model/project.model');
const {ID_PREFIX} = require('../keys/constant');

const { ApiError } = require('../objectCreator/objectCreator');
const { response } = require('express');

const fundingService = {};

fundingService.getAllFundingsSummary = () => {
    return fundingModel.getAllFundings()
        .then(response => {
            if(response) return response;
            throw new ApiError("Fundings not found", 404);
        });
}
fundingService.archiveFundingProjectById =(fundingId,userId)=>{
    
    return fundingModel.archiveFundingProjectById(fundingId,userId)
    .then(response=>{
        if(response) return response;
            throw new ApiError("Cannot approve", 500);
    });
}
fundingService.restoreFundingProjectById =(fundingId,userId)=>{
    console.log('service  ',fundingId)
    return fundingModel.restoreFundingProjectById(fundingId,userId)
    .then(response=>{
        if(response) return response;
            throw new ApiError("Cannot approve", 500);
    });
}
fundingService.createNewFunding = (fundingDetails, userId) => {
    return fundingModel.getAllFundings().then( allFundings => allFundings.length )
        .then( count => serviceUtils.generateId(ID_PREFIX.FUNDING, count) )
        .then( fundingId =>{
            let history =[{
                commitMessage:'Funding created',
                userId
            }];
            fundingDetails.history = history;
            return fundingModel.createNewFunding({fundingId, ...fundingDetails})
                .then(response => {
                    if(response) return response;
                    throw new ApiError("Funding not Added. Please! try Later ", 500);
                });
        })
        .then( response =>{
            return {fundingId: response.fundingId, message :`Funding #${response.fundingId} created successfully`};
        });
}

fundingService.getFundingDetailById = fundingId => {
    return fundingModel.getFundingDetailById(fundingId)
        .then(response => {
            if(response) return response;    
            throw new ApiError("Funding not found", 404);
        });
        
}

fundingService.updateFundingDetailById = (fundingUpdates, fundingId) => {
    return fundingModel.getFundingHistoryById(fundingId)
    .then( historyResponse => {
        fundingUpdates.history = [fundingUpdates.history, ...historyResponse.history];
        return fundingUpdates;
        })
        .then( fundingDetails => fundingModel.updateFundingDetailById(fundingDetails, fundingId))
        .then(response => {
            if(response)
                return {response, message :`Funding #${response.fundingId} updated successfully`};
            throw new ApiError("Project not updated", 403);
        }) 
}


/*===Funding-project modal===*/

fundingService.getFundingProjectById = fundingProjectId => {
    return fundingModel.getFundingProjectById(fundingProjectId)
        .then(response => {
            if(response){
                // let investigatorPromises = serviceUtils.mapIdToUser([response.investigator]);
                // let coInvestigatorPromises = serviceUtils.mapIdToUser(response.coInvestigator);
                // console.log(response)
                // return Promise.all(investigatorPromises,coInvestigatorPromises).then(resolved =>{
                //     console.log(resolved)
                //     response.investigator = resolved[0];
                //     response.coInvestigator = resolved[1];
                //     console.log(response)
                //     return response;    
                // });
                return response;
            }  
            throw new ApiError("Funding Project not found", 404);
        })
        .then(response=>{
            return projectModel.getProjectById(response.project.projectId)
            .then(project=>{
                response.project.projectKeyword=project.keywords
                response.project.department=project.projectDepartment
                if(response) return response;    
                throw new ApiError("Funding not found", 404);
            })
        })
}

fundingService.getFundingsByProjectId = projectId => {
    return fundingModel.getFundingsByProjectId(projectId)
        .then(response => {
            if(response) return serviceUtils.mapFundingProjectForUser(response);    
            throw new ApiError("Funding not found", 404);
        });
}

fundingService.getApprovalFundings =() =>{
    return fundingModel.getApprovalFundings()
        .then(response =>{
            if(response){
                return response;
            }
            throw new ApiError("Funding not found", 404);
        })
}

fundingService.addReceivedFundingProject = (fundingProjectDetails, userId) => {
    return fundingModel.getAllFundingProjects().then( allFundingProjects => allFundingProjects.length )
        .then( count => serviceUtils.generateId(ID_PREFIX.FUNDING_PROJECTS, count) )
        .then( fundingProjectId =>{
            let history =[{
                commitMessage:'Funding created',
                userId
            }];
            fundingProjectDetails.history = history;
            return fundingModel.addReceivedFundingProject({fundingProjectId, ...fundingProjectDetails})
                .then(response => {
                    if(response) return response;
                    throw new ApiError("Funding project not Added. Please! try Later ", 500);
                });
        })
        .then( response =>{
            return {fundingProjectId: response.fundingProjectId, message :`Received Funding project #${response.fundingProjectId} created successfully`};
        });
}

fundingService.updateReceivedFPById = (fpUpdates, fundingProjectId) => {
    return fundingModel.getFPHistoryById(fundingProjectId)
    .then( historyResponse => {
        fpUpdates.history = [fpUpdates.history, ...historyResponse.history];
        return fpUpdates;
        })
        .then( fpUpdates => fundingModel.updateFundingProjectById(fpUpdates, fundingProjectId))
        .then(response => {
            if(response){
                    return {response, message :`Funding project #${response.fundingProjectId} updated successfully`};
            } 
            throw new ApiError("Funding project not updated", 403);
        }) 
}

fundingService.addFolderPathApplication = (filledApplication, fundingProjectId) => {
    return fundingModel.addFolderPathApplication(filledApplication, fundingProjectId)
        .then(response =>{ if(!response.isExternal){
                return {
                        status :'02',
                        applicationChecks:{
                            filled: true,
                            hod: false,
                            principal: false,
                            proposal: false,
                            technical: false ,   
                        }
                    }
            }
        })
        .then (updates =>{
           return fundingModel.updateFundingProjectById(updates, fundingProjectId)
        })
        .then(response => {
            if(response){
                return {response, message :`Filled Application uploaded Successfully`};
            } 
            throw new ApiError("Filled Application not uploaded", 403);
        }) 
}

fundingService.addFolderPathAck = (acknowlegdment, fundingProjectId) => {
    return fundingModel.addFolderPathAck(acknowlegdment, fundingProjectId)
        .then(response =>{ if(response){ return {status :'04'} }
        })
        .then (updates =>{
           return fundingModel.updateFundingProjectById(updates, fundingProjectId)
        })
        .then(response => {
            if(response){
                return {response, message :`Acknowledgement uploaded Successfully`};
            } 
            throw new ApiError("Acknowledgement not uploaded", 403);
        }) 
}

fundingService.approveFundingById =(fundingProjectId,userId)=>{
    console.log("service")
    return fundingModel.approveFundingById(fundingProjectId,userId)
    .then(response=>{
        if(response) return response;
            throw new ApiError("Cannot approve", 500);
    });
}
fundingService.addRemarks =(fundingProjectId,remarks)=>{
    return fundingModel.addRemarks(fundingProjectId,remarks)
    .then(response=>{
        if(response) return response;
            throw new ApiError("Cannot add remarks", 500);
    });
}
module.exports = fundingService;
