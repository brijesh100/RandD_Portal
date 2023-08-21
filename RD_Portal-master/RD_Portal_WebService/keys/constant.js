const COLLECTION_NAME = {
    USERS:"Users",
    PROJECTS:"Projects",
    DEPARTMENTS:"Departments",
    PUBLICATIONS:"Publications",
    NOTIFICATIONS:"Notifications",
    FUNDINGS:"Fundings",
    FUNDING_PROJECTS: "Funding_projects",
    PATENT: "Patent",
    CONSULTANCY:"Consultancy",
    GRANTS:"Grants",
};

const ID_PREFIX = {
    PROJECT:"PRO",
    PUBLICATION:"PUB",
    FUNDING:"FUN",
    FUNDING_PROJECTS:"FUP",
    GRANTS:"GRT",
    NOTIFICATION:"MSG",
    PATENT:"PAT",
    CONSULTANCY:"CON"
}

const JWT_KEY = {
    SECRET:"USER_SECRET"
}

const PROJECT_STATUS_CODE ={
    UNDER_REVIEW:'00',
    ONGOING: '01',
    INACTIVE: '03',
    COMPLETED:'02'
}

const FUNDING_STATUS_CODE ={
    STARTED: '01',
    APPLIED:'02',
    CHECKED:'03',
    SUBMITTED:'04',
    REVIEW: '05',
    SHORTLISTED:'06',
    REJECTED:'07',
    ACCEPTED:'08'
}

const PATENT_STATUS_CODE ={
    Filed: '01',
    Published:'02',
    FERSubmitted:'03',
    HearingCompleted: '04',
    Granted:'05',
  }

const ROLE_WITH_ADMIN_AUTH = ['ADMIN'];
  
module.exports = {
    COLLECTION_NAME,
    JWT_KEY,
    ID_PREFIX,
    ROLE_WITH_ADMIN_AUTH,
    PROJECT_STATUS_CODE,
    FUNDING_STATUS_CODE,
    PATENT_STATUS_CODE
};
