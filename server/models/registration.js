const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    regNumber: {type: String, required: true},
    name: {type: String, required: true},
    dueAmount:{type: Number, required: true},
    numberOfCourses:{type: String, required: true}
})

const Registration = mongoose.model('registration', registrationSchema);

module.exports = Registration;
