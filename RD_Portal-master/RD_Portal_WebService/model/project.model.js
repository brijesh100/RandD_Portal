const collection = require('./DB/connection');
const sampleProjects = require('../data/projects');
const { COLLECTION_NAME } = require('../keys/constant');
const { response } = require('express');

const projectModel = {};

projectModel.deleteAllprojects = () => {
    return collection.getCollection(COLLECTION_NAME.PROJECTS)
        .then(model => model.deleteMany())
        .then(response => response);
}

projectModel.insertSampleProjects = () => {
    return collection.getCollection(COLLECTION_NAME.PROJECTS)
        .then(model => model.insertMany(sampleProjects))
        .then(response => response);
}

projectModel.getProjectsByLabId = labId => {
    return collection.getCollection(COLLECTION_NAME.PROJECTS)
        .then(model => model.find({ projectLab: labId }).sort({ start: -1 }))
        .then(response => response);
}

projectModel.getProjectById = projectId => {
    return collection.getCollection(COLLECTION_NAME.PROJECTS)
        .then(model => model.findOne({ projectId }))
        .then(response => response);
}

projectModel.getAllProjects = () => {
    return collection.getCollection(COLLECTION_NAME.PROJECTS)
        .then(model => model.find().sort({ start: -1 }))
        .then(response => response);
}
projectModel.getApprovalProjects = () => {
    return collection.getCollection(COLLECTION_NAME.PROJECTS)
        .then(model => model.find({ approved: false, review: false }))
        .then(response => response);
}
projectModel.createNewProject = (projectDetails) => {
    return collection.getCollection(COLLECTION_NAME.PROJECTS)
        .then(model => model.create(projectDetails))
        .then(response => response);
}

projectModel.getProjectHistoryById = projectId => {
    return collection.getCollection(COLLECTION_NAME.PROJECTS)
        .then(model => model.findOne({ projectId }, { history: 1, _id: 0 }))
        .then(response => response);
}

projectModel.updateProjectById = (projectDetails, projectId) => {
    return collection.getCollection(COLLECTION_NAME.PROJECTS)
        .then(model => model.findOneAndUpdate({ projectId }, { $set: { ...projectDetails, review: false } }, { new: true }))
        .then(response => response);
}
//Added Code Here
projectModel.approveProjectById = (projectId, userId) => {
    return collection.getCollection(COLLECTION_NAME.PROJECTS)
        .then(model => model.findOneAndUpdate({ projectId }, { $set: { approved: true, 'edited.summaryedit': false, 'edited.keywordedit': false, 'edited.detailedit': false, 'history.0.approvedby': userId } }, { new: true }))
        .then(response => response);
}
projectModel.reviewProjectById = (projectId) => {
    return collection.getCollection(COLLECTION_NAME.PROJECTS)
        .then(model => model.findOneAndUpdate({ projectId }, { $set: { review: true } }, { new: true }))
        .then(response => response);
}

projectModel.addRemarks = (projectId, Remarks) => {
    return collection.getCollection(COLLECTION_NAME.PROJECTS)
        .then(model => model.findOneAndUpdate({ projectId }, { $push: { remarks: { $each: [Remarks], $position: 0 } } }, { new: true }))
        .then(response => response);
}
projectModel.addReviewRemarks = (projectId, Remarks) => {
    return collection.getCollection(COLLECTION_NAME.PROJECTS)
        .then(model => model.findOneAndUpdate({ projectId }, { $push: { "priority.remarkHistory": { $each: [Remarks], $position: 0 } } }, { new: true }))
        .then(response => response);
}

projectModel.getCountByStatus = (status) => {
    return collection.getCollection(COLLECTION_NAME.PROJECTS)
        .then(model => model.find({ status }, { projectDepartment: 1, _id: 0 }))
        .then(response => response);
}

projectModel.getTeams = () => {
    return collection.getCollection(COLLECTION_NAME.PROJECTS)
        .then(model => model.find({}, { team: 1, projectDepartment: 1, _id: 0 }))
        .then(response => response);
}

projectModel.getAllprojectNames = (projectTitle, userId) => {
    let projectRegex = new RegExp("^" + projectTitle, "i");
    return collection.getCollection(COLLECTION_NAME.PROJECTS)
        .then(model => model.find({ projectTitle: projectRegex, team: userId },
            { projectId: 1, projectTitle: 1, keywords: 1, projectDepartment: 1, _id: 0 }).limit(5))
        .then(response => response);
}
projectModel.getprojectCountbydept = deptname => {
    return collection.getCollection(COLLECTION_NAME.PROJECTS)
        .then(model => model.count({ "projectDepartment": deptname }))
        .then(response => response);
}

projectModel.uploadProjectById = (details, projectId) => {
    return collection.getCollection(COLLECTION_NAME.FUNDINGS)
        .then(model => model.findOneAndUpdate({ projectId }, { $set: { ...details } }, { new: true }))
        .then(response => response);
}
projectModel.addFolderPathApplication = (filledApplication, projectId) => {
    //console.log("inside model")
    return collection.getCollection(COLLECTION_NAME.PROJECTS)
        .then(model => model.findOneAndUpdate({ projectId }, { $set: { 'documents.filledApplication': filledApplication } }, { new: true }))
        .then(response => response);
}
projectModel.archiveProjectById = (projectId, userId) => {
    return collection.getCollection(COLLECTION_NAME.PROJECTS)
        .then(model => model.findOneAndUpdate({ projectId }, { $set: { isarchived: true } }, { new: true }))
        .then(response => response);
}
projectModel.restoreProjectById = (projectId, userId) => {
    return collection.getCollection(COLLECTION_NAME.PROJECTS)
        .then(model => model.findOneAndUpdate({ projectId }, { $set: { isarchived: false } }, { new: true }))
        .then(response => response);
}
projectModel.lockProjectById = (projectId, userId) => {
    return collection.getCollection(COLLECTION_NAME.PROJECTS)
        .then(model => model.findOneAndUpdate({ projectId }, { $set: { islocked: true } }, { new: true }))
        .then(response => response);
}
projectModel.unlockProjectById = (projectId, userId) => {
    return collection.getCollection(COLLECTION_NAME.PROJECTS)
        .then(model => model.findOneAndUpdate({ projectId }, { $set: { islocked: false } }, { new: true }))
        .then(response => response);
}
projectModel.getKeywordProjects = (keyword) => {
    return collection.getCollection(COLLECTION_NAME.PROJECTS)
        .then(model => model.find({ keywords: { $all: [keyword] } }))
        .then(response => response);
}
projectModel.linkpublication = (projectId, publicationId) => {
    return collection.getCollection(COLLECTION_NAME.PROJECTS)
        .then(model => model.findOneAndUpdate({ projectId }, { $set: { publication: publicationId } }, { new: true }))
        .then(response => response);
}
module.exports = projectModel;