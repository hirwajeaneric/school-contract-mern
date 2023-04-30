const mongoose = require('mongoose');

const ContractSchema = new mongoose.Schema({
    regNumber: { type: String, required: true },
    urubutoPayCode: { type: String, required: true },
    dueAmount: { type: Number, required: true },
    paidAmount: { type: Number, required: true },
    amountPerInstallment: { type: Number, required: true },
    email: { type: String, required: true },
    sponsorEmail: { type: String, required: true },
    status: { type: String, required: true },
    creationDate: { type: String, required: true },
    comment: { type: String, required: false }
});

const Contract = mongoose.model('contract', ContractSchema);
module.exports = Contract;