const express = require("express");
const publicationService = require("../service/publication.service");
const {userAuth} = require('../middleware/auth.middleware');
const {upload,setPathprojectApplication, setPathFilledApplication, setPathAck,setPathPublicationApplication} = require('../middleware/file-system.middleware');
const path = require('path');
const publicationRouter = express.Router();

publicationRouter.get("/restore-default-publications", (req, res, next) => {
    publicationService.insertScript()
      .then(response => {
          res.status(201);
          res.json({ message: "Inserted " + response + " publications in DB" });
      })
      .catch(error => next(error));
});

publicationRouter.get("/all-summary", userAuth, (req, res, next) => {
    publicationService.getAllpublicationsSummary()
        .then(response => res.send(response))
        .catch(error => next(error));
});

publicationRouter.post("/create-new", userAuth, (req, res, next) => {
    publicationService.createNewPublication(req.body)
        .then(response => res.status(201).send(response))
        .catch(error => next(error));
});

publicationRouter.get("/overview/:publicationId",userAuth,(req,res,next) =>{
    publicationService.getPublicationById(req.params.publicationId)
        .then(response => res.send(response))
        .catch(error => next(error));
})

publicationRouter.get("/approve/:publicationId", (req, res, next) => {
    publicationService.approvePublicationById(req.params.publicationId)
    .then(response => res.status(201).send(response))
    .catch(error => next(error));
});

publicationRouter.get("/approval-summary",userAuth,(req,res,next)=>{
    publicationService.getApprovalPublication()
        .then(response=>res.send(response))
        .catch(error =>next(error))
})

publicationRouter.put("/remark/:publicationId", userAuth, (req, res, next) => {
    publicationService.addRemarks(req.params.publicationId,req.body)
    .then(response => res.status(201).send(response))
    .catch(error => next(error));
});

publicationRouter.put("/file-upload/:publicationId",
    userAuth,
    setPathPublicationApplication,
    upload.single('file'),
    (req, res, next) => {
        console.log("------",req.file.filename)
    const filledApplication = {
    path : req.file.destination,
    fileName: req.file.filename
    }
    console.log(filledApplication)
publicationService.addFolderPathApplication(filledApplication, req.params.publicationId)
.then(response => res.status(201).send(response))
.catch(error => next(error));
});

publicationRouter.post("/download", userAuth, (req, res, next) => {
    console.log("H",req.body.path)
    const docPath = path.join(__dirname,`../`) + req.body.path;
    console.log(docPath)
    res.sendFile(docPath);
});

publicationRouter.put("/update/:publicationId", userAuth, (req, res, next) => {
    publicationService.updatePublication(req.params.publicationId,req.body)
    .then(response => res.status(201).send(response))
    .catch(error => next(error));
});
publicationRouter.get("/archive/:publicationId", userAuth, (req, res, next) => {
    publicationService.archivePublicationById(req.params.publicationId,req.auth.userId)
    .then(response => res.status(201).send(response))
    .catch(error => next(error));
});
publicationRouter.get("/restore/:publicationId", userAuth, (req, res, next) => {
    publicationService.restorePublicationById(req.params.publicationId,req.auth.userId)
    .then(response => res.status(201).send(response))
    .catch(error => next(error));
});
publicationRouter.get("/lock/:publicationId", userAuth, (req, res, next) => {
    publicationService.lockPublicationById(req.params.publicationId,req.auth.userId)
    .then(response => res.status(201).send(response))
    .catch(error => next(error));
});
publicationRouter.get("/unlock/:publicationId", userAuth, (req, res, next) => {
    publicationService.unlockPublicationById(req.params.publicationId,req.auth.userId)
    .then(response => res.status(201).send(response))
    .catch(error => next(error));
});
publicationRouter.get("/match-publication/:paperTitle", userAuth, (req, res, next) => {
    publicationService.getMatchingPublication(req.params.paperTitle)
    .then(response => res.send(response))
    .catch(error => next(error));
});
module.exports = publicationRouter;