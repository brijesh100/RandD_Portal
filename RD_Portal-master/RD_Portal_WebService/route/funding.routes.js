const express = require("express");
const path = require('path');

const fundingService = require("../service/funding.service");

const {userAuth, adminAuth} = require('../middleware/auth.middleware');
const {upload, setPathFilledApplication, setPathAck} = require('../middleware/file-system.middleware');


const fundingRouter = express.Router();

fundingRouter.get("/all-summary", userAuth, (req, res, next) => {
    fundingService.getAllFundingsSummary()
        .then(response => res.send(response))
        .catch(error => next(error));
});

fundingRouter.get("/approval-summary",userAuth,(req,res,next)=>{
    fundingService.getApprovalFundings()
        .then(response=>res.send(response))
        .catch(error =>next(error))
})

fundingRouter.post("/create-new", userAuth, adminAuth, (req, res, next) => {
    fundingService.createNewFunding(req.body, req.auth.userId)
        .then(response => res.status(201).send(response))
        .catch(error => next(error));
});

fundingRouter.get("/detail/:fundingId", userAuth, (req, res, next) => {
    fundingService.getFundingDetailById(req.params.fundingId)
        .then(response => res.send(response))
        .catch(error => next(error));
});

fundingRouter.put("/update/:fundingId", userAuth, adminAuth, (req, res, next) => {
    fundingService.updateFundingDetailById(req.body, req.params.fundingId)
        .then(response => res.status(201).send(response))
        .catch(error => next(error));
});


/* funding projects routes */

fundingRouter.get("/archive/:fundingProjectId", userAuth, (req, res, next) => {
    fundingService.archiveFundingProjectById(req.params.fundingProjectId,req.auth.userId)
    .then(response => res.status(201).send(response))
    .catch(error => next(error));
});
fundingRouter.get("/restore/:fundingProjectId", userAuth, (req, res, next) => {
    console.log("test route")
    fundingService.restoreFundingProjectById(req.params.fundingProjectId,req.auth.userId)
    .then(response => res.status(201).send(response))
    .catch(error => next(error));
});

fundingRouter.get("/funding-project/detail/:fundingProjectId", userAuth, (req, res, next) => {
    fundingService.getFundingProjectById(req.params.fundingProjectId)
        .then(response => res.send(response))
        .catch(error => next(error));
});

fundingRouter.get("/funding-project/project/:projectId", userAuth, (req, res, next) => {
    fundingService.getFundingsByProjectId(req.params.projectId)
        .then(response => res.send(response))
        .catch(error => next(error));
});

fundingRouter.post("/funding-project/create", userAuth, (req, res, next) => {
    console.log("ROUTE",req.body)
    fundingService.addReceivedFundingProject(req.body, req.auth.userId)
        .then(response => res.status(201).send(response))
        .catch(error => next(error));
});

fundingRouter.put("/funding-project/update/:fundingProjectId", userAuth, (req, res, next) => {
    fundingService.updateReceivedFPById(req.body, req.params.fundingProjectId)
        .then(response => res.status(201).send(response))
        .catch(error => next(error));
});

fundingRouter.put("/funding-project/filled-uplaod/:fundingProjectId",
                userAuth,
                setPathFilledApplication,
                upload.single('file'),
                (req, res, next) => {
    const filledApplication = {
        path : req.file.destination,
        fileName: req.file.filename
    }
    fundingService.addFolderPathApplication(filledApplication, req.params.fundingProjectId)
    .then(response => res.status(201).send(response))
    .catch(error => next(error));
});

fundingRouter.put("/funding-project/ack-uplaod/:fundingProjectId",
                userAuth,
                setPathAck, 
                upload.single('file'), 
                (req, res, next) => {
    const ack = {
        path : req.file.destination,
        fileName: req.file.filename
    }
    fundingService.addFolderPathAck(ack, req.params.fundingProjectId)
    .then(response => res.status(201).send(response))
    .catch(error => next(error));
});

fundingRouter.post("/funding-project/download", userAuth, (req, res, next) => {
    console.log("H",req.body.path)
    const docPath = path.join(__dirname,`../`) + req.body.path;
    console.log(docPath)
    res.sendFile(docPath);
});


fundingRouter.get("/funding-project/approve/:fundingProjectId", userAuth, (req, res, next) => {
    console.log("route")
    fundingService.approveFundingById(req.params.fundingProjectId,req.auth.userId)
    .then(response => res.status(201).send(response))
    .catch(error => next(error));
});
fundingRouter.put("/funding-project/remark/:fundingProjectId", userAuth, (req, res, next) => {
    console.log("hreg",req.body.remarks)
    fundingService.addRemarks(req.params.fundingProjectId,req.body.remarks)
    .then(response => res.status(201).send(response))
    .catch(error => next(error));
});

module.exports = fundingRouter;
