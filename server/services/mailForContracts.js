const nodemailer = require("nodemailer");

exports.mailForContracts = (contractData)=>{
    var emailsubject, studentMessage, sponsorMessage;
    if(contractData.status === "Pending") {
        emailsubject = "Contract Submitted!";
        studentMessage = `Dear Student, \nCongratulations for you have successfully Submitted your contract to AUCA Accounting Office under registration number ${contractData.regNumber}. \nYou will be notified when your contract is validated! \n\nRegards, \n\n AUCA Contract`;
        sponsorMessage = `Dear Sir/Madam, \nThe student that you sponsor have successfully Submitted a contract to AUCA Accounting Office under registration number ${contractData.regNumber}. \nYou will be notified when their contract is validated! \n\nRegards, \n\n AUCA Contract`;
    } else if (contractData.status === "Approved") {
        emailsubject = "Contract Approved!";
        studentMessage = `Dear Student, \nCongratulations for Your contract was Approved! \n\nPlease, Check your AUCA Contract account to see more details about your installments! \n\nRegards, \n\n AUCA Contract`;
        sponsorMessage = `Dear Sir/Madam, \nThe contract that the student you sponsor submitted was Approved! \nThe student you sponsor will be paying ${contractData.amountPerInstallment} every month in 3 installments! \n\nPlease be aware that late submittions of payment to the AUCA Contract system result into a 5% penalty on the amount to be paid. \n\nRegards, \n\n AUCA Contract`;
    } else if (contractData.status === "Rejected") {
        emailsubject = "Contract Rejected!";
        studentMessage = `Dear Student, \nYour contract was rejected due to certain inconviniences found it in. \nReason: \n${contractData.comment} \n\nRegards, \n\n AUCA Contract`;
        sponsorMessage = `Dear Sir/Madam, \nThe contract that the student you sponsor was Rejected due to the following reason: \n${contractData.comment}. \n\nRegards, \n\n AUCA Contract`;
    }

    var from = "hirwaminerve25@gmail.com";
    var to1 = contractData.email;
    var to2 = contractData.sponsorEmail;
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