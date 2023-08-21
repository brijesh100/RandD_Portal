const express = require('express');
const bodyParser = require('body-parser'); 
const cors = require('cors');

const userRouter = require("./route/user.routes");
const projectRouter = require("./route/project.routes");
const publicationRouter = require("./route/publication.routes");
const fundingnRouter = require("./route/funding.routes");
const departmentRouter = require("./route/department.routes");
const notificationRouter = require("./route/notification.routes");
const patentRouter = require("./route/patent.routes");
const consultancyRouter = require("./route/consultancy.routes");
const grantRouter = require("./route/grant.routes");

const errorLogger = require("./utils/errorLogger");

const app = express();

const MAX_UPLOAD_SIZE = '10mb';
app.use(cors());

app.use(bodyParser.json({limit:MAX_UPLOAD_SIZE}));
app.use(bodyParser.urlencoded({extended:true, limit:MAX_UPLOAD_SIZE}))
app.use('/user',userRouter);
app.use('/department',departmentRouter);
app.use('/project',projectRouter);
app.use('/publication',publicationRouter);
app.use('/funding',fundingnRouter);
app.use('/grant',grantRouter);
app.use('/notification',notificationRouter);
app.use('/patent',patentRouter)
app.use('/consultancy',consultancyRouter)
app.use(errorLogger);


const PORT = process.env.PORT || 5000;
app.listen(PORT);

