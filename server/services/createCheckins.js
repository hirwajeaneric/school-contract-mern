const { default: axios } = require('axios');

require('../models/checkin')

exports.createCheckins = (contractData) => {
    // Setting up data
    var contractCreatedOn = contractData.creationDate;
    var convertedDate = new Date(contractCreatedOn);

    convertedDate.setDate(convertedDate.getDate()+30);
    var date1 = convertedDate.toDateString();
    convertedDate.setDate(convertedDate.getDate()+30);
    var date2 = convertedDate.toDateString();
    convertedDate.setDate(convertedDate.getDate()+30);
    var date3 = convertedDate.toDateString();

    // Installment data
    const firstInstallment = {
        regNumber: contractData.regNumber,
        contractId: contractData._id,
        checkinNumber: "1", 
        urubutoPayCode: "",
        dueAmount: contractData.amountPerInstallment,
        paidAmount: 0,
        dueDate: date1,
        submitDate: "",
        email: contractData.email,
        sponsorEmail: contractData.sponsorEmail,
        status: "Pending",
        comment: "" 
    }

    const secondInstallment = {
        regNumber: contractData.regNumber,
        contractId: contractData._id,
        checkinNumber: "2", 
        urubutoPayCode: "",
        dueAmount: contractData.amountPerInstallment,
        paidAmount: 0,
        dueDate: date2,
        submitDate: "",
        email: contractData.email,
        sponsorEmail: contractData.sponsorEmail,
        status: "Pending",
        comment: "" 
    }

    const thirdInstallment = {
        regNumber: contractData.regNumber,
        contractId: contractData._id,
        checkinNumber: "3", 
        urubutoPayCode: "",
        dueAmount: contractData.amountPerInstallment,
        paidAmount: 0,
        dueDate: date3,
        email: contractData.email,
        sponsorEmail: contractData.sponsorEmail,
        submitDate: "",
        status: "Pending",
        comment: "" 
    }

    var arrayOfInstallments = [firstInstallment, secondInstallment, thirdInstallment];

    console.log(arrayOfInstallments);

    //Saving the installments 
    const url = 'http://localhost:8080/api/checkin/createthree';

    function createCheckins(arrayOfInstallments) {
        axios.post(url, arrayOfInstallments)
        .then((res)=>{
            console.log(res.data);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    createCheckins(arrayOfInstallments);
}