const collection = require('./DB/connection');
const { COLLECTION_NAME } = require('../keys/constant');
const { response } = require('express');
const { Collection } = require('mongoose');

const consultancyModel = {};

consultancyModel.createNewProject = (consultancyDetails) => {
    return collection.getCollection(COLLECTION_NAME.CONSULTANCY)
        .then(model => model.create(consultancyDetails))
        .then(response =>  response);
}

consultancyModel.getallconsultancy = () => {
    return collection.getCollection(COLLECTION_NAME.CONSULTANCY)
    .then(model => model.find())
    .then(response =>  response);
}

consultancyModel.getconsultancyById = consultancyId => {
    return collection.getCollection(COLLECTION_NAME.CONSULTANCY)
        .then(model => model.findOne({consultancyId}))
        .then(response =>  response);
}
module.exports = consultancyModel;