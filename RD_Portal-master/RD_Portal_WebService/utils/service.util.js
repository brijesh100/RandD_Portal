const {ID_PREFIX} = require('../keys/constant');
const userModel = require('../model/user.model');

const serviceUtils = {};

serviceUtils.mapProjectForUser =  projects =>{
    let result = [];
    if(projects.length > 0)
        result =  projects.map( ({
            projectId,
            projectTitle,
            status,
            projectDepartment,
            remarks,
            approved,
            keywords,
            review,
            createdAt,
            start,
            isarchived,
            isPriority
            }) => ({
                projectId,
                projectTitle,
                status,
                projectDepartment,
                remarks,
                approved,
                keywords,
                review,
                createdAt,
                start,
                isarchived,
                isPriority
                    }) );
    return result;
}



serviceUtils.mapConsultancyForUser =  consultancy =>{
    let result = [];
    if(consultancy.length > 0)
        result =  consultancy.map( ({
            consultancyId,
            consultancyTitle,
            consultancyStatus,
            consultancyType,
            consultancyIndustry,
            consultancyInvoiceNumber,
            consultancyReceiptNumber,
            consultancyReceiptCost,
            consultancyTesting,
            consultancyReceiptDate,
            consultancyTeam,
            consultancyDepartment,
            createdAt,
            updatedAt,
            }) => ({
                consultancyId,
                consultancyTitle,
                consultancyStatus,
                consultancyType,
                consultancyIndustry,
                consultancyInvoiceNumber,
                consultancyReceiptNumber,
                consultancyReceiptCost,
                consultancyTesting,
                consultancyReceiptDate,
                consultancyTeam,
                consultancyDepartment,
                createdAt,
                updatedAt,
                    }) );
    return result;
}

serviceUtils.mapPatentForUser =  patent =>{
    let result = [];
    if(patent.length > 0)
        result =  patent.map( ({
            patentId,            
            patentInventors,       
            patentYear,            
            patentDepartment,     
            patentTitle,           
            patentApplicationNumber,
            patentDate,            
            PublishedDate,        
            patentFERDate,        
            patentHearingDate,    
            patentGrantedDate,    
            patentStatus,         
            patentGrantNum,
            TechnologyReadinessLevel
            }) => ({
                patentId,            
                patentInventors,       
                patentYear,            
                patentDepartment,     
                patentTitle,           
                patentApplicationNumber,
                patentDate,            
                PublishedDate,        
                patentFERDate,        
                patentHearingDate,    
                patentGrantedDate,    
                patentStatus,         
                patentGrantNum,
                TechnologyReadinessLevel
                    }) );
    return result;
}

serviceUtils.mapPublicationForUser =  publication =>{
    let result = [];
    if(publication.length > 0)
        result =  publication.map( ({
                publicationId,
                publicationType,
                publicationName,
                paperTitle,
                publisherId,
                volumeNumber,
                yearOfPublication,
                ISSN,
                indexing,
                reach,
                pagesFrom,
                pagesTo,
                ISBN,
                contributionAs,
                issueNumber,
                impactFactor,
                editionNumber,
                DOIorURL,
                Remarks,
                approved,
                visibility,
                isarchived,
                Department,
                file,
                coAuthor,
                extraCoAuthor

            }) => ({
                publicationId,
                publicationType,
                publicationName,
                paperTitle,
                publisherId,
                volumeNumber,
                yearOfPublication,
                ISSN,
                indexing,
                reach,
                pagesFrom,
                pagesTo,
                ISBN,
                contributionAs,
                issueNumber,
                impactFactor,
                editionNumber,
                DOIorURL,
                Remarks,
                approved,
                visibility,
                isarchived,
                Department,
                file,
                coAuthor,
                extraCoAuthor
}) );
    return result;
}

serviceUtils.mapFundingProjectForUser =  fundingProject =>{
    let result = [];
    if(fundingProject.length > 0)
        result =  fundingProject.map( ({
            fundingProjectId,
            fundingOrganisation,
            fundingAmount,
            fundingType,
            status,
            nameOfGrant,
            isExternal,
            keywords,
            isUserApplied}) => ({
                fundingProjectId,
                fundingOrganisation,
                fundingAmount,
                fundingType,
                status,
                nameOfGrant,
                isExternal,
                keywords,
                isUserApplied}) );
    return result;
}

serviceUtils.mapProjectSummary =  projects =>{
    let result = [];
    if(projects.length > 0)
        result =  projects.map( ({
            projectId,
            projectTitle,
            projectSummary,
            team,
            remarks,
            projectDepartment,
            approved,
            keywords,
            visibility,
            isarchived,
            start,
            createdAt,
            updatedAt,
            status,
            isPriority,
            priority}) => ({
                projectId,
                projectTitle,
                projectSummary,
                team,
                remarks,
                projectDepartment,
                approved,
                keywords,
                visibility,
                isarchived,
                start,
                createdAt,
                updatedAt,
                status,
                isPriority,priority}) );
    return result;
}

serviceUtils.mapIdToUser =  team =>{
    return team.map( id  =>  {
        return userModel.getUserById(id).then( ({userId, userName}) =>{
            return `${userId}-${userName}`;
        })
    })
}


serviceUtils.generateId = ( prefix, count) =>{
    switch(prefix){
        case ID_PREFIX.PROJECT: return `${ID_PREFIX.PROJECT}${100000+count+1}`;
        case ID_PREFIX.PUBLICATION: return `${ID_PREFIX.PUBLICATION}${100000+count+1}`;
        case ID_PREFIX.FUNDING: return `${ID_PREFIX.FUNDING}${100000+count+1}`;
        case ID_PREFIX.FUNDING_PROJECTS: return `${ID_PREFIX.FUNDING_PROJECTS}${100000+count+1}`;
        case ID_PREFIX.GRANTS: return `${ID_PREFIX.GRANTS}${100000+count+1}`;
        case ID_PREFIX.NOTIFICATION: return `${ID_PREFIX.NOTIFICATION}${100000+count+1}`;
        case ID_PREFIX.PATENT: return `${ID_PREFIX.PATENT}${100000+count+1}`;
        case ID_PREFIX.CONSULTANCY: return `${ID_PREFIX.CONSULTANCY}${100000+count+1}`;
    }
}

serviceUtils.generateOTP = () =>{
    var digits = '0123456789'; 
    let OTP = ''; 
    for (let i = 0; i < 4; i++ ) { 
        OTP += digits[Math.floor(Math.random() * 10)]; 
    } 
    return OTP;
}

module.exports = serviceUtils;