const express = require("express");
const usersService = require("../service/user.service");
const { userAuth, adminAuth } = require('../middleware/auth.middleware');

const userRouter = express.Router();

userRouter.get("/restore-default-users", (req, res, next) => {
    usersService.insertScript()
      .then(response => {
          res.status(201);
          res.json({ message: "Inserted " + response + " Users in DB" });
      })
      .catch(error => next(error));
});

userRouter.post("/login", (req, res, next) => {
    usersService.loginUser(req.body)
    .then(response => res.send(response))
    .catch(error => next(error));
});

userRouter.get("/profile/all", userAuth, (req, res, next) => {
    usersService.getAllUserDetails()
    .then(response => res.send(response))
    .catch(error => next(error));
});

userRouter.get("/profile/:userId", userAuth, (req, res, next) => {
    usersService.getUserDetails(req.params.userId)
    .then(response => res.send(response))
    .catch(error => next(error));
});

userRouter.get("/projects/:userId", userAuth, (req, res, next) => {
    usersService.getProjectsByUserId(req.params.userId)
    .then(response => res.send(response))
    .catch(error => next(error));
});

userRouter.get("/publications/:userId", userAuth, (req, res, next) => {
    usersService.getPublicationsByUserId(req.params.userId)
    .then(response => res.send(response))
    .catch(error => next(error));
});

userRouter.get("/funding-project/:userId", userAuth, (req, res, next) => {
    usersService.getFundingProjectByUserId(req.params.userId)
    .then(response => res.send(response))
    .catch(error => next(error));
});

userRouter.get("/match-userId/:userId", userAuth, (req, res, next) => {
    usersService.getMatchingUserId(req.params.userId)
    .then(response => res.send(response))
    .catch(error => next(error));
});

userRouter.post("/create", userAuth, adminAuth, (req, res, next) => {
    usersService.createUser(req.body)
    .then(response => res.send(response))
    .catch(error => next(error));
});
userRouter.put("/edit/:userId", userAuth, adminAuth, (req, res, next) => {
    usersService.editUser(req.body,req.params.userId)
    .then(response => res.send(response))
    .catch(error => next(error));
});

userRouter.put("/update-password/:userId", userAuth, (req, res, next) => {
    usersService.updatePassword(req.body, req.params.userId)
    .then(response => res.send(response))
    .catch(error => next(error));
});
userRouter.get("/department-users/:deptId",userAuth, (req, res, next) => {
    usersService.getDepartmentUsers(req.params.deptId)
    .then(response => res.send(response))
    .catch(error => next(error));
});
userRouter.get("/archive/:userId",userAuth, (req, res, next) => {
    usersService.archiveUser(req.params.userId)
    .then(response => res.send(response))
    .catch(error => next(error));
});
userRouter.get("/restore/:userId",userAuth, (req, res, next) => {
    usersService.restoreUser(req.params.userId)
    .then(response => res.send(response))
    .catch(error => next(error));
});
userRouter.put("/contact/:userId", userAuth, (req, res, next) => {
    usersService.addUserData(req.body,req.params.userId)
    .then(response => res.send(response))
    .catch(error => next(error));
});
userRouter.get("/theme/dark/:userId",userAuth, (req, res, next) => {
    usersService.enabledark(req.params.userId)
    .then(response => res.send(response))
    .catch(error => next(error));
});
userRouter.get("/theme/light/:userId",userAuth, (req, res, next) => {
    usersService.disabledark(req.params.userId)
    .then(response => res.send(response))
    .catch(error => next(error));
});
userRouter.put("/keywords/:userId", userAuth, (req, res, next) => {
    usersService.keywords(req.body, req.params.userId)
    .then(response => res.send(response))
    .catch(error => next(error));
});
userRouter.put("/matchkeywords/", userAuth, (req, res, next) => {
    console.log("test")
    usersService.keywordusers(req.body)
    .then(response => res.send(response))
    .catch(error => next(error));
});
userRouter.get("/lastseen/:userId", userAuth, (req, res, next) => {
    usersService.logout(req.params.userId)
    .then(response => res.send(response))
    .catch(error => next(error));
});
userRouter.get("/lab-users/:labId",userAuth, (req, res, next) => {
    usersService.getLabUsers(req.params.labId)
    .then(response => res.send(response))
    .catch(error => next(error));
});
userRouter.get("/forgotpassword/:userId", (req, res, next) => {
    usersService.forgotPassword(req.params.userId)
    .then(response => res.send(response))
    .catch(error => next(error));
});
userRouter.put("/checkotp/:userId", (req, res, next) => {
    console.log(req.body,req.params.userId)
    usersService.checkOTP(req.params.userId, req.body)
    .then(response => res.send(response))
    .catch(error => next(error));
});
userRouter.get("/defaultpass/:userId", (req, res, next) => {
    usersService.defaultPassword(req.params.userId)
    .then(response => res.send(response))
    .catch(error => next(error));
});
userRouter.put("/fupdate-password/:userId", (req, res, next) => {
    console.log("check")
    usersService.updatePassword(req.body, req.params.userId)
    .then(response => res.send(response))
    .catch(error => next(error));
});

//////////////////Consultancy////////////////////
userRouter.get("/consultancy/:userId", userAuth, (req, res, next) => {
    usersService.getconsultancyByUserId(req.params.userId)
    .then(response => res.send(response))
    .catch(error => next(error));
});

/////////////////Patent////////////////////////
userRouter.get("/patent/:userId", userAuth, (req, res, next) => {
    usersService.getpatentByUserId(req.params.userId)
    .then(response => res.send(response))
    .catch(error => next(error));
});

userRouter.get("/publication-overview/:userId", userAuth, (req, res, next) => {
    usersService.getPublicationOverview(req.params.userId)
    .then(response => res.send(response))
    .catch(error => next(error));
});



module.exports = userRouter;