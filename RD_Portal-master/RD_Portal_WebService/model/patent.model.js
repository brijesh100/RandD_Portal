const collection = require('./DB/connection');
const { COLLECTION_NAME } = require('../keys/constant');
const { response } = require('express');
const { Collection } = require('mongoose');

const patentModel = {};

patentModel.getallPatent = () => {
    return collection.getCollection(COLLECTION_NAME.PATENT)
    .then(model => model.find())
    .then(response =>  response);
}

patentModel.createNewProject = (patentDetails) => {
    console.log(patentDetails)
    return collection.getCollection(COLLECTION_NAME.PATENT)
        .then(model => model.create(patentDetails))
        .then(response =>  response);
}
patentModel.getPatentById = patentId => {
    return collection.getCollection(COLLECTION_NAME.PATENT)
        .then(model => model.findOne({patentId}))
        .then(response =>  response);
}
patentModel.updatePatentById = (patentId,patentDetails) => {
    return collection.getCollection(COLLECTION_NAME.PATENT)
        .then(model => model.findOneAndUpdate({patentId},{$set:{...patentDetails}},{new:true}))
        .then(response =>  response);
}
module.exports = patentModel;