const jwt = require('jsonwebtoken');

const notificationModel = require('../model/notification.model');
const { ApiError } = require('../objectCreator/objectCreator');
const { JWT_KEY } = require('../keys/constant');
const serviceUtils = require('../utils/service.util');
const {ID_PREFIX} = require('../keys/constant');
const notificationService ={};

notificationService.createNotification = (messageDetails) => {
    return notificationModel.getAll().then( allMessages => allMessages.length )
        .then( count => serviceUtils.generateId(ID_PREFIX.NOTIFICATION,count) )
        .then( msgId =>{
            console.log(msgId)
            messageDetails.id=msgId;
            return notificationModel.addnotification(messageDetails)
                .then(response => {
                    if(response) return response;
                    throw new ApiError("Message not Sent. Please! try Later ", 500);
                });
        })
        .then( response =>{
            return {projectId: response.projectId, message :`Message Sent`};
        });
}

notificationService.getUserMessages = userId => {
    return notificationModel.getUserMessage(userId)
        .then(response =>{
            if(response) return response;
            throw new ApiError("Messages not found", 404);
        });
} 
notificationService.readMessage = (msgId) => {
    return notificationModel.readMessage(msgId)
        .then(response =>{
            if(response) return response;
            throw new ApiError("Messages not found", 404);
        });
} 

module.exports = notificationService;