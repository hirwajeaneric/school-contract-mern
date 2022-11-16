const axios =require('axios');
const schedule = require('node-schedule');
const { addFines } = require('./addFines');

const scheduling = (sevenDaysBeforeDeadline, oneDateBeforeDeadline, deadLine, midNightOfTheDeadline, installment)=>{
    
    const {regNumber, contractId, checkinNumber, urubutoPayCode, email, sponsorEmail, dueAmount, paidAmount, dueDate, submitDate, status, comment} = installment;
    
    const jobOne = schedule.scheduleJob(sevenDaysBeforeDeadline, function(){
        reminderMessage(
            email, 
            sponsorEmail, 
            `7 Days before Payment Deadline`,
            `AUCA Accounting office would like to remind you that the deadline of paying and submmitting the installment payment code is ${deadLine}. Please do your best to pay and submit the code before the end of the deadline to avoid charges.\n\nWe would like to also remind you that after the deadline of payment and submittion of installment payment, a 5% charge is added to the amount you are due to pay for the installment. \n\nRegards,\nAUCA Contract System`);
    });
    const jobTwo = schedule.scheduleJob(oneDateBeforeDeadline, function(){
        reminderMessage(
            email, 
            sponsorEmail, 
            `2 Days before Payment Deadline!` , 
            `AUCA Accounting office would like to remind you that the deadline of paying and submmitting the installment payment code is ${deadLine}. Please do your best to pay and submit the code before the end of the deadline to avoid charges.\n\nWe would like to also remind you that after the deadline of payment and submittion of installment payment, a 5% charge is added to the amount you are due to pay for the installment. \n\nRegards,\nAUCA Contract System`);
    });
    const jobThree = schedule.scheduleJob(deadLine, function(){
        reminderMessage(
            email, 
            sponsorEmail, 
            `Deadline Reached!` , 
            `AUCA Accounting office would like to remind you that today is your last day to pay and submit the installment payment code to AUCA Contract System. Please do your best to pay and submit the code before the end of the deadline to avoid charges.\n\nWe would like to also remind you that after the deadline of payment and submittion of installment payment, a 5% charge is added to the amount you are due to pay for the installment. \n\nRegards,\nAUCA Contract System`);
    });
    const jobFour = schedule.scheduleJob(midNightOfTheDeadline, function(){
        addFines(installment);
        reminderMessage(
            email, 
            sponsorEmail, 
            `Late payment Alert!` , 
            `You have been charged 5% of the amount you were supposed to pay on ${deadLine}.\nCharges: ${dueAmount*(5/100)} Rwf. \nTotal Due amount for this installment: ${dueAmount + dueAmount*(5/100)} Rwf\n\nRegards,\nAUCA Contract System`);
    });
}

exports.scheduler = () => {
    var installments = [];
    
    axios.get('http://localhost:8080/api/checkin/list')
    .then(res=>{
        installments = res.data;
        res.data.forEach(installment => {
            
            let deadLine = new Date(installment.dueDate);
            let sevenDaysBeforeDeadline = new Date(installment.dueDate);
            let oneDateBeforeDeadline = new Date(installment.dueDate);
            let midNightOfTheDeadline = new Date(installment.dueDate);

            sevenDaysBeforeDeadline.setDate(sevenDaysBeforeDeadline.getDate()-7);
            oneDateBeforeDeadline.setDate(oneDateBeforeDeadline.getDate()-1);
            midNightOfTheDeadline.setDate(midNightOfTheDeadline.getDate()+1);
            
            // console.log('DeadLine: '+deadLine+'\nOne Week Before Deadline: '+new Date(sevenDaysBeforeDeadline)+'\nOne Day Before Deadline: '+new Date(oneDateBeforeDeadline)+' ');
            // console.log('Due Amount'+installment.dueAmount+'\nPaid Amount: '+installment.paidAmount);

            if(installment.paidAmount > 0 && installment.status === "Approved") {
                console.log("This person should not recieve messages since he/she has paid on time!");
            } else if (installment.paidAmount > 0 && installment.status === "Rejected"){
                scheduling(sevenDaysBeforeDeadline, oneDateBeforeDeadline, deadLine, midNightOfTheDeadline, installment);
            } else if (installment.paidAmount === 0){
                scheduling(sevenDaysBeforeDeadline, oneDateBeforeDeadline, deadLine, midNightOfTheDeadline, installment);
            }
            console.log("Scheduling has attained it purpose!");
        });
    })
    .catch(error => {
        console.log("Server error: "+error)
    })
}