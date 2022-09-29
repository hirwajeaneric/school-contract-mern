const nodemailer = require("nodemailer");

exports.mailForCheckins = (checkinData)=>{
    var emailsubject, studentMessage, sponsorMessage;
    if(checkinData.status === "Pending" && checkinData.paidAmount > 0 && checkinData.urubutoPayCode !== "") {
        emailsubject = "Installment Payment Submitted!";
        studentMessage = `Dear Student, \nCongratulations for you have successfully Submitted your payment for installment ${checkinData.checkinNumber} to AUCA Accounting Office. \nYou will be notified when your installment payment is validated!\n\nRegards\n\nAUCA Contract`;
        sponsorMessage = `Dear Sir/Madam, \nThe student that you sponsor have successfully Submitted payment for  installment ${checkinData.checkinNumber} to AUCA Accounting Office. \nAmount paid: ${checkinData.paidAmount}. \nYou will be notified when their installment payment is validated!`;
    } else if (checkinData.status === "Approved") {
        emailsubject = "Installment Payment Approved!";
        studentMessage = `Dear Student, \nCongratulations for payment of installent ${checkinData.checkinNumber} was Approved! \n\nRegards\n\nAUCA Contract!`;
        sponsorMessage = `Dear Sir/Madam, \nThe payment of installment ${checkinData.checkinNumber} submitted by the student you sponsor was Approved! \n\nWe take this opportunity to reminded you that late submittions of payment to the AUCA Contract system result into a 5% penalty on the amount to be paid. \n\nRegards, \n\n AUCA Contract`;
    } else if (checkinData.status === "Rejected") {
        emailsubject = "Installment Payment Rejected!";
        studentMessage = `Dear Student, \nYour payment for installment ${checkinData.checkinNumber} was rejected due to certain inconviniences found it in. \nReason: \n${checkinData.comment}`;
        sponsorMessage = `Dear Sir/Madam, \nThe payment for installment ${checkinData.checkinNumber} submitted by the student you sponsor was Rejected due to the following reason: \n${checkinData.comment}. \n\nRegards, \n\n AUCA Contract`;
    }

    var from = "hirwaminerve25@gmail.com";
    var to1 = checkinData.email;
    var to2 = checkinData.sponsorEmail;
    var subject = emailsubject;
    var message1 = studentMessage;
    var message2 = sponsorMessage;

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