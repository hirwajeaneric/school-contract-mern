const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
    regNumber: {type: String, required: true},
    creationDate: {type: Date, required: true},
    dueAmount: {type: mongoose.Types.Decimal128, required: true},
    paidAmount:{type: mongoose.Types.Decimal128, required: true},
    email:{type: Date, required: true},
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
        creationDate: Joi.string().isoDate().required().label('Creation Date'),
        dueAmount: Joi.string().required().label('Due Amount'),
        paidAmount: Joi.string().required().label('Paid Amount'),
        email: Joi.string().email().required().label('Email'),
        sponsorEmail: Joi.string().email().required().label('Email of Sponsor'),
        accountantComment: Joi.string().label('Comment'),
        urubutoPayCode: Joi.string().required().label('Urubuto Payment Code'),
        status: Joi.string().required().label('Status'),
        amountPerInstallment:Joi.string().required().label('Amount Per Installment')
    })
    return schema.validate(data)
}

module.exports = {Contract, validate}