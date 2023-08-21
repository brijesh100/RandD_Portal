const publicationModel = require('../model/publication.model');
const serviceUtils = require('../utils/service.util');

const {ID_PREFIX} = require('../keys/constant');

const { ApiError } = require('../objectCreator/objectCreator');

const publicationService = {};

publicationService.insertScript = () => {
    return publicationModel.deleteAllPublications()
        // .then( response => {
        //     if(response.deletedCount === 0) throw new ApiError("No publications deleted", 404);
        //     return;
        // })
        .then(() => publicationModel.insertSamplePublications())
        .then(response => {
            if (response.length > 0) return response.length
            throw new ApiError("Can't insert publications",500);
        })
}

publicationService.getAllpublicationsSummary = () => {
    return publicationModel.getAllPublications()
        .then(response => {
            if(response) {
                return serviceUtils.mapPublicationForUser(response);
            }
            throw new ApiError("Project not found", 404);
        });
}
publicationService.getPublicationById = publicationId => {
    return publicationModel.getPublicationById(publicationId)
        .then(response => {
            if(response){
                return response;
            } 
            throw new ApiError("Publication not found", 404);
        });
}

publicationService.createNewPublication = publicationDetails => {
    return publicationModel.getAllPublications().then( allPublications => allPublications.length )
        .then( count => serviceUtils.generateId(ID_PREFIX.PUBLICATION,count) )
        .then( publicationId =>{
            return publicationModel.createNewPublication({publicationId, ...publicationDetails})
                .then(response => {
                    if(response) return response;
                    throw new ApiError("Publication not Added. Please! try Later ", 500);
                });
        })
        .then( response =>{
            return {response,message :`Publication #${response.publicationId} added successfully`};
        });
}

publicationService.approvePublicationById =(publicationId)=>{
    
    return publicationModel.approvePublicationById(publicationId)
    .then(response=>{
        if(response) return response;
            throw new ApiError("Cannot approve", 500);
    });
}

publicationService.getApprovalPublication =() =>{
    return publicationModel.getApprovalPublication()
        .then(response =>{
            if(response){
                return response;
            }
            throw new ApiError("Publication not found", 404);
        })
}

publicationService.addRemarks =(publicationId,remarks)=>{
    return publicationModel.addRemarks(publicationId,remarks)
    .then(response=>{
        if(response) return response;
            throw new ApiError("Cannot add remarks", 500);
    });
}
publicationService.addFolderPathApplication = (filledApplication, publicationId) => {
    console.log("inside service")
    return publicationModel.addFolderPathApplication(filledApplication, publicationId)
        .then(response => {
            if(response){
                return {response, message :`Filled Application uploaded Successfully`};
            } 
            throw new ApiError("Filled Application not uploaded", 403);
        }) 
}

publicationService.updatePublication = (publicationId,publicationDetails) => {
    
            return publicationModel.updatePublication(publicationId,publicationDetails)
                .then(response => {
                    if(response) return {response,message:`Publication Updated Successfully`};
                    throw new ApiError("Publication not Updated. Please! try Later ", 500);
                })
}
publicationService.archivePublicationById =(publicationId,userId)=>{
    return publicationModel.archivePublicationById(publicationId,userId)
    .then(response=>{
        if(response) return response;
            throw new ApiError("Cannot approve", 500);
    });
}
publicationService.restorePublicationById =(publicationId,userId)=>{
    return publicationModel.restorePublicationById(publicationId,userId)
    .then(response=>{
        if(response) return response;
            throw new ApiError("Cannot approve", 500);
    });
}
publicationService.lockPublicationById =(publicationId,userId)=>{
    return publicationModel.lockPublicationById(publicationId,userId)
    .then(response=>{
        if(response) return response;
            throw new ApiError("Cannot LOCK", 500);
    });
}
publicationService.unlockPublicationById =(publicationId,userId)=>{
    return publicationModel.unlockPublicationById(publicationId,userId)
    .then(response=>{
        if(response) return response;
            throw new ApiError("Cannot UNLOCK", 500);
    });
}
publicationService.getMatchingPublication = title => {
    return publicationModel.getMatchingPublications(title)
        .then(response => {
            if(response){
                return response;
            }
                
            throw new ApiError("Cannot search", 500);
        });
} 
module.exports = publicationService;
