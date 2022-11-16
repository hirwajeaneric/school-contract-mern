const axios = require('axios');

exports.addFines = (installment)=>{
    const newDueAmount = installment.dueAmount + installment.dueAmount*(5/100);
    installment.dueAmount = newDueAmount;
    axios.put(`http://localhost:8080/api/checkin/update?id=${installment._id}, ${installment}`)
    .then((res)=>{
        if(res.data) {
            console.log("Installment updated successfully for a charge");
        } else {
            console.log("Failed to update checkin");
        }
    })
    .catch((error)=>{
        console.log("Server error: "+error)
    })
}