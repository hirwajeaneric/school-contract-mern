var axios = require('axios')

//Saving the installments 
const url = 'http://localhost:8080/api/checkin/new';

exports.savingOne = async (firstInstallment)=> {
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

exports.savingTwo = async (secondInstallment)=> {
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

exports.savingThree = async (thirdInstallment)=> {
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