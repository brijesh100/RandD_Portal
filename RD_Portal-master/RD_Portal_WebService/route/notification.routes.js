const express = require("express");
const notificationService = require("../service/notification.service");
const { userAuth, adminAuth } = require('../middleware/auth.middleware');

const notificationRouter = express.Router();

notificationRouter.post("/add-message", userAuth, (req, res, next) => {
    notificationService.createNotification(req.body)
        .then(response => res.status(201).send(response))
        .catch(error => next(error));
});
notificationRouter.get("/get-message/:userId", userAuth, (req, res, next) => {
    notificationService.getUserMessages(req.params.userId)
    .then(response => res.send(response))
    .catch(error => next(error));
});
notificationRouter.get("/read-message/:msgId", userAuth, (req, res, next) => {
    notificationService.readMessage(req.params.msgId)
        .then(response => res.status(201).send(response))
        .catch(error => next(error));
});
module.exports = notificationRouter;