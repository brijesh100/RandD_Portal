const mongoose = require("mongoose");
const { COLLECTION_NAME } = require('../../keys/constant');

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

mongoose.set("useCreateIndex", true);
mongoose.set('useFindAndModify', false);

const userObj = {
    "userId": { type: String, required: true },
    "userName": { type: String, required: true },
    "userPassword": { type: String, required: true },
    "userDesignation": { type: String, required: true },
    "userDesignationCode": { type: String, required: true },
    "userDepartment": { type: String },
    "userDepartmentId": { type: String },
    "userGroup": { type: String },
    "userGroupname": { type: String },
    "isarchived": { type: Boolean, default: false },
    "details": {
        "phoneNumber": { type: String, default: '' },
        "email": { type: String, default: '' },
        "lab": { type: String }
    },
    "theme": { type: Boolean, default: false },
    "userkeywords": {
        type: [{ type: String, required: true }],
        default: []
    },
    "lastseen": { type: Date },
    "active": { type: Boolean },
    "OTP": { type: String, default: '' }

};

const projectObj = {
    "projectId": { type: String, required: true },
    "team": {
        type: [{ type: String, required: true }],
        required: true
    },
    "projectDepartment": {
        type: [{ type: String, required: true }],
        required: true
    },
    "projectLab": {
        type: [{ type: String, required: true }],
        default: 'Individual'
    },
    "projectTitle": { type: String, required: true },
    "projectSummary": { type: String, required: true },
    "views": { type: Number, default: 0 },
    "status": { type: String, default: '01' },
    "referenceLink": {
        type: [{ type: String, required: true }],
        default: []
    },
    "keywords": {
        type: [{ type: String, required: true }],
        default: []
    },
    "projectContent": {
        type: [{
            "subHeading": { type: String, required: true },
            "subContent": { type: String, required: true },
            "documents": {
                type: {
                    filledApplication: [{
                        fileName: { type: String },
                        path: { type: String }
                    }]
                }
            }
        }],
        default: []
    },
    "history": {
        type: [{
            "commitMessage": { type: String, required: true },
            "userId": { type: String, required: true },
            "updatedDate": { type: Date, default: Date.now },
            "approvedby": {
                type: String,
                default: ''
            }
        }],
        required: true
    },
    "approved": {
        type: Boolean,
        default: false
    },
    "visibility": {
        type: Boolean,
        default: true
    },
    "isarchived": {
        type: Boolean,
        default: false
    },
    "edited": {
        "summaryedit": {
            type: Boolean,
            default: false
        },
        "keywordedit": {
            type: Boolean,
            default: false
        },
        "detailedit": {
            type: Boolean,
            default: false
        },
        "refedit": {
            type: Boolean,
            default: false
        }
    },
    "remarks": [{
        "summaryRemarks": {
            type: String,
            default: ''
        },
        "keywordsRemarks": {
            type: String,
            default: ''
        },
        "detailsRemarks": {
            type: String,
            default: ''
        },
        "referenceRemarks": {
            type: String,
            default: ''
        },
        "dateAdded": {
            type: String,
            default: ''
        },
        default: ''
    }],
    "documents": {
        type: {
            acknowlegdment: [{
                fileName: { type: String },
                path: { type: String }
            }],
            filledApplication: [{
                fileName: { type: String },
                path: { type: String }
            }]
        }
    },
    "review": {
        type: Boolean,
        default: false
    },
    "start": { type: String, default: null },
    "end": { type: String, default: null },
    "islocked": { type: Boolean, default: false },
    // "publications": { 
    //     type: [{ type: String, required: true }],
    //     default:[]
    // },
    // "publication":[{type: String}],
    "publication": {
        type: {
            "publicationId": { type: String, required: true },
            "paperTitle": { type: String, required: true },
        }
    },
    "isPriority": { type: Boolean, default: false },
    "priority": {
        type: {
            "principalInvestigator": { type: String, default: '' },
            "coInvestigators": {
                type: [{ type: String }],
                required: true
            },
            "collaborators": { type: String, default: '' },
            "technologyReadinessLevel": { type: Number, default: 0 },
            "remarkHistory": {
                type: [{
                    "remark": { type: String, required: true },
                    "progress": { type: String, required: true },
                    "addedDate": { type: Date, default: Date.now },
                }],
                required: true
            },
            "patentCount": { type: Number, default: 0 },
            "publicationCount": { type: Number, default: 0 },
        }
    }
};

const departmentObj = {
    "departmentId": { type: String, required: true },
    "departmentName": { type: String, required: true },
    "researchLab": {
        type: [{
            "researchLabId": { type: String, required: true },
            "researchLabName": { type: String, required: true },
            "researchLabDesc": { type: String, required: true }
        }],
        default: []
    }
};

const publicationObj = {
    "publicationId": { type: String },
    "publicationType": { type: String, required: true },
    "publicationName": { type: String, required: true },
    "paperTitle": { type: String, required: true },
    "publisherId": {
        type: [{ type: String, required: true }],
        required: true
    },
    "volumeNumber": { type: Number },
    "yearOfPublication": { type: Date },
    "ISSN": { type: String },
    "indexing": { type: String },
    "reach": { type: String },
    "pagesFrom": { type: Number },
    "pagesTo": { type: Number },
    "ISBN": { type: String },
    "contributionAs": { type: String },
    "issueNumber": { type: Number },
    "impactFactor": { type: String },
    "editionNumber": { type: Number },
    "DOIorURL": { type: String, required: true },
    "Remarks": {
        type: String,
        default: ''
    },
    "approved": {
        type: Boolean,
        default: false
    },
    "visibility": {
        type: Boolean,
        default: true
    },
    "isarchived": {
        type: Boolean,
        default: false
    },
    "Department": {
        type: [{ type: String, required: true }],
        required: true
    },
    "file": {
        type: {
            acknowlegdment: [{
                fileName: { type: String, default: '' },
                path: { type: String, default: '' }
            }],
            filledApplication: [{
                fileName: { type: String, default: '' },
                path: { type: String, default: '' }
            }]
        }
    },
    "abstract": { type: String, default: '' },
    "coAuthor": {
        type: [{ type: String }],
        default: []
    },
    "extraCoAuthor": {
        type: [{ type: String }],
        default: []
    },
    "islocked": { type: Boolean, default: false },
    "resolve": {
        "needsResolution": { type: Boolean, default: false },
        "publisherId": {
            type: [{ type: String, required: true }],
            required: true
        },
        "coAuthor": {
            type: [{ type: String }],
            default: []
        },
        "Department": { type: [{ type: String, required: true }] }
    }
};

const fundingObj = {
    "fundingId": { type: String, required: true },
    "nameOfGrant": { type: String, required: true },
    "fundingOrganisation": { type: String, required: true },
    "descriptionOfScheme": { type: String, required: true },
    "deadline": { type: Date, required: true },
    "additionalDetails": {
        type: [{
            "title": { type: String, required: true },
            "detail": { type: String, required: true }
        }],
        required: true
    },
    "fundingUrls": {
        type: [{
            "title": { type: String, required: true },
            "url": { type: String, required: true }
        }],
        required: true
    },
    "history": {
        type: [{
            "commitMessage": { type: String, required: true },
            "userId": { type: String, required: true },
            "updatedDate": { type: Date, default: Date.now },
            "approvedby": {
                type: String,
                default: ''
            }
        }],
        required: true
    },
    "keyword": {
        type: [{ type: String, required: true }],
        default: []
    },
};

const fundingProjectObj = {
    "fundingProjectId": { type: String, required: true },
    "nameOfGrant": { type: String, required: true },
    "fundingOrganisation": { type: String, required: true },
    "fundingType": { type: String, required: true },
    "project": {
        type: {
            "projectTitle": { type: String, required: true },
            "projectId": { type: String, required: true },
            "keywords": {
                type: [{ type: String, required: true }],
                default: []
            },
            "department": {
                type: [{ type: String, required: true }],
                default: []
            }
        },
        required: true
    },
    "investigator": { type: String, required: true },
    "coInvestigator": {
        type: [{ type: String, required: true }],
        default: []
    },
    "appliedFundingId": { type: String, default: '' },
    "isExternal": { type: Boolean, default: false },
    "summary": { type: String, default: '' },
    "seedmoney": { type: Boolean, default: false },
    "keywords": {
        type: [{ type: String, required: true }],
        default: []
    },
    "fundingAmount": {
        type: {
            "applied": { type: String },
            "received": { type: String },
            "consumable": { type: String },
            "nonConsumable": { type: String }
        },
        default: ''
    },
    "isUserApplied": { type: Boolean, default: false },
    "fundDates": {
        type: {
            "applied": { type: String },
            "received": { type: String },
            "start": { type: String },
            "end": { type: String }
        },
        default: ''
    },
    "applicationChecks": {
        type: {
            "filled": { type: Boolean, default: false },
            "hod": { type: Boolean, default: false },
            "proposal": { type: Boolean, default: false },
            "technical": { type: Boolean, default: false },
            "principal": { type: Boolean, default: false }
        },
        default: null
    },
    "status": { type: String, default: '01' },
    "documents": {
        type: {
            acknowlegdment: [{
                fileName: { type: String },
                path: { type: String }
            }],
            filledApplication: [{
                fileName: { type: String },
                path: { type: String }
            }]
        }
    },
    "history": {
        type: [{
            "commitMessage": { type: String, required: true },
            "userId": { type: String, required: true },
            "updatedDate": { type: Date, default: Date.now },
            "approvedby": {
                type: String,
                default: ''
            }
        }],
        required: true
    },
    "approved": {
        type: Boolean,
        default: false
    },
    "visibility": {
        type: Boolean,
        default: true
    },
    "isarchived": {
        type: Boolean,
        default: false
    },
    "Department": {
        type: [{ type: String, required: true }],
        required: true
    },
    "Remarks": {
        type: String,
        default: ''
    }
};
const GrantObject = {
    "grantId": { type: String, required: true },
    "grantTitle": { type: String, required: true },
    "grantType": { type: String, required: true },
    "agency": { type: String, required: true },
    "scheme": { type: String, required: true },
    "sanctionAmount": { type: String, required: true },
    "dateOfSanction": { type: Date, required: true },
    "sanctionRef": { type: String, required: true },
    "principalInvestigator": { type: String, required: true },
    "coInvestigators": {
        type: [{ type: String }],
        default: []
    },
    "duration": { type: String, required: true },
    "projectId": { type: String },
}
const patentObj = {
    "patentId": { type: String },
    "patentTitle": { type: String, required: true },
    "patentSummary": { type: String },
    "patent_part": { type: String },
    "patentYear": { type: String, required: true },
    "patentDepartment": { 
        type:[{type: String, required: true}],
    required:true
    },
    "patentApplicationNumber": { type: String, required: true },
    "patentInventors": { type: Array, required: true },
    "otherPatentInventors": { type: Array, required: true },
    "patentDate": { type: Date, required: true },
    "PublishedDate": { type: Date },
    "FERDate": { type: Date },
    "HearingDate": { type: Date },
    "GrantedDate": { type: Date },
    "patentStatus": { type: String, default:'01' },
    "patentGrantNum": { type: String },
    "TechnologyReadinessLevel": { type: Number, default: 1 },
};


const consultancyObj = {
    "userId": { type: String, required: true },
    "consultancyId": { type: String },
    "consultancyDepartment": { type: String, required: true },
    "consultancyTitle": { type: String },
    "consultancyType": { type: String, required: true },
    "consultancyIndustry": { type: String, required: true },
    "consultancyInvoiceNumber": { type: Number, required: true },
    "consultancyReceiptNumber": { type: Number, required: true },
    "consultancyReceiptcost": { type: Number, required: true },
    "consultancyStatus": { type: String, required: true },
    "consultancyTeam": { type: Array, required: true },
    "consultancyTesting": { type: String },
    "consultancyReceiptDate": { type: Date },
};


const notificationObj = {
    "id": { type: String, required: true },
    "from": { type: String, required: true },
    "to": {
        type: [{ type: String, required: true }]
    },
    "payload": { type: String, required: true },
    "unread": { type: Boolean, default: true },
    "type": { type: String, default: 'alert info' }
};

const connection = {};
const usersSchema = new Schema(userObj, { collection: "Users", timestamps: true });
const projectsSchema = new Schema(projectObj, { collection: "Projects", timestamps: true });
const departmentsSchema = new Schema(departmentObj, { collection: "Departments", timestamps: true });
const publicationsSchema = new Schema(publicationObj, { collection: "Publications", timestamps: true });
const fundingsSchema = new Schema(fundingObj, { collection: "Fundings", timestamps: true });
const fundingProjectsSchema = new Schema(fundingProjectObj, { collection: "Funding_projects", timestamps: true });
const notificationsSchema = new Schema(notificationObj, { collection: "Notifications", timestamps: true });
const patentSchema = new Schema(patentObj, { collection: "Patent", timestamps: true });
const consultancySchema = new Schema(consultancyObj, { collection: "Consultancy", timestamps: true });
const grantSchema = new Schema(GrantObject, { collection: "Grants", timestamps: true });

connection.getCollection = collectionName => {
    const DB_HOST = "mongodb://localhost:27017";
    return mongoose.connect(`${DB_HOST}/RandDDB`,
        { useNewUrlParser: true, useUnifiedTopology: true }).then((db) => {
            switch (collectionName) {
                case COLLECTION_NAME.USERS: return db.model(collectionName, usersSchema);
                case COLLECTION_NAME.PROJECTS: return db.model(collectionName, projectsSchema);
                case COLLECTION_NAME.DEPARTMENTS: return db.model(collectionName, departmentsSchema);
                case COLLECTION_NAME.PUBLICATIONS: return db.model(collectionName, publicationsSchema);
                case COLLECTION_NAME.FUNDINGS: return db.model(collectionName, fundingsSchema);
                case COLLECTION_NAME.FUNDING_PROJECTS: return db.model(collectionName, fundingProjectsSchema);
                case COLLECTION_NAME.NOTIFICATIONS: return db.model(collectionName, notificationsSchema);
                case COLLECTION_NAME.PATENT: return db.model(collectionName, patentSchema);
                case COLLECTION_NAME.CONSULTANCY: return db.model(collectionName, consultancySchema);
                case COLLECTION_NAME.GRANTS: return db.model(collectionName, grantSchema);
            }
        }).catch(err => {
            let error = new Error("Could not connect to database");
            error.status = 500;
            throw error;
        });
}

module.exports = connection;