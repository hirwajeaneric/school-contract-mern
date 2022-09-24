const Joi = require('joi');

const validate = (data)=>{
    const schema = Joi.object({
        regNumber: Joi.string().required().label('Registration Number'),
        creationDate: Joi.date().required().label('Creation Date'),
        dueAmount: Joi.number().required().label('Due Amount'),
        paidAmount: Joi.number().required().label('Paid Amount'),
        email: Joi.string().required().label('Email'),
        sponsorEmail: Joi.string().required().label('Email of Sponsor'),
        urubutoPayCode: Joi.string().required().label('Urubuto Payment Code'),
        status: Joi.string().required().label('Status'),
        amountPerInstallment:Joi.number().required().label('Amount Per Installment')
    })
    return schema.validate(data)
}
module.exports = validate;