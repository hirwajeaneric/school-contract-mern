const mongoose = require('mongoose');

const acontractSchema = new mongoose.Schema({
    regNumber: {
        type: String,
        required: [true, "Registration Number is required"]
    },
    creationDate: {
        type: Date, 
        required: [true, "Creation Date is required"]},
    dueAmount: {
        type: Number, 
        required: [true, "Due Amount is required"]}
});

const Acontract = mongoose.model('acontract', acontractSchema);

module.exports = Acontract;