const nodemailer = require("nodemailer");

exports.reminderMessage = (studentEmail, sponsorEmail, emailSubject, textMessage,)=>{    
    var from = "hirwaminerve25@gmail.com";
    var to1 = checkinData.studentEmail;
    var to2 = checkinData.sponsorEmail;
    var subject = emailSubject;
    var message1 = textMessage;
    var message2 = textMessage;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'hirwaminerve25@gmail.com',
            pass: 'dimpywpcpdhaopxs'
        }
    });

    var mailOptions1 = {
        from: from,
        to: to1, 
        subject: subject,
        text: message1
    };

    var mailOptions2 = {
        from: from,
        to: to2, 
        subject: subject,
        text: message2
    };

    transporter.sendMail(mailOptions1, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log("Email Sent To Student: "+info.response);
        }
    })

    transporter.sendMail(mailOptions2, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log("Email Sent To Sponsor: "+info.response);
        }
    })   
}