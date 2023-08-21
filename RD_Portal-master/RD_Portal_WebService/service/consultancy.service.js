const consultancyModel = require('../model/consultancy.model');
const serviceUtils = require('../utils/service.util');
const {ID_PREFIX} = require('../keys/constant');

const { ApiError } = require('../objectCreator/objectCreator');

const consultancyService = {};

consultancyService.createNewconsultancy = (consultancyDetails, userId) => {
    return consultancyModel.getallconsultancy().then( allconsultancy => allconsultancy.length )
        .then( count => serviceUtils.generateId(ID_PREFIX.CONSULTANCY,count) )
        .then( consultancyId =>{
            return consultancyModel.createNewProject({consultancyId, ...consultancyDetails})
                .then(response => {
                    if(response) return response;
                    throw new ApiError("consultancy not Added. Please! try Later ", 500);
                });
        })
        .then( response =>{
            return {consultancyId: response.consultancyId, message :`consultancy #${response.consultancyId} created successfully`};
        });
}

consultancyService.getconsultancyById = consultancyId => {
    return consultancyModel.getconsultancyById(consultancyId)
        .then(response => {
            if(response){
            
                return response;
            } 
            throw new ApiError("Consultancy not found", 404);
        });
}

module.exports = consultancyService;