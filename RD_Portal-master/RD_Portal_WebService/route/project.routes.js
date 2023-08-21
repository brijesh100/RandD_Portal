const express = require("express");
const projectService = require("../service/project.service");
const {userAuth,adminAuth} = require('../middleware/auth.middleware');
const { response } = require("express");
const {upload,setPathprojectApplication, setPathFilledApplication, setPathAck} = require('../middleware/file-system.middleware');
const path = require('path');

const projectRouter = express.Router();

projectRouter.get("/restore-default-projects", (req, res, next) => {
    projectService.insertScript()
        .then(response => {
            res.status(201);
            res.json({ message: "Inserted " + response + " Projects in DB" });
        })
        .catch(error => next(error));
});

projectRouter.get("/all-summary", userAuth, (req, res, next) => {
    projectService.getAllProjectsSummary()
        .then(response => res.send(response))
        .catch(error => next(error));
});
projectRouter.get("/approval-summary",userAuth,(req,res,next)=>{
    projectService.getApprovalProject()
        .then(response=>res.send(response))
        .catch(error =>next(error))
})
projectRouter.get("/lab/:labId", userAuth, (req, res, next) => {
    projectService.getProjectsByLabId(req.params.labId)
        .then(response => res.send(response))
        .catch(error => next(error));
});

projectRouter.get("/overview/:projectId", userAuth, (req, res, next) => {
    projectService.getProjectById(req.params.projectId)
        .then(response => res.send(response))
        .catch(error => next(error));
});

projectRouter.post("/create-new", userAuth, (req, res, next) => {
    projectService.createNewProject(req.body, req.auth.userId)
        .then(response => res.status(201).send(response))
        .catch(error => next(error));
});

projectRouter.put("/update/:projectId", userAuth, (req, res, next) => {
    projectService.updateProjectById(req.body,req.params.projectId)
        .then(response => res.status(201).send(response))
        .catch(error => next(error));
});

projectRouter.get("/search-project/:searchText", userAuth, (req, res, next) => {
    projectService.getProjectNamesByUserId(req.params.searchText, req.auth.userId)
        .then(response => res.status(201).send(response))
        .catch(error => next(error));
});

projectRouter.get("/approve/:projectId", userAuth, (req, res, next) => {
    projectService.approveProjectById(req.params.projectId,req.auth.userId)
    .then(response => res.status(201).send(response))
    .catch(error => next(error));
});
projectRouter.put("/remark/:projectId", userAuth, (req, res, next) => {
    projectService.addRemarks(req.params.projectId,req.body)
    .then(response => res.status(201).send(response))
    .catch(error => next(error));
});

projectRouter.put("/reviewRemark/:projectId", userAuth, (req, res, next) => {
    projectService.addReviewRemarks(req.params.projectId,req.body)
    .then(response => res.status(201).send(response))
    .catch(error => next(error));
});

projectRouter.get("/review/:projectId", userAuth, (req, res, next) => {
    projectService.reviewProjectById(req.params.projectId)
    .then(response => res.status(201).send(response))
    .catch(error => next(error));
});
projectRouter.put("/file-upload/:projectId",
    userAuth,
    setPathprojectApplication,
    upload.single('file'),
    (req, res, next) => {
        //console.log("------",req.file.filename)
    const filledApplication = {
    path : req.file.destination,
    fileName: req.file.filename
    }
    console.log(filledApplication)
projectService.addFolderPathApplication(filledApplication, req.params.projectId)
.then(response => res.status(201).send(response))
.catch(error => next(error));
});
projectRouter.put("/detail-file-upload/:projectId",
    userAuth,
    setPathprojectApplication,
    upload.single('file'),
    (req, res, next) => {
        //console.log("------",req.file.filename)
    const filledApplication = {
    path : req.file.destination,
    fileName: req.file.filename
    }
    //console.log(filledApplication)
    res.status(201).send(filledApplication)
});
projectRouter.post("/download", userAuth, (req, res, next) => {
    //console.log("H",req.body.path)
    const docPath = path.join(__dirname,`../`) + req.body.path;
    //console.log(docPath)
    res.sendFile(docPath);
});

projectRouter.get("/archive/:projectId", userAuth, (req, res, next) => {
    projectService.archiveProjectById(req.params.projectId,req.auth.userId)
    .then(response => res.status(201).send(response))
    .catch(error => next(error));
});
projectRouter.get("/restore/:projectId", userAuth, (req, res, next) => {
    projectService.restoreProjectById(req.params.projectId,req.auth.userId)
    .then(response => res.status(201).send(response))
    .catch(error => next(error));
});
projectRouter.get("/lock/:projectId", userAuth, (req, res, next) => {
    projectService.lockProjectById(req.params.projectId,req.auth.userId)
    .then(response => res.status(201).send(response))
    .catch(error => next(error));
});
projectRouter.get("/unlock/:projectId", userAuth, (req, res, next) => {
    projectService.unlockProjectById(req.params.projectId,req.auth.userId)
    .then(response => res.status(201).send(response))
    .catch(error => next(error));
});
projectRouter.get("/keyword/:key",userAuth,(req,res,next)=>{
    projectService.getKeywordProject(req.params.key)
        .then(response=>res.send(response))
        .catch(error =>next(error))
});
projectRouter.put("/linkpublication/:projectId", userAuth, (req, res, next) => {
    projectService.linkPublication(req.params.projectId,req.body)
    .then(response => res.status(201).send(response))
    .catch(error => next(error));
});

// Priority Project routes
projectRouter.get("/all-priority", userAuth, (req, res, next) => {
    projectService.getPriorityProjects()
        .then(response => res.send(response))
        .catch(error => next(error));
});

module.exports = projectRouter;