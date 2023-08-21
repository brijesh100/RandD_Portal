const collection = require('./DB/connection');
const { COLLECTION_NAME } = require('../keys/constant');

const grantModel = {};

grantModel.getAllGrants = () => {
    return collection.getCollection(COLLECTION_NAME.GRANTS)
        .then(model => model.find().sort({createdAt: -1}))
        .then(response =>  response);
}

grantModel.createNewGrant = grantDetails => {
    return collection.getCollection(COLLECTION_NAME.GRANTS)
        .then(model => model.create(grantDetails))
        .then(response =>  response);
}


module.exports = grantModel;
