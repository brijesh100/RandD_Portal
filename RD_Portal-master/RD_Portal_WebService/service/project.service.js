const projectModel = require('../model/project.model');
const serviceUtils = require('../utils/service.util');
const {ID_PREFIX} = require('../keys/constant');

const { ApiError } = require('../objectCreator/objectCreator');

const projectService = {};

projectService.insertScript = () => {
    return projectModel.deleteAllprojects()
        // .then( response => {
        //     if(response.deletedCount === 0) throw new ApiError("No projects deleted", 404);
        //     return;
        // })
        .then(() => projectModel.insertSampleProjects())
        .then(response => {
            if (response.length > 0) return response.length
            throw new ApiError("Can't insert projects",500);
        })
}


projectService.getAllProjectsSummary = () => {
    return projectModel.getAllProjects()
        .then(response => {
            if(response) {
                // need to test this for archived removal 
                response = response.filter(project => project.isarchived==false || project.isarchived==undefined);
                return serviceUtils.mapProjectSummary(response);
            }
            throw new ApiError("Project not found", 404);
        });
}

projectService.getProjectsByLabId = labId => {
    return projectModel.getProjectsByLabId(labId)
        .then(response => {
            if(response) return response;
            throw new ApiError("Project not found", 404);
        });
}
projectService.getApprovalProject =() =>{
    return projectModel.getApprovalProjects()
        .then(response =>{
            if(response){
                return response;
            }
            throw new ApiError("Project not found", 404);
        })
}
projectService.getProjectById = projectId => {
    return projectModel.getProjectById(projectId)
        .then(response => {
            if(response){
                let teamPromises = serviceUtils.mapIdToUser(response.team);
                return Promise.all(teamPromises).then(team =>{
                    response.team = team;
                    return response;
                });
            } 
            throw new ApiError("Project not found", 404);
        });
}

projectService.createNewProject = (projectDetails, userId) => {
    return projectModel.getAllProjects().then( allProjects => allProjects.length )
        .then( count => serviceUtils.generateId(ID_PREFIX.PROJECT,count) )
        .then( projectId =>{
            //ui should send createdAt date
            let history =[{
                            commitMessage:'Project created',
                            userId,
                            updatedDate : projectDetails.createdAt
                        }];
            projectDetails.history = history;
            return projectModel.createNewProject({projectId, ...projectDetails})
                .then(response => {
                    if(response) return response;
                    throw new ApiError("Project not Added. Please! try Later ", 500);
                });
        })
        .then( response =>{
            return {projectId: response.projectId, message :`Project #${response.projectId} created successfully`};
        });
}

projectService.updateProjectById = (projectUpdates,projectId) => {
    return projectModel.getProjectHistoryById(projectId)
    .then( historyResponse => {
        projectUpdates.history = [projectUpdates.history, ...historyResponse.history];
        return projectUpdates;
        })
        .then( projectDetails => projectModel.updateProjectById(projectDetails, projectId))
        .then(response => {
            if(response){
                let teamPromises = serviceUtils.mapIdToUser(response.team);
                return Promise.all(teamPromises).then(team =>{
                    response.team = team;
                    return {response, message :`Project #${response.projectId} updated successfully`};
                });
            } 
            throw new ApiError("Project not updated", 403);
        });
}

projectService.getProjectNamesByUserId = (projectName, userId) => {
    return projectModel.getAllprojectNames(projectName, userId)
        .then(response => {
            if(response) return response;
            throw new ApiError("Cannot search", 500);
        });
} 
projectService.approveProjectById =(projectId,userId)=>{
    return projectModel.approveProjectById(projectId,userId)
    .then(response=>{
        if(response) return response;
            throw new ApiError("Cannot approve", 500);
    });
}
projectService.reviewProjectById =(projectId)=>{
    return projectModel.reviewProjectById(projectId)
    .then(response=>{
        if(response) return response;
            throw new ApiError("Cannot review", 500);
    });
}

projectService.addRemarks =(projectId,remarks)=>{
    return projectModel.addRemarks(projectId,remarks)
    .then(response=>{
        if(response) return response;
            throw new ApiError("Cannot add remarks", 500);
    });
}
projectService.addReviewRemarks =(projectId,remarks)=>{
    return projectModel.addReviewRemarks(projectId,remarks)
    .then(response=>{
        if(response) return response;
            throw new ApiError("Cannot add remarks", 500);
    });
}
projectService.addFolderPathApplication = (filledApplication, projectId) => {
    //console.log("inside service")
    return projectModel.addFolderPathApplication(filledApplication, projectId)
        .then(response => {
            if(response){
                return {response, message :`Filled Application uploaded Successfully`};
            } 
            throw new ApiError("Filled Application not uploaded", 403);
        }) 
}
projectService.archiveProjectById =(projectId,userId)=>{
    return projectModel.archiveProjectById(projectId,userId)
    .then(response=>{
        if(response) return response;
            throw new ApiError("Cannot approve", 500);
    });
}
projectService.restoreProjectById =(projectId,userId)=>{
    return projectModel.restoreProjectById(projectId,userId)
    .then(response=>{
        if(response) return response;
            throw new ApiError("Cannot approve", 500);
    });
}
projectService.lockProjectById =(projectId,userId)=>{
    return projectModel.lockProjectById(projectId,userId)
    .then(response=>{
        if(response) return response;
            throw new ApiError("Cannot approve", 500);
    });
}
projectService.unlockProjectById =(projectId,userId)=>{
    return projectModel.unlockProjectById(projectId,userId)
    .then(response=>{
        if(response) return response;
            throw new ApiError("Cannot approve", 500);
    });
}
projectService.getKeywordProject =(keyword) =>{
    return projectModel.getKeywordProjects(keyword)
        .then(response =>{
            if(response){
                return response;
            }
            throw new ApiError("Project not found", 404);
        })
}
projectService.linkPublication =(projectId,publicationId)=>{
    return projectModel.linkpublication(projectId,publicationId)
    .then(response=>{
        if(response) return response;
            throw new ApiError("Cannot link publication", 500);
    });
}
// Priority project services
projectService.getPriorityProjects = () => {
    return projectModel.getAllProjects()
    .then(response => {
        if(response) return response.filter(project => project.isPriority && (project.isarchived==false || project.isarchived==undefined));
        throw new ApiError("Project not found", 404);
    })
}
module.exports = projectService;