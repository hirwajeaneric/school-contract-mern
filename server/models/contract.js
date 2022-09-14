const mongoose = require('mongoose');
const Joi = require('joi');
const { json } = require('express');

const contractSchema = new mongoose.Schema({
    regNumber: {type: String, required: true},
    creationDate: {type: Date, required: true},
    dueAmount: {type: mongoose.Types.Decimal128, required: true},
    paidAmount:{type: mongoose.Types.Decimal128, required: true},
    email:{type: String, required: true},
    sponsorEmail:{type: String, required: true},
    accountantComment:{type: String, required: false},
    urubutoPayCode:{type: String, required: true},
    status:{type: String, required: true},
    amountPerInstallment:{type: mongoose.Types.Decimal128, required: true}
})

const Contract = mongoose.model('contract', contractSchema);

const validate = (data)=>{
    const schema = Joi.object({
        regNumber: Joi.string().required().label('Registration Number'),
        creationDate: Joi.date().required().label('Creation Date'),
        dueAmount: Joi.number().required().label('Due Amount'),
        paidAmount: Joi.number().required().label('Paid Amount'),
        email: Joi.string().required().label('Email'),
        sponsorEmail: Joi.string().required().label('Email of Sponsor'),
        accountantComment: Joi.string().label('Comment'),
        urubutoPayCode: Joi.string().required().label('Urubuto Payment Code'),
        status: Joi.string().required().label('Status'),
        amountPerInstallment:Joi.number().required().label('Amount Per Installment')
    })
    return schema.validate(data)
}

module.exports = {Contract, validate}