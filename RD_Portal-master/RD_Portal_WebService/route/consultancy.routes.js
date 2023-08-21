const express = require("express");
const consultancyService = require("../service/consultancy.service");
const {userAuth} = require('../middleware/auth.middleware');
const { response } = require("express");
const {upload,setPathprojectApplication, setPathFilledApplication, setPathAck} = require('../middleware/file-system.middleware');
const path = require('path');

const consultancyRouter = express.Router();

consultancyRouter.post("/add-consultancy", userAuth, (req, res, next) => {
    consultancyService.createNewconsultancy(req.body, req.auth.userId)
        .then(response => res.status(201).send(response))
        .catch(error => next(error));
});

consultancyRouter.get("/overview/:consultancyId", userAuth, (req, res, next) => {
    consultancyService.getconsultancyById(req.params.consultancyId)
        .then(response => res.send(response))
        .catch(error => next(error));
});

module.exports = consultancyRouter;