const express = require("express");
const patentService = require("../service/patent.service");
const {userAuth} = require('../middleware/auth.middleware');
const { response } = require("express");
const {upload,setPathprojectApplication, setPathFilledApplication, setPathAck} = require('../middleware/file-system.middleware');
const path = require('path');

const patentRouter = express.Router();

//changing getAllPatent  to getAllPatentsSummary =>
patentRouter.get("/all-summary/", userAuth, (req, res, next) => {
    patentService.getAllPatentsSummary()
        .then(response => res.send(response))
        .catch(error => next(error));
});

patentRouter.post("/add-patent", userAuth, (req, res, next) => {
    patentService.createNewPatent(req.body, req.auth.userId)
        .then(response => res.status(201).send(response))
        .catch(error => next(error));
});

patentRouter.get("/get-patent/", userAuth, (req, res, next) => {
    patentService.getallPatents()
    .then(response => res.send(response))
    .catch(error => next(error));
});

patentRouter.get("/overview/:patentId", userAuth, (req, res, next) => {
    patentService.getPatentById(req.params.patentId)
        .then(response => res.send(response))
        .catch(error => next(error));
});
patentRouter.put("/update/:patentId", userAuth, (req, res, next) => {
    patentService.updatePatentById(req.body,req.params.patentId)
        .then(response => res.status(201).send(response))
        .catch(error => next(error));
});
module.exports = patentRouter;