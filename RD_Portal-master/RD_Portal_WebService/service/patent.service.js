const patentModel = require('../model/patent.model');
const serviceUtils = require('../utils/service.util');
const {ID_PREFIX} = require('../keys/constant');

const { ApiError } = require('../objectCreator/objectCreator');

const patentService = {};

//changing getAllPatent  to getAllPatentsSummary =>

patentService.getAllPatents= () => {
    return patentModel.getallPatent()
    .then(response =>{
        if(response){
            return serviceUtils.mapPatentForUser(response);
        }
        throw new ApiError("patents not found", 404);
    })
}

patentService.createNewPatent = (patentDetails, userId) => {
    return patentModel.getallPatent().then( allPatents => allPatents.length )
        .then( count => serviceUtils.generateId(ID_PREFIX.PATENT,count) )
        .then( patentId =>{
            //ui should send createdAt date
            // let history =[{
            //                 commitMessage:'Project created',
            //                 userId,
            //                 updatedDate : projectDetails.createdAt
            //             }];
            //             patentDetails.history = history;
            return patentModel.createNewProject({patentId, ...patentDetails})
                .then(response => {
                    if(response) return response;
                    throw new ApiError("Patent not Added. Please! try Later ", 500);
                });
        })
        .then( response =>{
            return {patentId: response.patentId, message :`patent #${response.patentId} created successfully`};
        });
}
patentService.getallPatents = () => {
    return patentModel.getallPatent()
        .then(response =>{
            if(response) return response;
            throw new ApiError("patents not found", 404);
        });
} 

patentService.getPatentById = patentId => {
    return patentModel.getPatentById(patentId)
        .then(response => {
            if(response){
            
                return response;
            } 
            throw new ApiError("Patent not found", 404);
        });
}
patentService.updatePatentById = (patentUpdates,patentId) => {
    return patentModel.updatePatentById(patentId,patentUpdates)
    .then(response => {
        if(response) return {response,message:`Publication Updated Successfully`};
        throw new ApiError("Publication not Updated. Please! try Later ", 500);
    })
}
module.exports = patentService;