import { RD_CONSTANT  } from "../keys/constant";

export const getFundingEditAccess = ({userDesignationCode}) => {
    return RD_CONSTANT.ROLE_WITH_EDIT_FUNDING.includes(userDesignationCode);
}

export const isPastDate = date =>{
    return new Date(date) < new Date()? true: false;
}

export const getFundingProjectEditAccess= (userDetails,investigators) =>{
    const {userDesignationCode ,userId} = userDetails;
    return RD_CONSTANT.ROLE_WITH_EDIT_FUNDING_PROJECT.includes(userDesignationCode) ||
            investigators.includes(userId);
}


export const getAppliedFundingProjectEditAccess= (userDetails,investigators) =>{
    const {userDesignationCode ,userId} = userDetails;
    return RD_CONSTANT.ROLE_WITH_EDIT_APPLIED_FUNDING_PROJECT.includes(userDesignationCode) ||
            investigators.includes(userId);
}