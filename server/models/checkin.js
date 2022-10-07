const mongoose = require('mongoose');
const Joi = require('joi');

const CheckinSchema = new mongoose.Schema({
    regNumber: { type: String, required: true },
    contractId: { type: String, required: true },
    checkinNumber: { type: Number, required: true },
    urubutoPayCode: { type: String, required: false },
    email: { type: String, required: true },
    sponsorEmail: { type: String, required: true },
    dueAmount: { type: Number, required: true },
    paidAmount: { type: Number, required: false },
    dueDate: { type: String, required: true },
    submitDate: { type: String, required: false },
    status: { type: String, required: true },
    comment: { type: String, required: false }
});

const Checkin = mongoose.model('checkin', CheckinSchema);
module.exports = Checkin;