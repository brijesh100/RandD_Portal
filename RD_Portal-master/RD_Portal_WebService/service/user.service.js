const jwt = require('jsonwebtoken');

const userModel = require('../model/user.model');
const { ApiError } = require('../objectCreator/objectCreator');
const { JWT_KEY } = require('../keys/constant');
const serviceUtils = require('../utils/service.util');

const userService ={};
const Nexmo = require('nexmo');

const nexmo = new Nexmo({
  apiKey: 'f7efb50a',
  apiSecret: 'o5l9RyKqLDcBNXJ8',
});

const mailer = require('../utils/mailer.util.js');


userService.insertScript = () => {
    return userModel.deleteAllusers()
        .then(() => userModel.insertSampleUsers())
        .then(response => {
            if (response.length > 0) return response.length
            throw new ApiError("Can't insert users",500);
        })
}

userService.createUser = userDetails => {
    return userModel.getUserById(userDetails.userId)
        .then(response => {
            if(response) throw new ApiError("UserId already exist",400);
             return true;
        })
        .then( canCreate => {
            if(canCreate){
                return userModel.createUser(userDetails)
                .then(response => ({message: `User #${response.userId} created successfully`}) )
            }
        })
} 
userService.editUser = (userDetails,userId) => {
        return userModel.editUser(userDetails,userId)
        .then(response => ({message: `User #${response.userId} Edited successfully`}) )
            
        
} 

userService.loginUser = async loginDetails  => {
    try{
        const userData = await userModel.getUserById(loginDetails.userId);
        if(!userData) throw 401;
        else{
            const isNotMatch = loginDetails.userPassword.localeCompare(userData.userPassword);
            if (isNotMatch)  throw 401; 
            else {
                const message = `Hi ${userData.userName}`;
                const payload = { userId: userData.userId, userDesignationCode: userData.userDesignationCode };
                const token = jwt.sign(payload, JWT_KEY.SECRET);
                const user = {
                    userId: userData.userId,
                    userName: userData.userName,
                    userDesignation: userData.userDesignation,
                    userDesignationCode: userData.userDesignationCode,
                    userDepartmentId: userData.userDepartmentId,
                    isarchived:userData.isarchived,
                    details:userData.details,
                    theme:userData.theme
                }
                let a=true;
                let date=new Date()
                userModel.login(userData.userId,a,date);
                return { message, token, user };
            }
        }
    }
    catch(statusCd){
        throw new ApiError("Invalid username or password", statusCd);
    }
}

userService.getAllUserDetails = () => {
    return userModel.getAllUser()
        .then(response =>{
            if(response) return response;
            throw new ApiError("User not found", 404);
        });
} 

userService.getUserDetails = userId => {
    return userModel.getUserById(userId)
        .then(response =>{
            if(response) return response;
            throw new ApiError("User not found", 404);
        });
} 

userService.getProjectsByUserId = userId => {
    return userModel.getProjectsByUserId(userId)
        .then(response =>{
            if(response) {
                return serviceUtils.mapProjectForUser(response);
            }
            throw new ApiError("User not found", 404);
        });
} 

userService.getPublicationsByUserId = userId => {
    return userModel.getPublicationsByUserId(userId)
        .then(response =>{
            if(response) {
                return serviceUtils.mapPublicationForUser(response);
            }
            throw new ApiError("User not found", 404);
        });
} 

userService.getFundingProjectByUserId = userId => {
    return userModel.getFundingProjectByUserId(userId)
        .then(response =>{
            if(response) {
                return serviceUtils.mapFundingProjectForUser(response);
            }
            throw new ApiError("User not found", 404);
        });
}

userService.getMatchingUserId = userId => {
    return userModel.getAllUserId(userId)
        .then(response => {
            if(response){
                response = response.filter(data => data.userDesignationCode != 'ADMIN' && data.userDesignationCode != 'MNGMT');
                return response.map(data => `${data.userId}-${data.userName}`);
            }
                
            throw new ApiError("Cannot search", 500);
        });
} 

userService.updatePassword = (passwords,userId) => {
    console.log("service",userId)
    return userModel.getUserById(userId)
        .then(response => {
            if(response){
                console.log("servicedd")
                if(response.userPassword !== passwords.oldPassword) throw new ApiError("Incorrect old password", 400);
                return true;
            }
        })
        .then(isoldPasswordCorrect => {
            if(isoldPasswordCorrect){
               return userModel.updatePassword(passwords.newPassword, userId)
               .then( (response) =>{
                   if(response.userPassword === passwords.newPassword)
                        return {message: `Password updated successfully`}
                    throw new ApiError("Password not updated", 500);
                });
            }
        })
}; 
userService.getDepartmentUsers=deptId => {
    return userModel.getDepartmentUsers(deptId)
        .then(response => {
            if(response) return response;
            throw new ApiError("Cannot search", 500);
        });
} 
userService.archiveUser=userId => {
    return userModel.archiveUser(userId)
        .then(response => {
            if(response) return response;
            throw new ApiError("Cannot archive", 500);
        });
} 

userService.restoreUser=userId => {
    return userModel.restoreUser(userId)
        .then(response => {
            if(response) return response;
            throw new ApiError("Cannot archive", 500);
        });
};
userService.addUserData = (userData,userId) => {
    return userModel.addUserData(userData,userId)
    .then(response => ({message: `User #${response.userId} Data Added successfully`}) )
        
    
} 
userService.enabledark=(userId) => {
    return userModel.enabledark(userId)
        .then(response => {
            if(response) return response;
            throw new ApiError("Cannot archive", 500);
        });
} 
userService.disabledark=(userId) => {
    return userModel.disabledark(userId)
        .then(response => {
            if(response) return response;
            throw new ApiError("Cannot archive", 500);
        });
} 
userService.keywords = (keywords,userId) => {
    return userModel.keywords(keywords,userId)
    .then(response => ({message: `User #${response.userId} keywords Edited successfully`}) )
} 
userService.keywordusers = keywords => {
    console.log("test",keywords)
    return userModel.keywordusers(keywords)
        .then(response => {
            if(response) return response;
            throw new ApiError("Cannot search", 500);
        });
} 
userService.logout = (userId) => {
    let date = new Date()
    return userModel.logout(date,userId)
    .then(response => ({message: `User #${response.userId} last seen added`}) )
} 
userService.getLabUsers=labId => {
    return userModel.getLabUsers(labId)
        .then(response => {
            if(response) return response;
            throw new ApiError("Cannot search", 500);
        });
} 
userService.forgotPassword = (userId) => {
    return userModel.getUserById(userId)
        .then(response =>{
            if(response) {
                if(response.details.email=='' || response.details==undefined){
                    throw new ApiError("Email not found, Contact Admin to reset password", 404);
                }
                if(mailer.sendOTPMail(userId,response.details.email)){
                    return {message: `Email sent successfully`}
                }
            }
            throw new ApiError("User ID not found", 404);
        }); 
}
userService.checkOTP = (userId,otpData) => {
    return userModel.getUserById(userId)
        .then(response => {
            console.log("service",response);
            if(response.OTP == otpData.otp){
                return {isValid: true};
            }
            throw new ApiError("Invalid OTP");
        });
}

userService.defaultPassword=(userId)=>{
    return userModel.defaultPassword(userId)
        .then(res=>{
            if(res) return res
            throw new ApiError("User ID not found", 404);
        })
}



////////////////Consultancy////////////////
userService.getconsultancyByUserId = userId => {
    return userModel.getconsultancyByUserId(userId)
        .then(response =>{
            if(response) {
                return serviceUtils.mapConsultancyForUser(response);
            }
            throw new ApiError("User not found", 404);
        });
} 

/////////////////Patent/////////////////////////

userService.getpatentByUserId = userId => {
    return userModel.getpatentByUserId(userId)
        .then(response =>{
            if(response) {
                return serviceUtils.mapPatentForUser(response);
            }
            throw new ApiError("User not found", 404);
        });
} 

userService.getPublicationOverview = userId => {
    return userModel.getPublicationsByUserId(userId)
        .then(response =>{
            if(response) {
                result =[];
                let currentYear = new Date().getFullYear();
                for(let p=0;p<3;p++){
                    let yearData={}
                    let thisYearData = response.filter(data=>data.yearOfPublication.getFullYear()==currentYear-p);
                    thisYearData.forEach(data=>{
                        if(yearData[data.publicationType]){
                            yearData[data.publicationType][data.indexing]+=1;
                        }
                        else{
                            yearData[data.publicationType]={"SCI":0,"SCOPUS":0,"UGC":0,"OTHER":0};
                            yearData[data.publicationType][data.indexing]=1;
                        }
                    })
                    result.push({'year':currentYear-p,'data':yearData});
                }
                return result;
            }
            throw new ApiError("User not found", 404);
        });
}
module.exports = userService;