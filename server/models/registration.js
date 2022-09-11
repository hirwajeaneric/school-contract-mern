const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    regNumber: {type: String, required: true},
    name: {type: String, required: true},
    paidAmount:{type: mongoose.Types.Decimal128, required: true}
})

const Registration = mongoose.model('registration', registrationSchema);

module.exports = Registration;