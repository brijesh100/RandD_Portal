const collection = require('./DB/connection');
const sampleUsers = require('../data/users');
const { COLLECTION_NAME } = require('../keys/constant');
const { model } = require('mongoose');

const userModel = {};

userModel.deleteAllusers = () => {
    return collection.getCollection(COLLECTION_NAME.USERS)
        .then(model => model.deleteMany())
        .then(response => response);
}

userModel.insertSampleUsers = () => {
    return collection.getCollection(COLLECTION_NAME.USERS)
        .then(model => model.insertMany(sampleUsers))
        .then(response => response);
}

userModel.createUser = userDetails => {
    return collection.getCollection(COLLECTION_NAME.USERS)
        .then(model => model.create(userDetails))
        .then(response =>  response);
}
userModel.editUser=(userDetails,userId)=>{
    return collection.getCollection(COLLECTION_NAME.USERS)
        .then(model => model.findOneAndUpdate( {userId}, {$set:{...userDetails}}, {new:true}) )
        .then(response =>  response);
}
userModel.getAllUser = () => {
    return collection.getCollection(COLLECTION_NAME.USERS)
        .then(model => model.find())
        .then(response =>  response);
}
userModel.getUserById = userId => {
    return collection.getCollection(COLLECTION_NAME.USERS)
        .then(model => model.findOne({userId}))
        .then(response =>  response);
}

userModel.getProjectsByUserId = userId => {
    return collection.getCollection(COLLECTION_NAME.PROJECTS)
        .then(model => model.find({team:userId}).sort({createdAt: -1}))
        .then(response =>  response);
}

userModel.getPublicationsByUserId = userId => {
    return collection.getCollection(COLLECTION_NAME.PUBLICATIONS)
    // .then(model => model.find({publisherId:userId}).sort({createdAt: -1}))
    .then(model => model.find({ $or:[ {publisherId:userId}, {coAuthor:userId} ] }))
    .then(response =>  response);
}

userModel.getFundingProjectByUserId = userId => {
    return collection.getCollection(COLLECTION_NAME.FUNDING_PROJECTS)
    .then(model => model.find({ $or:[ {investigator:userId}, {coInvestigator:userId} ] }).sort({createdAt: -1}))
    .then(response =>  response);
}

userModel.getAllUserId = (userId) => {
    return collection.getCollection(COLLECTION_NAME.USERS)
    .then(model => model.find({$or:[{userName:{$regex: userId}},{userId:{$regex: userId}}]},{userId:1,userName:1,userDesignationCode:1,_id:0}).limit(5))
    .then(response =>  response);
}
userModel.getDepartmentUsers=(deptId)=>{
    return collection.getCollection(COLLECTION_NAME.USERS)
    .then(model=> model.find({userDepartmentId:deptId}))
    .then(response =>  response);
}
userModel.updatePassword = (userPassword, userId) => {
    return collection.getCollection(COLLECTION_NAME.USERS)
    .then(model => model.findOneAndUpdate( {userId}, {$set:{userPassword}}, {new:true}) )
    .then(response =>  response);
};
userModel.archiveUser=(userId)=>{
    return collection.getCollection(COLLECTION_NAME.USERS)
    .then(model=> model.findOneAndUpdate( {userId}, {$set:{isarchived:true}}, {new:true}) )
    .then(response =>  response);
};
userModel.restoreUser=(userId)=>{
    return collection.getCollection(COLLECTION_NAME.USERS)
    .then(model=> model.findOneAndUpdate( {userId}, {$set:{isarchived:false}}, {new:true}) )
    .then(response =>  response);
};
userModel.addUserData=(userData,userId)=>{
    return collection.getCollection(COLLECTION_NAME.USERS)
    .then(model => model.findOneAndUpdate( {userId}, {$set:{details:userData}}, {new:true}) )
    .then(response =>  response);
};
userModel.enabledark=(userId)=>{
    return collection.getCollection(COLLECTION_NAME.USERS)
    .then(model=> model.findOneAndUpdate( {userId}, {$set:{theme:true}}, {new:true}) )
    .then(response =>  response);
};
userModel.disabledark=(userId)=>{
    return collection.getCollection(COLLECTION_NAME.USERS)
    .then(model=> model.findOneAndUpdate( {userId}, {$set:{theme:false}}, {new:true}) )
    .then(response =>  response);
};
userModel.keywords = (keywordsi, userId) => {
    return collection.getCollection(COLLECTION_NAME.USERS)
    .then(model => model.findOneAndUpdate( {userId}, {$set:{userkeywords:keywordsi}}, {new:true}) )
    .then(response =>  response);
};
userModel.keywordusers = (keywords) => {
    return collection.getCollection(COLLECTION_NAME.USERS)
    .then(model => model.find({userkeywords:{ $in : keywords}},{ userId: 1}))
        .then(response =>  response);
    }
    userModel.logout = (date, userId) => {
        return collection.getCollection(COLLECTION_NAME.USERS)
        .then(model => model.findOneAndUpdate( {userId}, {$set:{lastseen:date,active:false}}, {new:true}) )
        .then(response =>  response);
    };
    userModel.login = (userId,a,date) => {
        return collection.getCollection(COLLECTION_NAME.USERS)
        .then(model => model.findOneAndUpdate( {userId}, {$set:{active:a,lastseen:date}}, {new:true}) )
        .then(response =>  response);
    };
    userModel.getLabUsers=(labId)=>{
        return collection.getCollection(COLLECTION_NAME.USERS)
        .then(model=> model.find({userDepartmentId:labId}))
        .then(response =>  response);
    }
    userModel.putOTP=(userId,OTP)=>{
        return collection.getCollection(COLLECTION_NAME.USERS)
        .then(model => model.findOneAndUpdate( {userId:userId}, {$set:{OTP:OTP}}, {new:true}) )
        .then(response =>  response);
    }
    userModel.defaultPassword=(userId)=>{
        return collection.getCollection(COLLECTION_NAME.USERS)
        .then(model => model.findOneAndUpdate( {userId:userId}, {$set:{userPassword:'Welcome123'}}, {new:true}) )
        .then(response =>  response);
    }


    ///////////////////Consultancy//////////////////
    userModel.getconsultancyByUserId = userId => {
        return collection.getCollection(COLLECTION_NAME.CONSULTANCY)
            .then(model => model.find({userId:userId}).sort({createdAt: -1}))
            .then(response =>  response);
    }

    /////////////////Patent/////////////////////
    userModel.getpatentByUserId = userId => {
        return collection.getCollection(COLLECTION_NAME.PATENT)
            .then(model => model.find({patentInventors:{$in:[userId]}}).sort({createdAt: -1}))
            .then(response =>  response);
    }
    module.exports = userModel;