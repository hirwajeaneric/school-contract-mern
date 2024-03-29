const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    regNumber: {type: String, required: true},
    name: {type: String, required: true},
    dueAmount:{type: Number, required: true},
    numberOfCourses:{type: String, required: true},
    semester: {type: String, required: true},
    academicYear: {type: String, required: true},
    registrationDate: {type: Date, required: true}
})

const Registration = mongoose.model('registration', registrationSchema);

module.exports = Registration;
