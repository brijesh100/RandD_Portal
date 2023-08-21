const serviceUtils = require('../utils/service.util');
const userModel = require('../model/user.model');
const nodemailer = require('nodemailer'); 
const mailer = {};
const { ApiError } = require('../objectCreator/objectCreator');
let mailTransporter = nodemailer.createTransport({ 
    host: 'smtp.office365.com', // Office 365 server
    port: 587,     // secure SMTP
    secure: false, // false for TLS - as a boolean not string - but the default is false so just remove this completely
    auth: {
        user: 'researchportal@sonatech.ac.in',
        pass: 'SonaRaD2021'
    },
    tls: {
        ciphers: 'SSLv3'
    }
}); 
mailer.sendOTPMail = (userId,mailid) => {
    let otp = serviceUtils.generateOTP();
    let mailDetails = { 
        from: 'researchportal@sonatech.ac.in', 
        to: mailid, 
        subject: 'Sona R&D OTP', 
        text: 'Please you this OTP to reset your password '+otp
    }; 

    mailTransporter.sendMail(mailDetails, function(err, data) { 
        if(err) { 
            console.log("err",err);
        }
    }); 
    return userModel.putOTP(userId,otp)
    .then(response =>{
        if(response){
            return true;
        }
    })
    }

module.exports = mailer;