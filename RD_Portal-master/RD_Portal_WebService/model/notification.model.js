const collection = require('./DB/connection');
const { COLLECTION_NAME } = require('../keys/constant');
const { model } = require('mongoose');
const { response } = require('express');

const notificationModel = {};
notificationModel.addnotification=(messageDetails)=>{
    return collection.getCollection(COLLECTION_NAME.NOTIFICATIONS)
    .then(model => model.create(messageDetails))
    .then(response =>  response);
}
notificationModel.getUserMessage = userId => {
    return collection.getCollection(COLLECTION_NAME.NOTIFICATIONS)
        .then(model => model.find({to:userId,unread:true}).sort({createdAt: -1}))
        .then(response =>  response);
}
notificationModel.getAll=() => {
    return collection.getCollection(COLLECTION_NAME.NOTIFICATIONS)
        .then(model => model.find())
        .then(response => response)
}
notificationModel.readMessage = (msgId) =>{
    return collection.getCollection(COLLECTION_NAME.NOTIFICATIONS)
        .then(model => model.findOneAndUpdate({id:msgId},{$set:{unread:false}},{new:true}))
}

module.exports = notificationModel;