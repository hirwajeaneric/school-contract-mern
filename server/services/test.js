var express = require('express');
var app = express();
var router = express.Router();
var axios = require('axios')

exports.test = (message, requestData)=> {
    console.log(`I am saying: ${message}`);
    // console.log(requestData);

    //Determining new payment dates
    var contractCreatedOn = requestData.creationDate;
    var convertedDate = new Date(contractCreatedOn);
    
    convertedDate.setDate(convertedDate.getDate()+30);
    var date1 = convertedDate.toDateString();
    convertedDate.setDate(convertedDate.getDate()+30);
    var date2 = convertedDate.toDateString();
    convertedDate.setDate(convertedDate.getDate()+30);
    var date3 = convertedDate.toDateString();

    // Creating installments
    const firstInstallment = {
        regNumber: requestData.regNumber,
        contractId: requestData._id,
        checkinNumber: "1", 
        urubutoPayCode: "",
        dueAmount: requestData.amountPerInstallment,
        paidAmount: 0,
        dueDate: date1,
        submitDate: "",
        status: "Pending",
        comment: "" 
    }

    const secondInstallment = {
        regNumber: requestData.regNumber,
        contractId: requestData._id,
        checkinNumber: "2", 
        urubutoPayCode: "",
        dueAmount: requestData.amountPerInstallment,
        paidAmount: 0,
        dueDate: date2,
        submitDate: "",
        status: "Pending",
        comment: "" 
    }

    const thirdInstallment = {
        regNumber: requestData.regNumber,
        contractId: requestData._id,
        checkinNumber: "3", 
        urubutoPayCode: "",
        dueAmount: requestData.amountPerInstallment,
        paidAmount: 0,
        dueDate: date3,
        submitDate: "",
        status: "Pending",
        comment: "" 
    }

    //Saving the installments 
    const url = 'http://localhost:8080/api/checkin/new';
    
    const savingOne = async ()=> {
        try {
            const { data: res } = await axios.post(url, firstInstallment);
            const checkin = res;
            if (checkin) {
                console.log("Checkin 1 created");
            } else {
                console.log("Failed");
            }
        } catch (error) {
            console.log(error.data);
        }
    }

    const savingTwo = async ()=> {
        try {
            const { data: res } = await axios.post(url, secondInstallment);
            const checkin = res;
            if (checkin) {
                console.log("Checkin 2 created");
            } else {
                console.log("Failed");
            }
        } catch (error) {
            console.log(error.data);
        }
    }

    const savingThree = async ()=> {
        try {
            const { data: res } = await axios.post(url, thirdInstallment);
            const checkin = res;
            if (checkin) {
                console.log("Checkin 3 created");
            } else {
                console.log("Failed");
            }
        } catch (error) {
            console.log(error.data);
        }
    }

    savingOne();
    savingTwo();
    savingThree();

}