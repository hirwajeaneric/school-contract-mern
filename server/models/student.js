const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
const { json } = require('express');

const studentSchema = new mongoose.Schema({
    regNumber: {type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    sponsorEmail: {type: String, required: true},
    password: {type: String, required: true}
});

studentSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this.id}, process.env.JWTPRIVATEKEY, {expiresIn: "7d"})
    return token
};

const Student = mongoose.model('student', studentSchema);

const validate = (data) => {
    const schema = Joi.object({
        regNumber: Joi.string().required().label('Registration Number'),
        name: Joi.string().required().label('Name'),
        email: Joi.string().email().required().label('Email'),
        sponsorEmail: Joi.string().email().required().label('Sponsor Email'),
        password: passwordComplexity().required().label('Password')
    })
    return schema.validate(data)
}

module.exports = {Student, validate}