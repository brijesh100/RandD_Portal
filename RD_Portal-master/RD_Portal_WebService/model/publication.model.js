const collection = require('./DB/connection');
const samplePublications = require('../data/publications');
const { COLLECTION_NAME } = require('../keys/constant');

const publicationModel = {};

publicationModel.deleteAllPublications = () => {
    return collection.getCollection(COLLECTION_NAME.PUBLICATIONS)
        .then(model => model.deleteMany())
        .then(response => response);
}

publicationModel.insertSamplePublications = () => {
    return collection.getCollection(COLLECTION_NAME.PUBLICATIONS)
        .then(model => model.insertMany(samplePublications))
        .then(response => response);
}

publicationModel.getAllPublications = () => {
    return collection.getCollection(COLLECTION_NAME.PUBLICATIONS)
        .then(model => model.find().sort({ yearOfPublication: -1 }))
        .then(response => response);
}

publicationModel.createNewPublication = publicationDetails => {
    return collection.getCollection(COLLECTION_NAME.PUBLICATIONS)
        .then(model => model.create(publicationDetails))
        .then(response => response);
}
publicationModel.getPublicationById = publicationId => {
    return collection.getCollection(COLLECTION_NAME.PUBLICATIONS)
        .then(model => model.findOne({ publicationId }))
        .then(response => response);
}

publicationModel.approvePublicationById = (publicationId) => {
    return collection.getCollection(COLLECTION_NAME.PUBLICATIONS)
        .then(model => model.findOneAndUpdate({ publicationId }, { $set: { approved: true, Remarks: "" } }, { new: true }))
        .then(response => response);
}

publicationModel.getApprovalPublication = () => {
    return collection.getCollection(COLLECTION_NAME.PUBLICATIONS)
        .then(model => model.find({ approved: false }))
        .then(response => response);
}

publicationModel.addRemarks = (publicationId, Remarks) => {
    return collection.getCollection(COLLECTION_NAME.PUBLICATIONS)
        .then(model => model.findOneAndUpdate({ publicationId }, { $set: { Remarks: Remarks } }, { new: true }))
        .then(response => response);
}

publicationModel.addFolderPathApplication = (filledApplication, publicationId) => {
    console.log("inside model")
    return collection.getCollection(COLLECTION_NAME.PUBLICATIONS)
        .then(model => model.findOneAndUpdate({ publicationId }, { $set: { 'file.filledApplication': filledApplication } }, { new: true }))
        .then(response => response);
}

publicationModel.updatePublication = (publicationId, publicationDetails) => {
    return collection.getCollection(COLLECTION_NAME.PUBLICATIONS)
        .then(model => model.findOneAndUpdate({ publicationId }, { $set: { ...publicationDetails } }, { new: true }))
        .then(response => response);
}
publicationModel.archivePublicationById = (publicationId, userId) => {
    return collection.getCollection(COLLECTION_NAME.PUBLICATIONS)
        .then(model => model.findOneAndUpdate({ publicationId }, { $set: { isarchived: true } }, { new: true }))
        .then(response => response);
}
publicationModel.restorePublicationById = (publicationId, userId) => {
    return collection.getCollection(COLLECTION_NAME.PUBLICATIONS)
        .then(model => model.findOneAndUpdate({ publicationId }, { $set: { isarchived: false } }, { new: true }))
        .then(response => response);
}
publicationModel.lockPublicationById = (publicationId, userId) => {
    return collection.getCollection(COLLECTION_NAME.PUBLICATIONS)
        .then(model => model.findOneAndUpdate({ publicationId }, { $set: { islocked: true } }, { new: true }))
        .then(response => response);
}
publicationModel.unlockPublicationById = (publicationId, userId) => {
    return collection.getCollection(COLLECTION_NAME.PUBLICATIONS)
        .then(model => model.findOneAndUpdate({ publicationId }, { $set: { islocked: false } }, { new: true }))
        .then(response => response);
}
publicationModel.getMatchingPublications = (paperTitle) => {
    return collection.getCollection(COLLECTION_NAME.PUBLICATIONS)
        .then(model => model.find({ paperTitle: { $regex: paperTitle, $options: 'i' }, isarchived: false }, { paperTitle: 1, publicationId: 1, _id: 0 }).limit(5))
        .then(response => response);
}
module.exports = publicationModel;

