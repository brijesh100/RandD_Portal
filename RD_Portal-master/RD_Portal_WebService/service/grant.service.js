const grantModel = require('../model/grant.model');
const serviceUtils = require('../utils/service.util');
const {ID_PREFIX} = require('../keys/constant');

const { ApiError } = require('../objectCreator/objectCreator');
const { response } = require('express');

const grantService = {};
grantService.createNewGrant = (grantDetails, userId) => {
    return grantModel.getAllGrants().then( allGrants => allGrants.length )
        .then( count => serviceUtils.generateId(ID_PREFIX.GRANTS, count) )
        .then( grantId =>{
            let history =[{
                commitMessage:'Grant created',
                userId
            }];
            grantDetails.history = history;
            console.log(grantDetails);
            return grantModel.createNewGrant({grantId, ...grantDetails})
                .then(response => {
                    if(response) return response;
                    throw new ApiError("Grant not Added. Please! try Later ", 500);
                });
        })
        .then( response =>{
            return {grantId: response.grantId, message :`Grant #${response.grantId} created successfully`};
        });
}

module.exports = grantService;