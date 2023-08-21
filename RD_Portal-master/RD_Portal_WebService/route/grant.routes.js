const express = require("express");
const path = require('path');

const grantService = require("../service/grant.service");

const {userAuth, adminAuth} = require('../middleware/auth.middleware');
const {upload, setPathFilledApplication, setPathAck} = require('../middleware/file-system.middleware');


const grantRouter = express.Router();

grantRouter.post("/create-new", userAuth, (req, res, next) => {
    grantService.createNewGrant(req.body, req.auth.userId)
        .then(response => res.status(201).send(response))
        .catch(error => next(error));
});

module.exports = grantRouter;