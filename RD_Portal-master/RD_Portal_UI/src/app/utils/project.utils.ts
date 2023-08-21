import { RD_CONSTANT  } from "../keys/constant";

const getContributionAccess = (userId, userDesignationCode, team):boolean=>{
    return(
        !RD_CONSTANT.ROLE_WITH_NO_EDIT.includes(userDesignationCode) &&
        team.includes(userId)
    );
};

const getRoleAccess = (userDesignationCode, userDepartmentId, projectDepartment):boolean=>{
    return(
        userDesignationCode === 'ADMIN' ||
        (RD_CONSTANT.ROLE_WITH_EDIT.includes(userDesignationCode) && projectDepartment.includes(userDepartmentId))
    );
};

export const getEditAccess = (userDetail, projectDetail):boolean=>{
    const {userId,userDesignationCode,userDepartmentId} = userDetail;
    const {team,projectDepartment} = projectDetail;
    const contributionAccess:boolean = getContributionAccess(userId,userDesignationCode,filterUserId(team)); 
    const roleAccess:boolean = getRoleAccess(userDesignationCode, userDepartmentId, projectDepartment);
    return contributionAccess || roleAccess;
};

export const getCreateProjectAccess = (userDesignationCode) : boolean =>{
    return !RD_CONSTANT.ROLE_WITH_NO_CREATE.includes(userDesignationCode);
};

export const getCreatePublicationAccess = (userDesignationCode) : boolean =>{
    return !RD_CONSTANT.ROLE_WITH_NO_CREATE.includes(userDesignationCode);
};

export const getCreateFundingAccess = (userDesignationCode) : boolean =>{
    return !RD_CONSTANT.ROLE_WITH_NO_CREATE.includes(userDesignationCode);
};

export const isUserWithProfile = (userDesignationCode): boolean =>{
    return !RD_CONSTANT.ROLE_WITH_NO_PROFILE.includes(userDesignationCode);
};

export const hasAdminAccess = (userDesignationCode) : boolean =>{
    return RD_CONSTANT.ROLE_WITH_ADMIN_ACCESS.includes(userDesignationCode);
};

export const getYesterdayDate = ():string =>{
   let date = new Date()
   date.setDate(date.getDate()-1);
   return date.toISOString().substring(0,10);
};

export const getTodayDate = ():string =>{
    let date = new Date()
    date.setDate(date.getDate());
    return date.toISOString().substring(0,10);
 };

export const getCreatedDate = (createdDate, isOldProject): Date =>{
    if(isOldProject === 'true') return new Date(createdDate);
    return new Date();
};

export const getDepartmentName = (departmentId, departments) =>{
   return departments.find( dept => departmentId === dept.departmentId).departmentName;
};

export const getDesignationName = designationCode =>{
    return RD_CONSTANT.DESIGNATION.find( designation => designationCode === designation.userDesignationCode).userDesignation;
};

export const getgroupName = sdesignationCode =>{
    return RD_CONSTANT.SDESIGNATION.find( designation => sdesignationCode === designation.usersDesignationCode).usersDesignation;
};

export const validateAndUpdate = (newData, OldData) =>{
    return newData? newData: OldData;
}

export const filterUserId = team =>{
    return team.map( user =>{
        // return user;
        return user.split('-')[0];
    })
}

export const createUserId = (userId:String, userName:String) =>{
    if(userId.includes('-')){
        return userId;
    }
    return userId + '-' + userName;
}
