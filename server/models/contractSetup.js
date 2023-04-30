const mongoose = require('mongoose');

const ContractSetupSchema = new mongoose.Schema({
    academicYear: { type: String, required: true },
    semester: { type: String, required: true },
    acceptedAmount: { type: Number, required: true },
    setupDate: { type: String, required: true },
});

const ContractSetup = mongoose.model('contractSetup', ContractSetupSchema);

module.exports = ContractSetup;